import Link from "next/link";

interface GradientButtonProps {
  href: string;
  children: React.ReactNode;
  primary?: boolean;
  className?: string;
}

export default function GradientButton({
  href,
  children,
  primary = true,
  className = "",
}: GradientButtonProps) {
  const baseClasses =
    "px-8 py-4 rounded-lg font-semibold transition-all duration-200 text-center transform hover:scale-105";

  const primaryClasses = "bg-white text-blue-700 hover:bg-blue-50 shadow-lg";

  const secondaryClasses =
    "bg-blue-500 bg-opacity-20 backdrop-blur-sm text-white hover:bg-opacity-30 border border-white border-opacity-30";

  const buttonClasses = `${baseClasses} ${primary ? primaryClasses : secondaryClasses} ${className}`;

  return (
    <Link className={buttonClasses} href={href}>
      {children}
    </Link>
  );
}
