import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Card from "@/components/Card";
import { connectDB } from "@/lib/mongodb";
import Blog from "@/models/Blog";

export default async function BlogPreview() {
  let blogs: any[] = [];
  try {
    await connectDB();
    blogs = await Blog.find({ status: 'published' })
      .sort({ publishedAt: -1 })
      .limit(3)
      .lean();
  } catch (error) {
    console.error("Error fetching blogs for preview:", error);
  }

  if (blogs.length === 0) {
    return null; // Or show a fallback
  }

  return (
    <section className="section-padding bg-gray-50">
      <div className="container-arthos">
        <div className="flex items-end justify-between mb-10">
          <div>
            <span className="inline-block text-sm font-semibold text-[#1F6F3D] uppercase tracking-widest mb-3">
              Latest News
            </span>
            <h2
              className="text-3xl font-bold text-gray-900"
              style={{ fontFamily: "Outfit, sans-serif" }}
            >
              From Our Blog
            </h2>
          </div>
          <Link
            href="/blogs"
            className="flex items-center gap-1 text-sm font-semibold text-[#1F6F3D] hover:gap-2 transition-all"
          >
            View all <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <Card
              key={blog._id.toString()}
              title={blog.title}
              description={blog.excerpt || blog.content.replace(/<[^>]*>/g, '').substring(0, 120) + '...'}
              image={blog.featuredImage}
              badge="Latest"
              href={`/blogs/${blog.slug}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
