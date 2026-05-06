import { NextRequest, NextResponse } from 'next/server'; // Added NextRequest
import { connectDB } from '@/lib/mongodb';
import Blog from '@/models/Blog';
import cloudinary from '@/lib/cloudinary';
import { auth } from '@/lib/auth';
import { slugify } from '@/utils/slugify';

// 1. Updated GET signature
export async function GET(
    request: NextRequest, 
    { params }: { params: Promise<{ id: string }> }
) {
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

// 2. Updated PUT signature
export async function PUT(
    request: NextRequest, 
    { params }: { params: Promise<{ id: string }> }
) {
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

        const existingBlog = await Blog.findById(id);
        if (!existingBlog) {
            return NextResponse.json(
                { success: false, error: 'Blog not found' },
                { status: 404 }
            );
        }

        const newSlug = slugify(slug || title);
        let updatedOldSlugs = oldSlugs || existingBlog.oldSlugs || [];

        if (newSlug !== existingBlog.slug) {
            if (!updatedOldSlugs.includes(existingBlog.slug)) {
                updatedOldSlugs.push(existingBlog.slug);
            }
        }
        
        slug = newSlug;

        if (featuredImage && featuredImage.startsWith('data:image')) {
            try {
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

        if (seo?.ogImage && seo.ogImage.startsWith('data:image')) {
            try {
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

    } catch (error: any) { // Typed error as any for compatibility
        console.error('Error updating blog:', error);

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

// 3. Updated DELETE signature
export async function DELETE(
    request: NextRequest, 
    { params }: { params: Promise<{ id: string }> }
) {
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

        const blog = await Blog.findById(id);
        if (!blog) {
            return NextResponse.json(
                { success: false, error: 'Blog not found' },
                { status: 404 }
            );
        }

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