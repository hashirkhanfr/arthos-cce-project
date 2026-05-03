import { notFound } from "next/navigation";
import { connectDB } from "@/lib/mongodb";
import Blog from "@/models/Blog";
import BlogClient from "@/components/blogs/BlogClient";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  await connectDB();
  const blog = await Blog.findOne({ slug, status: 'published' }).lean();
  
  if (!blog) return { title: "Post Not Found" };

  return {
    title: `${blog.title} | ARTHO'S Blog`,
    description: blog.excerpt || blog.title,
    openGraph: {
      title: blog.seo?.metaTitle || blog.title,
      description: blog.seo?.metaDescription || blog.excerpt,
      images: [blog.seo?.ogImage || blog.featuredImage || "/og-image.jpg"],
    }
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  await connectDB();
  
  const blog = await Blog.findOne({ slug, status: 'published' })
    .populate('author', 'username')
    .lean();

  if (!blog) notFound();

  // Fetch recent blogs for the sidebar
  const relatedBlogs = await Blog.find({ 
    status: 'published', 
    _id: { $ne: (blog as any)._id } 
  })
    .sort({ publishedAt: -1 })
    .limit(3)
    .lean();

  return <BlogClient blog={JSON.parse(JSON.stringify(blog))} relatedBlogs={JSON.parse(JSON.stringify(relatedBlogs))} />;
}
