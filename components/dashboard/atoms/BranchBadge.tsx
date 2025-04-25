import { useTheme } from "@/contexts/ThemeContext";

interface BranchBadgeProps {
  branch: string;
}

export default function BranchBadge({ branch }: BranchBadgeProps) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  const getBadgeStyles = () => {
    switch (branch.toLowerCase()) {
      case "main":
      case "master":
        return isDark
          ? "bg-green-900/50 text-green-300 border-green-800/50"
          : "bg-green-100 text-green-800 border-green-200";
      case "develop":
      case "dev":
        return isDark
          ? "bg-yellow-900/50 text-yellow-300 border-yellow-800/50"
          : "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "staging":
        return isDark
          ? "bg-purple-900/50 text-purple-300 border-purple-800/50"
          : "bg-purple-100 text-purple-800 border-purple-200";
      default:
        return isDark
          ? "bg-blue-900/50 text-blue-300 border-blue-800/50"
          : "bg-blue-100 text-blue-800 border-blue-200";
    }
  };

  return (
    <span
      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full border ${getBadgeStyles()}`}
    >
      {branch}
    </span>
  );
}
