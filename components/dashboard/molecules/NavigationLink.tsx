import Link from "next/link";

interface NavigationLinkProps {
  href: string;
  icon: React.ReactNode;
  text: string;
  active?: boolean;
}

export default function NavigationLink({
  href,
  icon,
  text,
  active = false,
}: NavigationLinkProps) {
  return (
    <Link
      className={`
        flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors
        ${
          active
            ? "bg-blue-50 text-blue-700"
            : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
        }
      `}
      href={href}
    >
      {icon}
      <span className="ml-3">{text}</span>
    </Link>
  );
}
