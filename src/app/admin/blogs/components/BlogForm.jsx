'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { blogsAPI } from '@/lib/api/blogs';
import RichTextEditor from '@/components/blogs/RichTextEditor';
import { ArrowLeft, Save, Eye, Trash2, Image as ImageIcon, X } from 'lucide-react';
import Link from 'next/link';
import toast from 'react-hot-toast';

export default function BlogForm({ initialData = null, isEdit = false }) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        slug: '',
        content: '',
        excerpt: '',
        featuredImage: '',
        status: 'draft',
        seo: {
            metaTitle: '',
            metaDescription: '',
            keywords: [],
            ogImage: '',
        },
    });
    const [keywordInput, setKeywordInput] = useState('');

    useEffect(() => {
        if (initialData) {
            setFormData({
                title: initialData.title || '',
                slug: initialData.slug || '',
                content: initialData.content || '',
                excerpt: initialData.excerpt || '',
                featuredImage: initialData.featuredImage || '',
                status: initialData.status || 'draft',
                seo: {
                    metaTitle: initialData.seo?.metaTitle || '',
                    metaDescription: initialData.seo?.metaDescription || '',
                    keywords: initialData.seo?.keywords || [],
                    ogImage: initialData.seo?.ogImage || '',
                },
            });
        }
    }, [initialData]);

    const handleChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value,
        }));

        // Auto-generate slug when title changes in create mode
        if (!isEdit && field === 'title' && !formData.slug) {
            setFormData(prev => ({
                ...prev,
                slug: blogsAPI.generateSlug(value),
            }));
        }
    };

    const handleSEOChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            seo: {
                ...prev.seo,
                [field]: value,
            },
        }));
    };

    const addKeyword = () => {
        if (keywordInput.trim() && !formData.seo.keywords.includes(keywordInput.trim())) {
            setFormData(prev => ({
                ...prev,
                seo: {
                    ...prev.seo,
                    keywords: [...prev.seo.keywords, keywordInput.trim()],
                },
            }));
            setKeywordInput('');
        }
    };

    const removeKeyword = (index) => {
        setFormData(prev => ({
            ...prev,
            seo: {
                ...prev.seo,
                keywords: prev.seo.keywords.filter((_, i) => i !== index),
            },
        }));
    };

    const handleImageUpload = async (file, field) => {
        if (!file) return;
        try {
            const base64 = await blogsAPI.imageToBase64(file);
            if (field.startsWith('seo.')) {
                handleSEOChange(field.split('.')[1], base64);
            } else {
                handleChange(field, base64);
            }
            toast.success('Image uploaded successfully');
        } catch (error) {
            toast.error('Failed to upload image');
        }
    };

    const handleSubmit = async (status) => {
        try {
            setLoading(true);
            const blogData = { ...formData, status };

            if (isEdit) {
                await blogsAPI.update(initialData._id, blogData);
                toast.success('Blog updated successfully');
            } else {
                await blogsAPI.create(blogData);
                toast.success('Blog created successfully');
            }
            
            router.push('/admin/blogs');
        } catch (error) {
            toast.error(error.message || 'Failed to save blog');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        if (!confirm('Are you sure you want to delete this blog? This action cannot be undone.')) return;

        try {
            setLoading(true);
            await blogsAPI.delete(initialData._id);
            toast.success('Blog deleted successfully');
            router.push('/admin/blogs');
        } catch (error) {
            toast.error(error.message || 'Failed to delete blog');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-5xl mx-auto">
            {/* Header */}
            <div className="mb-8 flex items-center justify-between sticky top-0 z-20 bg-gray-50/80 backdrop-blur-md py-4 -mx-4 px-4 sm:mx-0 sm:px-0">
                <div className="flex items-center gap-4">
                    <Link href="/admin/blogs" className="p-2 hover:bg-gray-200 rounded-lg transition-colors">
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">{isEdit ? 'Edit Blog' : 'Create New Blog'}</h1>
                        <p className="text-sm text-gray-500 hidden sm:block">
                            {isEdit ? `Editing: ${formData.title}` : 'Draft your next story'}
                        </p>
                    </div>
                </div>
                <div className="flex gap-2 sm:gap-3">
                    {isEdit && (
                        <button
                            onClick={handleDelete}
                            disabled={loading}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors border border-transparent hover:border-red-100"
                            title="Delete Blog"
                        >
                            <Trash2 className="w-5 h-5" />
                        </button>
                    )}
                    <button
                        onClick={() => handleSubmit('draft')}
                        disabled={loading || !formData.title}
                        className="px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 flex items-center gap-2 font-medium"
                    >
                        <Save className="w-4 h-4" />
                        <span className="hidden sm:inline">Save Draft</span>
                    </button>
                    <button
                        onClick={() => handleSubmit('published')}
                        disabled={loading || !formData.title || !formData.content}
                        className="px-4 py-2 bg-[#1F6F3D] text-white rounded-lg hover:bg-[#14532D] disabled:opacity-50 flex items-center gap-2 font-medium shadow-sm shadow-green-900/10"
                    >
                        <Eye className="w-4 h-4" />
                        <span>{formData.status === 'published' ? 'Update' : 'Publish'}</span>
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Title & Slug */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-4">
                        <div>
                            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                                Title
                            </label>
                            <input
                                type="text"
                                value={formData.title}
                                onChange={(e) => handleChange('title', e.target.value)}
                                placeholder="Enter a catchy title..."
                                className="w-full px-4 py-3 text-xl font-bold border-0 focus:ring-0 placeholder:text-gray-200"
                                required
                            />
                        </div>
                        <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-lg border border-gray-100">
                            <span className="text-gray-400 text-sm shrink-0">slug:</span>
                            <input
                                type="text"
                                value={formData.slug}
                                onChange={(e) => handleChange('slug', e.target.value)}
                                placeholder="auto-generated-slug"
                                className="w-full bg-transparent border-0 focus:ring-0 text-sm text-blue-600 font-mono"
                            />
                        </div>
                    </div>

                    {/* Content Editor */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-50 bg-gray-50/50">
                            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider">
                                Article Content
                            </label>
                        </div>
                        <RichTextEditor
                            content={formData.content}
                            onChange={(content) => handleChange('content', content)}
                            placeholder="Tell your story..."
                        />
                    </div>

                    {/* Excerpt */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
                            Excerpt
                        </label>
                        <textarea
                            value={formData.excerpt}
                            onChange={(e) => handleChange('excerpt', e.target.value)}
                            placeholder="A brief summary for the blog cards..."
                            rows={3}
                            className="w-full px-4 py-3 bg-gray-50 border-0 rounded-xl focus:ring-2 focus:ring-[#1F6F3D]/20 transition-all resize-none"
                        />
                    </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    {/* Featured Image */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">
                            Featured Image
                        </label>
                        <div 
                            className={`relative aspect-[16/10] rounded-xl border-2 border-dashed border-gray-100 overflow-hidden group transition-all ${
                                !formData.featuredImage ? 'hover:border-[#1F6F3D]/30 hover:bg-green-50/30' : ''
                            }`}
                        >
                            {formData.featuredImage ? (
                                <>
                                    <img src={formData.featuredImage} alt="Featured" className="w-full h-full object-cover" />
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                        <button 
                                            type="button"
                                            onClick={() => handleChange('featuredImage', '')}
                                            className="p-2 bg-red-600 text-white rounded-full hover:scale-110 transition-transform"
                                        >
                                            <X className="w-4 h-4" />
                                        </button>
                                    </div>
                                </>
                            ) : (
                                <label className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer">
                                    <ImageIcon className="w-8 h-8 text-gray-300 mb-2" />
                                    <span className="text-xs text-gray-400 font-medium">Click to upload</span>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => handleImageUpload(e.target.files[0], 'featuredImage')}
                                        className="hidden"
                                    />
                                </label>
                            )}
                        </div>
                    </div>

                    {/* SEO Settings */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-6">
                        <div className="flex items-center justify-between">
                            <h3 className="text-xs font-bold text-gray-900 uppercase tracking-widest">SEO Settings</h3>
                            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                        </div>
                        
                        <div className="space-y-4">
                            <div>
                                <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1.5">Meta Title</label>
                                <input
                                    type="text"
                                    value={formData.seo.metaTitle}
                                    onChange={(e) => handleSEOChange('metaTitle', e.target.value)}
                                    placeholder="SEO title (60 chars)"
                                    maxLength={60}
                                    className="w-full px-3 py-2 bg-gray-50 border-0 rounded-lg focus:ring-1 focus:ring-[#1F6F3D] text-sm"
                                />
                                <div className="mt-1 flex justify-end">
                                    <span className={`text-[10px] ${formData.seo.metaTitle.length > 50 ? 'text-orange-500' : 'text-gray-400'}`}>
                                        {formData.seo.metaTitle.length}/60
                                    </span>
                                </div>
                            </div>

                            <div>
                                <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1.5">Meta Description</label>
                                <textarea
                                    value={formData.seo.metaDescription}
                                    onChange={(e) => handleSEOChange('metaDescription', e.target.value)}
                                    placeholder="SEO description (160 chars)"
                                    maxLength={160}
                                    rows={3}
                                    className="w-full px-3 py-2 bg-gray-50 border-0 rounded-lg focus:ring-1 focus:ring-[#1F6F3D] text-sm resize-none"
                                />
                                <div className="mt-1 flex justify-end">
                                    <span className={`text-[10px] ${formData.seo.metaDescription.length > 140 ? 'text-orange-500' : 'text-gray-400'}`}>
                                        {formData.seo.metaDescription.length}/160
                                    </span>
                                </div>
                            </div>

                            <div>
                                <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1.5">Keywords</label>
                                <div className="flex gap-1.5">
                                    <input
                                        type="text"
                                        value={keywordInput}
                                        onChange={(e) => setKeywordInput(e.target.value)}
                                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addKeyword())}
                                        placeholder="Add keyword..."
                                        className="flex-1 px-3 py-2 bg-gray-50 border-0 rounded-lg focus:ring-1 focus:ring-[#1F6F3D] text-sm"
                                    />
                                    <button
                                        type="button"
                                        onClick={addKeyword}
                                        className="px-3 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 text-xs font-bold"
                                    >
                                        Add
                                    </button>
                                </div>
                                <div className="flex flex-wrap gap-1.5 mt-3">
                                    {formData.seo.keywords.map((keyword, index) => (
                                        <span
                                            key={index}
                                            className="bg-[#1F6F3D]/5 text-[#1F6F3D] px-2 py-1 rounded-md text-[10px] font-bold flex items-center gap-1.5"
                                        >
                                            {keyword}
                                            <button type="button" onClick={() => removeKeyword(index)} className="hover:text-red-600 transition-colors">
                                                <X className="w-3 h-3" />
                                            </button>
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
