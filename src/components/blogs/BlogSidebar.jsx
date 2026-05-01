'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function BlogSidebar({ relatedBlogs = [] }) {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            router.push(`/blogs?search=${encodeURIComponent(searchQuery)}`);
        }
    };

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    return (
        <aside className="lg:sticky lg:top-24 space-y-8">
            {/* Search Box */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-6">Search Articles</h3>
                <form onSubmit={handleSearch}>
                    <div className="relative group">
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Keywords..."
                            className="w-full pl-12 pr-4 py-3 bg-gray-50 border-0 rounded-2xl focus:ring-2 focus:ring-[#1F6F3D]/20 transition-all text-sm"
                        />
                        <Search className="absolute left-4 top-3.5 w-5 h-5 text-gray-300 group-focus-within:text-[#1F6F3D] transition-colors" />
                    </div>
                </form>
            </div>

            {/* Related/Recent Blogs */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-6">Recent Stories</h3>
                <div className="space-y-6">
                    {relatedBlogs.map((relatedBlog) => (
                        <Link
                            key={relatedBlog._id}
                            href={`/blogs/${relatedBlog.slug}`}
                            className="block group"
                        >
                            <div className="flex gap-4 items-center">
                                {relatedBlog.featuredImage && (
                                    <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 shadow-sm border border-gray-100">
                                        <img
                                            src={relatedBlog.featuredImage}
                                            alt={relatedBlog.title}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                        />
                                    </div>
                                )}
                                <div className="flex-1 min-w-0">
                                    <h4 className="text-sm font-bold text-gray-900 group-hover:text-[#1F6F3D] transition-colors line-clamp-2 leading-tight mb-1">
                                        {relatedBlog.title}
                                    </h4>
                                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                                        {formatDate(relatedBlog.publishedAt)}
                                    </p>
                                </div>
                            </div>
                        </Link>
                    ))}
                    {relatedBlogs.length === 0 && (
                        <p className="text-gray-400 text-xs italic">More stories coming soon.</p>
                    )}
                </div>
                <Link
                    href="/blogs"
                    className="flex items-center justify-between mt-8 p-4 bg-gray-50 rounded-2xl text-[#1F6F3D] hover:bg-[#1F6F3D] hover:text-white transition-all text-xs font-bold uppercase tracking-widest group"
                >
                    All Articles
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
            </div>

            {/* Support/Donation Promo */}
            <div className="bg-gradient-to-br from-[#1F6F3D] to-[#14532D] p-8 rounded-3xl text-white shadow-xl shadow-green-900/20">
                <h3 className="text-xl font-bold mb-3">Support Our Work</h3>
                <p className="text-sm text-green-100/80 mb-6 leading-relaxed">
                    Your contribution helps us create more impact stories across Pakistan.
                </p>
                <Link
                    href="/donate"
                    className="block text-center py-3 bg-white text-[#1F6F3D] rounded-xl font-bold text-sm hover:bg-gray-50 transition-colors shadow-lg shadow-black/10"
                >
                    Donate Now
                </Link>
            </div>
        </aside>
    );
}
