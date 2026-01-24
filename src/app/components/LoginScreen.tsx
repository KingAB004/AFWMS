import { useState } from 'react';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import logoImage from 'figma:asset/69846a36ffe7b743b9bad487dc2089f59882a584.png';

interface LoginScreenProps {
  onLogin: () => void;
}

export function LoginScreen({ onLogin }: LoginScreenProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin();
  };

  return (
    <div className="min-h-screen bg-gray-800 flex items-center justify-center p-4">
      {/* Mobile Phone Frame */}
      <div className="relative w-full max-w-[375px] h-[812px] bg-black rounded-[3rem] shadow-2xl border-8 border-gray-900 overflow-hidden">
        {/* Phone Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-7 bg-black rounded-b-3xl z-50"></div>
        
        {/* Phone Screen */}
        <div className="w-full h-full bg-gradient-to-b from-blue-400 to-blue-600 flex items-center justify-center p-6 overflow-y-auto">
          <div className="w-full max-w-sm">
            <div className="bg-white rounded-3xl shadow-2xl p-6">
              <div className="flex flex-col items-center mb-6">
                <img src={logoImage} alt="AWFMS Logo" className="w-32 h-32 mb-3 object-contain" />
                <p className="text-gray-500 text-xs text-center">Automated Floodgate & Waterlevel Monitoring System</p>
              </div>

              <form onSubmit={handleLogin} className="space-y-3">
                <div>
                  <label htmlFor="username" className="block text-xs font-medium text-gray-700 mb-1">
                    Username
                  </label>
                  <Input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter your username"
                    className="w-full rounded-xl text-sm"
                  />
                </div>

                <div>
                  <label htmlFor="password" className="block text-xs font-medium text-gray-700 mb-1">
                    Password
                  </label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full rounded-xl text-sm"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white rounded-xl h-10 mt-4 text-sm"
                >
                  Login
                </Button>
              </form>

              <div className="mt-4 text-center">
                <a href="#" className="text-xs text-blue-500 hover:text-blue-600">
                  Forgot password?
                </a>
              </div>
            </div>

            <p className="text-white text-center text-xs mt-3">
              Emergency Hotline: 911 | Barangay Hotline: (02) 8646-1753
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}