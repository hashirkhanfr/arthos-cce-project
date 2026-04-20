import type { Metadata } from "next";
import { Users, Target, Globe } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about ARTHO'S Humanitarian Society — our mission, vision, and the team behind our work in Bangladesh.",
};

export default function AboutPage() {
  return (
    <div className="section-padding">
      <div className="container-arthos max-w-4xl">
        <div className="mb-12">
          <span className="inline-block text-sm font-semibold text-[#1F6F3D] uppercase tracking-widest mb-3">
            About Us
          </span>
          <h1
            className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6"
            style={{ fontFamily: "Outfit, sans-serif" }}
          >
            Who We Are
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            ARTHO&apos;S Humanitarian Society is a non-governmental organization
            committed to fostering compassion, equity, and sustainable change across
            Bangladesh. Founded with a vision to serve the underserved, we operate
            through community-driven programs that touch lives in meaningful ways.
          </p>
        </div>

        <div className="grid sm:grid-cols-3 gap-8 mb-16">
          {[
            {
              icon: Target,
              title: "Our Mission",
              text: "To empower communities through education, health, and humanitarian services.",
            },
            {
              icon: Globe,
              title: "Our Vision",
              text: "A Bangladesh where every citizen has access to basic rights and dignity.",
            },
            {
              icon: Users,
              title: "Our Team",
              text: "A dedicated group of volunteers, professionals, and changemakers.",
            },
          ].map(({ icon: Icon, title, text }) => (
            <div
              key={title}
              className="p-6 rounded-2xl bg-[#1F6F3D]/5 border border-[#1F6F3D]/10"
            >
              <div className="w-11 h-11 rounded-xl bg-[#1F6F3D]/10 flex items-center justify-center mb-4">
                <Icon size={20} className="text-[#1F6F3D]" />
              </div>
              <h2 className="font-bold text-gray-900 mb-2">{title}</h2>
              <p className="text-sm text-gray-500">{text}</p>
            </div>
          ))}
        </div>

        <div className="prose prose-lg max-w-none text-gray-600">
          <p>
            Established in 2018, ARTHO&apos;S has grown from a small community
            initiative into a recognized humanitarian body with hundreds of
            volunteers. We run blood donation camps, book collection drives,
            educational outreach, and financial aid programs throughout the year.
          </p>
        </div>
      </div>
    </div>
  );
}
