import { HandHeart, Droplets, BookOpen, Heart } from "lucide-react";
import Card from "@/components/Card";

const programs = [
  {
    title: "Volunteer Program",
    description:
      "Join our growing community of compassionate volunteers and make a tangible difference in people's lives.",
    icon: HandHeart,
    href: "/volunteer",
    badge: "Join Us",
    image: "/images/orphanage visit/481668096_1037125431780422_7255171986276594410_n.jpg",
  },
  {
    title: "Blood Donation Drive",
    description:
      "Register as a blood donor and be the lifeline for those in critical need across Pakistan.",
    icon: Droplets,
    href: "/blood-donation",
    badge: "Save Lives",
    image: "/images/BloodDonation.png",
  },
  {
    title: "Book Donation Campaign",
    description:
      "Donate books to empower the next generation with knowledge, education, and new opportunities.",
    icon: BookOpen,
    href: "/book-donation",
    badge: "Empower Youth",
    image: "/images/BookDonation.png",
  },
  {
    title: "Financial Donations",
    description:
      "Every contribution directly funds healthcare, education, and disaster relief programs.",
    icon: Heart,
    href: "/contact",
    badge: "Donate Now",
    image: "/images/solar installment/529795874_18496602295067653_8819664083452530924_n.jpg",
  },
];

export default function Programs() {
  return (
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
            stronger, more caring Pakistan.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
          {programs.map((program) => (
            <Card
              key={program.title}
              title={program.title}
              description={program.description}
              icon={program.icon}
              badge={program.badge}
              href={program.href}
              image={program.image}
              className="h-full"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
