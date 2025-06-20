import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  FileText, 
  Download, 
  Calendar, 
  DollarSign, 
  Building, 
  TrendingUp,
  BarChart3,
  PieChart
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart as RechartsPieChart, Cell, Pie } from 'recharts';

const ReportsSection = () => {
  const [dateRange, setDateRange] = useState({ start: '2024-01-01', end: '2024-06-30' });
  const [reportType, setReportType] = useState('revenue');

  // Sample data for reports
  const revenueData = [
    { month: 'Jan', shops: 280000, atrium: 150000, cinema: 400000, marketing: 85000 },
    { month: 'Feb', shops: 320000, atrium: 180000, cinema: 400000, marketing: 95000 },
    { month: 'Mar', shops: 290000, atrium: 160000, cinema: 400000, marketing: 75000 },
    { month: 'Apr', shops: 450000, atrium: 220000, cinema: 400000, marketing: 125000 },
    { month: 'May', shops: 520000, atrium: 280000, cinema: 400000, marketing: 145000 },
    { month: 'Jun', shops: 580000, atrium: 320000, cinema: 400000, marketing: 165000 }
  ];

  const utilizationData = [
    { space: 'Small Shops', utilization: 85, target: 90 },
    { space: 'Medium Shops', utilization: 72, target: 80 },
    { space: 'Large Shops', utilization: 45, target: 70 },
    { space: 'Atrium North', utilization: 90, target: 85 },
    { space: 'Atrium South', utilization: 78, target: 85 },
    { space: 'Cinema', utilization: 95, target: 90 }
  ];

  const spaceTypeRevenue = [
    { name: 'Small Shops', value: 1840000, color: '#3b82f6' },
    { name: 'Medium Shops', value: 1250000, color: '#8b5cf6' },
    { name: 'Large Shops', value: 890000, color: '#10b981' },
    { name: 'Atrium', value: 1310000, color: '#f59e0b' },
    { name: 'Cinema', value: 2400000, color: '#ef4444' },
    { name: 'Marketing', value: 690000, color: '#6366f1' }
  ];

  const vacancyData = [
    { month: 'Jan', vacant: 15, total: 93 },
    { month: 'Feb', vacant: 12, total: 93 },
    { month: 'Mar', vacant: 18, total: 93 },
    { month: 'Apr', vacant: 10, total: 93 },
    { month: 'May', vacant: 8, total: 93 },
    { month: 'Jun', vacant: 20, total: 93 }
  ];

  const handleExport = (type) => {
    // Simulate export functionality
    console.log(`Exporting ${type} report for ${dateRange.start} to ${dateRange.end}`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Reports & Analytics</h2>
          <p className="text-gray-600">Comprehensive business insights and data analysis</p>
        </div>
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
                  <SelectItem value="revenue">Revenue Report</SelectItem>
                  <SelectItem value="utilization">Space Utilization</SelectItem>
                  <SelectItem value="occupancy">Occupancy Report</SelectItem>
                  <SelectItem value="vacancy">Vacancy Analysis</SelectItem>
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
              <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                Generate Report
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="revenue">Revenue</TabsTrigger>
          <TabsTrigger value="utilization">Utilization</TabsTrigger>
          <TabsTrigger value="vacancy">Vacancy</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                    <p className="text-2xl font-bold text-gray-900">₹8.38M</p>
                    <p className="text-sm text-green-600">+15.2% from last period</p>
                  </div>
                  <div className="bg-green-500 p-3 rounded-lg">
                    <DollarSign className="h-6 w-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Avg Utilization</p>
                    <p className="text-2xl font-bold text-gray-900">77.5%</p>
                    <p className="text-sm text-blue-600">+3.2% from last month</p>
                  </div>
                  <div className="bg-blue-500 p-3 rounded-lg">
                    <Building className="h-6 w-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Occupied Spaces</p>
                    <p className="text-2xl font-bold text-gray-900">73/93</p>
                    <p className="text-sm text-purple-600">78.5% occupancy</p>
                  </div>
                  <div className="bg-purple-500 p-3 rounded-lg">
                    <BarChart3 className="h-6 w-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Growth Rate</p>
                    <p className="text-2xl font-bold text-gray-900">12.8%</p>
                    <p className="text-sm text-orange-600">Month over month</p>
                  </div>
                  <div className="bg-orange-500 p-3 rounded-lg">
                    <TrendingUp className="h-6 w-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Revenue by Space Type */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PieChart className="h-5 w-5" />
                Revenue Distribution by Space Type
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <ResponsiveContainer width="100%" height={300}>
                  <RechartsPieChart>
                    <Pie
                      dataKey="value"
                      data={spaceTypeRevenue}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {spaceTypeRevenue.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`₹${value.toLocaleString()}`, 'Revenue']} />
                  </RechartsPieChart>
                </ResponsiveContainer>

                <div className="space-y-4">
                  {spaceTypeRevenue.map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div 
                          className="w-4 h-4 rounded-full" 
                          style={{ backgroundColor: item.color }}
                        ></div>
                        <span className="font-medium">{item.name}</span>
                      </div>
                      <span className="text-gray-600">₹{item.value.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="revenue" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Revenue Trend Analysis</CardTitle>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleExport('revenue')}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`₹${value.toLocaleString()}`, '']} />
                  <Bar dataKey="shops" stackId="a" fill="#3b82f6" name="Shops" />
                  <Bar dataKey="atrium" stackId="a" fill="#8b5cf6" name="Atrium" />
                  <Bar dataKey="cinema" stackId="a" fill="#10b981" name="Cinema" />
                  <Bar dataKey="marketing" stackId="a" fill="#f59e0b" name="Marketing" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="utilization" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Space Utilization vs Targets</CardTitle>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleExport('utilization')}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={utilizationData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="space" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`${value}%`, '']} />
                  <Bar dataKey="utilization" fill="#3b82f6" name="Current Utilization" />
                  <Bar dataKey="target" fill="#e5e7eb" name="Target" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="vacancy" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Vacancy Trend</CardTitle>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleExport('vacancy')}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={vacancyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value, name) => [value, name === 'vacant' ? 'Vacant Spaces' : 'Total Spaces']} />
                  <Line type="monotone" dataKey="vacant" stroke="#ef4444" strokeWidth={3} name="vacant" />
                  <Line type="monotone" dataKey="total" stroke="#6b7280" strokeDasharray="5 5" name="total" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ReportsSection;
