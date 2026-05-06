import type { Metadata } from "next";
import { 
  Users, Target, Globe, Quote, Heart, Droplets, BookOpen, 
  TrendingUp, ShieldCheck, Zap, HandHeart, Scale, Clock, 
  MapPin, GraduationCap, Stethoscope, Briefcase
} from "lucide-react";

export const metadata: Metadata = {
  title: "About Us | A Decade of Transformational Leadership",
  description:
    "Discover the 15-year legacy of Team Arthos, a multidisciplinary humanitarian organization dedicated to child care, disaster relief, and social justice in Pakistan.",
};

const operationalAreas = ["Rawalpindi", "Kharian", "Multan", "Lahore"];

const disasterTimeline = [
  {
    year: "2010",
    event: "The Inception – Swabi, KPK Floods",
    details: "Founded during the national crisis. Joined the response led by the Govt of Pakistan and Armed Forces, focusing on food, clean water, and emergency health kits."
  },
  {
    year: "2015",
    event: "Multan Flood Relief",
    details: "Distributed food packages, provided health protection for 300+ people, and aided livelihood restoration for 100+ households."
  },
  {
    year: "2020",
    event: "COVID-19 Response",
    details: "Operated under NCOC/NCC coordination. Provided oxygen cylinders and monthly ration provision to thousands of unemployed and low-income families in Rawalpindi, Lahore, and Multan."
  },
  {
    year: "2022",
    event: "D.I. Khan Flood Response",
    details: "Mobilized to assist District Admin after 44,800+ homes were damaged. Provided logistics support and basic necessities to 5 different submerged villages."
  },
  {
    year: "2025",
    event: "Multan & Head Muhammadwala Floods",
    details: "Deployed during the critical 24-hour window. Supported Army-led rescue and district relief efforts, evacuating families and providing food as 4,000+ villages were submerged."
  }
];

export default function AboutPage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative pt-12 pb-20 md:pt-20 md:pb-32 overflow-hidden bg-[#F5F1E9]">
        <div className="container-arthos relative z-10">
          <div className="max-w-4xl">
            <span className="inline-block text-xs md:text-sm font-black text-[#1F6F3D] uppercase tracking-[0.2em] mb-4 md:mb-6">
              Our Legacy Since 2010
            </span>
            <h1 
              className="text-3xl sm:text-5xl md:text-7xl font-black text-gray-900 leading-[1.1] mb-6 md:mb-8 tracking-tight"
              style={{ fontFamily: 'Outfit, sans-serif' }}
            >
              A Decade-Plus of <br className="hidden sm:block" />
              <span className="text-[#1F6F3D]">Transformational</span> <br />
              Leadership.
            </h1>
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-2xl">
              Founded in the aftermath of the 2010 floods, Team Arthos emerged as a beacon of hope. What began as a grassroots response has evolved into one of Pakistan&apos;s most dynamic social welfare organizations.
            </p>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-1/3 h-full bg-[#1F6F3D]/5 -skew-x-12 transform translate-x-20 hidden lg:block"></div>
      </section>

      {/* The Core Story */}
      <section className="py-16 md:py-24 border-b border-gray-100">
        <div className="container-arthos">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="relative">
              <div className="aspect-[4/5] rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-2xl">
                <img 
                  src="/images/orphanage visit/481668096_1037125431780422_7255171986276594410_n.jpg" 
                  alt="Team Arthos in Action" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 md:-bottom-10 md:-right-10 bg-[#1F6F3D] p-6 md:p-10 rounded-[1.5rem] md:rounded-[2.5rem] text-white shadow-xl">
                <div className="text-3xl md:text-5xl font-black mb-1 md:mb-2" style={{ fontFamily: 'Outfit, sans-serif' }}>15+</div>
                <div className="text-[10px] font-bold uppercase tracking-widest opacity-80">Years of Service</div>
              </div>
            </div>
            <div className="mt-16 lg:mt-0">
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-6 md:mb-8 tracking-tight" style={{ fontFamily: 'Outfit, sans-serif' }}>
                Organized Compassion, Nationally Recognized.
              </h2>
              <div className="space-y-4 md:space-y-6 text-gray-600 text-base md:text-lg leading-relaxed">
                <p>
                  For over 15 years, Team Arthos has relentlessly pursued its mission to uplift humanity, restore dignity to the marginalized, and cultivate an enduring culture of positivity throughout society.
                </p>
                <p>
                  What distinguishes us is our philosophy: <span className="text-[#1F6F3D] font-bold">welfare is not charity, it is responsibility.</span> Through strategic partnerships and relentless on-ground presence, we have redefined civic engagement for a generation.
                </p>
              </div>
              
              <div className="mt-8 md:mt-12">
                <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-4 md:mb-6">Primary Operational Presence</h4>
                <div className="flex flex-wrap gap-2 md:gap-3">
                  {operationalAreas.map(area => (
                    <div key={area} className="flex items-center gap-2 px-4 py-2.5 md:px-5 md:py-3 rounded-xl md:rounded-2xl bg-gray-50 border border-gray-100 text-gray-900 font-bold text-xs md:text-sm">
                      <MapPin size={14} className="text-[#1F6F3D]" />
                      {area}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Diverse Expertise Section */}
      <section className="py-16 md:py-24 bg-gray-50/50">
        <div className="container-arthos">
          <div className="text-center max-w-3xl mx-auto mb-12 md:mb-20">
            <span className="text-[#1F6F3D] text-[10px] md:text-xs font-black uppercase tracking-[0.2em]">The Strength of Team Arthos</span>
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 mt-3 md:mt-4 tracking-tight" style={{ fontFamily: 'Outfit, sans-serif' }}>
              Diverse Professional Expertise
            </h2>
            <p className="mt-4 md:mt-6 text-gray-500 text-base md:text-lg">
              We unite a multidisciplinary coalition of professionals to design and execute interventions with surgical precision and measurable outcomes.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {[
              { icon: Stethoscope, title: "Medical", label: "Doctors & Healthcare Pros" },
              { icon: Zap, title: "Technical", label: "Engineers & Innovators" },
              { icon: GraduationCap, title: "Educational", label: "Teachers & Researchers" },
              { icon: Briefcase, title: "Strategic", label: "Entrepreneurs & Legal Experts" }
            ].map(({ icon: Icon, title, label }) => (
              <div key={title} className="p-8 md:p-10 rounded-[2rem] md:rounded-[2.5rem] bg-white border border-gray-100 shadow-sm hover:shadow-xl transition-all text-center group">
                <div className="w-14 h-14 md:w-16 md:h-16 bg-[#1F6F3D]/5 rounded-xl md:rounded-2xl flex items-center justify-center mx-auto mb-4 md:mb-6 group-hover:bg-[#1F6F3D] group-hover:text-white transition-all">
                  <Icon size={28} />
                </div>
                <h3 className="font-black text-gray-900 mb-2 tracking-tight uppercase text-[10px] md:text-xs">{title}</h3>
                <p className="text-xs md:text-sm text-gray-500 font-bold">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Humanitarian Portfolio */}
      <section className="py-16 md:py-24">
        <div className="container-arthos">
          <div className="text-center mb-12 md:mb-20">
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tight underline decoration-[#1F6F3D] decoration-4 md:decoration-8 underline-offset-[8px] md:underline-offset-[12px]" style={{ fontFamily: 'Outfit, sans-serif' }}>
              Our Comprehensive Portfolio
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {/* Child & Elder Care */}
            <div className="p-8 md:p-10 rounded-[2rem] md:rounded-[3rem] bg-gray-50 border border-gray-100">
              <div className="w-12 h-12 md:w-14 md:h-14 bg-white rounded-xl md:rounded-2xl flex items-center justify-center mb-6 md:mb-8 shadow-sm">
                <HandHeart className="text-[#1F6F3D]" size={24} />
              </div>
              <h3 className="text-xl md:text-2xl font-black text-gray-900 mb-3 md:mb-4 tracking-tight" style={{ fontFamily: 'Outfit, sans-serif' }}>Child & Elder Care</h3>
              <p className="text-sm md:text-base text-gray-500 leading-relaxed mb-4 md:mb-6">
                Structured visitation and support at orphanages and old age homes. We deliver emotional support, workshops, and medical camps to restore joy and dignity.
              </p>
            </div>

            {/* Social Justice */}
            <div className="p-8 md:p-10 rounded-[2rem] md:rounded-[3rem] bg-gray-50 border border-gray-100">
              <div className="w-12 h-12 md:w-14 md:h-14 bg-white rounded-xl md:rounded-2xl flex items-center justify-center mb-6 md:mb-8 shadow-sm">
                <Scale className="text-[#1F6F3D]" size={24} />
              </div>
              <h3 className="text-xl md:text-2xl font-black text-gray-900 mb-3 md:mb-4 tracking-tight" style={{ fontFamily: 'Outfit, sans-serif' }}>Family Welfare</h3>
              <p className="text-sm md:text-base text-gray-500 leading-relaxed mb-4 md:mb-6">
                Our institutionalized dowry assistance programs have facilitated thousands of dignified weddings, breaking cycles of debt and social stigma for underprivileged families.
              </p>
            </div>

            {/* Food & Health */}
            <div className="p-8 md:p-10 rounded-[2rem] md:rounded-[3rem] bg-gray-50 border border-gray-100 md:col-span-2 lg:col-span-1">
              <div className="w-12 h-12 md:w-14 md:h-14 bg-white rounded-xl md:rounded-2xl flex items-center justify-center mb-6 md:mb-8 shadow-sm">
                <ShieldCheck className="text-[#1F6F3D]" size={24} />
              </div>
              <h3 className="text-xl md:text-2xl font-black text-gray-900 mb-3 md:mb-4 tracking-tight" style={{ fontFamily: 'Outfit, sans-serif' }}>Security & Healthcare</h3>
              <p className="text-sm md:text-base text-gray-500 leading-relaxed mb-4 md:mb-6">
                Monthly ration distribution for hundreds of families and medical financing for life-saving surgeries and medications for the destitute.
              </p>
            </div>
          </div>

          {/* Ramzan Highlight */}
          <div className="mt-12 p-8 md:p-12 rounded-[2rem] md:rounded-[3rem] bg-[#1F6F3D] text-white overflow-hidden relative">
            <div className="relative z-10 grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
              <div>
                <span className="text-[10px] font-black uppercase tracking-[0.3em] opacity-70">Special Campaigns</span>
                <h3 className="text-3xl md:text-4xl font-black mt-3 md:mt-4 mb-4 md:mb-6" style={{ fontFamily: 'Outfit, sans-serif' }}>Ramzan Compassion</h3>
                <p className="text-white/80 text-base md:text-lg leading-relaxed">
                  Every year, we orchestrate full-month Ramzan Dastarkhawans across multiple cities, serving hot, nutritious iftar meals to thousands daily. These are symbols of community, equality, and shared humanity.
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                <img src="/images/Ramzan Aftar/DSC_0629.JPG" className="rounded-2xl md:rounded-3xl w-full h-48 sm:h-32 md:h-48 object-cover border-2 md:border-4 border-white/10" alt="Dastarkhawan" />
                <img src="/images/Ramzan Aftar/DSC_0635.JPG" className="rounded-2xl md:rounded-3xl w-full h-48 sm:h-32 md:h-48 object-cover border-2 md:border-4 border-white/10" alt="Iftar" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Disaster Response Timeline */}
      <section className="py-16 md:py-24 bg-gray-900 text-white overflow-hidden">
        <div className="container-arthos">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-20 gap-6 md:gap-8">
            <div className="max-w-2xl">
              <span className="text-[#E8D3A5] text-[10px] md:text-xs font-black uppercase tracking-[0.2em]">A Legacy of Resilience</span>
              <h2 className="text-3xl md:text-6xl font-black mt-3 md:mt-4 tracking-tight" style={{ fontFamily: 'Outfit, sans-serif' }}>
                Disaster Response <br /> & Relief
              </h2>
            </div>
            <p className="text-gray-400 text-base md:text-lg max-w-sm">
              Maintaining a rapid-response unit trained for deployment within hours during national calamities.
            </p>
          </div>

          <div className="space-y-8 md:space-y-12">
            {disasterTimeline.map((item, index) => (
              <div key={item.year} className="group relative flex flex-col sm:flex-row gap-4 md:gap-8 items-start pb-8 md:pb-12 border-b border-white/10 last:border-0">
                <div className="text-4xl md:text-6xl font-black text-[#E8D3A5]/40 md:text-white/10 group-hover:text-[#E8D3A5] transition-all duration-500 min-w-[100px] md:min-w-[140px]" style={{ fontFamily: 'Outfit, sans-serif' }}>
                  {item.year}
                </div>
                <div className="max-w-3xl">
                  <h4 className="text-lg md:text-xl font-black mb-2 md:mb-4 uppercase tracking-wider">{item.event}</h4>
                  <p className="text-sm md:text-base text-gray-400 leading-relaxed">
                    {item.details}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container-arthos">
          <div className="max-w-4xl mx-auto p-8 md:p-16 rounded-[2.5rem] md:rounded-[4rem] bg-[#F5F1E9] text-center border-2 border-dashed border-[#1F6F3D]/20">
            <h2 className="text-2xl md:text-5xl font-black text-gray-900 mb-4 md:mb-6 tracking-tight" style={{ fontFamily: 'Outfit, sans-serif' }}>
              A Movement, Not Just an Organization.
            </h2>
            <p className="text-sm md:text-lg text-gray-600 leading-relaxed mb-8 md:mb-10">
              From a small collective of youth in 2010 to a formidable institution in 2026, Team Arthos stands today as a testament to what vision, unity, and unwavering commitment can achieve.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3 md:gap-4">
              <a href="/volunteer" className="px-8 md:px-10 py-4 md:py-5 bg-[#1F6F3D] text-white font-black rounded-xl md:rounded-2xl hover:bg-[#14532D] transition-all shadow-xl shadow-green-900/20 text-sm md:text-base">
                Join the Movement
              </a>
              <a href="/donate" className="px-8 md:px-10 py-4 md:py-5 bg-white text-[#1F6F3D] font-black rounded-xl md:rounded-2xl border-2 border-[#1F6F3D]/10 hover:border-[#1F6F3D] transition-all text-sm md:text-base">
                Donate Now
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
