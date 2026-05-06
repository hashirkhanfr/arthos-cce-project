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
    <section className="relative min-h-[85vh] md:min-h-[90vh] flex items-center overflow-hidden pt-20 pb-16 md:pt-32 md:pb-24 z-0">
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
          <div className="max-w-2xl text-center lg:text-left mx-auto lg:mx-0">
            <span className="inline-flex items-center gap-2 px-4 py-2 md:px-5 md:py-2.5 rounded-full bg-white/10 backdrop-blur-md text-[10px] md:text-xs font-black uppercase tracking-[0.2em] mb-6 md:mb-8 border border-white/10 text-[#E8D3A5]">
              <Heart size={14} className="fill-[#E8D3A5]" />
              Serving Pakistan Since 2010
            </span>

            <h1
              className="text-3xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-4 md:mb-6"
              style={{ fontFamily: "Outfit, sans-serif" }}
            >
              Together We Build a{" "}
              <span className="text-[#E8D3A5]">Better Tomorrow</span>
            </h1>

            <p className="text-base sm:text-lg lg:text-xl text-white/90 mb-6 md:mb-8 leading-relaxed">
              <strong>ARTHO&apos;S</strong> stands for <strong>Always Ready To Help Others</strong>. It aims to help socially deprived people of Pakistan through education, health initiatives, blood donation drives, and compassionate volunteerism.
            </p>

            <div className="flex flex-col sm:flex-row flex-wrap justify-center lg:justify-start gap-3 md:gap-4 mb-4 lg:mb-0">
              <Button href="/donate" size="lg" variant="secondary" className="px-8 w-full sm:w-auto">
                Fund Us
              </Button>
              <Button
                href="/volunteer"
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:!text-[#1F6F3D] px-8 w-full sm:w-auto"
              >
                Become a Volunteer
              </Button>
            </div>
          </div>

          {/* Right Content: Stats Grid */}
          <div className="relative w-full max-w-lg mx-auto lg:max-w-none">
            <div className="grid grid-cols-2 gap-px bg-white/10 rounded-2xl md:rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
              {stats.map(({ label, value, icon: Icon }) => (
                <div
                  key={label}
                  className="bg-white/10 backdrop-blur-md px-4 py-6 md:px-6 md:py-8 text-white text-center hover:bg-white/20 transition-all duration-300"
                >
                  <Icon size={28} className="mx-auto mb-3 md:mb-4 text-[#E8D3A5]" />
                  <div
                    className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-1 md:mb-2 tracking-tight"
                    style={{ fontFamily: "Outfit, sans-serif" }}
                  >
                    {value}
                  </div>
                  <div className="text-[10px] md:text-sm font-medium text-white/80 uppercase tracking-wider">
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
