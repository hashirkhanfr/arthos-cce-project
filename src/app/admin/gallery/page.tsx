import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { Image as ImageIcon } from "lucide-react";

export const metadata: Metadata = { title: "Manage Gallery | Admin" };

export default async function AdminGalleryPage() {
  const session = await auth();
  if (!session) redirect("/admin/login");

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <ImageIcon size={24} className="text-[#C9A86A]" />
          <h1 className="text-2xl font-bold text-gray-900" style={{ fontFamily: "Outfit, sans-serif" }}>
            Manage Gallery
          </h1>
        </div>
        <p className="text-gray-500">Gallery management interface — upload images to Cloudinary and display them here.</p>
      </div>
    </div>
  );
}
