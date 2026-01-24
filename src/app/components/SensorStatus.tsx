import { Activity, Wifi, MapPin, Gauge, Droplets, Signal } from 'lucide-react';
import { Card } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { PageHeader } from '@/app/components/PageHeader';

// Single sensor for homeowner's property
const sensor = {
  id: 1,
  name: 'Home Sensor #1',
  location: 'Marikina Riverbanks, Marikina City',
  status: 'online',
  waterLevel: 15.2,
  battery: 87,
  signalStrength: 95,
  lastUpdate: 'Just now',
  installedDate: 'Jan 5, 2026',
};

interface SensorStatusProps {
  onBack: () => void;
}

export function SensorStatus({ onBack }: SensorStatusProps) {
  return (
    <div className="space-y-4">
      {/* Header */}
      <PageHeader
        title="Sensor Status"
        subtitle="Your water level monitor"
        onBack={onBack}
      />

      {/* Status Summary Card */}
      <Card className="bg-gradient-to-br from-blue-500 to-blue-600 border-none shadow-lg rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm opacity-90">Sensor Status</p>
            <p className="text-4xl font-bold">ONLINE</p>
            <p className="text-xs opacity-75 mt-1">Operating normally</p>
          </div>
          <div className="bg-white bg-opacity-20 p-4 rounded-full">
            <Activity className="w-8 h-8" />
          </div>
        </div>
        <div className="mt-4 flex gap-2">
          <Badge className="bg-white bg-opacity-20 text-white border-none">
            Real-time Updates
          </Badge>
          <Badge className="bg-green-500 bg-opacity-80 text-white border-none">
            Connected
          </Badge>
        </div>
      </Card>

      {/* Location Map */}
      <Card className="bg-white border-none shadow-lg rounded-2xl p-4 overflow-hidden">
        <div className="mb-2">
          <p className="text-sm font-semibold text-gray-800">Sensor Location</p>
          <p className="text-xs text-gray-500">{sensor.location}</p>
        </div>
        <div className="bg-gradient-to-br from-blue-100 to-blue-50 rounded-xl h-48 flex items-center justify-center relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <MapPin className="w-16 h-16 text-blue-400 opacity-30" />
          </div>
          {/* Your sensor marker */}
          <div className="absolute w-6 h-6 rounded-full bg-green-500 animate-pulse shadow-lg" style={{ left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}>
            <div className="absolute inset-0 rounded-full bg-green-400 animate-ping"></div>
          </div>
          <p className="text-sm text-gray-600 z-10 mt-20">Your Property</p>
        </div>
      </Card>

      {/* Sensor Details Card */}
      <Card className="bg-white border-none shadow-lg rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="bg-green-100 p-3 rounded-full">
              <Wifi className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="font-semibold text-gray-800">{sensor.name}</p>
              <p className="text-xs text-gray-500">{sensor.location}</p>
            </div>
          </div>
          <Badge className="bg-green-500 text-white text-xs">
            ONLINE
          </Badge>
        </div>

        {/* Sensor Metrics Grid */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-blue-50 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Droplets className="w-5 h-5 text-blue-600" />
              <p className="text-xs text-gray-600">Water Level</p>
            </div>
            <p className="text-2xl font-bold text-gray-800">{sensor.waterLevel}m</p>
            <p className="text-xs text-gray-500 mt-1">1st Alarm Level</p>
          </div>

          <div className="bg-green-50 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Activity className="w-5 h-5 text-green-600" />
              <p className="text-xs text-gray-600">Battery</p>
            </div>
            <p className="text-2xl font-bold text-gray-800">{sensor.battery}%</p>
            <p className="text-xs text-gray-500 mt-1">Excellent</p>
          </div>

          <div className="bg-purple-50 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Signal className="w-5 h-5 text-purple-600" />
              <p className="text-xs text-gray-600">Signal</p>
            </div>
            <p className="text-2xl font-bold text-gray-800">{sensor.signalStrength}%</p>
            <p className="text-xs text-gray-500 mt-1">Strong</p>
          </div>

          <div className="bg-orange-50 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Gauge className="w-5 h-5 text-orange-600" />
              <p className="text-xs text-gray-600">Status</p>
            </div>
            <p className="text-lg font-bold text-gray-800">Active</p>
            <p className="text-xs text-gray-500 mt-1">{sensor.lastUpdate}</p>
          </div>
        </div>

        {/* Additional Info */}
        <div className="border-t pt-4 space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Last Updated</span>
            <span className="font-semibold text-gray-800">{sensor.lastUpdate}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Installed Date</span>
            <span className="font-semibold text-gray-800">{sensor.installedDate}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Sensor ID</span>
            <span className="font-mono text-xs font-semibold text-gray-800">AWFMS-MRK-{sensor.id.toString().padStart(4, '0')}</span>
          </div>
        </div>
      </Card>

      {/* Health Status */}
      <Card className="bg-green-50 border-none shadow-lg rounded-2xl p-4">
        <div className="flex items-center gap-3">
          <div className="bg-green-500 p-2 rounded-full">
            <Activity className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1">
            <p className="font-semibold text-green-800">Sensor Health: Excellent</p>
            <p className="text-xs text-green-700">All systems operational. No maintenance required.</p>
          </div>
        </div>
      </Card>
    </div>
  );
}