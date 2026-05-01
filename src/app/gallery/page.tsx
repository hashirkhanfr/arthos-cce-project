import { connectDB } from "@/lib/mongodb";
import GalleryCollection from "@/models/GalleryCollection";
import { motion } from "framer-motion";
import GalleryClient from "@/components/gallery/GalleryClient";

export const metadata = {
  title: "Our Impact Gallery | ARTHO'S",
  description: "Visual stories of change and hope across Pakistan. Explore our recent activities and relief missions.",
};

export default async function GalleryPage() {
  await connectDB();
  
  const collections = await GalleryCollection.find({ status: 'published' })
    .sort({ createdAt: -1 })
    .lean();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-[#1F6F3D] to-[#14532D] text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('/bg-noise.png')] opacity-10"></div>
        <div className="container-arthos relative z-10">
          <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight">Our Impact in <span className="text-white underline decoration-[#E8D3A5] underline-offset-8">Photos</span></h1>
          <p className="text-xl text-green-50/80 max-w-2xl leading-relaxed">
            Witness the transformations and stories of hope through our lens. Every picture represents a life touched and a community strengthened.
          </p>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-20">
        <div className="container-arthos">
          <GalleryClient collections={JSON.parse(JSON.stringify(collections))} />
        </div>
      </section>
    </div>
  );
}
