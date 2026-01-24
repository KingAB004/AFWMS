import { Droplets, AlertTriangle, Activity, MapPin } from 'lucide-react';
import { Card } from '@/app/components/ui/card';
import { useState } from 'react';
import { Switch } from '@/app/components/ui/switch';
import { Shield, RefreshCw } from 'lucide-react';
import { ConfirmationModal } from '@/app/components/ConfirmationModal';
import { LoadingModal } from '@/app/components/LoadingModal';
import { motion } from 'motion/react';
import { WaterLevelChart } from '@/app/components/WaterLevelChart';
import { PullToRefresh } from '@/app/components/PullToRefresh';
import { toast } from 'sonner';

interface DashboardProps {
  onNavigate: (screen: string) => void;
}

export function Dashboard({ onNavigate }: DashboardProps) {
  const [waterLevel, setWaterLevel] = useState(15.2); // meters - Current Marikina River level
  const [lastUpdated, setLastUpdated] = useState('Just now');
  const normalLevel = 12.0; // Normal water level
  const firstAlarm = 15.0; // First Alarm - Preparedness
  const secondAlarm = 16.0; // Second Alarm - Forced Evacuation
  const criticalLevel = 18.0; // Critical/Third Alarm
  const maxLevel = 20.0; // Maximum gauge level
  
  // Determine risk level based on Marikina River alert system
  const getRiskLevelFromWaterLevel = (level: number) => {
    if (level >= secondAlarm) return 'high';
    if (level >= firstAlarm) return 'medium';
    return 'low';
  };
  
  const riskLevel = getRiskLevelFromWaterLevel(waterLevel);
  const percentage = ((waterLevel - normalLevel) / (maxLevel - normalLevel)) * 100;
  
  const [isFloodgateClosed, setIsFloodgateClosed] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [pendingAction, setPendingAction] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Pull to refresh handler
  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Simulate fetching new data
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        // Simulate slight water level change
        const change = (Math.random() - 0.5) * 0.3;
        setWaterLevel(prev => Math.max(12, Math.min(20, parseFloat((prev + change).toFixed(1)))));
        setLastUpdated('Just now');
        toast.success('Data refreshed successfully!', {
          duration: 2000,
        });
        setIsRefreshing(false);
        resolve();
      }, 1500);
    });
  };

  const handleFloodgateToggle = (newState: boolean) => {
    setPendingAction(newState);
    setShowConfirmation(true);
  };

  const confirmFloodgateAction = () => {
    setShowConfirmation(false);
    setIsLoading(true);
    setTimeout(() => {
      setIsFloodgateClosed(pendingAction);
      setIsLoading(false);
    }, 2500); // 2.5 seconds loading time
  };

  const cancelFloodgateAction = () => {
    setShowConfirmation(false);
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low':
        return { bg: 'bg-green-100', text: 'text-green-700', bar: 'bg-green-500', label: 'Low Risk' };
      case 'medium':
        return { bg: 'bg-yellow-100', text: 'text-yellow-700', bar: 'bg-yellow-500', label: 'Medium Risk' };
      case 'high':
        return { bg: 'bg-red-100', text: 'text-red-700', bar: 'bg-red-500', label: 'High Risk' };
      default:
        return { bg: 'bg-gray-100', text: 'text-gray-700', bar: 'bg-gray-500', label: 'Unknown' };
    }
  };

  const risk = getRiskColor(riskLevel);

  return (
    <div className="space-y-4 relative">
      {/* Floating Refresh Button */}
      <motion.button
        onClick={handleRefresh}
        disabled={isRefreshing}
        className="fixed top-6 right-6 z-50 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white p-3 rounded-full shadow-lg"
        whileTap={{ scale: 0.9 }}
        whileHover={{ scale: 1.1 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
        <motion.div
          animate={{ rotate: isRefreshing ? 360 : 0 }}
          transition={{ duration: 1, repeat: isRefreshing ? Infinity : 0, ease: "linear" }}
        >
          <RefreshCw className="w-5 h-5" />
        </motion.div>
      </motion.button>

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-500 text-sm">Real-time monitoring system</p>
      </div>

      {/* Risk Status Card */}
      <Card className={`${risk.bg} border-none shadow-lg rounded-2xl p-6`}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className={`${risk.bar} p-3 rounded-full bg-opacity-20`}>
              <AlertTriangle className={`w-6 h-6 ${risk.text}`} />
            </div>
            <div>
              <p className="text-sm text-gray-600">Current Status</p>
              <p className={`text-xl font-bold ${risk.text}`}>{risk.label}</p>
            </div>
          </div>
        </div>
        <p className="text-sm text-gray-600">
          {riskLevel === 'low' && 'Water levels are normal. No immediate threat.'}
          {riskLevel === 'medium' && 'Water levels are elevated. Stay alert and monitor updates.'}
          {riskLevel === 'high' && 'Critical water levels detected. Prepare for evacuation.'}
        </p>
      </Card>

      {/* Water Level Card with Vertical Gauge */}
      <Card className="bg-white border-none shadow-lg rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-blue-500 p-3 rounded-full">
            <Droplets className="w-6 h-6 text-white" />
          </div>
          <div>
            <p className="text-sm text-gray-600">Water Level Monitor</p>
            <p className="text-2xl font-bold text-gray-800">{waterLevel}m</p>
          </div>
        </div>
        
        {/* Vertical Gauge Visualization */}
        <div className="flex items-center justify-center gap-4 py-4">
          {/* Gauge Container */}
          <div className="relative">
            {/* Gauge Background (Pillar/Post) */}
            <div className="w-24 h-64 bg-gradient-to-b from-gray-300 to-gray-400 rounded-lg shadow-md relative overflow-hidden">
              {/* Scale Markings - Real Marikina River levels */}
              <div className="absolute inset-0 flex flex-col justify-between py-2">
                {[20, 18, 16, 15, 14, 12].map((level) => (
                  <div key={level} className="flex items-center px-2">
                    <div className="h-px w-3 bg-white"></div>
                    <span className="text-xs font-bold text-white ml-1">{level}m</span>
                  </div>
                ))}
              </div>

              {/* Alert Level Zones - Based on actual Marikina River thresholds */}
              <div className="absolute inset-0">
                {/* Critical/3rd Alarm Zone - 18m+ */}
                <div 
                  className="absolute left-0 right-0 bg-red-500 bg-opacity-30 border-t-2 border-red-600" 
                  style={{ 
                    top: '0%', 
                    height: `${((maxLevel - criticalLevel) / (maxLevel - normalLevel)) * 100}%` 
                  }}
                >
                  <span className="text-xs font-bold text-red-800 ml-1">CRITICAL</span>
                </div>
                
                {/* 2nd Alarm Zone - 16-18m */}
                <div 
                  className="absolute left-0 right-0 bg-orange-500 bg-opacity-30 border-t-2 border-orange-600" 
                  style={{ 
                    top: `${((maxLevel - criticalLevel) / (maxLevel - normalLevel)) * 100}%`, 
                    height: `${((criticalLevel - secondAlarm) / (maxLevel - normalLevel)) * 100}%` 
                  }}
                >
                  <span className="text-xs font-bold text-orange-800 ml-1">2ND</span>
                </div>
                
                {/* 1st Alarm Zone - 15-16m */}
                <div 
                  className="absolute left-0 right-0 bg-yellow-500 bg-opacity-30 border-t-2 border-yellow-600" 
                  style={{ 
                    top: `${((maxLevel - secondAlarm) / (maxLevel - normalLevel)) * 100}%`, 
                    height: `${((secondAlarm - firstAlarm) / (maxLevel - normalLevel)) * 100}%` 
                  }}
                >
                  <span className="text-xs font-bold text-yellow-800 ml-1">1ST</span>
                </div>
                
                {/* Normal Zone - Below 15m */}
                <div 
                  className="absolute left-0 right-0 bg-green-500 bg-opacity-20" 
                  style={{ 
                    top: `${((maxLevel - firstAlarm) / (maxLevel - normalLevel)) * 100}%`, 
                    bottom: '0%'
                  }}
                >
                  <span className="text-xs font-bold text-green-800 ml-1">NORMAL</span>
                </div>
              </div>

              {/* Water Level Fill */}
              <div 
                className="absolute bottom-0 left-0 right-0 bg-blue-400 bg-opacity-70 transition-all duration-1000 z-10 overflow-hidden"
                style={{ height: `${Math.min(100, Math.max(0, percentage))}%` }}
              >
                {/* Base Water Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-blue-600 via-blue-500 to-blue-400"></div>
                
                {/* Flowing Water Effect - Multiple layers */}
                <div className="absolute inset-0 opacity-40">
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-300 to-transparent animate-flow"></div>
                </div>
                
                {/* Shimmer/Bubble Effects */}
                <div className="absolute inset-0">
                  <div className="absolute bottom-1/4 left-2 w-1 h-1 bg-white rounded-full opacity-60 animate-shimmer"></div>
                  <div className="absolute bottom-1/3 right-3 w-1.5 h-1.5 bg-white rounded-full opacity-50 animate-shimmer" style={{ animationDelay: '0.5s' }}></div>
                  <div className="absolute bottom-1/2 left-4 w-1 h-1 bg-white rounded-full opacity-70 animate-shimmer" style={{ animationDelay: '1s' }}></div>
                  <div className="absolute bottom-2/3 right-2 w-1 h-1 bg-white rounded-full opacity-40 animate-shimmer" style={{ animationDelay: '1.5s' }}></div>
                  <div className="absolute bottom-3/4 left-3 w-1.5 h-1.5 bg-white rounded-full opacity-55 animate-shimmer" style={{ animationDelay: '2s' }}></div>
                </div>
                
                {/* Animated Waves at Surface */}
                <div className="absolute top-0 left-0 right-0 h-4 overflow-hidden">
                  {/* Wave Layer 1 */}
                  <div className="absolute top-0 left-0 right-0 h-3 bg-blue-300 opacity-70 rounded-full animate-wave"></div>
                  {/* Wave Layer 2 */}
                  <div className="absolute top-1 left-0 right-0 h-3 bg-blue-200 opacity-60 rounded-full animate-wave2"></div>
                  {/* Wave highlights */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-white opacity-40 animate-wave" style={{ animationDelay: '0.5s' }}></div>
                </div>
                
                {/* Light Reflections */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-10"></div>
              </div>

              {/* Current Level Indicator */}
              <div 
                className="absolute left-0 right-0 flex items-center justify-center transition-all duration-1000 z-20"
                style={{ bottom: `${Math.min(100, Math.max(0, percentage))}%` }}
              >
                <div className="absolute -right-10 bg-blue-600 text-white text-xs px-2 py-1 rounded font-bold shadow-lg whitespace-nowrap">
                  {waterLevel}m
                </div>
                {/* Pointer/Arrow to water level */}
                <div className="absolute -left-1 w-0 h-0 border-t-4 border-t-transparent border-b-4 border-b-transparent border-r-8 border-r-blue-600"></div>
              </div>
            </div>

            {/* Base/Ground */}
            <div className="w-28 h-3 bg-gray-600 rounded-sm -ml-2 shadow-md"></div>
          </div>

          {/* Legend */}
          <div className="space-y-3 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-red-500 rounded"></div>
              <div>
                <p className="font-semibold text-gray-800">Critical</p>
                <p className="text-gray-500">18m+ (3rd)</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-orange-500 rounded"></div>
              <div>
                <p className="font-semibold text-gray-800">2nd Alarm</p>
                <p className="text-gray-500">16-18m</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-yellow-500 rounded"></div>
              <div>
                <p className="font-semibold text-gray-800">1st Alarm</p>
                <p className="text-gray-500">15-16m</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-500 rounded"></div>
              <div>
                <p className="font-semibold text-gray-800">Normal</p>
                <p className="text-gray-500">&lt;15m</p>
              </div>
            </div>
          </div>
        </div>

        <p className="text-xs text-gray-500 text-center mt-4">Updated: {lastUpdated}</p>
      </Card>

      {/* Water Level Trend Chart */}
      <Card className="bg-white border-none shadow-lg rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-purple-500 p-3 rounded-full">
            <Activity className="w-6 h-6 text-white" />
          </div>
          <div>
            <p className="text-sm text-gray-600">24-Hour Trend</p>
            <p className="text-lg font-bold text-gray-800">Water Level History</p>
          </div>
        </div>
        <WaterLevelChart />
        <div className="flex items-center justify-between mt-3 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-3 h-0.5 bg-yellow-500"></div>
            <span className="text-gray-600">1st Alarm (15m)</span>
          </div>
          <span className="text-gray-500">Last 24 hours</span>
        </div>
      </Card>

      {/* Quick Actions Grid */}
      <div className="grid grid-cols-2 gap-4">
        <motion.button
          onClick={() => onNavigate('alerts')}
          className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow"
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
          <div className="bg-orange-100 p-3 rounded-full inline-flex mb-3">
            <AlertTriangle className="w-6 h-6 text-orange-600" />
          </div>
          <p className="font-semibold text-gray-800">Alerts</p>
          <p className="text-xs text-gray-500 mt-1">3 New</p>
        </motion.button>

        <motion.button
          onClick={() => onNavigate('sensors')}
          className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow"
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
          <div className="bg-blue-100 p-3 rounded-full inline-flex mb-3">
            <Activity className="w-6 h-6 text-blue-600" />
          </div>
          <p className="font-semibold text-gray-800">Sensor</p>
          <p className="text-xs text-gray-500 mt-1">1 Active</p>
        </motion.button>
      </div>

      {/* Floodgate Control Card */}
      <Card className={`${isFloodgateClosed ? 'bg-green-50' : 'bg-orange-50'} border-none shadow-lg rounded-2xl p-6`}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className={`${isFloodgateClosed ? 'bg-green-500' : 'bg-orange-500'} p-3 rounded-full`}>
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Floodgate Control</p>
              <p className={`text-xl font-bold ${isFloodgateClosed ? 'text-green-700' : 'text-orange-700'}`}>
                {isFloodgateClosed ? 'Closed' : 'Open'}
              </p>
            </div>
          </div>
          <Switch
            checked={isFloodgateClosed}
            onCheckedChange={handleFloodgateToggle}
          />
        </div>
        <div className="space-y-2">
          <p className="text-sm text-gray-700">
            {isFloodgateClosed 
              ? 'Your home floodgate is currently closed and protecting your property.' 
              : 'Your home floodgate is open. Close it when flood risk increases.'}
          </p>
          <div className="bg-white bg-opacity-50 rounded-xl p-3 mt-3">
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-600">Last Action:</span>
              <span className="font-semibold text-gray-800">
                {isFloodgateClosed ? 'Closed just now' : 'Opened 2 hours ago'}
              </span>
            </div>
          </div>
        </div>
      </Card>

      {/* Location Info */}
      <Card className="bg-white border-none shadow-lg rounded-2xl p-4">
        <div className="flex items-center gap-3">
          <MapPin className="w-5 h-5 text-blue-500" />
          <div>
            <p className="text-sm font-medium text-gray-800">Marikina Riverbanks, Marikina City</p>
            <p className="text-xs text-gray-500">Monitoring Station - Zone 1</p>
          </div>
        </div>
      </Card>

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={showConfirmation}
        onClose={cancelFloodgateAction}
        onConfirm={confirmFloodgateAction}
        title={`${pendingAction ? 'Close' : 'Open'} Floodgate?`}
        message={
          pendingAction
            ? 'This will activate your home floodgate to protect against flooding. Make sure you are ready to close the floodgate.'
            : 'This will open your home floodgate. Only do this when water levels are safe and flooding risk is low.'
        }
        action={pendingAction ? 'Close Gate' : 'Open Gate'}
        isWarning={!pendingAction}
      />

      {/* Loading Modal */}
      <LoadingModal
        isOpen={isLoading}
        message={pendingAction ? 'Closing Floodgate...' : 'Opening Floodgate...'}
        isClosing={pendingAction}
      />
    </div>
  );
}