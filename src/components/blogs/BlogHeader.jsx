'use client';

import { motion } from 'framer-motion';
import { Calendar, Clock, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function BlogHeader({ blog }) {
    const formatDate = (date) => {
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    return (
        <div 
            className="relative bg-gradient-to-r from-blue-600 to-blue-700 text-white pt-32 pb-16 px-6 overflow-hidden"
            style={blog.featuredImage ? {
                backgroundImage: `linear-gradient(rgba(37, 99, 235, 0.85), rgba(29, 78, 216, 0.85)), url(${blog.featuredImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            } : {}}
        >
            <div className="max-w-7xl mx-auto relative z-10">
                <Link
                    href="/blogs"
                    className="inline-flex items-center gap-2 text-blue-100 hover:text-white mb-6 transition-colors font-medium text-sm"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to all stories
                </Link>
                
                <motion.h1
                    className="text-4xl md:text-5xl lg:text-6xl font-black mb-8 leading-tight max-w-4xl"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    style={{ fontFamily: 'Outfit, sans-serif' }}
                >
                    {blog.title}
                </motion.h1>

                <motion.div
                    className="flex flex-wrap items-center gap-6 text-blue-100 font-medium"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <span className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
                        <Calendar className="w-4 h-4" />
                        {formatDate(blog.publishedAt)}
                    </span>
                    <span className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
                        <Clock className="w-4 h-4" />
                        {blog.readTime} min read
                    </span>
                    {blog.author && (
                        <span className="px-2">by <strong className="text-white underline decoration-blue-400 underline-offset-4">{blog.author.name}</strong></span>
                    )}
                </motion.div>
            </div>
            
            {/* Aesthetic Wave Decor */}
            <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] transform rotate-180 opacity-20">
                <svg className="relative block w-[calc(100%+1.3px)] h-[80px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                    <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="#FFFFFF"></path>
                </svg>
            </div>
        </div>
    );
}
