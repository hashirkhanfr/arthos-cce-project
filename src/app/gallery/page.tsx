import type { Metadata } from "next";
import { Image as ImageIcon } from "lucide-react";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Explore photos from ARTHO'S events, volunteer programs, and community initiatives.",
};

export default function GalleryPage() {
  return (
    <div className="section-padding">
      <div className="container-arthos">
        <div className="text-center mb-14">
          <span className="inline-block text-sm font-semibold text-[#1F6F3D] uppercase tracking-widest mb-3">
            Gallery
          </span>
          <h1
            className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4"
            style={{ fontFamily: "Outfit, sans-serif" }}
          >
            Moments That Matter
          </h1>
          <p className="text-gray-500 max-w-xl mx-auto">
            Browse through the highlights of our events, campaigns, and community stories.
          </p>
        </div>

        <div className="flex flex-col items-center justify-center py-24 text-center text-gray-400">
          <ImageIcon size={48} className="mb-4 text-gray-200" />
          <p className="font-medium text-gray-500">Gallery coming soon</p>
          <p className="text-sm mt-1">Photos will appear here once uploaded via the admin panel.</p>
        </div>
      </div>
    </div>
  );
}
