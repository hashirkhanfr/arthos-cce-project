import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { BookOpen } from "lucide-react";
import DataTable from "../components/DataTable";

export const metadata: Metadata = { title: "Book Donations | Admin" };

export default async function BookDonationsPage() {
  const session = await auth();
  if (!session) redirect("/admin/login");

  return (
    <div className="p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <BookOpen size={24} className="text-[#1F6F3D]" />
          <h1 className="text-2xl font-bold text-gray-900" style={{ fontFamily: "Outfit, sans-serif" }}>
            Book Donations
          </h1>
        </div>
        <DataTable endpoint="book-donation" title="Book Donation Requests" />
      </div>
    </div>
  );
}
