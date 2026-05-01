import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Blog from '@/models/Blog';
import cloudinary from '@/lib/cloudinary';
import { auth } from '@/lib/auth';
import { slugify } from '@/utils/slugify';

// GET single blog by ID (protected)
export async function GET(request, { params }) {
    try {
        const session = await auth();

        if (!session) {
            return NextResponse.json(
                { success: false, error: 'Authentication required' },
                { status: 401 }
            );
        }

        await connectDB();

        const { id } = await params;
        const blog = await Blog.findById(id).populate('author', 'name');

        if (!blog) {
            return NextResponse.json(
                { success: false, error: 'Blog not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            data: blog,
        });
    } catch (error) {
        console.error('Error fetching blog:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch blog' },
            { status: 500 }
        );
    }
}

// PUT update blog by ID (protected)
export async function PUT(request, { params }) {
    try {
        const session = await auth();

        if (!session) {
            return NextResponse.json(
                { success: false, error: 'Authentication required' },
                { status: 401 }
            );
        }

        await connectDB();

        const { id } = await params;
        const body = await request.json();
        let { title, slug, content, excerpt, featuredImage, status, seo, oldSlugs } = body;

        // Find existing blog
        const existingBlog = await Blog.findById(id);
        if (!existingBlog) {
            return NextResponse.json(
                { success: false, error: 'Blog not found' },
                { status: 404 }
            );
        }

        // Handle slug changes and automated oldSlugs tracking
        const newSlug = slugify(slug || title);
        let updatedOldSlugs = oldSlugs || existingBlog.oldSlugs || [];

        if (newSlug !== existingBlog.slug) {
            // Push current slug to oldSlugs if it's not already there
            if (!updatedOldSlugs.includes(existingBlog.slug)) {
                updatedOldSlugs.push(existingBlog.slug);
            }
        }
        
        // Final slug enforcement
        slug = newSlug;

        // Upload featured image to Cloudinary if provided as Base64
        if (featuredImage && featuredImage.startsWith('data:image')) {
            try {
                // Delete old image if it exists on Cloudinary
                if (existingBlog.featuredImage && existingBlog.featuredImage.includes('cloudinary.com')) {
                    try {
                        const oldPublicId = existingBlog.featuredImage.split('/').slice(-2).join('/').split('.')[0];
                        await cloudinary.uploader.destroy(oldPublicId);
                    } catch (deleteError) {
                        console.error('Error deleting old blog image:', deleteError);
                    }
                }

                const uploadResponse = await cloudinary.uploader.upload(featuredImage, {
                    folder: 'fes-blogs',
                    resource_type: 'auto',
                });
                featuredImage = uploadResponse.secure_url;
            } catch (uploadError) {
                console.error('Error uploading blog image:', uploadError);
            }
        }

        // Upload SEO OG image if provided as Base64
        if (seo?.ogImage && seo.ogImage.startsWith('data:image')) {
            try {
                // Delete old OG image if it exists on Cloudinary
                if (existingBlog.seo?.ogImage && existingBlog.seo.ogImage.includes('cloudinary.com')) {
                    try {
                        const oldOgPublicId = existingBlog.seo.ogImage.split('/').slice(-2).join('/').split('.')[0];
                        await cloudinary.uploader.destroy(oldOgPublicId);
                    } catch (deleteError) {
                        console.error('Error deleting old SEO image:', deleteError);
                    }
                }

                const uploadResponse = await cloudinary.uploader.upload(seo.ogImage, {
                    folder: 'fes-blogs-seo',
                    resource_type: 'auto',
                });
                seo.ogImage = uploadResponse.secure_url;
            } catch (uploadError) {
                console.error('Error uploading SEO image:', uploadError);
            }
        }

        // Update blog
        const blog = await Blog.findByIdAndUpdate(
            id,
            {
                title,
                slug,
                oldSlugs: updatedOldSlugs,
                content,
                excerpt,
                featuredImage,
                status,
                seo,
            },
            { new: true, runValidators: true }
        ).populate('author', 'name');

        return NextResponse.json({
            success: true,
            data: blog,
        });

    } catch (error) {
        console.error('Error updating blog:', error);

        // Handle duplicate slug error
        if (error.code === 11000) {
            return NextResponse.json(
                { success: false, error: 'A blog with this slug already exists' },
                { status: 400 }
            );
        }

        return NextResponse.json(
            { success: false, error: error.message || 'Failed to update blog' },
            { status: 500 }
        );
    }
}

// DELETE blog by ID (protected)
export async function DELETE(request, { params }) {
    try {
        const session = await auth();

        if (!session) {
            return NextResponse.json(
                { success: false, error: 'Authentication required' },
                { status: 401 }
            );
        }

        await connectDB();

        const { id } = await params;

        // Find blog
        const blog = await Blog.findById(id);
        if (!blog) {
            return NextResponse.json(
                { success: false, error: 'Blog not found' },
                { status: 404 }
            );
        }

        // Delete images from Cloudinary if they exist
        if (blog.featuredImage && blog.featuredImage.includes('cloudinary.com')) {
            try {
                const publicId = blog.featuredImage.split('/').slice(-2).join('/').split('.')[0];
                await cloudinary.uploader.destroy(publicId);
            } catch (deleteError) {
                console.error('Error deleting blog image from Cloudinary:', deleteError);
            }
        }

        if (blog.seo?.ogImage && blog.seo.ogImage.includes('cloudinary.com')) {
            try {
                const ogPublicId = blog.seo.ogImage.split('/').slice(-2).join('/').split('.')[0];
                await cloudinary.uploader.destroy(ogPublicId);
            } catch (deleteError) {
                console.error('Error deleting blog SEO image from Cloudinary:', deleteError);
            }
        }

        // Delete blog
        await Blog.findByIdAndDelete(id);

        return NextResponse.json({
            success: true,
            message: 'Blog deleted successfully',
        });

    } catch (error) {
        console.error('Error deleting blog:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to delete blog' },
            { status: 500 }
        );
    }
}
