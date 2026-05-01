'use client';

import { Share2, Send, ExternalLink, MessageCircle, Copy } from 'lucide-react';
import toast from 'react-hot-toast';

export default function BlogShare({ title }) {
    const url = typeof window !== 'undefined' ? window.location.href : '';

    const shareToFacebook = () => {
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank', 'width=600,height=400');
    };

    const shareToX = () => {
        window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`, '_blank', 'width=600,height=400');
    };

    const shareToLinkedIn = () => {
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank', 'width=600,height=400');
    };

    const shareToWhatsApp = () => {
        window.open(`https://wa.me/?text=${encodeURIComponent(title)}%20${encodeURIComponent(url)}`, '_blank');
    };

    const copyLink = async () => {
        try {
            await navigator.clipboard.writeText(url);
            toast.success('Link copied to clipboard!');
        } catch (error) {
            toast.error('Failed to copy link');
        }
    };

    return (
        <div className="mt-12 p-8 bg-gray-50 rounded-3xl border border-gray-100">
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                Share this Story
                <span className="w-10 h-[2px] bg-[#1F6F3D]"></span>
            </h3>
            <div className="flex flex-wrap gap-4">
                <button
                    onClick={shareToFacebook}
                    className="group flex items-center gap-3 px-6 py-3 bg-blue-600 text-white rounded-2xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/10 hover:-translate-y-1"
                >
                    <Share2 className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    <span className="text-sm font-bold">Facebook</span>
                </button>
                <button
                    onClick={shareToX}
                    className="group flex items-center gap-3 px-6 py-3 bg-black text-white rounded-2xl hover:bg-gray-800 transition-all shadow-lg shadow-black/10 hover:-translate-y-1"
                >
                    <Send className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    <span className="text-sm font-bold">X (Twitter)</span>
                </button>
                <button
                    onClick={shareToLinkedIn}
                    className="group flex items-center gap-3 px-6 py-3 bg-[#0077b5] text-white rounded-2xl hover:bg-[#005582] transition-all shadow-lg shadow-blue-700/10 hover:-translate-y-1"
                >
                    <ExternalLink className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    <span className="text-sm font-bold">LinkedIn</span>
                </button>
                <button
                    onClick={shareToWhatsApp}
                    className="group flex items-center gap-3 px-6 py-3 bg-green-600 text-white rounded-2xl hover:bg-green-700 transition-all shadow-lg shadow-green-600/10 hover:-translate-y-1"
                >
                    <MessageCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    <span className="text-sm font-bold">WhatsApp</span>
                </button>
                <button
                    onClick={copyLink}
                    className="group flex items-center gap-3 px-6 py-3 bg-white text-gray-700 border border-gray-200 rounded-2xl hover:bg-gray-50 transition-all hover:-translate-y-1"
                >
                    <Copy className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    <span className="text-sm font-bold">Copy Link</span>
                </button>
            </div>
        </div>
    );
}
