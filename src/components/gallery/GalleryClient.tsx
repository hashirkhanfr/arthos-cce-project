'use client';

import { useState, type MouseEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Maximize2, ChevronLeft, ChevronRight } from 'lucide-react';

type GalleryImage = {
    url: string;
    public_id: string;
};

type GalleryCollection = {
    _id: string;
    title: string;
    description?: string;
    images: GalleryImage[];
    status: 'draft' | 'published';
};

interface GalleryClientProps {
    collections: GalleryCollection[];
}

export default function GalleryClient({ collections }: GalleryClientProps) {
    const [selectedCollection, setSelectedCollection] = useState<GalleryCollection | null>(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    const openLightbox = (collection: GalleryCollection) => {
        setSelectedCollection(collection);
        setCurrentIndex(0);
        document.body.style.overflow = 'hidden';
    };

    const closeLightbox = () => {
        setSelectedCollection(null);
        document.body.style.overflow = 'auto';
    };

    const nextImage = (e: MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        if (!selectedCollection) return;
        setCurrentIndex((prev) => (prev + 1) % selectedCollection.images.length);
    };

    const prevImage = (e: MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        if (!selectedCollection) return;
        setCurrentIndex((prev) => (prev - 1 + selectedCollection.images.length) % selectedCollection.images.length);
    };

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {collections.map((collection, idx) => (
                    <motion.div
                        key={collection._id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: idx * 0.1 }}
                        viewport={{ once: true }}
                        onClick={() => openLightbox(collection)}
                        className="group cursor-pointer"
                    >
                        <div className="aspect-square relative overflow-hidden rounded-3xl bg-gray-200 mb-6">
                            {collection.images[0] && (
                                <img
                                    src={collection.images[0].url}
                                    alt={collection.title}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                />
                            )}
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center">
                                <div className="p-4 bg-white/20 backdrop-blur-md rounded-full border border-white/30 transform scale-75 group-hover:scale-100 transition-transform duration-500">
                                    <Maximize2 className="w-6 h-6 text-white" />
                                </div>
                            </div>
                            <div className="absolute bottom-6 left-6 right-6 p-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                                <p className="text-white text-xs font-black uppercase tracking-widest">
                                    {collection.images.length} Moments
                                </p>
                            </div>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-[#1F6F3D] transition-colors">
                            {collection.title}
                        </h3>
                        <p className="text-gray-500 line-clamp-2 text-sm leading-relaxed">
                            {collection.description}
                        </p>
                    </motion.div>
                ))}
            </div>

            {/* Lightbox */}
            <AnimatePresence>
                {selectedCollection && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center p-4 md:p-10"
                        onClick={closeLightbox}
                    >
                        {/* Header */}
                        <div className="absolute top-0 left-0 right-0 p-6 flex items-center justify-between z-10">
                            <div className="text-white">
                                <h2 className="text-2xl font-bold">{selectedCollection.title}</h2>
                                <p className="text-sm text-gray-400">Image {currentIndex + 1} of {selectedCollection.images.length}</p>
                            </div>
                            <button
                                onClick={closeLightbox}
                                className="p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors border border-white/10"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Navigation */}
                        {selectedCollection.images.length > 1 && (
                            <>
                                <button
                                    onClick={prevImage}
                                    className="absolute left-4 md:left-10 p-4 bg-white/5 hover:bg-white/10 rounded-full text-white transition-colors z-10 border border-white/5"
                                >
                                    <ChevronLeft className="w-8 h-8" />
                                </button>
                                <button
                                    onClick={nextImage}
                                    className="absolute right-4 md:right-10 p-4 bg-white/5 hover:bg-white/10 rounded-full text-white transition-colors z-10 border border-white/5"
                                >
                                    <ChevronRight className="w-8 h-8" />
                                </button>
                            </>
                        )}

                        {/* Image */}
                        <motion.div
                            key={currentIndex}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="relative max-w-5xl w-full aspect-[4/3] md:aspect-auto md:max-h-[70vh] flex items-center justify-center"
                        >
                            <img
                                src={selectedCollection.images[currentIndex].url}
                                alt=""
                                className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                                onClick={(e) => e.stopPropagation()}
                            />
                        </motion.div>

                        {/* Description */}
                        <div className="absolute bottom-0 left-0 right-0 p-8 text-center bg-gradient-to-t from-black to-transparent">
                            <p className="text-gray-300 max-w-2xl mx-auto text-sm md:text-base italic">
                                "{selectedCollection.description}"
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
