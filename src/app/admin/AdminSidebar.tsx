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
  X
} from "lucide-react";
import { signOut } from "next-auth/react";
import Image from "next/image";

const sidebarLinks = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/blogs", label: "Blogs", icon: BookText },
  { href: "/admin/gallery", label: "Gallery", icon: ImageIcon },
  { href: "/admin/volunteers", label: "Volunteers", icon: Users },
  { href: "/admin/blood-donors", label: "Blood Donors", icon: Droplets },
  { href: "/admin/book-donations", label: "Book Donations", icon: BookOpen },
  { href: "/admin/profile", label: "Profile", icon: User },
];

interface AdminSidebarProps {
  onClose?: () => void;
}

export default function AdminSidebar({ onClose }: AdminSidebarProps) {
  const pathname = usePathname();

  if (pathname === "/admin/login") {
    return null;
  }

  return (
    <aside className="w-64 bg-white border-r border-gray-100 flex flex-col h-screen sticky top-0 overflow-hidden">
      <div className="p-6 border-b border-gray-100 flex items-center justify-between">
        <Link href="/admin" className="flex items-center gap-3" onClick={onClose}>
          <Image 
            src="/images/logo-trans.png" 
            alt="ARTHO'S Logo" 
            width={32} 
            height={32} 
            className="object-contain"
          />
          <span className="font-bold text-gray-900 truncate" style={{ fontFamily: "Outfit, sans-serif" }}>
            ARTHO&apos;S Admin
          </span>
        </Link>
        {/* Mobile Close Button */}
        <button 
          onClick={onClose}
          className="lg:hidden p-1 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <X size={20} />
        </button>
      </div>

      <nav className="flex-1 p-4 space-y-1 overflow-y-auto custom-scrollbar">
        {sidebarLinks.map((link) => {
          const isActive = pathname === link.href;
          const Icon = link.icon;
          return (
            <Link
              key={link.href}
              href={link.href}
              onClick={onClose}
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

      <div className="mt-auto p-4 border-t border-gray-100">
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
