import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Blog from '@/models/Blog';

// GET single blog by slug (public)
export async function GET(request, { params }) {
    try {
        await connectDB();

        const { slug } = await params;
        const blog = await Blog.findOne({ slug, status: 'published' })
            .populate('author', 'name');

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
        console.error('Error fetching blog by slug:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch blog' },
            { status: 500 }
        );
    }
}
