import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Gallery from "@/models/Gallery";
import { auth } from "@/lib/auth";
import { uploadToCloudinary, deleteFromCloudinary } from "@/lib/cloudinary";

export async function GET() {
  await connectDB();
  const images = await Gallery.find().sort({ createdAt: -1 }).lean();
  return NextResponse.json(images);
}

export async function POST(request: NextRequest) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get("file") as File | null;
  const title = formData.get("title") as string;
  const category = formData.get("category") as string;
  const description = formData.get("description") as string | null;

  if (!file || !title || !category) {
    return NextResponse.json({ message: "File, title, and category are required" }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const { url, publicId } = await uploadToCloudinary(buffer, "arthos/gallery");

  await connectDB();
  const image = await Gallery.create({ title, description, imageUrl: url, publicId, category });

  return NextResponse.json({ message: "Image uploaded", id: image._id }, { status: 201 });
}

export async function DELETE(request: NextRequest) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { publicId, id } = await request.json();
  if (!publicId || !id) {
    return NextResponse.json({ message: "publicId and id are required" }, { status: 400 });
  }

  await deleteFromCloudinary(publicId);
  await connectDB();
  await Gallery.findByIdAndDelete(id);

  return NextResponse.json({ message: "Image deleted" });
}
