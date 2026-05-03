"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Droplets,
  BookOpen,
  BookText,
  Image as ImageIcon,
  User,
  LogOut,
  Heart,
} from "lucide-react";
import { signOut } from "next-auth/react";

const sidebarLinks = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/blogs", label: "Blogs", icon: BookText },
  { href: "/admin/gallery", label: "Gallery", icon: ImageIcon },
  { href: "/admin/volunteers", label: "Volunteers", icon: Users },
  { href: "/admin/blood-donors", label: "Blood Donors", icon: Droplets },
  { href: "/admin/book-donations", label: "Book Donations", icon: BookOpen },
  { href: "/admin/profile", label: "Profile", icon: User },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  if (pathname === "/admin/login") {
    return null;
  }

  return (
    <aside className="w-64 bg-white border-r border-gray-100 flex flex-col min-h-screen sticky top-0">
      <div className="p-6 border-b border-gray-100">
        <Link href="/admin" className="flex items-center gap-2">
          <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#1F6F3D] text-white shrink-0">
            <Heart size={15} />
          </span>
          <span className="font-bold text-gray-900 truncate" style={{ fontFamily: "Outfit, sans-serif" }}>
            ARTHO&apos;S Admin
          </span>
        </Link>
      </div>

      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {sidebarLinks.map((link) => {
          const isActive = pathname === link.href;
          const Icon = link.icon;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors ${
                isActive
                  ? "bg-[#1F6F3D]/10 text-[#1F6F3D] font-medium"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <Icon size={18} className={isActive ? "text-[#1F6F3D]" : "text-gray-400"} />
              <span className="text-sm">{link.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-100">
        <button
          onClick={() => signOut({ callbackUrl: "/admin/login" })}
          className="flex items-center gap-3 w-full px-3 py-2.5 text-sm text-gray-600 hover:bg-red-50 hover:text-red-600 rounded-xl transition-colors"
        >
          <LogOut size={18} className="text-gray-400 group-hover:text-red-500" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}
