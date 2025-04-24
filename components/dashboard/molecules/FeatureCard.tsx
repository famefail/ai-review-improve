import Link from "next/link";

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
  color = "from-blue-500 to-indigo-600",
}: FeatureCardProps) {
  const content = (
    <div className="group relative overflow-hidden rounded-xl border border-gray-100 bg-white p-6 transition-all duration-300 hover:shadow-xl hover:scale-[1.02] hover:border-transparent">
      {/* Gradient Background */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
      />

      {/* Icon Container */}
      <div className="mb-4 inline-block rounded-lg bg-gradient-to-br from-gray-50 to-gray-100 p-3 transition-transform duration-300 group-hover:scale-110">
        <span className="text-3xl">{icon}</span>
      </div>

      {/* Content */}
      <h3 className="mb-2 text-lg font-semibold text-gray-900 transition-colors duration-300 group-hover:text-gray-900">
        {title}
      </h3>
      <p className="text-sm text-gray-600 transition-colors duration-300">
        {description}
      </p>

      {/* Decorative Corner */}
      <div className="absolute bottom-0 right-0 h-16 w-16 translate-x-8 translate-y-8 transform rounded-full bg-gradient-to-br from-blue-500/10 to-purple-500/10 transition-transform duration-300 group-hover:translate-x-4 group-hover:translate-y-4" />
    </div>
  );

  if (href) {
    return <Link href={href}>{content}</Link>;
  }

  return content;
}
