import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Blog from "@/models/Blog";
import { auth } from "@/lib/auth";
import { slugify } from "@/utils/helpers";

export async function GET() {
  const session = await auth();
  await connectDB();
  
  const query = session ? {} : { published: true };
  const selection = session ? "" : "-content";
  
  const blogs = await Blog.find(query)
    .sort({ createdAt: -1 })
    .select(selection)
    .lean();
    
  return NextResponse.json(blogs);
}

export async function POST(request: NextRequest) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { title, excerpt, content, coverImage, coverImagePublicId, author, category, tags, published } = body;

  if (!title || !excerpt || !content || !coverImage || !author || !category) {
    return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
  }

  await connectDB();

  const slug = slugify(title);
  const existing = await Blog.findOne({ slug });
  const finalSlug = existing ? `${slug}-${Date.now()}` : slug;

  const blog = await Blog.create({
    title,
    slug: finalSlug,
    excerpt,
    content,
    coverImage,
    coverImagePublicId,
    author,
    category,
    tags: tags ?? [],
    published: published ?? false,
    publishedAt: published ? new Date() : undefined,
  });

  return NextResponse.json({ message: "Blog created", id: blog._id, slug: blog.slug }, { status: 201 });
}
