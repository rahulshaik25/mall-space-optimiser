
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Building, 
  DollarSign, 
  Calendar, 
  TrendingUp, 
  AlertTriangle,
  Users,
  Clock,
  Target
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

const DashboardOverview = () => {
  // Sample data for charts
  const revenueData = [
    { month: 'Jan', revenue: 450000, target: 500000 },
    { month: 'Feb', revenue: 520000, target: 500000 },
    { month: 'Mar', revenue: 480000, target: 500000 },
    { month: 'Apr', revenue: 680000, target: 600000 },
    { month: 'May', revenue: 750000, target: 700000 },
    { month: 'Jun', revenue: 820000, target: 750000 }
  ];

  const spaceUtilization = [
    { name: 'Small Shops', value: 85, color: '#3b82f6' },
    { name: 'Medium Shops', value: 72, color: '#8b5cf6' },
    { name: 'Large Shops', value: 45, color: '#10b981' },
    { name: 'Atrium North', value: 90, color: '#f59e0b' },
    { name: 'Atrium South', value: 78, color: '#ef4444' },
    { name: 'Cinema', value: 95, color: '#6366f1' }
  ];

  const occupancyData = [
    { name: 'Small Shops', occupied: 34, vacant: 6 },
    { name: 'Medium Shops', occupied: 18, vacant: 7 },
    { name: 'Large Shops', occupied: 9, vacant: 11 },
    { name: 'Atrium', occupied: 8, vacant: 2 },
    { name: 'Cinema', occupied: 4, vacant: 1 }
  ];

  const COLORS = ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444', '#6366f1'];

  const stats = [
    {
      title: 'Total Revenue',
      value: '₹8.2M',
      change: '+12.5%',
      icon: DollarSign,
      color: 'bg-green-500',
      trend: 'up'
    },
    {
      title: 'Occupied Spaces',
      value: '73/93',
      change: '78.5%',
      icon: Building,
      color: 'bg-blue-500',
      trend: 'up'
    },
    {
      title: 'Active Bookings',
      value: '156',
      change: '+8.2%',
      icon: Calendar,
      color: 'bg-purple-500',
      trend: 'up'
    },
    {
      title: 'Pending Issues',
      value: '7',
      change: '-2',
      icon: AlertTriangle,
      color: 'bg-orange-500',
      trend: 'down'
    }
  ];

  const alerts = [
    {
      type: 'warning',
      message: '3 Large Shops will be vacant next week',
      time: '2 hours ago'
    },
    {
      type: 'info',
      message: 'Cinema Theater booking rate increased by 15%',
      time: '4 hours ago'
    },
    {
      type: 'urgent',
      message: 'Atrium South maintenance required',
      time: '6 hours ago'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="relative overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                    <p className={`text-sm mt-1 ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                      {stat.change} from last month
                    </p>
                  </div>
                  <div className={`${stat.color} p-3 rounded-lg`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Revenue vs Target
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => [`₹${value.toLocaleString()}`, '']} />
                <Bar dataKey="revenue" fill="#3b82f6" name="Revenue" />
                <Bar dataKey="target" fill="#e5e7eb" name="Target" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Space Utilization */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building className="h-5 w-5" />
              Space Utilization
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {spaceUtilization.map((space, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">{space.name}</span>
                    <span className="text-gray-600">{space.value}%</span>
                  </div>
                  <Progress value={space.value} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Occupancy Chart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Space Occupancy Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={occupancyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="occupied" stackId="a" fill="#10b981" name="Occupied" />
                <Bar dataKey="vacant" stackId="a" fill="#ef4444" name="Vacant" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Alerts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              Recent Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {alerts.map((alert, index) => (
                <div key={index} className={`p-3 rounded-lg border-l-4 ${
                  alert.type === 'urgent' ? 'border-red-500 bg-red-50' :
                  alert.type === 'warning' ? 'border-orange-500 bg-orange-50' :
                  'border-blue-500 bg-blue-50'
                }`}>
                  <p className="text-sm font-medium text-gray-900">{alert.message}</p>
                  <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {alert.time}
                  </p>
                </div>
              ))}
              <Button variant="outline" className="w-full mt-4">
                View All Alerts
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardOverview;
