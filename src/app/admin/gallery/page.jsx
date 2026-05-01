'use client';

import { useState, useEffect } from 'react';
import { galleryAPI } from '@/lib/api/gallery';
import Link from 'next/link';
import { Plus, Image as ImageIcon, Edit, Trash2, LayoutGrid, Calendar } from 'lucide-react';
import toast from 'react-hot-toast';

export default function AdminGalleryPage() {
    const [collections, setCollections] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadCollections();
    }, []);

    const loadCollections = async () => {
        try {
            setLoading(true);
            const data = await galleryAPI.getAll();
            setCollections(data);
        } catch (error) {
            toast.error('Failed to load gallery');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!confirm('Are you sure you want to delete this collection and all its images?')) return;
        try {
            await galleryAPI.delete(id);
            toast.success('Collection deleted');
            loadCollections();
        } catch (error) {
            toast.error('Failed to delete');
        }
    };

    if (loading) {
        return (
            <div className="min-h-[400px] flex items-center justify-center">
                <Loader2 className="w-10 h-10 text-[#1F6F3D] animate-spin" />
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto py-6">
            <div className="flex items-center justify-between mb-10">
                <div>
                    <h1 className="text-4xl font-black text-gray-900 tracking-tight mb-2">Gallery</h1>
                    <p className="text-gray-400 font-medium tracking-wide uppercase text-[10px]">Manage impact collections</p>
                </div>
                <Link
                    href="/admin/gallery/create"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-[#1F6F3D] text-white rounded-2xl hover:bg-[#14532D] transition-all font-bold text-sm shadow-xl shadow-green-900/10 hover:-translate-y-0.5"
                >
                    <Plus className="w-5 h-5" />
                    New Collection
                </Link>
            </div>

            {collections.length === 0 ? (
                <div className="bg-white rounded-3xl border-2 border-dashed border-gray-100 p-20 text-center">
                    <ImageIcon className="w-16 h-16 text-gray-200 mx-auto mb-6" />
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">No collections yet</h2>
                    <p className="text-gray-400 mb-8">Start organizing your impact stories into collections.</p>
                    <Link href="/admin/gallery/create" className="px-6 py-3 bg-gray-900 text-white rounded-xl font-bold">
                        Create First Collection
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {collections.map((collection) => (
                        <div key={collection._id} className="group bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl hover:shadow-gray-200/50 transition-all hover:-translate-y-1">
                            <div className="aspect-[4/3] relative bg-gray-100">
                                {collection.images[0] ? (
                                    <img src={collection.images[0].url} alt="" className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center">
                                        <ImageIcon className="w-8 h-8 text-gray-300" />
                                    </div>
                                )}
                                <div className="absolute top-4 right-4 px-3 py-1 bg-white/90 backdrop-blur-md rounded-full text-[10px] font-black uppercase text-gray-700 shadow-sm border border-white/20">
                                    {collection.images.length} Photos
                                </div>
                            </div>
                            <div className="p-6">
                                <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-1">{collection.title}</h3>
                                <p className="text-sm text-gray-400 line-clamp-2 mb-6 leading-relaxed">
                                    {collection.description || 'No description provided.'}
                                </p>
                                <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                                    <div className="flex items-center gap-2 text-[10px] font-bold text-gray-300 uppercase">
                                        <Calendar className="w-3.5 h-3.5" />
                                        {new Date(collection.createdAt).toLocaleDateString()}
                                    </div>
                                    <div className="flex gap-2">
                                        <Link
                                            href={`/admin/gallery/${collection._id}/edit`}
                                            className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all"
                                        >
                                            <Edit className="w-5 h-5" />
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(collection._id)}
                                            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
                                        >
                                            <Trash2 className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

function Loader2({ className }) {
    return <ImageIcon className={`${className} animate-pulse`} />;
}
