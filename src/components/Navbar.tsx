"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Heart, ChevronDown } from "lucide-react";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Volunteer With Us", href: "/volunteer" },
  { label: "Donate Blood", href: "/blood-donation" },
  { label: "Donate Books", href: "/book-donation" },
  { label: "Gallery", href: "/gallery" },
  { label: "Blog", href: "/blog" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  function toggleDropdown(label: string) {
    setOpenDropdown((prev) => (prev === label ? null : label));
  }

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm">
      <div className="container-arthos">
        <nav className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <span className="flex items-center justify-center w-9 h-9 rounded-full bg-[#1F6F3D] text-white">
              <Heart size={18} strokeWidth={2.5} />
            </span>
            <div className="flex flex-col leading-tight">
              <span
                className="text-lg font-bold text-[#1F6F3D] tracking-tight"
                style={{ fontFamily: "Outfit, sans-serif" }}
              >
                ARTHO&apos;S
              </span>
              <span className="text-[10px] text-gray-500 uppercase tracking-widest hidden sm:block">
                Humanitarian Society
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <ul className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) =>
              link.children ? (
                <li key={link.label} className="relative group">
                  <button
                    className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-gray-700 hover:text-[#1F6F3D] transition-colors rounded-lg hover:bg-[#1F6F3D]/5"
                    aria-haspopup="true"
                  >
                    {link.label}
                    <ChevronDown
                      size={14}
                      className="transition-transform group-hover:rotate-180"
                    />
                  </button>
                  <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    <ul className="bg-white rounded-xl shadow-xl border border-gray-100 py-1 min-w-[180px]">
                      {link.children.map((child) => (
                        <li key={child.href}>
                          <Link
                            href={child.href}
                            className="block px-4 py-2.5 text-sm text-gray-700 hover:text-[#1F6F3D] hover:bg-[#1F6F3D]/5 transition-colors"
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              ) : (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-[#1F6F3D] transition-colors rounded-lg hover:bg-[#1F6F3D]/5 block"
                  >
                    {link.label}
                  </Link>
                </li>
              )
            )}
          </ul>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/donate"
              className="px-5 py-2.5 bg-[#1F6F3D] text-white text-sm font-semibold rounded-full hover:bg-[#14532D] transition-colors shadow-sm"
            >
              Fund Us
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </nav>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-gray-100 bg-white">
          <div className="container-arthos py-4 space-y-1">
            {navLinks.map((link) =>
              link.children ? (
                <div key={link.label}>
                  <button
                    onClick={() => toggleDropdown(link.label)}
                    className="flex items-center justify-between w-full px-3 py-2.5 text-sm font-medium text-gray-700 hover:text-[#1F6F3D] hover:bg-[#1F6F3D]/5 rounded-lg transition-colors"
                  >
                    {link.label}
                    <ChevronDown
                      size={14}
                      className={`transition-transform ${
                        openDropdown === link.label ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {openDropdown === link.label && (
                    <ul className="pl-4 mt-1 space-y-1">
                      {link.children.map((child) => (
                        <li key={child.href}>
                          <Link
                            href={child.href}
                            className="block px-3 py-2 text-sm text-gray-600 hover:text-[#1F6F3D] hover:bg-[#1F6F3D]/5 rounded-lg transition-colors"
                            onClick={() => setMobileOpen(false)}
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ) : (
                <Link
                  key={link.label}
                  href={link.href}
                  className="block px-3 py-2.5 text-sm font-medium text-gray-700 hover:text-[#1F6F3D] hover:bg-[#1F6F3D]/5 rounded-lg transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              )
            )}
            <div className="pt-3 border-t border-gray-100">
              <Link
                href="/donate"
                className="block w-full text-center px-5 py-3 bg-[#1F6F3D] text-white text-sm font-semibold rounded-full hover:bg-[#14532D] transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                Fund Us
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
