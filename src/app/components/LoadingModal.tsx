import { Shield, Loader2 } from 'lucide-react';
import { Card } from '@/app/components/ui/card';

interface LoadingModalProps {
  isOpen: boolean;
  message: string;
  isClosing: boolean;
}

export function LoadingModal({ isOpen, message, isClosing }: LoadingModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <Card className="bg-white rounded-3xl shadow-2xl max-w-sm w-full p-8 relative animate-scale-in text-center">
        {/* Animated Icon */}
        <div className={`${isClosing ? 'bg-green-100' : 'bg-orange-100'} p-6 rounded-full inline-flex mb-4 relative`}>
          <Shield className={`w-12 h-12 ${isClosing ? 'text-green-600' : 'text-orange-600'}`} />
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader2 className={`w-20 h-20 ${isClosing ? 'text-green-400' : 'text-orange-400'} animate-spin`} />
          </div>
        </div>

        {/* Message */}
        <h2 className="text-xl font-bold text-gray-800 mb-2">{message}</h2>
        <p className="text-gray-600 text-sm">Please wait...</p>

        {/* Progress Dots */}
        <div className="flex justify-center gap-2 mt-6">
          <div className={`w-2 h-2 rounded-full ${isClosing ? 'bg-green-500' : 'bg-orange-500'} animate-pulse`} style={{ animationDelay: '0ms' }}></div>
          <div className={`w-2 h-2 rounded-full ${isClosing ? 'bg-green-500' : 'bg-orange-500'} animate-pulse`} style={{ animationDelay: '150ms' }}></div>
          <div className={`w-2 h-2 rounded-full ${isClosing ? 'bg-green-500' : 'bg-orange-500'} animate-pulse`} style={{ animationDelay: '300ms' }}></div>
        </div>
      </Card>
    </div>
  );
}
