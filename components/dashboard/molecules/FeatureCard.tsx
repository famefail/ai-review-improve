import Link from "next/link";
import { useTheme } from "@/contexts/ThemeContext";

interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
  href?: string;
  color?: string;
}

export default function FeatureCard({
  icon,
  title,
  description,
  href,
  color = "from-blue-500 to-indigo-600"
}: FeatureCardProps) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  const content = (
    <div className={`group relative overflow-hidden rounded-xl border ${
      isDark 
        ? "border-gray-700 bg-gray-800/80 hover:border-gray-600" 
        : "border-gray-100 bg-white hover:border-gray-200"
    } p-4 sm:p-6 transition-all duration-300 hover:shadow-xl hover:scale-[1.02]`}>
      {/* Gradient Background */}
      <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
      
      {/* Icon Container */}
      <div className={`mb-4 inline-block rounded-lg p-3 transition-transform duration-300 group-hover:scale-110 ${
        isDark 
          ? "bg-gradient-to-br from-gray-700 to-gray-600" 
          : "bg-gradient-to-br from-gray-50 to-gray-100"
      }`}>
        <span className="text-2xl sm:text-3xl">{icon}</span>
      </div>
      
      {/* Content */}
      <h3 className={`mb-2 text-base sm:text-lg font-semibold transition-colors duration-300 ${
        isDark ? "text-white" : "text-gray-900"
      }`}>
        {title}
      </h3>
      <p className={`text-sm transition-colors duration-300 ${
        isDark ? "text-gray-300" : "text-gray-600"
      }`}>
        {description}
      </p>
      
      {/* Decorative Corner */}
      <div className={`absolute bottom-0 right-0 h-16 w-16 translate-x-8 translate-y-8 transform rounded-full transition-transform duration-300 group-hover:translate-x-4 group-hover:translate-y-4 ${
        isDark 
          ? "bg-gradient-to-br from-blue-500/5 to-purple-500/5" 
          : "bg-gradient-to-br from-blue-500/10 to-purple-500/10"
      }`} />
    </div>
  );

  if (href) {
    return <Link href={href}>{content}</Link>;
  }

  return content;
}