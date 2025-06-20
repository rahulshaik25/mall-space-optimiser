import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  DollarSign, 
  TrendingUp, 
  Download, 
  Calendar, 
  BarChart3,
  PieChart,
  Target,
  AlertCircle
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart as RechartsPieChart, Cell, Area, AreaChart, Pie } from 'recharts';

const OwnerRevenue = () => {
  const [dateRange, setDateRange] = useState({ start: '2024-01-01', end: '2024-06-30' });
  const [reportType, setReportType] = useState('monthly');

  // Sample data for revenue analytics
  const monthlyRevenue = [
    { month: 'Jan', revenue: 411000, target: 400000, expenses: 45000 },
    { month: 'Feb', revenue: 443000, target: 420000, expenses: 52000 },
    { month: 'Mar', revenue: 418000, target: 430000, expenses: 48000 },
    { month: 'Apr', revenue: 514000, target: 480000, expenses: 58000 },
    { month: 'May', revenue: 591000, target: 520000, expenses: 62000 },
    { month: 'Jun', revenue: 656000, target: 550000, expenses: 68000 }
  ];

  const spaceWiseRevenue = [
    { space: 'Shop A-101', revenue: 450000, percentage: 18.2 },
    { space: 'Shop A-102', revenue: 408000, percentage: 16.5 },
    { space: 'Shop B-201', revenue: 750000, percentage: 30.4 },
    { space: 'Shop B-202', revenue: 588000, percentage: 23.8 },
    { space: 'Atrium North', revenue: 274000, percentage: 11.1 }
  ];

  const revenueByType = [
    { name: 'Monthly Leases', value: 1896000, color: '#3b82f6' },
    { name: 'Event Bookings', value: 274000, color: '#8b5cf6' },
    { name: 'Short-term Rentals', value: 156000, color: '#10b981' },
    { name: 'Marketing Spaces', value: 144000, color: '#f59e0b' }
  ];

  const quarterlyComparison = [
    { quarter: 'Q1 2023', revenue: 980000 },
    { quarter: 'Q2 2023', revenue: 1120000 },
    { quarter: 'Q3 2023', revenue: 1280000 },
    { quarter: 'Q4 2023', revenue: 1350000 },
    { quarter: 'Q1 2024', revenue: 1272000 },
    { quarter: 'Q2 2024', revenue: 1761000 }
  ];

  const cashFlow = [
    { month: 'Jan', income: 411000, expenses: 45000, netFlow: 366000 },
    { month: 'Feb', income: 443000, expenses: 52000, netFlow: 391000 },
    { month: 'Mar', income: 418000, expenses: 48000, netFlow: 370000 },
    { month: 'Apr', income: 514000, expenses: 58000, netFlow: 456000 },
    { month: 'May', income: 591000, expenses: 62000, netFlow: 529000 },
    { month: 'Jun', income: 656000, expenses: 68000, netFlow: 588000 }
  ];

  const stats = [
    {
      title: 'Total Revenue (YTD)',
      value: '₹30.33M',
      change: '+22.8%',
      icon: DollarSign,
      color: 'bg-green-500'
    },
    {
      title: 'Monthly Average',
      value: '₹5.05M',
      change: '+18.5%',
      icon: Calendar,
      color: 'bg-blue-500'
    },
    {
      title: 'Best Performing',
      value: 'Shop B-201',
      change: '₹750K total',
      icon: Target,
      color: 'bg-purple-500'
    },
    {
      title: 'Growth Rate',
      value: '38.4%',
      change: 'vs Q2 2023',
      icon: TrendingUp,
      color: 'bg-orange-500'
    }
  ];

  const formatCurrency = (amount) => {
    return `₹${(amount / 1000).toFixed(0)}K`;
  };

  const formatLargeCurrency = (amount) => {
    if (amount >= 10000000) {
      return `₹${(amount / 10000000).toFixed(1)}Cr`;
    } else if (amount >= 100000) {
      return `₹${(amount / 100000).toFixed(1)}L`;
    } else {
      return `₹${(amount / 1000).toFixed(0)}K`;
    }
  };

  const COLORS = ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444', '#6366f1'];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Revenue Analytics</h2>
          <p className="text-gray-600">Comprehensive financial insights and performance tracking</p>
        </div>
        <Button variant="outline" className="flex items-center gap-2">
          <Download className="h-4 w-4" />
          Export Report
        </Button>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="relative overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                    <p className="text-sm text-green-600 mt-1">{stat.change}</p>
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

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label>Report Type</Label>
              <Select value={reportType} onValueChange={setReportType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="monthly">Monthly Analysis</SelectItem>
                  <SelectItem value="quarterly">Quarterly Analysis</SelectItem>
                  <SelectItem value="yearly">Yearly Analysis</SelectItem>
                  <SelectItem value="space-wise">Space-wise Analysis</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label>Start Date</Label>
              <Input
                type="date"
                value={dateRange.start}
                onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label>End Date</Label>
              <Input
                type="date"
                value={dateRange.end}
                onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label>&nbsp;</Label>
              <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                Generate Report
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
          <TabsTrigger value="breakdown">Breakdown</TabsTrigger>
          <TabsTrigger value="cashflow">Cash Flow</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Revenue vs Target */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Revenue vs Target
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={monthlyRevenue}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis tickFormatter={formatCurrency} />
                  <Tooltip formatter={(value) => [formatLargeCurrency(value), '']} />
                  <Bar dataKey="revenue" fill="#8b5cf6" name="Actual Revenue" />
                  <Bar dataKey="target" fill="#e5e7eb" name="Target" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Space Performance */}
          <Card>
            <CardHeader>
              <CardTitle>Space-wise Revenue Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {spaceWiseRevenue.map((space, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium">{space.space}</span>
                        <span className="text-sm text-gray-600">{formatLargeCurrency(space.revenue)}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-purple-600 h-2 rounded-full" 
                          style={{ width: `${space.percentage}%` }}
                        ></div>
                      </div>
                      <div className="text-sm text-gray-500 mt-1">{space.percentage}% of total revenue</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trends" className="space-y-6">
          {/* Quarterly Growth */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Quarterly Revenue Trend
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <AreaChart data={quarterlyComparison}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="quarter" />
                  <YAxis tickFormatter={formatCurrency} />
                  <Tooltip formatter={(value) => [formatLargeCurrency(value), 'Revenue']} />
                  <Area 
                    type="monotone" 
                    dataKey="revenue" 
                    stroke="#8b5cf6" 
                    fill="#8b5cf6" 
                    fillOpacity={0.3}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Monthly Growth Rate */}
          <Card>
            <CardHeader>
              <CardTitle>Monthly Revenue Growth</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={monthlyRevenue}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis tickFormatter={formatCurrency} />
                  <Tooltip formatter={(value) => [formatLargeCurrency(value), 'Revenue']} />
                  <Line 
                    type="monotone" 
                    dataKey="revenue" 
                    stroke="#8b5cf6" 
                    strokeWidth={3}
                    dot={{ fill: '#8b5cf6', strokeWidth: 2, r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="breakdown" className="space-y-6">
          {/* Revenue by Type */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="h-5 w-5" />
                  Revenue by Booking Type
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RechartsPieChart>
                    <Pie
                      dataKey="value"
                      data={revenueByType}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {revenueByType.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [formatLargeCurrency(value), 'Revenue']} />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Revenue Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {revenueByType.map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div 
                          className="w-4 h-4 rounded-full" 
                          style={{ backgroundColor: item.color }}
                        ></div>
                        <span className="font-medium">{item.name}</span>
                      </div>
                      <div className="text-right">
                        <span className="font-bold text-gray-900">{formatLargeCurrency(item.value)}</span>
                        <p className="text-xs text-gray-500">
                          {((item.value / revenueByType.reduce((sum, i) => sum + i.value, 0)) * 100).toFixed(1)}%
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="cashflow" className="space-y-6">
          {/* Cash Flow Analysis */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                Cash Flow Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={cashFlow}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis tickFormatter={formatCurrency} />
                  <Tooltip formatter={(value) => [formatLargeCurrency(value), '']} />
                  <Bar dataKey="income" fill="#10b981" name="Income" />
                  <Bar dataKey="expenses" fill="#ef4444" name="Expenses" />
                  <Bar dataKey="netFlow" fill="#3b82f6" name="Net Cash Flow" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Cash Flow Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Income</p>
                    <p className="text-2xl font-bold text-green-600">
                      {formatLargeCurrency(cashFlow.reduce((sum, item) => sum + item.income, 0))}
                    </p>
                  </div>
                  <div className="bg-green-500 p-3 rounded-lg">
                    <TrendingUp className="h-6 w-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Expenses</p>
                    <p className="text-2xl font-bold text-red-600">
                      {formatLargeCurrency(cashFlow.reduce((sum, item) => sum + item.expenses, 0))}
                    </p>
                  </div>
                  <div className="bg-red-500 p-3 rounded-lg">
                    <AlertCircle className="h-6 w-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Net Cash Flow</p>
                    <p className="text-2xl font-bold text-blue-600">
                      {formatLargeCurrency(cashFlow.reduce((sum, item) => sum + item.netFlow, 0))}
                    </p>
                  </div>
                  <div className="bg-blue-500 p-3 rounded-lg">
                    <DollarSign className="h-6 w-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default OwnerRevenue;
