'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { galleryAPI } from '@/lib/api/gallery';
import { ArrowLeft, Save, Plus, X, Image as ImageIcon, Loader2 } from 'lucide-react';
import Link from 'next/link';
import toast from 'react-hot-toast';

export default function GalleryForm({ initialData = null, isEdit = false }) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        images: [],
        status: 'published',
    });

    useEffect(() => {
        if (initialData) {
            setFormData({
                title: initialData.title || '',
                description: initialData.description || '',
                images: initialData.images || [],
                status: initialData.status || 'published',
            });
        }
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileSelect = async (e) => {
        const files = Array.from(e.target.files);
        if (files.length === 0) return;

        try {
            setUploading(true);
            const newImages = await galleryAPI.uploadImages(files);
            setFormData(prev => ({
                ...prev,
                images: [...prev.images, ...newImages]
            }));
            toast.success(`${newImages.length} images uploaded`);
        } catch (error) {
            toast.error('Failed to upload images');
        } finally {
            setUploading(false);
        }
    };

    const removeImage = (index) => {
        setFormData(prev => ({
            ...prev,
            images: prev.images.filter((_, i) => i !== index)
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.images.length === 0) {
            return toast.error('Please upload at least one image');
        }

        try {
            setLoading(true);
            if (isEdit) {
                await galleryAPI.update(initialData._id, formData);
                toast.success('Collection updated');
            } else {
                await galleryAPI.create(formData);
                toast.success('Collection created');
            }
            router.push('/admin/gallery');
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto py-8 px-4">
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                    <Link href="/admin/gallery" className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                        <ArrowLeft className="w-6 h-6 text-gray-600" />
                    </Link>
                    <h1 className="text-3xl font-bold text-gray-900">
                        {isEdit ? 'Edit Collection' : 'New Collection'}
                    </h1>
                </div>
                <button
                    type="submit"
                    disabled={loading || uploading}
                    className="flex items-center gap-2 px-6 py-3 bg-[#1F6F3D] text-white rounded-xl hover:bg-[#14532D] transition-all font-bold disabled:opacity-50"
                >
                    {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                    Save Collection
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2 space-y-6">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-4">
                        <div>
                            <label className="block text-sm font-bold text-gray-400 uppercase mb-2">Collection Title</label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                required
                                placeholder="e.g., Flood Relief 2024"
                                className="w-full px-4 py-3 bg-gray-50 border-0 rounded-xl focus:ring-2 focus:ring-[#1F6F3D]/20 transition-all font-medium"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-400 uppercase mb-2">Description</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                rows={4}
                                placeholder="Describe the impact or story behind these pictures..."
                                className="w-full px-4 py-3 bg-gray-50 border-0 rounded-xl focus:ring-2 focus:ring-[#1F6F3D]/20 transition-all resize-none"
                            />
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <div className="flex items-center justify-between mb-6">
                            <label className="block text-sm font-bold text-gray-400 uppercase">Images ({formData.images.length})</label>
                            <label className="cursor-pointer flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-bold">
                                <Plus className="w-4 h-4" />
                                Add Photos
                                <input
                                    type="file"
                                    multiple
                                    accept="image/*"
                                    onChange={handleFileSelect}
                                    className="hidden"
                                />
                            </label>
                        </div>

                        {uploading && (
                            <div className="flex flex-col items-center justify-center py-12 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-100 mb-6">
                                <Loader2 className="w-8 h-8 text-[#1F6F3D] animate-spin mb-2" />
                                <p className="text-gray-500 font-medium">Uploading your memories...</p>
                            </div>
                        )}

                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                            {formData.images.map((img, index) => (
                                <div key={index} className="relative aspect-square group rounded-xl overflow-hidden border border-gray-100">
                                    <img src={img.url} alt="" className="w-full h-full object-cover" />
                                    <button
                                        type="button"
                                        onClick={() => removeImage(index)}
                                        className="absolute top-2 right-2 p-1.5 bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                </div>
                            ))}
                            {!uploading && formData.images.length === 0 && (
                                <div className="col-span-full py-12 flex flex-col items-center justify-center text-gray-400">
                                    <ImageIcon className="w-12 h-12 mb-2 opacity-20" />
                                    <p className="text-sm">No images uploaded yet</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-4">Settings</h3>
                        <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Visibility</label>
                        <select
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            className="w-full px-4 py-2 bg-gray-50 border-0 rounded-lg focus:ring-1 focus:ring-[#1F6F3D] text-sm font-bold"
                        >
                            <option value="published">Published (Visible)</option>
                            <option value="draft">Draft (Hidden)</option>
                        </select>
                    </div>

                    <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100">
                        <h4 className="text-blue-900 font-bold text-sm mb-2">Pro Tip</h4>
                        <p className="text-blue-700 text-xs leading-relaxed">
                            Upload high-quality images but keep them under 5MB each. You can re-order images by removing and re-adding them in order.
                        </p>
                    </div>
                </div>
            </div>
        </form>
    );
}
