import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Blog from '@/models/Blog';
import { auth } from '@/lib/auth';

// GET all blogs including drafts (protected - admin only)
export async function GET() {
    try {
        const session = await auth();

        if (!session) {
            return NextResponse.json(
                { success: false, error: 'Authentication required' },
                { status: 401 }
            );
        }

        await connectDB();

        const blogs = await Blog.find({})
            .populate('author', 'name')
            .sort({ createdAt: -1 });

        return NextResponse.json({
            success: true,
            data: blogs,
        });
    } catch (error) {
        console.error('Error fetching all blogs:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch blogs' },
            { status: 500 }
        );
    }
}
