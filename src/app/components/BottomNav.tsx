import navImage from 'figma:asset/fe89a15f285340f866108eda6aad7f6048bd9ba3.png';

interface BottomNavProps {
  activeScreen: string;
  onNavigate: (screen: string) => void;
}

export function BottomNav({ activeScreen, onNavigate }: BottomNavProps) {
  const navItems = [
    { id: 'dashboard', label: 'Home' },
    { id: 'alerts', label: 'Alerts' },
    { id: 'sensors', label: 'Sensors' },
    { id: 'settings', label: 'Settings' },
  ];

  return (
    <div className="bg-white border-t border-gray-200 shadow-lg mt-4">
      <div className="relative">
        {/* Background Image */}
        <img src={navImage} alt="Navigation" className="w-full h-auto pointer-events-none" />
        
        {/* Clickable Overlays */}
        <div className="absolute inset-0 grid grid-cols-4">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full h-full transition-all ${
                activeScreen === item.id 
                  ? 'bg-blue-500/20' 
                  : 'hover:bg-gray-100/10'
              }`}
              aria-label={item.label}
            >
              {/* Active Indicator */}
              {activeScreen === item.id && (
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-1 bg-blue-500 rounded-t-full shadow-lg shadow-blue-500/50" />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}