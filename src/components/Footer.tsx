"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Heart,
  Mail,
  Phone,
  MapPin,
  Globe,
  MessageCircle,
  Camera,
  PlayCircle,
} from "lucide-react";

const footerLinks = {
  organization: [
    { label: "About Us", href: "/about" },
    { label: "Gallery", href: "/gallery" },
    { label: "Blog", href: "/blog" },
  ],
  getInvolved: [
    { label: "Volunteer With Us", href: "/volunteer" },
    { label: "Donate Blood", href: "/blood-donation" },
    { label: "Donate Books", href: "/book-donation" },
    { label: "Fund Us", href: "/donate" },
  ],
};

const socialLinks = [
  { icon: Globe, href: "#", label: "Facebook" },
  { icon: MessageCircle, href: "#", label: "Twitter" },
  { icon: Camera, href: "#", label: "Instagram" },
  { icon: PlayCircle, href: "#", label: "YouTube" },
];

export default function Footer() {
  const pathname = usePathname();

  if (pathname?.startsWith("/admin")) {
    return null;
  }

  return (
    <footer className="bg-[#1A1A1A] text-gray-300">
      <div className="container-arthos py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <span className="flex items-center justify-center w-9 h-9 rounded-full bg-[#1F6F3D]">
                <Heart size={18} strokeWidth={2.5} className="text-white" />
              </span>
              <div className="flex flex-col leading-tight">
                <span
                  className="text-lg font-bold text-white tracking-tight"
                  style={{ fontFamily: "Outfit, sans-serif" }}
                >
                  ARTHO&apos;S
                </span>
                <span className="text-[10px] text-gray-400 uppercase tracking-widest">
                  Humanitarian Society
                </span>
              </div>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed mb-6">
              Dedicated to creating a compassionate community through education,
              health, and humanitarian services across Pakistan.
            </p>
            <div className="flex gap-3">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex items-center justify-center w-9 h-9 rounded-full bg-white/5 hover:bg-[#1F6F3D] transition-colors"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Organization Links */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-widest mb-5">
              Organization
            </h3>
            <ul className="space-y-3">
              {footerLinks.organization.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-[#C9A86A] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Get Involved */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-widest mb-5">
              Get Involved
            </h3>
            <ul className="space-y-3">
              {footerLinks.getInvolved.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-[#C9A86A] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-widest mb-5">
              Contact
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={16} className="text-[#C9A86A] shrink-0 mt-0.5" />
                <span className="text-sm text-gray-400">
                  Pakistan
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={16} className="text-[#C9A86A] shrink-0" />
                <a
                  href="tel:+923XXXXXXXXX"
                  className="text-sm text-gray-400 hover:text-[#C9A86A] transition-colors"
                >
                  +92 3XX-XXXXXXX
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={16} className="text-[#C9A86A] shrink-0" />
                <a
                  href="mailto:info@arthos.org"
                  className="text-sm text-gray-400 hover:text-[#C9A86A] transition-colors"
                >
                  info@arthos.org
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container-arthos py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-500">
            &copy; {new Date().getFullYear()} ARTHO&apos;S Humanitarian Society. All
            rights reserved.
          </p>
          <div className="flex gap-4">
            <Link
              href="/admin/login"
              className="text-xs text-gray-600 hover:text-gray-400 transition-colors"
            >
              Admin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
