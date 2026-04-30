'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Calendar, Clock, ArrowLeft, Search, Facebook, Twitter, Linkedin, MessageCircle, Copy } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

export default function BlogClient({ blog, relatedBlogs }) {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState('');

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            router.push(`/blogs?search=${encodeURIComponent(searchQuery)}`);
        }
    };

    const shareToFacebook = () => {
        const url = encodeURIComponent(window.location.href);
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank', 'width=600,height=400');
    };

    const shareToX = () => {
        const url = encodeURIComponent(window.location.href);
        const text = encodeURIComponent(blog.title);
        window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, '_blank', 'width=600,height=400');
    };

    const shareToLinkedIn = () => {
        const url = encodeURIComponent(window.location.href);
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank', 'width=600,height=400');
    };

    const shareToWhatsApp = () => {
        const url = encodeURIComponent(window.location.href);
        const text = encodeURIComponent(blog.title);
        window.open(`https://wa.me/?text=${text}%20${url}`, '_blank');
    };

    const copyLink = async () => {
        try {
            await navigator.clipboard.writeText(window.location.href);
            toast.success('Link copied to clipboard!');
        } catch (error) {
            toast.error('Failed to copy link');
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
            {/* Header with Featured Image Background */}
            <div 
                className="relative bg-gradient-to-r from-blue-600 to-blue-700 text-white pt-32 pb-16 px-6 overflow-hidden"
                style={blog.featuredImage ? {
                    backgroundImage: `linear-gradient(rgba(37, 99, 235, 0.85), rgba(29, 78, 216, 0.85)), url(${blog.featuredImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                } : {}}
            >
                <div className="max-w-8xl mx-auto relative z-10">
                    <Link
                        href="/blogs"
                        className="inline-flex items-center gap-2 text-blue-100 hover:text-white mb-6 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to all blogs
                    </Link>
                    
                    <motion.h1
                        className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        {blog.title}
                    </motion.h1>

                    <motion.div
                        className="flex flex-wrap items-center gap-4 text-blue-100"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <span className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            {formatDate(blog.publishedAt)}
                        </span>
                        <span className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            {blog.readTime} min read
                        </span>
                        {blog.author && (
                            <span>by {blog.author.name}</span>
                        )}
                    </motion.div>
                </div>
            </div>

            {/* Content with Sidebar */}
            <article className="py-12 px-6">
                <div className="max-w-8xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Main Content - Left Column */}
                        <div className="lg:col-span-2">
                            <motion.div
                                className="bg-white p-8 md:p-12"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                            >
                                <div 
                                    className="blog-content"
                                    dangerouslySetInnerHTML={{ __html: blog.content }}
                                />
                            </motion.div>

                            {/* Share Section */}
                            <div className="mt-6 p-6 bg-white">
                                <p className="text-gray-700 font-semibold mb-4">Share this article</p>
                                <div className="flex gap-3">
                                    <button
                                        onClick={shareToFacebook}
                                        className="p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                        title="Share on Facebook"
                                    >
                                        <Facebook className="w-5 h-5" />
                                    </button>
                                    <button
                                        onClick={shareToX}
                                        className="p-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
                                        title="Share on X"
                                    >
                                        <Twitter className="w-5 h-5" />
                                    </button>
                                    <button
                                        onClick={shareToLinkedIn}
                                        className="p-3 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors"
                                        title="Share on LinkedIn"
                                    >
                                        <Linkedin className="w-5 h-5" />
                                    </button>
                                    <button
                                        onClick={shareToWhatsApp}
                                        className="p-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                                        title="Share on WhatsApp"
                                    >
                                        <MessageCircle className="w-5 h-5" />
                                    </button>
                                    <button
                                        onClick={copyLink}
                                        className="p-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                                        title="Copy link"
                                    >
                                        <Copy className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Sidebar - Right Column */}
                        <div className="lg:col-span-1">
                            <div className="lg:sticky lg:top-24 space-y-6">
                                {/* Search Box */}
                                <div className="bg-white p-6">
                                    <h3 className="text-lg font-bold text-gray-900 mb-4">Search Blogs</h3>
                                    <form onSubmit={handleSearch}>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                value={searchQuery}
                                                onChange={(e) => setSearchQuery(e.target.value)}
                                                placeholder="Search articles..."
                                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                            <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
                                        </div>
                                    </form>
                                </div>

                                {/* Recent/Related Blogs */}
                                <div className="bg-white p-6">
                                    <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Articles</h3>
                                    <div className="space-y-4">
                                        {relatedBlogs.map((relatedBlog) => (
                                            <Link
                                                key={relatedBlog._id}
                                                href={`/blogs/${relatedBlog.slug}`}
                                                className="block group"
                                            >
                                                <div className="flex gap-3">
                                                    {relatedBlog.featuredImage && (
                                                        <img
                                                            src={relatedBlog.featuredImage}
                                                            alt={relatedBlog.title}
                                                            className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
                                                        />
                                                    )}
                                                    <div className="flex-1 min-w-0">
                                                        <h4 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2 mb-1">
                                                            {relatedBlog.title}
                                                        </h4>
                                                        <p className="text-xs text-gray-500">
                                                            {formatDate(relatedBlog.publishedAt)}
                                                        </p>
                                                    </div>
                                                </div>
                                            </Link>
                                        ))}
                                        {relatedBlogs.length === 0 && (
                                            <p className="text-gray-500 text-sm">No related articles found.</p>
                                        )}
                                    </div>
                                    <Link
                                        href="/blogs"
                                        className="block mt-4 text-blue-600 hover:text-blue-700 font-semibold text-sm"
                                    >
                                        View all articles →
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </article>

            {/* Custom Styles for Blog Content */}
            <style dangerouslySetInnerHTML={{ __html: `
                .blog-content {
                    font-size: 1.125rem;
                    line-height: 1.75;
                    color: #374151;
                }
                .blog-content h1 {
                    font-size: 2.25rem;
                    font-weight: 700;
                    margin-top: 2rem;
                    margin-bottom: 1rem;
                    color: #111827;
                    line-height: 1.2;
                }
                .blog-content h2 {
                    font-size: 1.875rem;
                    font-weight: 700;
                    margin-top: 2rem;
                    margin-bottom: 1rem;
                    color: #111827;
                    line-height: 1.3;
                }
                .blog-content h3 {
                    font-size: 1.5rem;
                    font-weight: 600;
                    margin-top: 1.5rem;
                    margin-bottom: 0.75rem;
                    color: #1f2937;
                    line-height: 1.4;
                }
                .blog-content p { margin-bottom: 1.25rem; }
                .blog-content strong { font-weight: 700; color: #111827; }
                .blog-content em { font-style: italic; }
                .blog-content u { text-decoration: underline; }
                .blog-content ul { list-style-type: disc; margin-left: 2rem; margin-bottom: 1.25rem; }
                .blog-content ol { list-style-type: decimal; margin-left: 2rem; margin-bottom: 1.25rem; }
                .blog-content li { margin-bottom: 0.5rem; padding-left: 0.5rem; }
                .blog-content img {
                    max-width: 100%;
                    height: auto;
                    border-radius: 0.75rem;
                    margin: 2rem auto;
                    display: block;
                    box-shadow: 0 10px 25px rgba(0,0,0,0.1);
                }
                .blog-content blockquote {
                    border-left: 4px solid #2563eb;
                    padding: 1rem 1.5rem;
                    margin: 1.5rem 0;
                    font-style: italic;
                    color: #4b5563;
                    background-color: #f3f4f6;
                    border-radius: 0.5rem;
                }
                .blog-content a { color: #2563eb; text-decoration: underline; }
                .blog-content a:hover { color: #1d4ed8; }
                .blog-content code {
                    background-color: #f3f4f6;
                    padding: 0.2rem 0.4rem;
                    border-radius: 0.25rem;
                    font-family: monospace;
                    font-size: 0.9em;
                }
                .blog-content pre {
                    background-color: #1f2937;
                    color: #f9fafb;
                    padding: 1.5rem;
                    border-radius: 0.75rem;
                    overflow-x: auto;
                    margin: 1.5rem 0;
                }
                .blog-content pre code { background-color: transparent; padding: 0; color: inherit; }
            ` }} />
        </div>
    );
}
