'use client';

import { useState, useEffect } from 'react';
import { User, Lock, Save, ShieldCheck, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

export default function ProfilePage() {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        confirmPassword: '',
    });

    useEffect(() => {
        fetch('/api/admin/profile')
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    setFormData(prev => ({ ...prev, username: data.data.username }));
                }
            })
            .finally(() => setLoading(false));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password && formData.password !== formData.confirmPassword) {
            return toast.error('Passwords do not match');
        }

        try {
            setSaving(true);
            const res = await fetch('/api/admin/profile', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username: formData.username,
                    password: formData.password || undefined
                }),
            });
            const data = await res.json();
            if (data.success) {
                toast.success('Profile updated successfully');
                setFormData(prev => ({ ...prev, password: '', confirmPassword: '' }));
            } else {
                throw new Error(data.error);
            }
        } catch (error) {
            toast.error(error.message);
        } finally {
            setSaving(false);
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
        <div className="max-w-4xl mx-auto py-10 px-4">
            <div className="mb-10">
                <h1 className="text-4xl font-black text-gray-900 tracking-tight mb-2">My Profile</h1>
                <p className="text-gray-400 font-medium tracking-wide uppercase text-[10px]">Security & Identity Settings</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 space-y-6">
                            <div>
                                <label className="block text-sm font-bold text-gray-400 uppercase mb-3 flex items-center gap-2">
                                    <User className="w-4 h-4" />
                                    Username
                                </label>
                                <input
                                    type="text"
                                    value={formData.username}
                                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                                    className="w-full px-5 py-4 bg-gray-50 border-0 rounded-2xl focus:ring-2 focus:ring-[#1F6F3D]/20 transition-all font-bold text-gray-900"
                                    required
                                />
                                <p className="mt-2 text-xs text-gray-400">This is your identity for login and blog authorship.</p>
                            </div>

                            <hr className="border-gray-50" />

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-bold text-gray-400 uppercase mb-3 flex items-center gap-2">
                                        <Lock className="w-4 h-4" />
                                        New Password
                                    </label>
                                    <input
                                        type="password"
                                        value={formData.password}
                                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                        placeholder="Leave blank to keep current"
                                        className="w-full px-5 py-4 bg-gray-50 border-0 rounded-2xl focus:ring-2 focus:ring-[#1F6F3D]/20 transition-all font-bold text-gray-900"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-400 uppercase mb-3 flex items-center gap-2">
                                        <ShieldCheck className="w-4 h-4" />
                                        Confirm Password
                                    </label>
                                    <input
                                        type="password"
                                        value={formData.confirmPassword}
                                        onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                        placeholder="Repeat new password"
                                        className="w-full px-5 py-4 bg-gray-50 border-0 rounded-2xl focus:ring-2 focus:ring-[#1F6F3D]/20 transition-all font-bold text-gray-900"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end">
                            <button
                                type="submit"
                                disabled={saving}
                                className="flex items-center gap-3 px-8 py-4 bg-[#1F6F3D] text-white rounded-2xl hover:bg-[#14532D] transition-all font-bold shadow-xl shadow-green-900/10 disabled:opacity-50"
                            >
                                {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                                Update Profile
                            </button>
                        </div>
                    </form>
                </div>

                <div className="space-y-6">
                    <div className="bg-gradient-to-br from-[#1F6F3D] to-[#14532D] p-8 rounded-3xl text-white">
                        <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center mb-6">
                            <ShieldCheck className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold mb-3">Security Tip</h3>
                        <p className="text-green-50/70 text-sm leading-relaxed">
                            Always use a strong password with at least 8 characters, including numbers and special symbols.
                        </p>
                    </div>

                    <div className="bg-white p-8 rounded-3xl border border-gray-100">
                        <h4 className="text-gray-900 font-bold mb-4">Account Status</h4>
                        <div className="flex items-center gap-3 text-sm font-bold text-green-600 bg-green-50 p-4 rounded-2xl">
                            <div className="w-2 h-2 rounded-full bg-green-600 animate-pulse"></div>
                            Verified Administrator
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
