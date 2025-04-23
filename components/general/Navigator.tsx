"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const Navigator = () => {
  const path = usePathname();
  console.log(path);
  const navPages = [
    { name: "หน้าหลัก", url: "/" },
    { name: "Dashboard", url: "/overview" },
    { name: "Ai Assists", url: "/ai-assists" },
  ];
  return (
    <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
      {navPages.map((page, index) => {
        const key = `page-${index}`;
        return (
          <Link
            key={key}
            href={page.url}
            className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
          >
            {page.name}
          </Link>
        );
      })}
    </div>
  );
};

export default Navigator;
