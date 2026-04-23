import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Stats from "@/models/Stats";
import { auth } from "@/lib/auth";

export async function GET() {
  await connectDB();
  const stats = await Stats.find().sort({ order: 1 }).lean();
  return NextResponse.json(stats);
}

export async function POST(request: NextRequest) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { key, label, value, unit, icon, order } = body;

  if (!key || !label || value === undefined) {
    return NextResponse.json({ message: "key, label, and value are required" }, { status: 400 });
  }

  await connectDB();
  const stat = await Stats.findOneAndUpdate(
    { key },
    { label, value, unit, icon, order: order ?? 0 },
    { upsert: true, new: true }
  );

  return NextResponse.json({ message: "Stat saved", id: stat._id }, { status: 201 });
}
