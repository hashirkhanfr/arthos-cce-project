import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Blog from '@/models/Blog';
import cloudinary from '@/lib/cloudinary';
import { auth } from '@/lib/auth';
import { slugify } from '@/utils/slugify';
import User from '@/models/User';

// GET all published blogs (public)
export async function GET() {
    try {
        await connectDB();

        const blogs = await Blog.find({ status: 'published' })
            .populate('author', 'username')
            .sort({ publishedAt: -1 })
            .select('-content'); // Exclude full content for list view

        return NextResponse.json({
            success: true,
            data: blogs,
        });
    } catch (error) {
        console.error('Error fetching blogs:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch blogs' },
            { status: 500 }
        );
    }
}

// POST create new blog (protected)
export async function POST(request) {
    try {
        const session = await auth();

        if (!session) {
            return NextResponse.json(
                { success: false, error: 'Authentication required' },
                { status: 401 }
            );
        }

        await connectDB();

        const body = await request.json();
        let { title, slug, content, excerpt, featuredImage, status, seo, oldSlugs } = body;

        // Validate required fields
        if (!title || !content) {
            return NextResponse.json(
                { success: false, error: 'Title and content are required' },
                { status: 400 }
            );
        }

        // Enforce strict slugification
        if (!slug || slug.trim() === '') {
            slug = slugify(title);
        } else {
            slug = slugify(slug);
        }

        // Upload featured image to Cloudinary if provided as Base64
        if (featuredImage && featuredImage.startsWith('data:image')) {
            try {
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
                const uploadResponse = await cloudinary.uploader.upload(seo.ogImage, {
                    folder: 'fes-blogs-seo',
                    resource_type: 'auto',
                });
                seo.ogImage = uploadResponse.secure_url;
            } catch (uploadError) {
                console.error('Error uploading SEO image:', uploadError);
            }
        }

        // Get author ID from session (with fallback for stale sessions)
        let authorId = session.user.id;
        
        if (!authorId) {
            const user = await User.findOne({ username: session.user.name });
            if (user) authorId = user._id;
        }

        if (!authorId) {
            return NextResponse.json(
                { success: false, error: 'Could not resolve author identity. Please logout and login again.' },
                { status: 400 }
            );
        }

        // Create blog
        const blog = await Blog.create({
            title,
            slug,
            oldSlugs: oldSlugs || [],
            content,
            excerpt,
            featuredImage,
            author: authorId,
            status: status || 'draft',
            seo: seo || {},
        });

        return NextResponse.json({
            success: true,
            data: blog,
        }, { status: 201 });

    } catch (error) {
        console.error('Error creating blog:', error);

        // Handle duplicate slug error
        if (error.code === 11000) {
            return NextResponse.json(
                { success: false, error: 'A blog with this slug already exists' },
                { status: 400 }
            );
        }

        return NextResponse.json(
            { success: false, error: error.message || 'Failed to create blog' },
            { status: 500 }
        );
    }
}
