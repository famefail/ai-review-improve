interface BenefitItemProps {
    icon: React.ReactNode;
    title: string;
    description: string;
    bgColor: string;
    iconColor: string;
  }
  
  export default function BenefitItem({ 
    icon, 
    title, 
    description, 
    bgColor, 
    iconColor 
  }: BenefitItemProps) {
    return (
      <div className="flex p-4 hover:bg-gray-50 rounded-lg transition-colors">
        <div className="flex-shrink-0 mr-4">
          <div className={`w-12 h-12 ${bgColor} rounded-full flex items-center justify-center ${iconColor} shadow-sm`}>
            {icon}
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2 text-gray-900">{title}</h3>
          <p className="text-gray-700">
            {description}
          </p>
        </div>
      </div>
    );
  }