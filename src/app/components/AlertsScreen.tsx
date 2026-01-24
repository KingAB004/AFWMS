import { AlertTriangle, AlertCircle, Info, Clock } from 'lucide-react';
import { Card } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { PageHeader } from '@/app/components/PageHeader';

const alerts = [
  {
    id: 1,
    type: 'high',
    title: 'High Water Level Alert',
    message: 'Water level reached 15.2m at Marikina River. First alarm threshold reached. Prepare for possible evacuation.',
    time: '10 minutes ago',
    location: 'Marikina River - Tumana Bridge',
  },
  {
    id: 2,
    type: 'medium',
    title: 'Rising Water Level',
    message: 'Water level increasing at 0.3m/hour. Continue monitoring.',
    time: '1 hour ago',
    location: 'Pasig River - C5 Bridge Area',
  },
  {
    id: 3,
    type: 'info',
    title: 'Weather Advisory',
    message: 'Heavy rainfall expected in the next 6 hours. Monitor water levels closely.',
    time: '2 hours ago',
    location: 'PAGASA Weather Bureau',
  },
  {
    id: 4,
    type: 'low',
    title: 'Water Level Stable',
    message: 'Manggahan Floodway levels stable at 6.5m. Normal operations.',
    time: '5 hours ago',
    location: 'Manggahan Floodway',
  },
  {
    id: 5,
    type: 'info',
    title: 'System Update',
    message: 'New sensor installed at Napindan Channel. Now monitoring water levels in real-time.',
    time: '1 day ago',
    location: 'Taguig - C6 near Napindan Channel',
  },
];

interface AlertsScreenProps {
  onBack: () => void;
}

export function AlertsScreen({ onBack }: AlertsScreenProps) {
  const getAlertStyle = (type: string) => {
    switch (type) {
      case 'high':
        return {
          icon: AlertTriangle,
          bg: 'bg-red-50',
          iconBg: 'bg-red-100',
          iconColor: 'text-red-600',
          badge: 'bg-red-500',
        };
      case 'medium':
        return {
          icon: AlertCircle,
          bg: 'bg-yellow-50',
          iconBg: 'bg-yellow-100',
          iconColor: 'text-yellow-600',
          badge: 'bg-yellow-500',
        };
      case 'low':
        return {
          icon: Info,
          bg: 'bg-green-50',
          iconBg: 'bg-green-100',
          iconColor: 'text-green-600',
          badge: 'bg-green-500',
        };
      default:
        return {
          icon: Info,
          bg: 'bg-blue-50',
          iconBg: 'bg-blue-100',
          iconColor: 'text-blue-600',
          badge: 'bg-blue-500',
        };
    }
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <PageHeader
        title="Alerts"
        subtitle="Recent notifications and warnings"
        onBack={onBack}
      />

      {/* Alerts List */}
      <div className="space-y-3">
        {alerts.map((alert) => {
          const style = getAlertStyle(alert.type);
          const Icon = style.icon;

          return (
            <Card
              key={alert.id}
              className={`${style.bg} border-none shadow-md rounded-2xl p-4 hover:shadow-lg transition-shadow`}
            >
              <div className="flex gap-3">
                <div className={`${style.iconBg} p-2 rounded-full h-fit`}>
                  <Icon className={`w-5 h-5 ${style.iconColor}`} />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-1">
                    <h3 className="font-semibold text-gray-800">{alert.title}</h3>
                    <Badge className={`${style.badge} text-white text-xs px-2 py-0.5`}>
                      {alert.type.toUpperCase()}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-700 mb-2">{alert.message}</p>
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{alert.time}</span>
                    </div>
                    <span>•</span>
                    <span>{alert.location}</span>
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Clear All Button */}
      <button className="w-full bg-white rounded-2xl shadow-md p-4 text-sm text-gray-600 hover:bg-gray-50 transition-colors">
        Mark all as read
      </button>
    </div>
  );
}