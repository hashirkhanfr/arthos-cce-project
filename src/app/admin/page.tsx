import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import {
  LayoutDashboard,
  Users,
  BookOpen,
  Image as ImageIcon,
  BarChart3,
  Heart,
  Droplets,
} from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Admin Dashboard | ARTHO'S",
};

const adminLinks = [
  { href: "/admin/blogs", label: "Manage Blogs", icon: BookOpen, color: "#1F6F3D" },
  { href: "/admin/gallery", label: "Manage Gallery", icon: ImageIcon, color: "#C9A86A" },
  { href: "/admin/volunteers", label: "Volunteers", icon: Users, color: "#7C3AED" },
  { href: "/admin/blood-donors", label: "Blood Donors", icon: Droplets, color: "#EF4444" },
  { href: "/admin/book-donations", label: "Book Donations", icon: BookOpen, color: "#3B82F6" },
];

export default async function DashboardPage() {
  const session = await auth();
  if (!session) redirect("/admin/login");

  return (
    <div className="min-h-screen bg-gray-50">


      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="mb-10">
          <h1
            className="text-3xl font-bold text-gray-900"
            style={{ fontFamily: "Outfit, sans-serif" }}
          >
            Welcome back, {session.user?.name}
          </h1>
          <p className="text-gray-500 mt-1">
            Manage your website content from this dashboard.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
          {[
            { label: "Total Volunteers", icon: Users, value: "—" },
            { label: "Blood Donors", icon: Droplets, value: "—" },
            { label: "Blog Posts", icon: BookOpen, value: "—" },
            { label: "Gallery Images", icon: ImageIcon, value: "—" },
          ].map(({ label, icon: Icon, value }) => (
            <div key={label} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
              <Icon size={20} className="text-[#1F6F3D] mb-3" />
              <div className="text-2xl font-bold text-gray-900">{value}</div>
              <div className="text-xs text-gray-500 mt-0.5">{label}</div>
            </div>
          ))}
        </div>

        {/* Admin Actions */}
        <h2 className="text-lg font-bold text-gray-900 mb-5">
          <LayoutDashboard size={18} className="inline mr-2" />
          Quick Actions
        </h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {adminLinks.map(({ href, label, icon: Icon, color }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-4 p-5 bg-white rounded-2xl border border-gray-100 shadow-sm hover:border-[#1F6F3D]/30 hover:shadow-md transition-all"
            >
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: `${color}15` }}
              >
                <Icon size={20} style={{ color }} />
              </div>
              <span className="font-semibold text-gray-800">{label}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
