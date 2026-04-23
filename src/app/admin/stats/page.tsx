import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { BarChart3 } from "lucide-react";

export const metadata: Metadata = { title: "Manage Stats | Admin" };

export default async function AdminStatsPage() {
  const session = await auth();
  if (!session) redirect("/admin/login");

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <BarChart3 size={24} className="text-[#0891B2]" />
          <h1 className="text-2xl font-bold text-gray-900" style={{ fontFamily: "Outfit, sans-serif" }}>
            Manage Impact Stats
          </h1>
        </div>
        <p className="text-gray-500">Update the impact numbers displayed on the Impact and Home pages.</p>
      </div>
    </div>
  );
}
