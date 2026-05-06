import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import {
  LayoutDashboard,
  Users,
  BookOpen,
  Image as ImageIcon,
  Heart,
  Droplets,
} from "lucide-react";
import Link from "next/link";
import { connectDB } from "@/lib/mongodb";
import Volunteer from "@/models/Volunteer";
import BloodDonor from "@/models/BloodDonor";
import Blog from "@/models/Blog";
import GalleryCollection from "@/models/GalleryCollection";
import BookDonation from "@/models/BookDonation";

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

  await connectDB();
  
  let stats = {
    volunteers: 0,
    donors: 0,
    blogs: 0,
    galleryImages: 0,
    bookDonations: 0,
  };

  try {
    const [vCount, dCount, bCount, collections, bookCount] = await Promise.all([
      Volunteer.countDocuments(),
      BloodDonor.countDocuments(),
      Blog.countDocuments(),
      GalleryCollection.find({}, 'images'),
      BookDonation.countDocuments(),
    ]);

    // Calculate total images across all collections
    const totalImages = collections.reduce((acc, col) => acc + (col.images?.length || 0), 0);

    stats = {
      volunteers: vCount,
      donors: dCount,
      blogs: bCount,
      galleryImages: totalImages,
      bookDonations: bookCount,
    };
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
  }

  return (
    <div className="space-y-10">
      <div className="mb-10">
        <h1
          className="text-2xl md:text-3xl font-bold text-gray-900"
          style={{ fontFamily: "Outfit, sans-serif" }}
        >
          Welcome back, {session.user?.name}
        </h1>
        <p className="text-gray-500 mt-1 text-sm md:text-base">
          Manage your website content and track organization impact.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
        <div>
          <p className="text-[10px] uppercase tracking-[0.3em] text-gray-400 mb-2 font-bold">Impact snapshot</p>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Quick stats</h2>
        </div>
        <p className="text-xs md:text-sm text-gray-500 max-w-xl">
          Overview of current engagement, content, and collection performance for your admin dashboard.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 mb-10">
        {[
          { label: "Volunteers", icon: Users, value: stats.volunteers, color: "#7C3AED" },
          { label: "Blood Donors", icon: Droplets, value: stats.donors, color: "#EF4444" },
          { label: "Blog Posts", icon: BookOpen, value: stats.blogs, color: "#1F6F3D" },
          { label: "Gallery Imgs", icon: ImageIcon, value: stats.galleryImages, color: "#C9A86A" },
          { label: "Books", icon: BookOpen, value: stats.bookDonations, color: "#3B82F6" },
        ].map(({ label, icon: Icon, value, color }) => (
          <div
            key={label}
            className="group overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm transition-shadow hover:shadow-lg"
          >
            <div className="flex items-center justify-between gap-4 p-5 border-b border-gray-100">
              <div>
                <p className="text-[10px] uppercase tracking-[0.3em] text-gray-400 font-bold">{label}</p>
                <p className="mt-2 md:mt-3 text-2xl md:text-3xl font-bold text-gray-900">{value}</p>
              </div>
              <div
                className="flex h-12 w-12 md:h-14 md:w-14 items-center justify-center rounded-2xl md:rounded-3xl"
                style={{ backgroundColor: `${color}1A`, color }}
              >
                <Icon size={24} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Admin Actions */}
      <div>
        <h2 className="text-lg font-bold text-gray-900 mb-5 flex items-center gap-2">
          <LayoutDashboard size={20} className="text-gray-400" />
          Management Tools
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {adminLinks.map(({ href, label, icon: Icon, color }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-4 p-5 bg-white rounded-2xl border border-gray-100 shadow-sm hover:border-[#1F6F3D]/30 hover:shadow-md transition-all group"
            >
              <div
                className="w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center transition-colors shrink-0"
                style={{ backgroundColor: `${color}10` }}
              >
                <Icon size={24} style={{ color }} className="group-hover:scale-110 transition-transform" />
              </div>
              <span className="font-semibold text-gray-800 text-sm md:text-base">{label}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
