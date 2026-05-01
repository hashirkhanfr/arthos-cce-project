'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { galleryAPI } from '@/lib/api/gallery';
import GalleryForm from '../../components/GalleryForm';
import { Loader2 } from 'lucide-react';

export default function EditGalleryPage() {
    const params = useParams();
    const [collection, setCollection] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (params.id) {
            galleryAPI.getById(params.id)
                .then(setCollection)
                .finally(() => setLoading(false));
        }
    }, [params.id]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="w-10 h-10 text-[#1F6F3D] animate-spin" />
            </div>
        );
    }

    return <GalleryForm initialData={collection} isEdit={true} />;
}
