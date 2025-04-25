interface NavItemProps {
  href: string;
  isScrolled: boolean;
  children: React.ReactNode;
}

export default function NavItem({ href, isScrolled, children }: NavItemProps) {
  return (
    <a
      className={`transition-colors ${
        isScrolled
          ? "text-gray-700 hover:text-blue-700"
          : "text-white hover:text-blue-200"
      }`}
      href={href}
    >
      {children}
    </a>
  );
}
