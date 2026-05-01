import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import GalleryCollection from '@/models/GalleryCollection';
import { auth } from '@/lib/auth';
import cloudinary from '@/lib/cloudinary';

export async function GET(request, { params }) {
    try {
        await connectDB();
        const { id } = await params;
        const collection = await GalleryCollection.findById(id);
        if (!collection) {
            return NextResponse.json({ success: false, error: 'Collection not found' }, { status: 404 });
        }
        return NextResponse.json({ success: true, data: collection });
    } catch (error) {
        return NextResponse.json({ success: false, error: 'Failed to fetch collection' }, { status: 500 });
    }
}

export async function PUT(request, { params }) {
    try {
        const session = await auth();
        if (!session) {
            return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
        }

        await connectDB();
        const { id } = await params;
        const body = await request.json();
        const { title, description, images, status } = body;

        const collection = await GalleryCollection.findByIdAndUpdate(
            id,
            { title, description, images, status },
            { new: true, runValidators: true }
        );

        if (!collection) {
            return NextResponse.json({ success: false, error: 'Collection not found' }, { status: 404 });
        }

        return NextResponse.json({ success: true, data: collection });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

export async function DELETE(request, { params }) {
    try {
        const session = await auth();
        if (!session) {
            return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
        }

        await connectDB();
        const { id } = await params;
        const collection = await GalleryCollection.findById(id);

        if (!collection) {
            return NextResponse.json({ success: false, error: 'Collection not found' }, { status: 404 });
        }

        // Delete images from Cloudinary
        for (const img of collection.images) {
            try {
                await cloudinary.uploader.destroy(img.public_id);
            } catch (err) {
                console.error(`Failed to delete image ${img.public_id}:`, err);
            }
        }

        await GalleryCollection.findByIdAndDelete(id);

        return NextResponse.json({ success: true, message: 'Collection deleted' });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
