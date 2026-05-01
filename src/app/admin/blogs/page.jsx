'use client';

import { useState, useEffect } from 'react';
import { blogsAPI } from '@/lib/api/blogs';
import Link from 'next/link';
import { Plus, LayoutGrid, List } from 'lucide-react';
import toast from 'react-hot-toast';
import BlogCard from './components/BlogCard';
import BlogFilters from './components/BlogFilters';

export default function AdminBlogsPage() {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        loadBlogs();
    }, []);

    const loadBlogs = async () => {
        try {
            setLoading(true);
            const data = await blogsAPI.getAllAdmin();
            setBlogs(data);
        } catch (error) {
            toast.error('Failed to load blogs');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!confirm('Are you sure you want to delete this blog?')) return;
        try {
            await blogsAPI.delete(id);
            toast.success('Blog deleted successfully');
            loadBlogs();
        } catch (error) {
            toast.error('Failed to delete blog');
        }
    };

    const counts = {
        all: blogs.length,
        published: blogs.filter(b => b.status === 'published').length,
        draft: blogs.filter(b => b.status === 'draft').length
    };

    const filteredBlogs = blogs.filter(blog => {
        if (filter === 'all') return true;
        return blog.status === filter;
    });

    if (loading) {
        return (
            <div className="min-h-[400px] flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#1F6F3D]"></div>
                    <p className="text-gray-400 text-sm font-medium animate-pulse">Loading articles...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto py-6">
            {/* Header */}
            <div className="mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-black text-gray-900 tracking-tight mb-2">Editorial</h1>
                    <p className="text-gray-400 font-medium tracking-wide uppercase text-[10px]">Manage your blog and news articles</p>
                </div>
                <Link
                    href="/admin/blogs/create"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-[#1F6F3D] text-white rounded-2xl hover:bg-[#14532D] transition-all font-bold text-sm shadow-xl shadow-green-900/10 hover:-translate-y-0.5"
                >
                    <Plus className="w-5 h-5" />
                    New Article
                </Link>
            </div>

            {/* Dashboard Stats / Filters */}
            <BlogFilters 
                currentFilter={filter} 
                onFilterChange={setFilter} 
                counts={counts} 
            />

            {/* Articles List */}
            {filteredBlogs.length === 0 ? (
                <div className="bg-white rounded-3xl border-2 border-dashed border-gray-100 p-20 text-center">
                    <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                        <LayoutGrid className="w-10 h-10 text-gray-200" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">No articles found</h2>
                    <p className="text-gray-400 max-w-xs mx-auto mb-8">
                        {filter === 'all' 
                            ? "You haven't created any articles yet. Start by writing your first story." 
                            : `There are no articles with the status: ${filter}.`}
                    </p>
                    <Link
                        href="/admin/blogs/create"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-2xl hover:bg-black transition-all font-bold text-sm"
                    >
                        Create Now
                    </Link>
                </div>
            ) : (
                <div className="grid gap-4">
                    {filteredBlogs.map((blog) => (
                        <BlogCard key={blog._id} blog={blog} onDelete={handleDelete} />
                    ))}
                </div>
            )}
        </div>
    );
}
