import type { Metadata } from "next";
import { Heart, Droplets, BookOpen, Users, TrendingUp, Globe } from "lucide-react";

export const metadata: Metadata = {
  title: "Our Impact",
  description:
    "See the measurable difference ARTHO'S has made through blood donation, book drives, volunteering, and community programs.",
};

const impacts = [
  { icon: Droplets, value: "1,200+", label: "Units of Blood Collected", color: "#DC2626" },
  { icon: BookOpen, value: "8,000+", label: "Books Donated", color: "#1F6F3D" },
  { icon: Users, value: "500+", label: "Active Volunteers", color: "#C9A86A" },
  { icon: Heart, value: "25,000+", label: "Lives Positively Impacted", color: "#7C3AED" },
  { icon: TrendingUp, value: "50+", label: "Programs Completed", color: "#0891B2" },
  { icon: Globe, value: "12+", label: "Districts Reached", color: "#059669" },
];

export default function ImpactPage() {
  return (
    <div className="section-padding">
      <div className="container-arthos">
        <div className="text-center mb-14">
          <span className="inline-block text-sm font-semibold text-[#1F6F3D] uppercase tracking-widest mb-3">
            Our Impact
          </span>
          <h1
            className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4"
            style={{ fontFamily: "Outfit, sans-serif" }}
          >
            The Change We&apos;ve Created Together
          </h1>
          <p className="text-gray-500 max-w-xl mx-auto">
            Every number represents a life touched, a family helped, and a
            community strengthened by your generosity.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {impacts.map(({ icon: Icon, value, label, color }) => (
            <div
              key={label}
              className="p-8 rounded-2xl bg-white border border-gray-100 shadow-sm card-hover text-center"
            >
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-5"
                style={{ backgroundColor: `${color}15` }}
              >
                <Icon size={26} style={{ color }} />
              </div>
              <div
                className="text-4xl font-bold mb-2"
                style={{ color, fontFamily: "Outfit, sans-serif" }}
              >
                {value}
              </div>
              <p className="text-gray-500 text-sm">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
