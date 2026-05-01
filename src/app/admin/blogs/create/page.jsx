'use client';

import BlogForm from '../components/BlogForm';

export default function CreateBlogPage() {
    return (
        <div className="min-h-screen bg-gray-50/50 py-8 px-4 sm:px-6">
            <BlogForm isEdit={false} />
        </div>
    );
}
