'use client';

import { useState } from 'react';
import { Search, Bell, User, Moon, Sun, LogOut, Settings, CreditCard } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export function Header() {
  const { theme, setTheme } = useTheme();
  const { currentUser, logout } = useAuth();
  const router = useRouter();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [unreadCount] = useState(2);

  const handleLogout = async () => {
    try {
      await logout();
      toast.success('Successfully logged out');
      router.push('/login');
    } catch (error) {
      toast.error('Failed to log out');
    }
  };

  return (
    <div className="card-gradient rounded-2xl px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex-1 max-w-xl">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search templates, categories, or metrics..."
              className="w-full pl-10 pr-4 py-2 bg-[#282A33] border border-[#282A33] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6563fc] text-gray-100 placeholder-gray-400"
            />
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          {/* Dark Mode Toggle */}
          <div className="flex items-center gap-2 bg-[#1C1D24] rounded-2xl p-1.5">
            <button
              onClick={() => setTheme('light')}
              className={`flex items-center justify-center w-8 h-8 rounded-xl transition-all ${
                theme === 'light'
                  ? 'bg-transparent text-[#FFD43B]'
                  : 'text-gray-400'
              }`}
            >
              <Sun className="w-5 h-5" />
            </button>
            <button
              onClick={() => setTheme('dark')}
              className={`flex items-center justify-center w-8 h-8 rounded-xl transition-all ${
                theme === 'dark'
                  ? 'bg-[#6563fc] text-white'
                  : 'text-gray-400'
              }`}
            >
              <Moon className="w-5 h-5" />
            </button>
          </div>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 hover:bg-[#282A33] rounded-lg"
            >
              <Bell className="w-5 h-5 text-gray-400" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>
          </div>
          
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-3 pl-4 border-l border-[#282A33]"
            >
              <div className="text-right">
                <p className="text-sm font-medium text-gray-100">
                  {currentUser?.displayName || 'John Cooper'}
                </p>
                <p className="text-xs text-gray-400">Premium Plan</p>
              </div>
              <div className="w-10 h-10 bg-[#282A33] rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-[#6563fc]" />
              </div>
            </button>

            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-56 card-gradient rounded-lg shadow-lg border border-[#282A33] py-2 z-50">
                <div className="px-4 py-2 border-b border-[#282A33]">
                  <p className="text-sm font-medium text-gray-100">
                    {currentUser?.email || 'john@example.com'}
                  </p>
                </div>
                
                <div className="py-1">
                  <button
                    onClick={() => {
                      setShowUserMenu(false);
                      router.push('/settings');
                    }}
                    className="w-full px-4 py-2 text-left text-sm text-gray-300 hover:bg-[#282A33] flex items-center gap-2"
                  >
                    <Settings className="w-4 h-4" />
                    Account Settings
                  </button>
                  <button
                    onClick={() => {
                      setShowUserMenu(false);
                      router.push('/billing');
                    }}
                    className="w-full px-4 py-2 text-left text-sm text-gray-300 hover:bg-[#282A33] flex items-center gap-2"
                  >
                    <CreditCard className="w-4 h-4" />
                    Billing
                  </button>
                </div>

                <div className="border-t border-[#282A33] py-1">
                  <button
                    onClick={handleLogout}
                    className="w-full px-4 py-2 text-left text-sm text-red-400 hover:bg-[#282A33] flex items-center gap-2"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}