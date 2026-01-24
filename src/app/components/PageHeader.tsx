import { ChevronLeft } from 'lucide-react';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  onBack: () => void;
}

export function PageHeader({ title, subtitle, onBack }: PageHeaderProps) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <button
        onClick={onBack}
        className="bg-white rounded-full p-2 shadow-md hover:shadow-lg transition-shadow"
      >
        <ChevronLeft className="w-6 h-6 text-gray-700" />
      </button>
      <div>
        <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
        {subtitle && <p className="text-gray-500 text-sm">{subtitle}</p>}
      </div>
    </div>
  );
}
