'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { blogsAPI } from '@/lib/api/blogs';
import BlogForm from '../../components/BlogForm';
import toast from 'react-hot-toast';

export default function EditBlogPage() {
    const params = useParams();
    const router = useRouter();
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (params.id) {
            loadBlog();
        }
    }, [params.id]);

    const loadBlog = async () => {
        try {
            setLoading(true);
            const data = await blogsAPI.getById(params.id);
            setBlog(data);
        } catch (error) {
            toast.error('Failed to load blog post');
            router.push('/admin/blogs');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50/50 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1F6F3D]"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50/50 py-8 px-4 sm:px-6">
            <BlogForm initialData={blog} isEdit={true} />
        </div>
    );
}
