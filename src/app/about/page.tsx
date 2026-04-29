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
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <span className="inline-block text-sm font-semibold text-[#1F6F3D] uppercase tracking-widest mb-3">
                About Us
              </span>
              <h1
                className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6"
                style={{ fontFamily: "Outfit, sans-serif" }}
              >
                Who We Are
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                ARTHO&apos;S Humanitarian Society is a non-governmental organization
                committed to fostering compassion, equity, and sustainable change across
                Pakistan. Founded with a vision to serve the underserved, we operate
                through community-driven programs that touch lives in meaningful ways.
              </p>
              <p className="text-gray-500 leading-relaxed">
                Established in 2018, ARTHO&apos;S has grown from a small community
                initiative into a recognized humanitarian body with hundreds of
                volunteers. We run blood donation camps, book collection drives,
                educational outreach, and financial aid programs throughout the year.
              </p>
            </div>
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-[#E8D3A5] rounded-2xl -z-10"></div>
              <img 
                src="/images/old age visit/481999456_1038192595007039_8390376270924150344_n.jpg" 
                alt="Our Community" 
                className="rounded-2xl shadow-xl w-full aspect-[4/3] object-cover"
              />
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-[#1F6F3D]/10 rounded-full -z-10"></div>
            </div>
          </div>

          <div className="grid sm:grid-cols-3 gap-8">
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
                className="p-6 rounded-md bg-[#1F6F3D]/5 border border-[#1F6F3D]/10 hover:border-[#1F6F3D]/30 transition-all"
              >
                <div className="w-11 h-11 rounded-md bg-[#1F6F3D]/10 flex items-center justify-center mb-4">
                  <Icon size={20} className="text-[#1F6F3D]" />
                </div>
                <h2 className="font-bold text-gray-900 mb-2">{title}</h2>
                <p className="text-sm text-gray-500 leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Founder's Note Section */}
      <section className="section-padding bg-gray-50/50">
        <div className="container-arthos">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <span className="inline-block text-sm font-semibold text-[#1F6F3D] uppercase tracking-widest mb-3">
                Founder&apos;s Note
              </span>
              <h2
                className="text-4xl sm:text-5xl font-bold text-gray-900 mb-8"
                style={{ fontFamily: "Outfit, sans-serif" }}
              >
                A Message from the Founder
              </h2>
              
              <div className="relative p-8 rounded-2xl bg-white border border-gray-200 shadow-sm mb-10">
                <Quote
                  size={40}
                  className="text-[#1F6F3D]/10 absolute top-6 left-6"
                />
                <blockquote className="relative z-10 text-lg text-gray-700 leading-relaxed italic">
                  &quot;Every journey begins with a single act of courage and compassion.
                  ARTHO&apos;S was born from the belief that ordinary people can create
                  extraordinary change.&quot;
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
                  community member who joins our cause.
                </p>
              </div>

              <div className="mt-10 flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-[#1F6F3D] flex items-center justify-center text-xl font-bold text-white">
                  AS
                </div>
                <div>
                  <p className="font-bold text-gray-900">Founder & President</p>
                  <p className="text-sm text-gray-500">ARTHO&apos;S Humanitarian Society</p>
                </div>
              </div>
            </div>

            <div className="order-1 lg:order-2 grid grid-cols-2 gap-4">
              <img src="/images/Ramzan Aftar/2.JPG" alt="Impact" className="rounded-2xl w-full h-full object-cover shadow-lg" />
              <div className="grid gap-4">
                <img src="/images/eid/490884776_9771348839578176_3577104318709577266_n.jpg" alt="Eid Event" className="rounded-2xl w-full h-40 object-cover shadow-md" />
                <img src="/images/orphanage visit/482212540_1037125308447101_6701605120826043690_n.jpg" alt="Orphanage Visit" className="rounded-2xl w-full h-full object-cover shadow-md" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="relative py-24 lg:py-32 overflow-hidden text-white">
        <div className="absolute inset-0 bg-black/60 -z-5" />
        <div 
          className="absolute inset-0 -z-10 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url('/images/Ramzan Aftar/DSC_0629.JPG')` }}
        />
        <div className="container-arthos">
          <div className="text-center mb-16">
            <span className="inline-block text-sm font-semibold text-[#E8D3A5] uppercase tracking-widest mb-3 opacity-90">
              Our Impact
            </span>
            <h2
              className="text-4xl sm:text-5xl font-bold mb-4"
              style={{ fontFamily: "Outfit, sans-serif" }}
            >
              The Change We&apos;ve Created Together
            </h2>
            <div className="w-24 h-1.5 bg-[#E8D3A5] mx-auto rounded-full mb-6"></div>
            <p className="text-white/80 max-w-xl mx-auto text-lg">
              Every number represents a life touched, a family helped, and a
              community strengthened by your generosity.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {impacts.map(({ icon: Icon, value, label, color }) => (
              <div
                key={label}
                className="p-8 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all text-center group"
              >
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-5 bg-white/10 group-hover:bg-[#E8D3A5] group-hover:text-[#1A1A1A] transition-colors"
                >
                  <Icon size={26} />
                </div>
                <div
                  className="text-4xl font-bold mb-2 text-white"
                  style={{ fontFamily: "Outfit, sans-serif" }}
                >
                  {value}
                </div>
                <p className="text-white/70 text-sm font-medium uppercase tracking-wider">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
