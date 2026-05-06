import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { Users } from "lucide-react";
import DataTable from "../components/DataTable";

export const metadata: Metadata = { title: "Manage Volunteers | Admin" };

export default async function VolunteersPage() {
  const session = await auth();
  if (!session) redirect("/admin/login");

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3">
        <Users size={24} className="text-[#1F6F3D]" />
        <h1 className="text-2xl font-bold text-gray-900" style={{ fontFamily: "Outfit, sans-serif" }}>
          Volunteers
        </h1>
      </div>
      <DataTable endpoint="volunteer" title="Volunteer Applications" />
    </div>
  );
}
