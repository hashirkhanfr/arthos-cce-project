import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Card from "@/components/Card";

export default function BlogPreview() {
  return (
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
  );
}
