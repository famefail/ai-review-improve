import DiscordStatus from "@/components/discord/DiscordStatus";
import { useTheme } from "@/contexts/ThemeContext";

export default function ConnectionStatus() {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  return (
    <div className="relative group">
      <div
        className={`absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-300`}
      />
      <div
        className={`relative ${
          isDark
            ? "bg-gray-800/90 border-gray-700"
            : "bg-white/90 border-gray-100"
        } backdrop-blur-lg rounded-xl shadow-lg border overflow-hidden`}
      >
        <div
          className={`px-4 sm:px-6 py-4 border-b ${
            isDark
              ? "border-gray-700 bg-gradient-to-r from-blue-900/30 to-indigo-900/30"
              : "border-gray-100 bg-gradient-to-r from-blue-50 to-indigo-50"
          }`}
        >
          <div className="flex items-center justify-between">
            <h2
              className={`text-lg sm:text-xl font-semibold ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              สถานะการเชื่อมต่อ
            </h2>
            <div className="flex items-center">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500" />
              </span>
              <span
                className={`ml-2 text-sm font-medium ${
                  isDark ? "text-green-400" : "text-green-600"
                }`}
              >
                Active
              </span>
            </div>
          </div>
        </div>
        <div className="p-4 sm:p-6">
          <DiscordStatus />
        </div>
      </div>
    </div>
  );
}
