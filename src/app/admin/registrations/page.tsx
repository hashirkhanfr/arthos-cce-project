import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { ClipboardList } from "lucide-react";

export const metadata: Metadata = { title: "View Registrations | Admin" };

export default async function AdminRegistrationsPage() {
  const session = await auth();
  if (!session) redirect("/admin/login");

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <ClipboardList size={24} className="text-[#7C3AED]" />
          <h1 className="text-2xl font-bold text-gray-900" style={{ fontFamily: "Outfit, sans-serif" }}>
            Registrations
          </h1>
        </div>
        <p className="text-gray-500">
          View all volunteer, blood donor, and book donation registrations from this panel.
        </p>
      </div>
    </div>
  );
}
