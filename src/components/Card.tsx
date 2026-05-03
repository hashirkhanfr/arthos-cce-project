import { type LucideIcon } from "lucide-react";
import Link from "next/link";

interface CardProps {
  title: string;
  description?: string;
  icon?: LucideIcon;
  image?: string;
  badge?: string;
  href?: string;
  className?: string;
  children?: React.ReactNode;
  accentColor?: string;
}

export default function Card({
  title,
  description,
  icon: Icon,
  image,
  badge,
  href,
  className = "",
  children,
  accentColor = "#1F6F3D",
}: CardProps) {
  const content = (
    <div
      className={`bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm card-hover ${className}`}
    >
      {image && (
        <div className="relative w-full aspect-square overflow-hidden bg-gray-50">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          {badge && (
            <span className="absolute top-4 left-4 text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg bg-white/90 backdrop-blur-sm text-[#1F6F3D] shadow-lg">
              {badge}
            </span>
          )}
        </div>
      )}

      <div className="p-6">
        {Icon && !image && (
          <div
            className="flex items-center justify-center w-12 h-12 rounded-xl mb-4"
            style={{ backgroundColor: `${accentColor}15` }}
          >
            <Icon size={22} style={{ color: accentColor }} />
          </div>
        )}

        {badge && !image && (
          <span
            className="inline-block text-xs font-semibold px-3 py-1 rounded-full mb-3"
            style={{ backgroundColor: `${accentColor}15`, color: accentColor }}
          >
            {badge}
          </span>
        )}

        <h3 className="text-lg font-bold text-gray-900 mb-2 leading-tight">
          {title}
        </h3>

        {description && (
          <p className="text-sm text-gray-500 leading-relaxed">{description}</p>
        )}

        {children && <div className="mt-4">{children}</div>}
      </div>
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="block">
        {content}
      </Link>
    );
  }

  return content;
}
