import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import GalleryCollection from '@/models/GalleryCollection';
import { auth } from '@/lib/auth';

export async function GET() {
    try {
        await connectDB();
        const collections = await GalleryCollection.find().sort({ createdAt: -1 });
        return NextResponse.json({ success: true, data: collections });
    } catch (error) {
        return NextResponse.json({ success: false, error: 'Failed to fetch gallery' }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        const session = await auth();
        if (!session) {
            return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
        }

        await connectDB();
        const body = await request.json();
        const { title, description, images, status } = body;

        if (!title || !images || images.length === 0) {
            return NextResponse.json({ success: false, error: 'Title and images are required' }, { status: 400 });
        }

        const collection = await GalleryCollection.create({
            title,
            description,
            images,
            status: status || 'published'
        });

        return NextResponse.json({ success: true, data: collection }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
