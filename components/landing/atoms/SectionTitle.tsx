interface SectionTitleProps {
    title: string;
    subtitle?: string;
    center?: boolean;
  }
  
  export default function SectionTitle({ title, subtitle, center = true }: SectionTitleProps) {
    return (
      <div className={`mb-16 ${center ? 'text-center' : ''}`}>
        <div className="relative">

          <h2 className="text-3xl md:text-4xl font-bold mb-5 text-gray-900 inline-block relative">
            {title}
            <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full"></div>
          </h2>
        </div>
        {subtitle && (
          <p className="text-gray-700 max-w-2xl mx-auto mt-4">
            {subtitle}
          </p>
        )}
      </div>
    );
  }