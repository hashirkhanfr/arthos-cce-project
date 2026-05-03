import type { Metadata } from "next";
import { BookOpen, Calendar, Clock, ChevronRight, Search } from "lucide-react";
import Link from "next/link";
import { connectDB } from "@/lib/mongodb";
import Blog from "@/models/Blog";

export const metadata: Metadata = {
  title: "Editorial | ARTHO'S Humanitarian Society",
  description: "Explore the latest stories, impact reports, and updates from our humanitarian missions across Pakistan.",
};

export default async function BlogPage() {
  await connectDB();
  const blogs = await Blog.find({ status: 'published' })
    .sort({ publishedAt: -1 })
    .populate('author', 'username')
    .lean();

  return (
    <div className="min-h-screen bg-[#fafafa]">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-[#1F6F3D] to-[#14532D] text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="container-arthos relative z-10">
          <div className="max-w-3xl">
            <span className="inline-block px-4 py-1.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-[10px] font-black uppercase tracking-[0.2em] text-green-200 mb-6">
              Our Editorial
            </span>
            <h1 className="text-5xl md:text-7xl font-black mb-6 leading-[1.1] tracking-tight" style={{ fontFamily: "Outfit, sans-serif" }}>
              Stories of <span className="text-[#E8D3A5]">Change</span> & Impact
            </h1>
            <p className="text-xl text-green-50/80 leading-relaxed font-medium">
              A collection of narratives from the heart of our missions, bringing you closer to the lives we touch and the communities we build.
            </p>
          </div>
        </div>
        
        {/* Decorative Element */}
        <div className="absolute bottom-0 right-0 w-1/3 h-full bg-gradient-to-l from-white/5 to-transparent skew-x-12 transform translate-x-1/2"></div>
      </section>

      {/* Main Content */}
      <section className="py-24 container-arthos">
        {blogs.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 text-center">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
              <BookOpen size={40} className="text-gray-300" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">No stories yet</h2>
            <p className="text-gray-500">We're currently drafting new impact stories. Check back soon!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {blogs.map((blog: any, idx: number) => (
              <Link 
                key={blog._id.toString()} 
                href={`/blogs/${blog.slug}`}
                className="group relative flex flex-col bg-white rounded-[2rem] border border-gray-100 overflow-hidden hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] transition-all duration-500 hover:-translate-y-2"
              >
                {/* Image Container */}
                <div className="aspect-[1.5] overflow-hidden relative">
                  {blog.featuredImage ? (
                    <img 
                      src={blog.featuredImage} 
                      alt={blog.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center text-gray-200">
                      <BookOpen size={48} />
                    </div>
                  )}
                  
                  {/* Category Tag */}
                  <div className="absolute top-6 left-6">
                    <span className="px-4 py-2 bg-white/90 backdrop-blur-md text-[#1F6F3D] text-[10px] font-black uppercase tracking-widest rounded-xl shadow-xl shadow-black/5">
                      {blog.category || 'Humanitarian'}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8 flex-1 flex flex-col">
                  <div className="flex items-center gap-6 text-[10px] font-black uppercase tracking-widest text-gray-400 mb-6">
                    <span className="flex items-center gap-2">
                      <Calendar size={14} className="text-[#1F6F3D]" />
                      {new Date(blog.publishedAt || blog.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                    <span className="flex items-center gap-2">
                      <Clock size={14} className="text-[#1F6F3D]" />
                      {blog.readTime} Min Read
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 group-hover:text-[#1F6F3D] transition-colors mb-4 line-clamp-2 leading-[1.3]" style={{ fontFamily: "Outfit, sans-serif" }}>
                    {blog.title}
                  </h3>

                  <p className="text-gray-500 text-sm line-clamp-3 mb-8 leading-relaxed">
                    {blog.excerpt}
                  </p>

                  <div className="mt-auto pt-6 border-t border-gray-50 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#1F6F3D]/10 flex items-center justify-center text-[#1F6F3D] text-[10px] font-bold">
                        {blog.author?.username?.charAt(0) || 'A'}
                      </div>
                      <span className="text-xs font-bold text-gray-900">{blog.author?.username || 'Artho Admin'}</span>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-[#1F6F3D] group-hover:bg-[#1F6F3D] group-hover:text-white transition-all duration-300">
                      <ChevronRight size={18} />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* Newsletter / CTA */}
      <section className="py-24 bg-white border-t border-gray-100">
        <div className="container-arthos">
          <div className="bg-[#1F6F3D] rounded-[3rem] p-10 md:p-20 relative overflow-hidden text-center text-white">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="text-3xl md:text-5xl font-black mb-6 tracking-tight" style={{ fontFamily: "Outfit, sans-serif" }}>
                Don't Miss a <span className="text-[#E8D3A5]">Story</span>
              </h2>
              <p className="text-green-50/80 mb-10 text-lg">
                Subscribe to our newsletter to receive the latest impact stories and mission updates directly in your inbox.
              </p>
              <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="flex-1 px-6 py-4 rounded-2xl bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#E8D3A5]/50 transition-all"
                />
                <button className="px-8 py-4 bg-[#E8D3A5] text-[#14532D] font-bold rounded-2xl hover:bg-white transition-all">
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
