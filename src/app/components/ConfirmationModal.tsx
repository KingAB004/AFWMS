import { AlertTriangle, X } from 'lucide-react';
import { Card } from '@/app/components/ui/card';

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  action: string;
  isWarning?: boolean;
}

export function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  action,
  isWarning = false,
}: ConfirmationModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <Card className="bg-white rounded-3xl shadow-2xl max-w-sm w-full p-6 relative animate-scale-in">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
        >
          <X className="w-5 h-5 text-gray-500" />
        </button>

        {/* Icon */}
        <div className={`${isWarning ? 'bg-orange-100' : 'bg-blue-100'} p-4 rounded-full inline-flex mb-4`}>
          <AlertTriangle className={`w-8 h-8 ${isWarning ? 'text-orange-600' : 'text-blue-600'}`} />
        </div>

        {/* Title */}
        <h2 className="text-xl font-bold text-gray-800 mb-2">{title}</h2>

        {/* Message */}
        <p className="text-gray-600 text-sm mb-6">{message}</p>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className={`flex-1 ${isWarning ? 'bg-orange-500 hover:bg-orange-600' : 'bg-blue-500 hover:bg-blue-600'} text-white py-3 rounded-xl font-semibold transition-colors`}
          >
            {action}
          </button>
        </div>
      </Card>
    </div>
  );
}
