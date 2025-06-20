
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from '../components/auth/Login';
import MarketingDashboard from '../components/dashboards/MarketingDashboard';
import SpaceOwnerDashboard from '../components/dashboards/SpaceOwnerDashboard';
import { useToast } from '../hooks/use-toast';

const Index = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem('propertyManagementUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('propertyManagementUser', JSON.stringify(userData));
    toast({
      title: "Login Successful",
      description: `Welcome back, ${userData.name}!`,
    });
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('propertyManagementUser');
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {user.role === 'marketing' ? (
        <MarketingDashboard user={user} onLogout={handleLogout} />
      ) : (
        <SpaceOwnerDashboard user={user} onLogout={handleLogout} />
      )}
    </div>
  );
};

export default Index;
