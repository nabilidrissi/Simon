'use client';

import { useState } from 'react';
import { User, Bell, Lock, Palette, CreditCard, Users, Save, Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

const sections = [
  {
    id: 'profile',
    icon: User,
    title: 'Profile Settings',
    description: 'Manage your account information'
  },
  {
    id: 'notifications',
    icon: Bell,
    title: 'Notifications',
    description: 'Configure your notification preferences'
  },
  {
    id: 'security',
    icon: Lock,
    title: 'Security',
    description: 'Update your password and security settings'
  },
  {
    id: 'appearance',
    icon: Palette,
    title: 'Appearance',
    description: 'Customize your interface'
  },
  {
    id: 'billing',
    icon: CreditCard,
    title: 'Billing',
    description: 'Manage your subscription and billing'
  },
  {
    id: 'team',
    icon: Users,
    title: 'Team',
    description: 'Manage team members and permissions'
  }
];

const plans = [
  {
    name: 'Free',
    price: '$0',
    features: ['5 templates per month', 'Basic analytics', 'Email support']
  },
  {
    name: 'Pro',
    price: '$29',
    features: ['Unlimited templates', 'Advanced analytics', 'Priority support', 'Custom branding']
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    features: ['Custom solutions', 'Dedicated support', 'SLA', 'Advanced security']
  }
];

export function Settings() {
  const { theme, setTheme } = useTheme();
  const { currentUser } = useAuth();
  const router = useRouter();
  const [activeSection, setActiveSection] = useState('profile');
  const [isDirty, setIsDirty] = useState(false);
  const [formData, setFormData] = useState({
    name: currentUser?.displayName || '',
    email: currentUser?.email || '',
    company: '',
    role: '',
    notifications: {
      email: true,
      push: true,
      updates: true,
      marketing: false
    },
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleSave = () => {
    toast.success('Settings saved successfully');
    setIsDirty(false);
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    setIsDirty(true);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Settings</h1>
          <p className="mt-1 text-gray-400">
            Manage your account preferences and settings
          </p>
        </div>
        {isDirty && (
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Save className="w-4 h-4" />
            Save Changes
          </button>
        )}
      </div>

      <div className="grid grid-cols-12 gap-8">
        {/* Sidebar */}
        <div className="col-span-12 md:col-span-3">
          <div className="bg-gray-800/95 backdrop-blur-sm rounded-xl border border-gray-700 shadow-[0_0_15px_rgba(101,99,252,0.1)] overflow-hidden">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`w-full flex items-center gap-3 p-4 text-left transition-colors ${
                  activeSection === section.id
                    ? 'bg-blue-600/20 border-l-4 border-blue-600'
                    : 'hover:bg-gray-700/50'
                }`}
              >
                <section.icon className={`w-5 h-5 ${
                  activeSection === section.id
                    ? 'text-blue-400'
                    : 'text-gray-400'
                }`} />
                <div>
                  <h3 className={`font-medium ${
                    activeSection === section.id
                      ? 'text-blue-400'
                      : 'text-white'
                  }`}>
                    {section.title}
                  </h3>
                  <p className="text-sm text-gray-400">
                    {section.description}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="col-span-12 md:col-span-9">
          <div className="bg-gray-800/95 backdrop-blur-sm rounded-xl border border-gray-700 shadow-[0_0_15px_rgba(101,99,252,0.1)] p-6">
            {activeSection === 'profile' && (
              <div className="space-y-6">
                <h2 className="text-lg font-semibold text-white">Profile Information</h2>
                <div className="grid grid-cols-1 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Full Name</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 text-white"
                      placeholder="Enter your name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Email Address</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 text-white"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>
              </div>
            )}

            {activeSection === 'appearance' && (
              <div className="space-y-6">
                <h2 className="text-lg font-semibold text-white">Appearance Settings</h2>
                <div className="space-y-4">
                  <div className="p-4 bg-gray-700/50 rounded-lg">
                    <h3 className="font-medium text-white mb-2">Theme</h3>
                    <div className="flex gap-4">
                      <button
                        onClick={() => setTheme('light')}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                          theme === 'light'
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-600 text-gray-300 hover:bg-gray-500'
                        }`}
                      >
                        <Sun className="w-5 h-5" />
                        Light
                      </button>
                      <button
                        onClick={() => setTheme('dark')}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                          theme === 'dark'
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-600 text-gray-300 hover:bg-gray-500'
                        }`}
                      >
                        <Moon className="w-5 h-5" />
                        Dark
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}