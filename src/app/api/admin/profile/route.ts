import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import User from '@/models/User';
import { auth } from '@/lib/auth';
import bcrypt from 'bcryptjs';

export async function GET() {
    try {
        const session = await auth();
        if (!session) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });

        await connectDB();
        const user = await User.findById(session.user.id).select('-password');
        return NextResponse.json({ success: true, data: user });
    } catch (error) {
        return NextResponse.json({ success: false, error: 'Failed to fetch profile' }, { status: 500 });
    }
}

export async function PUT(request) {
    try {
        const session = await auth();
        if (!session) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });

        await connectDB();
        const { username, password } = await request.json();
        const updateData: any = {};

        if (username) updateData.username = username;
        if (password) {
            updateData.password = await bcrypt.hash(password, 10);
        }

        const user = await User.findByIdAndUpdate(session.user.id, updateData, { new: true }).select('-password');

        return NextResponse.json({ success: true, data: user });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
