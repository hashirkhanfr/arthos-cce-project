import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Blog from "@/models/Blog";
import { auth } from "@/lib/auth";
import { slugify } from "@/utils/helpers";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  await connectDB();
  const blog = await Blog.findById(id).lean();
  
  if (!blog) {
    return NextResponse.json({ message: "Not found" }, { status: 404 });
  }

  return NextResponse.json(blog);
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const body = await request.json();
  const { title, published } = body;

  await connectDB();

  if (title) {
    body.slug = slugify(title);
  }

  if (published !== undefined) {
    body.publishedAt = published ? new Date() : undefined;
  }

  const updated = await Blog.findByIdAndUpdate(id, body, { new: true });

  if (!updated) {
    return NextResponse.json({ message: "Not found" }, { status: 404 });
  }

  return NextResponse.json(updated);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  await connectDB();
  const deleted = await Blog.findByIdAndDelete(id);

  if (!deleted) {
    return NextResponse.json({ message: "Not found" }, { status: 404 });
  }

  return NextResponse.json({ message: "Deleted successfully" });
}
