import type { Metadata } from "next";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  return {
    title: `Blog Post — ${slug}`,
    description: "Read this blog post from ARTHO'S Humanitarian Society.",
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;

  if (!slug) notFound();

  return (
    <div className="section-padding">
      <div className="container-arthos max-w-3xl">
        <article>
          <div className="mb-8">
            <span className="inline-block text-sm font-semibold text-[#1F6F3D] uppercase tracking-widest mb-3">
              Blog
            </span>
            <h1
              className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4"
              style={{ fontFamily: "Outfit, sans-serif" }}
            >
              Blog Post: {slug}
            </h1>
            <p className="text-gray-400 text-sm">
              This post will be loaded dynamically from the database.
            </p>
          </div>

          <div className="h-64 w-full rounded-2xl bg-gray-100 mb-8" />

          <div className="prose prose-lg max-w-none text-gray-600">
            <p>Blog content will appear here once fetched from MongoDB.</p>
          </div>
        </article>
      </div>
    </div>
  );
}
