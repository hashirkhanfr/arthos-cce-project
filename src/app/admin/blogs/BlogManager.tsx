"use client";

import { useState, useEffect } from "react";
import { Plus, Edit, Trash2, Eye, EyeOff, X, Image as ImageIcon } from "lucide-react";
import RichTextEditor from "@/components/blogs/RichTextEditor";
import Button from "@/components/Button";
import FormInput from "@/components/FormInput";

interface Blog {
  _id: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  author: string;
  category: string;
  published: boolean;
  createdAt: string;
}

export default function BlogManager() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingBlog, setEditingBlog] = useState<Partial<Blog> | null>(null);
  const [showEditor, setShowEditor] = useState(false);

  useEffect(() => {
    fetchBlogs();
  }, []);

  async function fetchBlogs() {
    setLoading(true);
    try {
      const res = await fetch("/api/blogs");
      if (res.ok) {
        const data = await res.json();
        setBlogs(data);
      }
    } catch (error) {
      console.error("Failed to fetch blogs", error);
    }
    setLoading(false);
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingBlog) return;

    const method = editingBlog._id ? "PATCH" : "POST";
    const url = editingBlog._id ? `/api/blogs/${editingBlog._id}` : "/api/blogs";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingBlog),
      });

      if (res.ok) {
        fetchBlogs();
        setShowEditor(false);
        setEditingBlog(null);
      } else {
        const err = await res.json();
        alert(err.message || "Failed to save blog");
      }
    } catch (error) {
      console.error("Save error", error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this blog post permanently?")) return;
    try {
      const res = await fetch(`/api/blogs/${id}`, { method: "DELETE" });
      if (res.ok) fetchBlogs();
    } catch (error) {
      console.error("Delete error", error);
    }
  };

  if (loading && blogs.length === 0) return <div className="p-8">Loading blogs...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-900">Blog Posts</h2>
        <Button onClick={() => { setEditingBlog({ published: false, author: "Admin", category: "General" }); setShowEditor(true); }}>
          <Plus size={18} className="mr-2" /> New Post
        </Button>
      </div>

      {/* Blog List */}
      <div className="grid grid-cols-1 gap-4">
        {blogs.map((blog) => (
          <div key={blog._id} className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-xl bg-gray-100 overflow-hidden shrink-0 border border-gray-100">
                {blog.coverImage ? (
                  <img src={blog.coverImage} alt="" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    <ImageIcon size={20} />
                  </div>
                )}
              </div>
              <div>
                <h3 className="font-bold text-gray-900 leading-snug">{blog.title}</h3>
                <div className="flex items-center gap-3 mt-1 text-xs text-gray-500">
                  <span>{blog.category}</span>
                  <span>•</span>
                  <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
                  <span>•</span>
                  <span className={`flex items-center gap-1 ${blog.published ? "text-green-600" : "text-amber-600"}`}>
                    {blog.published ? <Eye size={12} /> : <EyeOff size={12} />}
                    {blog.published ? "Published" : "Draft"}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => { setEditingBlog(blog); setShowEditor(true); }} className="p-2 text-gray-400 hover:text-[#1F6F3D] hover:bg-gray-50 rounded-lg transition-colors">
                <Edit size={18} />
              </button>
              <button onClick={() => handleDelete(blog._id)} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Editor Modal */}
      {showEditor && editingBlog && (
        <div className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-5xl max-h-[95vh] rounded-3xl shadow-2xl flex flex-col overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between shrink-0">
              <h3 className="text-xl font-bold text-gray-900">{editingBlog._id ? "Edit Post" : "Create New Post"}</h3>
              <button onClick={() => setShowEditor(false)} className="p-2 text-gray-400 hover:text-gray-600">
                <X size={24} />
              </button>
            </div>
            
            <form onSubmit={handleSave} className="flex-1 overflow-y-auto p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <FormInput
                    id="blog-title"
                    name="title"
                    label="Title"
                    value={editingBlog.title || ""}
                    onChange={(e) => setEditingBlog({ ...editingBlog, title: e.target.value })}
                    required
                  />
                  <FormInput
                    id="blog-cover-image"
                    name="coverImage"
                    label="Cover Image URL"
                    value={editingBlog.coverImage || ""}
                    onChange={(e) => setEditingBlog({ ...editingBlog, coverImage: e.target.value })}
                    required
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <FormInput
                      id="blog-author"
                      name="author"
                      label="Author"
                      value={editingBlog.author || ""}
                      onChange={(e) => setEditingBlog({ ...editingBlog, author: e.target.value })}
                      required
                    />
                    <FormInput
                      id="blog-category"
                      name="category"
                      label="Category"
                      value={editingBlog.category || ""}
                      onChange={(e) => setEditingBlog({ ...editingBlog, category: e.target.value })}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium text-gray-700">Excerpt</label>
                    <textarea
                      className="w-full h-[124px] px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1F6F3D]/20 focus:border-[#1F6F3D] transition-all resize-none"
                      value={editingBlog.excerpt || ""}
                      onChange={(e) => setEditingBlog({ ...editingBlog, excerpt: e.target.value })}
                      required
                    />
                  </div>
                  <div className="flex items-center gap-2 pt-2">
                    <input
                      type="checkbox"
                      id="published"
                      checked={editingBlog.published || false}
                      onChange={(e) => setEditingBlog({ ...editingBlog, published: e.target.checked })}
                      className="w-4 h-4 rounded border-gray-300 text-[#1F6F3D] focus:ring-[#1F6F3D]"
                    />
                    <label htmlFor="published" className="text-sm font-medium text-gray-700">Publish immediately</label>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Content</label>
                <RichTextEditor 
                  content={editingBlog.content || ""} 
                  onChange={(html: string) => setEditingBlog({ ...editingBlog, content: html })} 
                />
              </div>

              <div className="pt-4 flex justify-end gap-3 shrink-0">
                <Button type="button" variant="outline" onClick={() => setShowEditor(false)}>Cancel</Button>
                <Button type="submit">Save Post</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
