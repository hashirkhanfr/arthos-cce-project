import { Heart, Users, Droplets, BookOpen } from "lucide-react";
import Button from "@/components/Button";

const stats = [
  { label: "Volunteers", value: "500+", icon: Users },
  { label: "Blood Donations", value: "1,200+", icon: Droplets },
  { label: "Books Donated", value: "8,000+", icon: BookOpen },
  { label: "Lives Touched", value: "25,000+", icon: Heart },
];

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden pt-28 pb-20 lg:pt-36 lg:pb-24 z-0">
      <div className="absolute inset-0 gradient-primary opacity-95 -z-10" />
      <div
        className="absolute inset-0 opacity-10 -z-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative container-arthos text-white z-10 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content: Hero Text */}
          <div className="max-w-2xl text-left">
            <span className="inline-flex items-center gap-2 px-4 sm:py-2 py-0 rounded-full bg-white/15 backdrop-blur-sm text-sm font-medium mb-6 border border-white/20">
              <Heart size={14} />
              Serving Pakistan Since 2018
            </span>

            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6"
              style={{ fontFamily: "Outfit, sans-serif" }}
            >
              Together We Build a{" "}
              <span className="text-[#E8D3A5]">Better Tomorrow</span>
            </h1>

            <p className="text-lg sm:text-xl text-white/90 mb-8 leading-relaxed">
              <strong>ARTHO&apos;S</strong> stands for <strong>Always Ready To Help Others</strong>. It aims to help socially deprived people of Pakistan through education, health initiatives, blood donation drives, and compassionate volunteerism.
            </p>

            <div className="flex flex-wrap gap-4 mb-4 lg:mb-0">
              <Button href="/donate" size="lg" variant="secondary" className="px-8">
                Fund Us
              </Button>
              <Button
                href="/volunteer"
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-[#1F6F3D] px-8"
              >
                Become a Volunteer
              </Button>
            </div>
          </div>

          {/* Right Content: Stats Grid */}
          <div className="relative w-full">
            <div className="grid grid-cols-2 gap-px bg-white/10 rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
              {stats.map(({ label, value, icon: Icon }) => (
                <div
                  key={label}
                  className="bg-white/10 backdrop-blur-md px-6 py-8 text-white text-center hover:bg-white/20 transition-all duration-300"
                >
                  <Icon size={28} className="mx-auto mb-4 text-[#E8D3A5]" />
                  <div
                    className="text-3xl lg:text-4xl font-bold text-white mb-2 tracking-tight"
                    style={{ fontFamily: "Outfit, sans-serif" }}
                  >
                    {value}
                  </div>
                  <div className="text-sm font-medium text-white/80 uppercase tracking-wider">
                    {label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
