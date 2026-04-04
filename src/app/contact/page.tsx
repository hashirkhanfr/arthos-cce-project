import type { Metadata } from "next";
import { 
  Phone, MapPin, 
  Send, MessageCircle, Clock, Heart, 
  ShieldCheck, Droplets, BookOpen, Utensils
} from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Us | Team Arthos",
  description: "Get in touch with Team Arthos. Follow us on Instagram and Facebook or reach out via phone for volunteer opportunities and support.",
};

const InstagramIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
);

const FacebookIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const contactMethods = [
  {
    icon: InstagramIcon,
    title: "Instagram",
    value: "@arthosteam",
    href: "https://www.instagram.com/arthosteam/",
    color: "#E1306C",
    description: "Follow our journey and daily updates."
  },
  {
    icon: FacebookIcon,
    title: "Facebook",
    value: "Team Arthos",
    href: "https://www.facebook.com/always.ready.to.help.others",
    color: "#1877F2",
    description: "Join our community and discussions."
  },
  {
    icon: Phone,
    title: "Phone",
    value: "+92 302 5155918",
    href: "tel:+923025155918",
    color: "#1F6F3D",
    description: "Call or WhatsApp for immediate queries."
  },
  {
    icon: MapPin,
    title: "Head Office",
    value: "Multan, Pakistan",
    href: "#",
    color: "#C9A86A",
    description: "Our primary center for disaster coordination."
  }
];

const impactPoints = [
  {
    icon: Utensils,
    title: "Food Security",
    text: "Your contributions fund our monthly ration distributions and Ramzan Dastarkhawans, ensuring no family goes hungry."
  },
  {
    icon: Heart,
    title: "Medical Aid",
    text: "We finance life-saving surgeries and treatments for the destitute, providing critical healthcare where it's needed most."
  },
  {
    icon: BookOpen,
    title: "Education & Books",
    text: "Help us collect and distribute books to underprivileged students, empowering the next generation through knowledge."
  },
  {
    icon: ShieldCheck,
    title: "Disaster Relief",
    text: "Maintain our 24/7 rapid response unit for flood and calamity relief, providing food, shelter, and logistics support."
  }
];

export default function ContactPage() {
  return (
    <div className="bg-white">
      {/* Header */}
      <section className="relative py-24 bg-[#F5F1E9] overflow-hidden">
        <div className="container-arthos relative z-10 text-center">
          <span className="inline-block text-sm font-black text-[#1F6F3D] uppercase tracking-[0.3em] mb-6">
            Get In Touch
          </span>
          <h1 
            className="text-5xl md:text-7xl font-black text-gray-900 leading-tight mb-8"
            style={{ fontFamily: 'Outfit, sans-serif' }}
          >
            We are <span className="text-[#1F6F3D]">Always Ready</span> <br />
            To Help Others.
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Have questions about volunteering, our programs, or how you can contribute? Reach out through any of the channels below.
          </p>
        </div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full opacity-5 pointer-events-none">
          <Heart size={400} className="mx-auto mt-10 fill-[#1F6F3D]" />
        </div>
      </section>

      {/* Contact & Impact Grid */}
      <section className="py-24">
        <div className="container-arthos">
          <div className="grid lg:grid-cols-2 gap-20 items-start">
            {/* Left: Contact Cards */}
            <div className="grid sm:grid-cols-2 gap-6">
              {contactMethods.map((method) => (
                <a 
                  key={method.title}
                  href={method.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-8 rounded-[2rem] bg-white border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300"
                    style={{ backgroundColor: `${method.color}15`, color: method.color }}
                  >
                    <method.icon size={24} />
                  </div>
                  <h3 className="text-lg font-black text-gray-900 mb-1 uppercase tracking-tight" style={{ fontFamily: 'Outfit, sans-serif' }}>
                    {method.title}
                  </h3>
                  <p className="text-[#1F6F3D] font-bold text-xs mb-3 break-words">
                    {method.value}
                  </p>
                  <p className="text-gray-400 text-xs leading-relaxed">
                    {method.description}
                  </p>
                </a>
              ))}
            </div>

            {/* Right: Impact Text */}
            <div className="lg:sticky lg:top-32">
              <span className="inline-block text-xs font-black text-[#1F6F3D] uppercase tracking-[0.3em] mb-6">
                Our Mission & Your Support
              </span>
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-8 leading-tight tracking-tight" style={{ fontFamily: 'Outfit, sans-serif' }}>
                How Your <br />
                <span className="text-[#1F6F3D]">Contributions</span> Help
              </h2>
              
              <div className="space-y-6 text-gray-600 text-lg leading-relaxed">
                <p>
                  Every act of generosity, whether through resources or professional expertise, directly fuels our mission across Pakistan. Your contributions enable us to maintain a consistent lifeline for thousands in need.
                </p>
                <p>
                  <strong className="text-gray-900">Food Security:</strong> We fund monthly ration distributions and Ramzan Dastarkhawans, ensuring no family goes hungry in our operational regions.
                </p>
                <p>
                  <strong className="text-gray-900">Medical Aid:</strong> We finance life-saving surgeries and essential treatments for the destitute, providing critical healthcare where it&apos;s needed most.
                </p>
                <p>
                  <strong className="text-gray-900">Education:</strong> We collect and distribute books to underprivileged students, empowering the next generation through structured educational support.
                </p>
                <p>
                  <strong className="text-gray-900">Disaster Relief:</strong> Your support maintains our 24/7 rapid response unit for flood and calamity relief, providing food, shelter, and vital logistics on the ground.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Direct Message Info */}
      <section className="py-24 bg-gray-50">
        <div className="container-arthos">
          <div className="max-w-5xl mx-auto rounded-[4rem] bg-white border border-gray-100 shadow-xl overflow-hidden grid lg:grid-cols-2">
            <div className="p-16 bg-[#1F6F3D] text-white">
              <h2 className="text-4xl font-black mb-8 leading-tight" style={{ fontFamily: 'Outfit, sans-serif' }}>
                Join the <br /> 
                Movement Today.
              </h2>
              <div className="space-y-8">
                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                    <MessageCircle size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold mb-1 uppercase tracking-widest text-xs opacity-70">Fast Response</h4>
                    <p className="text-white/80">Our team is active on Instagram DMs for quick assistance.</p>
                  </div>
                </div>
                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                    <Clock size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold mb-1 uppercase tracking-widest text-xs opacity-70">Operational Hours</h4>
                    <p className="text-white/80">24/7 Rapid Response for Emergency Disaster Relief.</p>
                  </div>
                </div>
                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold mb-1 uppercase tracking-widest text-xs opacity-70">Main Hubs</h4>
                    <p className="text-white/80">Rawalpindi, Lahore, Multan, and Kharian.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-16 flex flex-col justify-center">
              <h3 className="text-2xl font-black text-gray-900 mb-6" style={{ fontFamily: 'Outfit, sans-serif' }}>
                Ready to make an impact?
              </h3>
              <p className="text-gray-500 mb-10 leading-relaxed text-lg">
                Whether you want to volunteer your professional expertise or contribute resources, we are just a message away. Join thousands of youngsters making a real difference in Pakistan.
              </p>
              <div className="space-y-4">
                <a 
                  href="https://www.instagram.com/arthosteam/" 
                  className="flex items-center justify-center gap-3 w-full py-5 bg-[#1F6F3D] text-white font-black rounded-2xl hover:bg-[#14532D] transition-all shadow-lg"
                >
                  <InstagramIcon size={20} /> Message on Instagram
                </a>
                <a 
                  href="tel:+923025155918" 
                  className="flex items-center justify-center gap-3 w-full py-5 bg-gray-900 text-white font-black rounded-2xl hover:bg-black transition-all shadow-lg"
                >
                  <Phone size={20} /> Call for Support
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
