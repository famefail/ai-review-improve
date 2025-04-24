"use client";

import { useState, useRef, useEffect } from "react";

import { useTheme } from "@/contexts/ThemeContext";

export default function ThemeSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { theme, setTheme, resolvedTheme } = useTheme();

  const themes = [
    { id: "system", name: "System", icon: "💻", description: "ตามระบบ" },
    { id: "light", name: "Light", icon: "☀️", description: "สว่างสดใส" },
    { id: "dark", name: "Dark", icon: "🌙", description: "สบายตา" },
    { id: "blue", name: "Ocean", icon: "🌊", description: "สีน้ำเงินเย็นตา" },
    { id: "purple", name: "Galaxy", icon: "🌌", description: "สีม่วงลึกลับ" },
    { id: "green", name: "Nature", icon: "🌿", description: "สีเขียวธรรมชาติ" },
  ];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Dynamic button hover color based on resolved theme
  const getButtonClass = () => {
    if (resolvedTheme === "dark") {
      return "hover:bg-gray-700";
    }

    return "hover:bg-gray-100";
  };

  // Dynamic icon color based on resolved theme
  const getIconClass = () => {
    if (resolvedTheme === "dark") {
      return "text-gray-300";
    }

    return "text-gray-600";
  };

  return (
    <div ref={dropdownRef} className="relative">
      <button
        className={`p-2 rounded-lg transition-colors ${getButtonClass()}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <svg
          className={`w-6 h-6 ${getIconClass()}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
          />
          <path
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
          />
        </svg>
      </button>

      {isOpen && (
        <div
          className={`absolute right-0 mt-2 w-64 rounded-lg shadow-lg border overflow-hidden z-50 ${
            resolvedTheme === "dark"
              ? "bg-gray-800 border-gray-700"
              : "bg-white border-gray-200"
          }`}
        >
          <div
            className={`p-4 border-b ${
              resolvedTheme === "dark" ? "border-gray-700" : "border-gray-200"
            }`}
          >
            <h3
              className={`font-semibold ${
                resolvedTheme === "dark" ? "text-gray-100" : "text-gray-900"
              }`}
            >
              เลือกธีม
            </h3>
          </div>

          <div className="p-2">
            {themes.map((item) => (
              <button
                key={item.id}
                className={`w-full flex items-center px-3 py-2 rounded-md transition-colors ${
                  theme === item.id
                    ? resolvedTheme === "dark"
                      ? "bg-blue-900 text-blue-100"
                      : "bg-blue-50 text-blue-700"
                    : resolvedTheme === "dark"
                      ? "hover:bg-gray-700 text-gray-200"
                      : "hover:bg-gray-50 text-gray-700"
                }`}
                onClick={() => {
                  setTheme(item.id as any);
                  setIsOpen(false);
                }}
              >
                <span className="text-xl mr-3">{item.icon}</span>
                <div className="text-left">
                  <div className="font-medium">{item.name}</div>
                  <div
                    className={`text-xs ${
                      resolvedTheme === "dark"
                        ? "text-gray-400"
                        : "text-gray-500"
                    }`}
                  >
                    {item.description}
                  </div>
                </div>
                {theme === item.id && (
                  <svg
                    className={`w-5 h-5 ml-auto ${
                      resolvedTheme === "dark"
                        ? "text-blue-400"
                        : "text-blue-500"
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M5 13l4 4L19 7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                    />
                  </svg>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
