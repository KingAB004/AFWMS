import { User, Bell, Shield, MapPin, Phone, LogOut, ChevronRight } from 'lucide-react';
import { Card } from '@/app/components/ui/card';
import { Switch } from '@/app/components/ui/switch';
import { PageHeader } from '@/app/components/PageHeader';

interface SettingsScreenProps {
  onLogout: () => void;
  onBack: () => void;
}

export function SettingsScreen({ onLogout, onBack }: SettingsScreenProps) {
  return (
    <div className="space-y-4">
      {/* Header */}
      <PageHeader
        title="Settings"
        subtitle="Manage your preferences"
        onBack={onBack}
      />

      {/* Profile Card */}
      <Card className="bg-gradient-to-br from-blue-500 to-blue-600 border-none shadow-lg rounded-2xl p-6 text-white">
        <div className="flex items-center gap-4">
          <div className="bg-white bg-opacity-20 p-4 rounded-full">
            <User className="w-12 h-12" />
          </div>
          <div>
            <p className="text-xl font-bold">Juan Dela Cruz</p>
            <p className="text-sm opacity-90">Homeowner</p>
            <p className="text-xs opacity-75 mt-1">admin@AFWLMS.gov.ph</p>
          </div>
        </div>
      </Card>

      {/* Notification Settings */}
      <div>
        <h2 className="text-sm font-semibold text-gray-600 mb-3 px-1">Notifications</h2>
        <Card className="bg-white border-none shadow-md rounded-2xl divide-y">
          <div className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-orange-100 p-2 rounded-full">
                <Bell className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <p className="font-medium text-gray-800">Push Notifications</p>
                <p className="text-xs text-gray-500">Receive alerts on your device</p>
              </div>
            </div>
            <Switch defaultChecked />
          </div>

          <div className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-red-100 p-2 rounded-full">
                <Bell className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <p className="font-medium text-gray-800">Emergency Alerts</p>
                <p className="text-xs text-gray-500">Critical flood warnings</p>
              </div>
            </div>
            <Switch defaultChecked />
          </div>

          <div className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-blue-100 p-2 rounded-full">
                <Bell className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="font-medium text-gray-800">Daily Updates</p>
                <p className="text-xs text-gray-500">Morning water level summary</p>
              </div>
            </div>
            <Switch />
          </div>
        </Card>
      </div>

      {/* General Settings */}
      <div>
        <h2 className="text-sm font-semibold text-gray-600 mb-3 px-1">General</h2>
        <Card className="bg-white border-none shadow-md rounded-2xl divide-y">
          <button className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
            <div className="flex items-center gap-3">
              <div className="bg-green-100 p-2 rounded-full">
                <MapPin className="w-5 h-5 text-green-600" />
              </div>
              <div className="text-left">
                <p className="font-medium text-gray-800">Location</p>
                <p className="text-xs text-gray-500">Marikina Riverbanks, Marikina City</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>

          <button className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
            <div className="flex items-center gap-3">
              <div className="bg-blue-100 p-2 rounded-full">
                <Phone className="w-5 h-5 text-blue-600" />
              </div>
              <div className="text-left">
                <p className="font-medium text-gray-800">Emergency Contacts</p>
                <p className="text-xs text-gray-500">Manage contact numbers</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>

          <button className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
            <div className="flex items-center gap-3">
              <div className="bg-purple-100 p-2 rounded-full">
                <Shield className="w-5 h-5 text-purple-600" />
              </div>
              <div className="text-left">
                <p className="font-medium text-gray-800">Privacy & Security</p>
                <p className="text-xs text-gray-500">Manage your data</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>
        </Card>
      </div>

      {/* Logout Button */}
      <button
        onClick={onLogout}
        className="w-full bg-white rounded-2xl shadow-md p-4 flex items-center justify-center gap-2 text-red-600 hover:bg-red-50 transition-colors"
      >
        <LogOut className="w-5 h-5" />
        <span className="font-medium">Logout</span>
      </button>

      {/* App Version */}
      <p className="text-center text-xs text-gray-400 py-4">
        AWFMS v1.0.2 • © 2026 Marikina City Government
      </p>
    </div>
  );
}