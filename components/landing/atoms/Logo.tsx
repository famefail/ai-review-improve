interface LogoProps {
  isScrolled: boolean;
}

export default function Logo({ isScrolled }: LogoProps) {
  return (
    <div className="flex items-center">
      <div className="h-8 w-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-md mr-2 flex items-center justify-center">
        <span className="text-white font-bold text-lg">A</span>
      </div>
      <span
        className={`font-bold text-xl ${isScrolled ? "text-blue-700" : "text-white"}`}
      >
        AI Review
      </span>
    </div>
  );
}
