"use client";

import { ReactNode, useState } from "react";
import AdminSidebar from "./AdminSidebar";
import { Menu } from "lucide-react";
import { usePathname } from "next/navigation";

export default function AdminLayout({ children }: { children: ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();

  const isLoginPage = pathname === "/admin/login";

  if (isLoginPage) {
    return <div className="min-h-screen bg-gray-50">{children}</div>;
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden transition-opacity"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <div className={`
        fixed inset-y-0 left-0 z-50 w-64 transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <AdminSidebar onClose={() => setIsSidebarOpen(false)} />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        {/* Mobile Header */}
        <header className="lg:hidden h-16 bg-white border-b border-gray-100 flex items-center justify-between px-4 shrink-0 shadow-sm">
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 -ml-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
            aria-label="Open sidebar"
          >
            <Menu size={24} />
          </button>
          <span className="font-bold text-gray-900" style={{ fontFamily: "Outfit, sans-serif" }}>
            ARTHO&apos;S Admin
          </span>
          <div className="w-10" /> {/* Balanced spacer */}
        </header>

        {/* Scrollable Page Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8 lg:p-10 custom-scrollbar">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
