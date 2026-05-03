'use client';

import Link from 'next/link';
import { Calendar, Clock, Edit, Trash2, Eye, User as UserIcon } from 'lucide-react';

export default function BlogCard({ blog, onDelete }) {
    const formatDate = (date) => {
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    return (
        <div className="group bg-white rounded-2xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-all">
            <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                        <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${
                            blog.status === 'published'
                                ? 'bg-green-100 text-green-700'
                                : 'bg-yellow-100 text-yellow-700'
                        }`}>
                            {blog.status}
                        </span>
                        <h3 className="text-lg font-bold text-gray-900 group-hover:text-[#1F6F3D] transition-colors truncate">
                            {blog.title}
                        </h3>
                    </div>
                    
                    <p className="text-gray-500 text-sm line-clamp-2 mb-4 leading-relaxed">
                        {blog.excerpt || 'No excerpt provided.'}
                    </p>
                    
                    <div className="flex flex-wrap items-center gap-4 text-[11px] font-medium text-gray-400">
                        <span className="flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5" />
                            {formatDate(blog.publishedAt || blog.createdAt)}
                        </span>
                        <span className="flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5" />
                            {blog.readTime} min read
                        </span>
                        {blog.author && (
                            <span className="flex items-center gap-1.5">
                                <UserIcon className="w-3.5 h-3.5" />
                                {blog.author.username}
                            </span>
                        )}
                    </div>
                </div>

                <div className="flex gap-2 shrink-0 self-end sm:self-start">
                    {blog.status === 'published' && (
                        <Link
                            href={`/blogs/${blog.slug}`}
                            target="_blank"
                            className="p-2 text-gray-400 hover:text-[#1F6F3D] hover:bg-[#1F6F3D]/5 rounded-xl transition-all"
                            title="View Publicly"
                        >
                            <Eye className="w-5 h-5" />
                        </Link>
                    )}
                    <Link
                        href={`/admin/blogs/${blog._id}/edit`}
                        className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all"
                        title="Edit Article"
                    >
                        <Edit className="w-5 h-5" />
                    </Link>
                    <button
                        onClick={() => onDelete(blog._id)}
                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
                        title="Delete Article"
                    >
                        <Trash2 className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    );
}
