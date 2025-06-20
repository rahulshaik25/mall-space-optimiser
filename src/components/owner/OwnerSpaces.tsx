
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Building, 
  Search, 
  MapPin, 
  DollarSign, 
  Calendar, 
  Users, 
  TrendingUp, 
  Eye,
  Edit,
  BarChart3
} from 'lucide-react';

const OwnerSpaces = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  const [spaces] = useState([
    {
      id: 1,
      name: 'Shop A-101',
      type: 'Small Shop',
      location: 'Ground Floor, Zone A',
      size: '500 sq ft',
      status: 'Occupied',
      tenant: 'Fashion Hub',
      monthlyRent: 75000,
      leaseStart: '2024-01-01',
      leaseEnd: '2024-12-31',
      occupancyRate: 95,
      revenueLastMonth: 75000,
      revenueThisMonth: 75000,
      tenantSince: '2024-01-01',
      contactEmail: 'manager@fashionhub.com',
      contactPhone: '+91 9876543210'
    },
    {
      id: 2,
      name: 'Shop A-102',
      type: 'Small Shop',
      location: 'Ground Floor, Zone A',
      size: '480 sq ft',
      status: 'Occupied',
      tenant: 'Tech Accessories',
      monthlyRent: 68000,
      leaseStart: '2024-02-15',
      leaseEnd: '2025-02-14',
      occupancyRate: 88,
      revenueLastMonth: 68000,
      revenueThisMonth: 68000,
      tenantSince: '2024-02-15',
      contactEmail: 'store@techaccess.com',
      contactPhone: '+91 9876543211'
    },
    {
      id: 3,
      name: 'Shop B-201',
      type: 'Medium Shop',
      location: 'Second Floor, Zone B',
      size: '1200 sq ft',
      status: 'Occupied',
      tenant: 'Home Decor Plus',
      monthlyRent: 125000,
      leaseStart: '2023-11-01',
      leaseEnd: '2024-10-31',
      occupancyRate: 75,
      revenueLastMonth: 125000,
      revenueThisMonth: 125000,
      tenantSince: '2023-11-01',
      contactEmail: 'info@homedecorplus.com',
      contactPhone: '+91 9876543212'
    },
    {
      id: 4,
      name: 'Shop B-202',
      type: 'Medium Shop',
      location: 'Second Floor, Zone B',
      size: '1150 sq ft',
      status: 'Occupied',
      tenant: 'Sports Arena',
      monthlyRent: 98000,
      leaseStart: '2024-03-01',
      leaseEnd: '2025-02-28',
      occupancyRate: 60,
      revenueLastMonth: 98000,
      revenueThisMonth: 98000,
      tenantSince: '2024-03-01',
      contactEmail: 'manager@sportsarena.com',
      contactPhone: '+91 9876543213'
    },
    {
      id: 5,
      name: 'Atrium North',
      type: 'Event Space',
      location: 'Central Area',
      size: '2000 sq ft',
      status: 'Partially Booked',
      tenant: 'Multiple Events',
      monthlyRent: 145000,
      leaseStart: 'Variable',
      leaseEnd: 'Variable',
      occupancyRate: 85,
      revenueLastMonth: 130000,
      revenueThisMonth: 145000,
      tenantSince: 'Multiple',
      contactEmail: 'events@emall.com',
      contactPhone: '+91 9876543214'
    }
  ]);

  const filteredSpaces = spaces.filter(space => {
    const matchesSearch = space.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         space.tenant.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         space.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || space.type === filterType;
    const matchesStatus = filterStatus === 'all' || space.status.toLowerCase() === filterStatus;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'Occupied': return 'bg-green-100 text-green-800';
      case 'Vacant': return 'bg-red-100 text-red-800';
      case 'Partially Booked': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getOccupancyColor = (rate) => {
    if (rate >= 90) return 'text-green-600';
    if (rate >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const formatCurrency = (amount) => {
    return `₹${amount.toLocaleString()}`;
  };

  const formatDate = (dateString) => {
    if (dateString === 'Variable' || dateString === 'Multiple') return dateString;
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">My Spaces</h2>
          <p className="text-gray-600">Manage your owned properties and track performance</p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Spaces</p>
                <p className="text-2xl font-bold text-gray-900">{spaces.length}</p>
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
                <p className="text-sm font-medium text-gray-600">Occupied</p>
                <p className="text-2xl font-bold text-gray-900">
                  {spaces.filter(s => s.status === 'Occupied').length}
                </p>
              </div>
              <div className="bg-green-500 p-3 rounded-lg">
                <Users className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Monthly Revenue</p>
                <p className="text-2xl font-bold text-gray-900">
                  {formatCurrency(spaces.reduce((sum, space) => sum + space.revenueThisMonth, 0))}
                </p>
              </div>
              <div className="bg-purple-500 p-3 rounded-lg">
                <DollarSign className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Occupancy</p>
                <p className="text-2xl font-bold text-gray-900">
                  {Math.round(spaces.reduce((sum, space) => sum + space.occupancyRate, 0) / spaces.length)}%
                </p>
              </div>
              <div className="bg-orange-500 p-3 rounded-lg">
                <BarChart3 className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search spaces..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="Small Shop">Small Shop</SelectItem>
                <SelectItem value="Medium Shop">Medium Shop</SelectItem>
                <SelectItem value="Large Shop">Large Shop</SelectItem>
                <SelectItem value="Event Space">Event Space</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="occupied">Occupied</SelectItem>
                <SelectItem value="vacant">Vacant</SelectItem>
                <SelectItem value="partially booked">Partially Booked</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline" className="flex items-center gap-2">
              <Eye className="h-4 w-4" />
              View Analytics
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Spaces Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredSpaces.map((space) => (
          <Card key={space.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{space.name}</CardTitle>
                  <p className="text-sm text-gray-600">{space.type}</p>
                </div>
                <Badge className={getStatusColor(space.status)}>
                  {space.status}
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {/* Basic Info */}
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin className="h-4 w-4" />
                  {space.location}
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Building className="h-4 w-4" />
                  {space.size}
                </div>
              </div>

              {/* Revenue Info */}
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">Monthly Revenue</span>
                  <span className="text-lg font-bold text-gray-900">
                    {formatCurrency(space.revenueThisMonth)}
                  </span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Last Month: {formatCurrency(space.revenueLastMonth)}</span>
                  <span className={space.revenueThisMonth >= space.revenueLastMonth ? 'text-green-600' : 'text-red-600'}>
                    {space.revenueThisMonth >= space.revenueLastMonth ? '↗' : '↘'} 
                    {(((space.revenueThisMonth - space.revenueLastMonth) / space.revenueLastMonth) * 100).toFixed(1)}%
                  </span>
                </div>
              </div>

              {/* Occupancy */}
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-medium text-gray-700">Occupancy Rate</span>
                  <span className={`font-bold ${getOccupancyColor(space.occupancyRate)}`}>
                    {space.occupancyRate}%
                  </span>
                </div>
                <Progress value={space.occupancyRate} className="h-2" />
              </div>

              {/* Tenant Info */}
              {space.tenant !== 'Multiple Events' && (
                <div className="pt-3 border-t">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="text-sm font-medium text-gray-900">Current Tenant</p>
                      <p className="text-sm text-gray-600">{space.tenant}</p>
                    </div>
                    <div className="text-right text-sm text-gray-600">
                      <p>Since: {formatDate(space.tenantSince)}</p>
                    </div>
                  </div>
                  
                  {space.leaseEnd !== 'Variable' && (
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar className="h-4 w-4" />
                      Lease ends: {formatDate(space.leaseEnd)}
                    </div>
                  )}
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-2 pt-3 border-t">
                <Button variant="outline" size="sm" className="flex-1">
                  <Eye className="h-4 w-4 mr-1" />
                  View Details
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <Edit className="h-4 w-4 mr-1" />
                  Edit
                </Button>
                <Button variant="outline" size="sm">
                  <TrendingUp className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default OwnerSpaces;
