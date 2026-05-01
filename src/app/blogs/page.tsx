import type { Metadata } from "next";
import { BookOpen, Calendar, Clock, ChevronRight } from "lucide-react";
import Link from "next/link";
import { connectDB } from "@/lib/mongodb";
import Blog from "@/models/Blog";

export const metadata: Metadata = {
  title: "Blog | ARTHO'S Humanitarian Society",
  description: "Read stories, news, and updates from ARTHO'S Humanitarian Society.",
};

export default async function BlogPage() {
  await connectDB();
  const blogs = await Blog.find({ status: 'published' })
    .sort({ publishedAt: -1 })
    .populate('author', 'name')
    .lean();

  return (
    <div className="section-padding bg-gray-50/50">
      <div className="container-arthos">
        <div className="text-center mb-14">
          <span className="inline-block text-sm font-semibold text-[#1F6F3D] uppercase tracking-widest mb-3">
            Blog
          </span>
          <h1
            className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4"
            style={{ fontFamily: "Outfit, sans-serif" }}
          >
            Stories of Impact
          </h1>
          <p className="text-gray-500 max-w-xl mx-auto">
            Inspiring stories, program updates, and insights from our work across Pakistan.
          </p>
        </div>

        {blogs.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center text-gray-400">
            <BookOpen size={48} className="mb-4 text-gray-200" />
            <p className="font-medium text-gray-500">No posts yet</p>
            <p className="text-sm mt-1">Blog posts will appear here once published.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog: any) => (
              <Link 
                key={blog._id.toString()} 
                href={`/blogs/${blog.slug}`}
                className="group bg-white rounded-3xl border border-gray-100 overflow-hidden hover:shadow-xl hover:shadow-gray-200/50 transition-all duration-300"
              >
                <div className="aspect-[16/10] overflow-hidden relative">
                  {blog.featuredImage ? (
                    <img 
                      src={blog.featuredImage} 
                      alt={blog.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-300">
                      <BookOpen size={32} />
                    </div>
                  )}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-[#1F6F3D] text-[10px] font-bold uppercase tracking-wider rounded-full shadow-sm">
                      {blog.category || 'Humanitarian'}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-4 text-xs text-gray-400 mb-3">
                    <span className="flex items-center gap-1.5">
                      <Calendar size={14} className="text-[#1F6F3D]" />
                      {new Date(blog.publishedAt || blog.createdAt).toLocaleDateString()}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock size={14} className="text-[#1F6F3D]" />
                      {blog.readTime} min read
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-[#1F6F3D] transition-colors mb-3 line-clamp-2 leading-tight">
                    {blog.title}
                  </h3>
                  <p className="text-gray-500 text-sm line-clamp-2 mb-6 leading-relaxed">
                    {blog.excerpt}
                  </p>
                  <div className="flex items-center text-[#1F6F3D] text-xs font-bold uppercase tracking-wider group-hover:gap-2 transition-all">
                    Read More <ChevronRight size={14} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
