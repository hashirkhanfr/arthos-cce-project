import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { BookOpen } from "lucide-react";
import { auth } from "@/lib/auth";
import BlogManager from "./BlogManager";

export const metadata: Metadata = { title: "Manage Blogs | Admin" };

export default async function AdminBlogsPage() {
  const session = await auth();
  if (!session) redirect("/admin/login");

  return (
    <div className="p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <BookOpen size={24} className="text-[#1F6F3D]" />
          <h1 className="text-2xl font-bold text-gray-900" style={{ fontFamily: "Outfit, sans-serif" }}>
            Manage Blogs
          </h1>
        </div>
        <BlogManager />
      </div>
    </div>
  );
}
