import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { BookOpen } from "lucide-react";

export const metadata: Metadata = { title: "Manage Blogs | Admin" };

export default async function AdminBlogsPage() {
  const session = await auth();
  if (!session) redirect("/admin/login");

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <BookOpen size={24} className="text-[#1F6F3D]" />
          <h1 className="text-2xl font-bold text-gray-900" style={{ fontFamily: "Outfit, sans-serif" }}>
            Manage Blogs
          </h1>
        </div>
        <p className="text-gray-500">Blog management interface — connect to API to list, create, and delete posts.</p>
      </div>
    </div>
  );
}
