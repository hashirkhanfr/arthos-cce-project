import type { Metadata } from "next";
import { BookOpen } from "lucide-react";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Read stories, news, and updates from ARTHO'S Humanitarian Society.",
};

export default function BlogPage() {
  return (
    <div className="section-padding">
      <div className="container-arthos">
        <div className="text-center mb-14">
          <span className="inline-block text-sm font-semibold text-[#1F6F3D] uppercase tracking-widest mb-3">
            Blog
          </span>
          <h1
            className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4"
            style={{ fontFamily: "Outfit, sans-serif" }}
          >
            Stories of Impact
          </h1>
          <p className="text-gray-500 max-w-xl mx-auto">
            Inspiring stories, program updates, and insights from our work across Pakistan.
          </p>
        </div>

        <div className="flex flex-col items-center justify-center py-24 text-center text-gray-400">
          <BookOpen size={48} className="mb-4 text-gray-200" />
          <p className="font-medium text-gray-500">No posts yet</p>
          <p className="text-sm mt-1">Blog posts will appear here once published via the admin panel.</p>
        </div>
      </div>
    </div>
  );
}
