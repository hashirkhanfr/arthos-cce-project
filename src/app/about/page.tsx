import type { Metadata } from "next";
import { Users, Target, Globe, Quote, Heart, Droplets, BookOpen, TrendingUp } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about ARTHO'S Humanitarian Society — our mission, vision, our impact, and a message from our founder.",
};

const impacts = [
  { icon: Droplets, value: "1,200+", label: "Units of Blood Collected", color: "#DC2626" },
  { icon: BookOpen, value: "8,000+", label: "Books Donated", color: "#1F6F3D" },
  { icon: Users, value: "500+", label: "Active Volunteers", color: "#C9A86A" },
  { icon: Heart, value: "25,000+", label: "Lives Positively Impacted", color: "#7C3AED" },
  { icon: TrendingUp, value: "50+", label: "Programs Completed", color: "#0891B2" },
  { icon: Globe, value: "12+", label: "Districts Reached", color: "#059669" },
];

export default function AboutPage() {
  return (
    <>
      {/* About Us Section */}
      <section className="section-padding bg-white">
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
              Pakistan. Founded with a vision to serve the underserved, we operate
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
                text: "A Pakistan where every citizen has access to basic rights and dignity.",
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
      </section>

      {/* Founder's Note Section */}
      <section className="section-padding bg-gray-50/50">
        <div className="container-arthos max-w-3xl">
          <div className="mb-12">
            <span className="inline-block text-sm font-semibold text-[#1F6F3D] uppercase tracking-widest mb-3">
              Founder&apos;s Note
            </span>
            <h2
              className="text-4xl sm:text-5xl font-bold text-gray-900"
              style={{ fontFamily: "Outfit, sans-serif" }}
            >
              A Message from the Founder
            </h2>
          </div>

          <div className="relative p-8 rounded-2xl bg-white border border-gray-200 shadow-sm mb-10">
            <Quote
              size={40}
              className="text-[#1F6F3D]/20 absolute top-6 left-6"
            />
            <blockquote className="relative z-10 text-lg text-gray-700 leading-relaxed italic pl-4">
              &quot;Every journey begins with a single act of courage and compassion.
              ARTHO&apos;S was born from the belief that ordinary people can create
              extraordinary change. We started small, but our dreams were never
              small.&quot;
            </blockquote>
          </div>

          <div className="space-y-6 text-gray-600 leading-relaxed">
            <p>
              When we founded ARTHO&apos;S, we saw the urgent need for a
              community-driven response to social inequalities. We witnessed
              neighbors struggling without blood donors, children without books,
              and families without hope.
            </p>
            <p>
              What drives us every day is not the scale of the problem, but the
              magnitude of human potential we see in each volunteer, donor, and
              community member who joins our cause. We are not just an
              organization — we are a family united by purpose.
            </p>
            <p>
              I invite you to be part of this journey. Together, we can rewrite
              the story of our communities — one act of kindness at a time.
            </p>
          </div>

          <div className="mt-12 flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-[#1F6F3D]/20 flex items-center justify-center text-2xl font-bold text-[#1F6F3D]">
              A
            </div>
            <div>
              <p className="font-bold text-gray-900">Founder</p>
              <p className="text-sm text-gray-500">ARTHO&apos;S Humanitarian Society</p>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="section-padding bg-white">
        <div className="container-arthos">
          <div className="text-center mb-14">
            <span className="inline-block text-sm font-semibold text-[#1F6F3D] uppercase tracking-widest mb-3">
              Our Impact
            </span>
            <h2
              className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4"
              style={{ fontFamily: "Outfit, sans-serif" }}
            >
              The Change We&apos;ve Created Together
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              Every number represents a life touched, a family helped, and a
              community strengthened by your generosity.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {impacts.map(({ icon: Icon, value, label, color }) => (
              <div
                key={label}
                className="p-8 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow text-center"
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
      </section>
    </>
  );
}
