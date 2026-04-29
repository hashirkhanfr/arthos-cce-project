import { Heart, Star, Globe, Users, ArrowRight } from "lucide-react";
import Button from "@/components/Button";

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

export default function Values() {
  return (
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
  );
}
