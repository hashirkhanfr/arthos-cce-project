import { ShieldCheck, Users, Globe, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function LegacyHighlight() {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="container-arthos">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-[#1F6F3D] text-xs font-black uppercase tracking-[0.3em]">A Movement Since 2010</span>
            <h2
              className="text-4xl md:text-5xl font-black text-gray-900 mt-6 mb-8 leading-tight tracking-tight"
              style={{ fontFamily: 'Outfit, sans-serif' }}
            >
              Building a Culture of <br />
              <span className="text-[#1F6F3D]">Organized Compassion</span> <br />
              Across Pakistan.
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              Founded in the immediate aftermath of the 2010 floods, Team Arthos emerged as a beacon of hope and resilience. For over 15 years, we have pursued a mission to uplift humanity and restore dignity to the marginalized.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 mb-10">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#1F6F3D]/10 flex items-center justify-center shrink-0">
                  <ShieldCheck className="text-[#1F6F3D]" size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-sm mb-1 uppercase tracking-wider">Multidisciplinary</h4>
                  <p className="text-xs text-gray-500">Uniting doctors, engineers, and educators for precise impact.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#1F6F3D]/10 flex items-center justify-center shrink-0">
                  <Globe className="text-[#1F6F3D]" size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-sm mb-1 uppercase tracking-wider">Nationwide Presence</h4>
                  <p className="text-xs text-gray-500">Active on-ground operations in Lahore, Multan, and Rawalpindi.</p>
                </div>
              </div>
            </div>

            <Link
              href="/about"
              className="inline-flex items-center gap-2 text-[#1F6F3D] font-black uppercase tracking-widest text-xs hover:gap-4 transition-all"
            >
              Read Our Full Story <ArrowRight size={16} />
            </Link>
          </div>

          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="pt-12">
                <img
                  src="/images/eid/492225277_9771348932911500_9211261492123848198_n.jpg"
                  alt="Impact"
                  className="rounded-[2.5rem] w-full aspect-[4/5] object-cover shadow-2xl"
                />
              </div>
              <div>
                <img
                  src="/images/shawl distribution/483891521_1039957224830576_7977153184958307050_n.jpg"
                  alt="Team"
                  className="rounded-[2.5rem] w-full aspect-[4/5] object-cover shadow-2xl"
                />
              </div>
            </div>
            {/* Floating Badge */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-[#1F6F3D] rounded-full flex flex-col items-center justify-center text-white shadow-2xl border-4 border-white">
              <span className="text-3xl font-black leading-none" style={{ fontFamily: 'Outfit, sans-serif' }}>15+</span>
              <span className="text-[8px] font-bold uppercase tracking-widest">Years of Hope</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
