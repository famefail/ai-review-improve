interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
  bulletPoints: string[];
  bgColor: string;
}

export default function FeatureCard({
  icon,
  title,
  description,
  bulletPoints,
  bgColor,
}: FeatureCardProps) {
  return (
    <div className="bg-white p-8 rounded-xl shadow-lg transform transition-transform hover:-translate-y-2 duration-300">
      <div
        className={`w-16 h-16 ${bgColor} rounded-lg flex items-center justify-center mb-6`}
      >
        <span className="text-3xl">{icon}</span>
      </div>
      <h3 className="text-xl font-bold mb-3 text-gray-900">{title}</h3>
      <p className="text-gray-700 mb-4">{description}</p>
      <ul className="text-sm text-gray-600 space-y-2">
        {bulletPoints.map((point) => (
          // ใช้ตัว point เองเป็น key (ถ้าไม่ซ้ำกัน) หรือสร้าง unique key
          <li key={`${title}-${point}`} className="flex items-center">
            <svg
              className="w-4 h-4 mr-2 text-green-500"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                clipRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                fillRule="evenodd"
              />
            </svg>
            {point}
          </li>
        ))}
      </ul>
    </div>
  );
}
