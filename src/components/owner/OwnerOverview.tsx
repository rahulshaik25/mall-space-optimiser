
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { 
  Building, 
  DollarSign, 
  Calendar, 
  TrendingUp, 
  Clock,
  Target,
  Users,
  AlertCircle
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

const OwnerOverview = () => {
  // Sample data for owner dashboard
  const monthlyRevenue = [
    { month: 'Jan', revenue: 185000, target: 200000 },
    { month: 'Feb', revenue: 210000, target: 200000 },
    { month: 'Mar', revenue: 195000, target: 200000 },
    { month: 'Apr', revenue: 245000, target: 230000 },
    { month: 'May', revenue: 280000, target: 250000 },
    { month: 'Jun', revenue: 310000, target: 270000 }
  ];

  const spacePerformance = [
    { space: 'Shop A-101', occupancy: 95, revenue: 75000 },
    { space: 'Shop A-102', occupancy: 88, revenue: 68000 },
    { space: 'Shop B-201', occupancy: 75, revenue: 125000 },
    { space: 'Shop B-202', occupancy: 60, revenue: 98000 },
    { space: 'Atrium North', occupancy: 85, revenue: 145000 }
  ];

  const revenueBreakdown = [
    { name: 'Small Shops', value: 485000, color: '#3b82f6' },
    { name: 'Medium Shops', value: 348000, color: '#8b5cf6' },
    { name: 'Atrium Bookings', value: 290000, color: '#10b981' },
    { name: 'Marketing Spaces', value: 102000, color: '#f59e0b' }
  ];

  const stats = [
    {
      title: 'Total Revenue',
      value: '₹3.1M',
      change: '+18.5%',
      icon: DollarSign,
      color: 'bg-green-500',
      trend: 'up'
    },
    {
      title: 'My Spaces',
      value: '8',
      change: '100% Occupied',
      icon: Building,
      color: 'bg-blue-500',
      trend: 'up'
    },
    {
      title: 'This Month',
      value: '₹310K',
      change: '+14.7%',
      icon: Calendar,
      color: 'bg-purple-500',
      trend: 'up'
    },
    {
      title: 'Avg Occupancy',
      value: '82.5%',
      change: '+5.2%',
      icon: Target,
      color: 'bg-orange-500',
      trend: 'up'
    }
  ];

  const upcomingEvents = [
    {
      date: 'June 25',
      event: 'Lease Renewal - Shop A-101',
      type: 'renewal',
      amount: '₹75,000'
    },
    {
      date: 'June 28',
      event: 'New Tenant Meeting',
      type: 'meeting',
      amount: 'Shop B-203'
    },
    {
      date: 'July 01',
      event: 'Monthly Payment Due',
      type: 'payment',
      amount: '₹310,000'
    }
  ];

  const alerts = [
    {
      type: 'info',
      message: 'Shop B-202 occupancy below target (60%)',
      time: '2 hours ago'
    },
    {
      type: 'success',
      message: 'Payment received for Atrium North booking',
      time: '4 hours ago'
    },
    {
      type: 'warning',
      message: 'Maintenance request for Shop A-102',
      time: '1 day ago'
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
        {/* Revenue Trend */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Revenue Trend
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyRevenue}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => [`₹${value.toLocaleString()}`, '']} />
                <Line type="monotone" dataKey="revenue" stroke="#8b5cf6" strokeWidth={3} name="Revenue" />
                <Line type="monotone" dataKey="target" stroke="#e5e7eb" strokeDasharray="5 5" name="Target" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Revenue Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              Revenue Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  dataKey="value"
                  data={revenueBreakdown}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {revenueBreakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`₹${value.toLocaleString()}`, 'Revenue']} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Space Performance */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building className="h-5 w-5" />
            Space Performance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {spacePerformance.map((space, index) => (
              <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">{space.space}</span>
                    <span className="text-sm text-gray-600">₹{space.revenue.toLocaleString()}/month</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex-1">
                      <div className="flex justify-between text-sm mb-1">
                        <span>Occupancy</span>
                        <span>{space.occupancy}%</span>
                      </div>
                      <Progress value={space.occupancy} className="h-2" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Events */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Upcoming Events
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingEvents.map((event, index) => (
                <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="bg-purple-100 p-2 rounded-lg">
                      <Calendar className="h-4 w-4 text-purple-600" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">{event.event}</p>
                      <p className="text-xs text-gray-500">{event.date}</p>
                    </div>
                  </div>
                  <span className="text-sm font-medium text-gray-900">{event.amount}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Alerts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5" />
              Recent Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {alerts.map((alert, index) => (
                <div key={index} className={`p-3 rounded-lg border-l-4 ${
                  alert.type === 'warning' ? 'border-orange-500 bg-orange-50' :
                  alert.type === 'success' ? 'border-green-500 bg-green-50' :
                  'border-blue-500 bg-blue-50'
                }`}>
                  <p className="text-sm font-medium text-gray-900">{alert.message}</p>
                  <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {alert.time}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OwnerOverview;
