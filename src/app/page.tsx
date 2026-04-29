import type { Metadata } from "next";
import Hero from "@/components/home/Hero";
import Programs from "@/components/home/Programs";
import Values from "@/components/home/Values";
import CtaBanner from "@/components/home/CtaBanner";
import ImpactGallery from "@/components/home/ImpactGallery";
import BlogPreview from "@/components/home/BlogPreview";

export const metadata: Metadata = {
  title: "ARTHO'S Humanitarian Society | Hope. Action. Change.",
  description:
    "Join ARTHO'S in creating positive change through volunteering, blood donation, book drives, and community development programs across Pakistan.",
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <Programs />
      <Values />
      <CtaBanner />
      <ImpactGallery />
      <BlogPreview />
    </>
  );
}
