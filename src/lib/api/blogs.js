/**
 * Client-side API functions for blogs
 */

const API_BASE = '/api/blogs';

export const blogsAPI = {
    // Get all published blogs (public)
    async getAll() {
        const response = await fetch(API_BASE);
        const data = await response.json();
        if (!data.success) throw new Error(data.error);
        return data.data;
    },

    // Get all blogs including drafts (admin only)
    async getAllAdmin() {
        const response = await fetch(`${API_BASE}/all`, {
            credentials: 'include',
        });
        const data = await response.json();
        if (!data.success) throw new Error(data.error);
        return data.data;
    },

    // Get single blog by slug (public)
    async getBySlug(slug) {
        const response = await fetch(`${API_BASE}/slug/${slug}`);
        const data = await response.json();
        if (!data.success) throw new Error(data.error);
        return data.data;
    },

    // Get single blog by ID (admin only)
    async getById(id) {
        const response = await fetch(`${API_BASE}/${id}`, {
            credentials: 'include',
        });
        const data = await response.json();
        if (!data.success) throw new Error(data.error);
        return data.data;
    },

    // Create blog
    async create(blogData) {
        const response = await fetch(API_BASE, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(blogData),
        });
        const data = await response.json();
        if (!data.success) throw new Error(data.error);
        return data.data;
    },

    // Update blog
    async update(id, blogData) {
        const response = await fetch(`${API_BASE}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(blogData),
        });
        const data = await response.json();
        if (!data.success) throw new Error(data.error);
        return data.data;
    },

    // Delete blog
    async delete(id) {
        const response = await fetch(`${API_BASE}/${id}`, {
            method: 'DELETE',
            credentials: 'include',
        });
        const data = await response.json();
        if (!data.success) throw new Error(data.error);
        return data;
    },

    // Generate slug from title
    generateSlug(title) {
        return title
            .toString()
            .toLowerCase()
            .trim()
            .replace(/\s+/g, '-')
            .replace(/[^\w-]+/g, '')
            .replace(/--+/g, '-')
            .replace(/^-+/, '')
            .replace(/-+$/, '');
    },

    // Helper to convert image file to base64
    imageToBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });
    }
};
