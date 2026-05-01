'use client';

import { motion } from 'framer-motion';
import BlogHeader from './BlogHeader';
import BlogSidebar from './BlogSidebar';
import BlogShare from './BlogShare';

export default function BlogClient({ blog, relatedBlogs }) {
    return (
        <div className="min-h-screen bg-white">
            {/* Modular Header */}
            <BlogHeader blog={blog} />

            {/* Main Content & Sidebar Container */}
            <div className="max-w-7xl mx-auto px-6 py-20">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
                    {/* Content Area - Left/Main */}
                    <div className="lg:col-span-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                        >
                            <div 
                                className="blog-content prose prose-lg prose-green max-w-none prose-headings:font-black prose-headings:tracking-tight prose-p:leading-relaxed prose-p:text-gray-600 prose-img:rounded-3xl prose-img:shadow-2xl prose-img:my-12 prose-blockquote:border-[#1F6F3D] prose-blockquote:bg-gray-50 prose-blockquote:p-8 prose-blockquote:rounded-3xl prose-blockquote:italic"
                                dangerouslySetInnerHTML={{ __html: blog.content }}
                            />

                            {/* Modular Share Section */}
                            <BlogShare title={blog.title} />
                        </motion.div>
                    </div>

                    {/* Modular Sidebar - Right */}
                    <div className="lg:col-span-4">
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                        >
                            <BlogSidebar relatedBlogs={relatedBlogs} />
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Global Content Styles */}
            <style dangerouslySetInnerHTML={{ __html: `
                .blog-content {
                    font-size: 1.15rem;
                    line-height: 1.8;
                    color: #374151;
                }
                .blog-content h1, .blog-content h2, .blog-content h3 {
                    color: #111827;
                    font-family: 'Outfit', sans-serif;
                    margin-top: 2.5rem;
                    margin-bottom: 1.25rem;
                }
                .blog-content p { margin-bottom: 1.5rem; }
                .blog-content img { width: 100%; border-radius: 1.5rem; box-shadow: 0 20px 50px rgba(0,0,0,0.1); }
                .blog-content a { color: #1F6F3D; font-weight: 700; text-decoration: underline; text-underline-offset: 4px; transition: all 0.2s; }
                .blog-content a:hover { color: #14532D; text-decoration-color: #14532D; }
                .blog-content ul { list-style: disc; padding-left: 1.5rem; margin-bottom: 1.5rem; }
                .blog-content ol { list-style: decimal; padding-left: 1.5rem; margin-bottom: 1.5rem; }
                .blog-content li { margin-bottom: 0.5rem; }
                .blog-content blockquote { border-left: 5px solid #1F6F3D; padding: 1.5rem 2rem; background: #f9fafb; border-radius: 1rem; font-style: italic; font-size: 1.25rem; }
            ` }} />
        </div>
    );
}
