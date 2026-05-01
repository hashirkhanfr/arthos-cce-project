export const galleryAPI = {
    async getAll() {
        const res = await fetch('/api/gallery');
        const data = await res.json();
        if (!data.success) throw new Error(data.error);
        return data.data;
    },

    async getById(id) {
        const res = await fetch(`/api/gallery/${id}`);
        const data = await res.json();
        if (!data.success) throw new Error(data.error);
        return data.data;
    },

    async create(collectionData) {
        const res = await fetch('/api/gallery', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(collectionData),
        });
        const data = await res.json();
        if (!data.success) throw new Error(data.error);
        return data.data;
    },

    async update(id, collectionData) {
        const res = await fetch(`/api/gallery/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(collectionData),
        });
        const data = await res.json();
        if (!data.success) throw new Error(data.error);
        return data.data;
    },

    async delete(id) {
        const res = await fetch(`/api/gallery/${id}`, {
            method: 'DELETE',
        });
        const data = await res.json();
        if (!data.success) throw new Error(data.error);
        return data;
    },

    async uploadImages(files) {
        const uploadedImages = [];
        for (const file of files) {
            const base64 = await this.imageToBase64(file);
            const res = await fetch('/api/upload', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ image: base64, folder: 'gallery' }),
            });
            const data = await res.json();
            if (data.success) {
                uploadedImages.push({ url: data.url, public_id: data.public_id });
            }
        }
        return uploadedImages;
    },

    imageToBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });
    },
};
