import type { Metadata } from "next";
import Link from "next/link";
import {
  Heart,
  BookOpen,
  Droplets,
  Users,
  ArrowRight,
  Star,
  Globe,
  HandHeart,
} from "lucide-react";
import Button from "@/components/Button";
import Card from "@/components/Card";

export const metadata: Metadata = {
  title: "ARTHO'S Humanitarian Society | Hope. Action. Change.",
  description:
    "Join ARTHO'S in creating positive change through volunteering, blood donation, book drives, and community development programs across Bangladesh.",
};

const stats = [
  { label: "Volunteers", value: "500+", icon: Users },
  { label: "Blood Donations", value: "1,200+", icon: Droplets },
  { label: "Books Donated", value: "8,000+", icon: BookOpen },
  { label: "Lives Touched", value: "25,000+", icon: Heart },
];

const programs = [
  {
    title: "Volunteer Program",
    description:
      "Join our growing community of compassionate volunteers and make a tangible difference in people's lives.",
    icon: HandHeart,
    href: "/volunteer",
    badge: "Join Us",
  },
  {
    title: "Blood Donation Drive",
    description:
      "Register as a blood donor and be the lifeline for those in critical need across Bangladesh.",
    icon: Droplets,
    href: "/blood-donation",
    badge: "Save Lives",
  },
  {
    title: "Book Donation Campaign",
    description:
      "Donate books to empower the next generation with knowledge, education, and new opportunities.",
    icon: BookOpen,
    href: "/book-donation",
    badge: "Empower Youth",
  },
  {
    title: "Financial Donations",
    description:
      "Every contribution directly funds healthcare, education, and disaster relief programs.",
    icon: Heart,
    href: "/donate",
    badge: "Donate Now",
  },
];

const values = [
  {
    icon: Heart,
    title: "Compassion",
    description: "We act with empathy and care for every individual we serve.",
  },
  {
    icon: Star,
    title: "Integrity",
    description: "Transparency and accountability are at the core of everything we do.",
  },
  {
    icon: Globe,
    title: "Community",
    description: "We believe in the power of collective action and solidarity.",
  },
  {
    icon: Users,
    title: "Inclusivity",
    description: "Our doors are open to everyone, regardless of background or belief.",
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 gradient-primary opacity-95" />
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        <div className="relative container-arthos py-20 text-white">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/15 backdrop-blur-sm text-sm font-medium mb-6 border border-white/20">
              <Heart size={14} />
              Serving Bangladesh Since 2018
            </span>

            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6"
              style={{ fontFamily: "Outfit, sans-serif" }}
            >
              Together We Build a{" "}
              <span className="text-[#E8D3A5]">Better Tomorrow</span>
            </h1>

            <p className="text-lg sm:text-xl text-white/80 mb-8 max-w-2xl leading-relaxed">
              ARTHO&apos;S Humanitarian Society empowers communities through
              education, health initiatives, blood donation drives, and
              compassionate volunteerism across Bangladesh.
            </p>

            <div className="flex flex-wrap gap-4">
              <Button href="/donate" size="lg" variant="secondary">
                Donate Now
              </Button>
              <Button
                href="/volunteer"
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-[#1F6F3D]"
              >
                Become a Volunteer
              </Button>
            </div>
          </div>
        </div>

        {/* Floating Stats */}
        <div className="absolute bottom-0 left-0 right-0">
          <div className="container-arthos pb-0">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/10 rounded-t-2xl overflow-hidden">
              {stats.map(({ label, value, icon: Icon }) => (
                <div
                  key={label}
                  className="bg-white/10 backdrop-blur-sm px-6 py-5 text-white text-center"
                >
                  <Icon size={20} className="mx-auto mb-2 text-[#E8D3A5]" />
                  <div className="text-2xl font-bold text-white">{value}</div>
                  <div className="text-xs text-white/70 mt-0.5">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-arthos">
          <div className="text-center mb-14">
            <span className="inline-block text-sm font-semibold text-[#1F6F3D] uppercase tracking-widest mb-3">
              Our Programs
            </span>
            <h2
              className="text-3xl sm:text-4xl font-bold text-gray-900"
              style={{ fontFamily: "Outfit, sans-serif" }}
            >
              Ways You Can Make an Impact
            </h2>
            <p className="mt-4 text-gray-500 max-w-xl mx-auto">
              From volunteering to financial support, every contribution shapes a
              stronger, more caring Bangladesh.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {programs.map((program) => (
              <Card
                key={program.title}
                title={program.title}
                description={program.description}
                icon={program.icon}
                badge={program.badge}
                href={program.href}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section-padding bg-white">
        <div className="container-arthos">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="inline-block text-sm font-semibold text-[#1F6F3D] uppercase tracking-widest mb-3">
                Our Values
              </span>
              <h2
                className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6"
                style={{ fontFamily: "Outfit, sans-serif" }}
              >
                What Drives Us Every Single Day
              </h2>
              <p className="text-gray-500 mb-8 leading-relaxed">
                We are guided by a deep sense of duty to serve our community. Our
                work is rooted in values that prioritize human dignity,
                transparency, and meaningful change.
              </p>
              <Button href="/about" variant="outline" icon={ArrowRight} iconPosition="right">
                Learn Our Story
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {values.map(({ icon: Icon, title, description }) => (
                <div
                  key={title}
                  className="p-6 rounded-2xl bg-gray-50 border border-gray-100 hover:border-[#1F6F3D]/30 transition-colors group"
                >
                  <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-[#1F6F3D]/10 mb-4 group-hover:bg-[#1F6F3D]/20 transition-colors">
                    <Icon size={20} className="text-[#1F6F3D]" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">{title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="section-padding gradient-primary text-white">
        <div className="container-arthos text-center">
          <h2
            className="text-3xl sm:text-4xl font-bold mb-4"
            style={{ fontFamily: "Outfit, sans-serif" }}
          >
            Ready to Change a Life Today?
          </h2>
          <p className="text-white/80 max-w-xl mx-auto mb-8">
            Whether you give your time, blood, books, or money — every act of
            kindness creates ripples of change throughout our community.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button href="/donate" size="lg" variant="secondary">
              Make a Donation
            </Button>
            <Link
              href="/volunteer"
              className="inline-flex items-center gap-2 px-8 py-3.5 text-base font-semibold border-2 border-white text-white rounded-full hover:bg-white hover:text-[#1F6F3D] transition-all"
            >
              Join as Volunteer
            </Link>
          </div>
        </div>
      </section>

      {/* Blog Preview */}
      <section className="section-padding bg-gray-50">
        <div className="container-arthos">
          <div className="flex items-end justify-between mb-10">
            <div>
              <span className="inline-block text-sm font-semibold text-[#1F6F3D] uppercase tracking-widest mb-3">
                Latest News
              </span>
              <h2
                className="text-3xl font-bold text-gray-900"
                style={{ fontFamily: "Outfit, sans-serif" }}
              >
                From Our Blog
              </h2>
            </div>
            <Link
              href="/blog"
              className="flex items-center gap-1 text-sm font-semibold text-[#1F6F3D] hover:gap-2 transition-all"
            >
              View all <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Card
                key={i}
                title={`Community Impact Story ${i}`}
                description="Discover how our programs are changing lives and building stronger communities one step at a time."
                badge="Story"
                href="/blog"
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
