import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { LoginScreen } from '@/app/components/LoginScreen';
import { Dashboard } from '@/app/components/Dashboard';
import { AlertsScreen } from '@/app/components/AlertsScreen';
import { SensorStatus } from '@/app/components/SensorStatus';
import { SettingsScreen } from '@/app/components/SettingsScreen';
import { BottomNav } from '@/app/components/BottomNav';
import { Toaster } from '@/app/components/ui/sonner';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeScreen, setActiveScreen] = useState('dashboard');
  const [direction, setDirection] = useState(0);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setActiveScreen('dashboard');
  };

  const handleNavigate = (screen: string) => {
    // Determine slide direction based on screen order
    const screenOrder = ['dashboard', 'alerts', 'sensors', 'settings'];
    const currentIndex = screenOrder.indexOf(activeScreen);
    const newIndex = screenOrder.indexOf(screen);
    setDirection(newIndex > currentIndex ? 1 : -1);
    setActiveScreen(screen);
  };

  if (!isLoggedIn) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  // Page transition variants
  const pageVariants = {
    initial: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    animate: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -300 : 300,
      opacity: 0,
    }),
  };

  const pageTransition = {
    type: 'tween',
    ease: 'anticipate',
    duration: 0.4,
  };

  return (
    <div className="min-h-screen bg-gray-800 flex items-center justify-center p-4">
      <Toaster position="top-center" />
      {/* Mobile Phone Frame */}
      <div className="relative w-full max-w-[375px] h-[812px] bg-black rounded-[3rem] shadow-2xl border-8 border-gray-900 overflow-hidden">
        {/* Phone Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-7 bg-black rounded-b-3xl z-50"></div>
        
        {/* Phone Screen */}
        <div className="w-full h-full bg-gray-50 overflow-hidden">
          {/* Content Area with AnimatePresence for transitions */}
          <div className="p-4 h-[calc(100%-70px)] overflow-y-auto">
            <AnimatePresence mode="wait" custom={direction}>
              {activeScreen === 'dashboard' && (
                <motion.div
                  key="dashboard"
                  custom={direction}
                  variants={pageVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={pageTransition}
                >
                  <Dashboard onNavigate={handleNavigate} />
                </motion.div>
              )}
              {activeScreen === 'alerts' && (
                <motion.div
                  key="alerts"
                  custom={direction}
                  variants={pageVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={pageTransition}
                >
                  <AlertsScreen onBack={() => handleNavigate('dashboard')} />
                </motion.div>
              )}
              {activeScreen === 'sensors' && (
                <motion.div
                  key="sensors"
                  custom={direction}
                  variants={pageVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={pageTransition}
                >
                  <SensorStatus onBack={() => handleNavigate('dashboard')} />
                </motion.div>
              )}
              {activeScreen === 'settings' && (
                <motion.div
                  key="settings"
                  custom={direction}
                  variants={pageVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={pageTransition}
                >
                  <SettingsScreen onLogout={handleLogout} onBack={() => handleNavigate('dashboard')} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Bottom Navigation */}
          <BottomNav activeScreen={activeScreen} onNavigate={handleNavigate} />
        </div>
      </div>
    </div>
  );
}