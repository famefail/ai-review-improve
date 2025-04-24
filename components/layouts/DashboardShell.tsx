"use client";

import Link from "next/link";
import { useState } from "react";

import Navigator from "@/components/layouts/Navigator";
import NotificationDropdown from "@/components/layouts/NotificationDropdown";
import ThemeSwitcher from "@/components/layouts/ThemeSwitcher";
import { useTheme } from "@/contexts/ThemeContext";

interface DashboardShellProps {
  children: React.ReactNode;
}

export default function DashboardShell({ children }: DashboardShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { resolvedTheme } = useTheme();

  // Dynamic background based on resolved theme
  const getBackgroundClass = () => {
    switch (resolvedTheme) {
      case "dark":
        return "bg-gradient-to-br from-gray-900 to-gray-800";
      case "blue":
        return "bg-gradient-to-br from-blue-50 to-blue-100";
      case "purple":
        return "bg-gradient-to-br from-purple-50 to-purple-100";
      case "green":
        return "bg-gradient-to-br from-green-50 to-green-100";
      default:
        return "bg-gradient-to-br from-gray-50 to-gray-100";
    }
  };

  // Dynamic sidebar background based on resolved theme
  const getSidebarClass = () => {
    switch (resolvedTheme) {
      case "dark":
        return "bg-gradient-to-b from-gray-800 to-gray-900";
      case "blue":
        return "bg-gradient-to-b from-blue-600 to-blue-800";
      case "purple":
        return "bg-gradient-to-b from-purple-600 to-purple-800";
      case "green":
        return "bg-gradient-to-b from-green-600 to-green-800";
      default:
        return "bg-gradient-to-b from-indigo-600 to-blue-700";
    }
  };

  return (
    <div className={`min-h-screen ${getBackgroundClass()}`}>
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 h-screen transition-all duration-300 
          ${sidebarOpen ? "w-64" : "w-20"} 
          ${getSidebarClass()}
          backdrop-blur-lg 
          shadow-2xl 
          border-r border-white/10`}
      >
        <div className="flex items-center justify-between h-16 px-4">
          <Link className="flex items-center space-x-2 group" href="/">
            <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center backdrop-blur-xl group-hover:bg-white/20 transition-all">
              <span className="text-2xl font-bold text-white">A</span>
            </div>
            {sidebarOpen && (
              <span className="text-white font-bold text-lg">AI Review</span>
            )}
          </Link>

          <button
            className="p-1 rounded-lg hover:bg-white/10 text-white/80 hover:text-white transition-colors"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d={
                  sidebarOpen
                    ? "M11 19l-7-7 7-7m8 14l-7-7 7-7"
                    : "M13 5l7 7-7 7M5 5l7 7-7 7"
                }
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
              />
            </svg>
          </button>
        </div>

        <nav className="px-4 mt-8">
          <Navigator sidebarOpen={sidebarOpen} />
        </nav>

        {/* User Profile */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <div
            className={`flex items-center space-x-3 p-3 rounded-xl bg-white/10 hover:bg-white/20 transition-all cursor-pointer`}
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center">
              <span className="text-white font-medium">JD</span>
            </div>
            {sidebarOpen && (
              <div>
                <div className="text-white font-medium">John Doe</div>
                <div className="text-white/60 text-sm">Developer</div>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main
        className={`transition-all duration-300 ${sidebarOpen ? "ml-64" : "ml-20"}`}
      >
        {/* Top Bar */}
        <header
          className={`sticky top-0 z-30 backdrop-blur-md ${
            resolvedTheme === "dark"
              ? "bg-gray-900/70 border-gray-700/50"
              : "bg-white/70 border-gray-200/50"
          } border-b`}
        >
          <div className="flex items-center justify-between h-16 px-8">
            <div className="flex items-center space-x-4">
              {/* Search Bar */}
              <div className="relative">
                <input
                  className={`w-64 pl-10 pr-4 py-2 rounded-lg border transition-all ${
                    resolvedTheme === "dark"
                      ? "bg-gray-800 border-gray-700 text-gray-100 placeholder-gray-400 focus:border-blue-500"
                      : "border-gray-200 focus:border-blue-500"
                  } focus:ring-2 focus:ring-blue-200`}
                  placeholder="ค้นหา..."
                  type="text"
                />
                <svg
                  className={`w-5 h-5 absolute left-3 top-2.5 ${
                    resolvedTheme === "dark" ? "text-gray-400" : "text-gray-400"
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                  />
                </svg>
              </div>
            </div>

            <div className="flex items-center space-x-6">
              {/* Notifications */}
              <NotificationDropdown />
              {/* Theme Switcher */}
              <ThemeSwitcher />
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-8">{children}</div>
      </main>
    </div>
  );
}
