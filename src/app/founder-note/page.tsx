import type { Metadata } from "next";
import { Quote } from "lucide-react";

export const metadata: Metadata = {
  title: "Founder's Note",
  description:
    "A personal message from the founder of ARTHO'S Humanitarian Society on the vision and journey of the organization.",
};

export default function FounderNotePage() {
  return (
    <div className="section-padding">
      <div className="container-arthos max-w-3xl">
        <div className="mb-12">
          <span className="inline-block text-sm font-semibold text-[#1F6F3D] uppercase tracking-widest mb-3">
            Founder&apos;s Note
          </span>
          <h1
            className="text-4xl sm:text-5xl font-bold text-gray-900"
            style={{ fontFamily: "Outfit, sans-serif" }}
          >
            A Message from the Founder
          </h1>
        </div>

        <div className="relative p-8 rounded-2xl bg-[#1F6F3D]/5 border border-[#1F6F3D]/10 mb-10">
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
    </div>
  );
}
