
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Building, 
  DollarSign, 
  Calendar, 
  TrendingUp, 
  AlertTriangle, 
  LogOut,
  Menu,
  X
} from 'lucide-react';
import OwnerOverview from '../owner/OwnerOverview';
import OwnerSpaces from '../owner/OwnerSpaces';
import OwnerBookings from '../owner/OwnerBookings';
import OwnerRevenue from '../owner/OwnerRevenue';

const SpaceOwnerDashboard = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const navigationItems = [
    { id: 'overview', label: 'Overview', icon: TrendingUp },
    { id: 'spaces', label: 'My Spaces', icon: Building },
    { id: 'bookings', label: 'Bookings', icon: Calendar },
    { id: 'revenue', label: 'Revenue', icon: DollarSign },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-64' : 'w-16'} transition-all duration-300 bg-white shadow-lg border-r border-gray-200 flex flex-col`}>
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            {sidebarOpen && (
              <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                eMall Owner
              </h1>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="h-8 w-8 p-0"
            >
              {sidebarOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-2">
          <div className="space-y-1">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <Button
                  key={item.id}
                  variant={activeTab === item.id ? "default" : "ghost"}
                  className={`w-full justify-start h-10 ${!sidebarOpen && 'px-2'} ${
                    activeTab === item.id 
                      ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white' 
                      : 'hover:bg-gray-100'
                  }`}
                  onClick={() => setActiveTab(item.id)}
                >
                  <Icon className={`h-4 w-4 ${sidebarOpen ? 'mr-3' : ''}`} />
                  {sidebarOpen && <span>{item.label}</span>}
                </Button>
              );
            })}
          </div>
        </nav>

        {/* User Section */}
        <div className="p-4 border-t border-gray-200">
          {sidebarOpen && (
            <div className="mb-3">
              <p className="text-sm font-medium text-gray-900">{user.name}</p>
              <p className="text-xs text-gray-500">Space Owner</p>
            </div>
          )}
          <Button
            variant="outline"
            className={`w-full ${!sidebarOpen && 'px-2'} border-red-200 text-red-600 hover:bg-red-50`}
            onClick={onLogout}
          >
            <LogOut className={`h-4 w-4 ${sidebarOpen ? 'mr-2' : ''}`} />
            {sidebarOpen && 'Logout'}
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <div className="bg-white shadow-sm border-b border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-gray-900">
              {navigationItems.find(item => item.id === activeTab)?.label}
            </h2>
            <div className="text-sm text-gray-500">
              {new Date().toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-auto p-6">
          {activeTab === 'overview' && <OwnerOverview />}
          {activeTab === 'spaces' && <OwnerSpaces />}
          {activeTab === 'bookings' && <OwnerBookings />}
          {activeTab === 'revenue' && <OwnerRevenue />}
        </div>
      </div>
    </div>
  );
};

export default SpaceOwnerDashboard;
