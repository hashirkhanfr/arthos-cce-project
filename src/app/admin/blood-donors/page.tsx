import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { Droplets } from "lucide-react";
import DataTable from "../components/DataTable";

export const metadata: Metadata = { title: "Blood Donors | Admin" };

export default async function BloodDonorsPage() {
  const session = await auth();
  if (!session) redirect("/admin/login");

  return (
    <div className="p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <Droplets size={24} className="text-[#1F6F3D]" />
          <h1 className="text-2xl font-bold text-gray-900" style={{ fontFamily: "Outfit, sans-serif" }}>
            Blood Donors
          </h1>
        </div>
        <DataTable endpoint="blood-donation" title="Blood Donation Registrations" />
      </div>
    </div>
  );
}
