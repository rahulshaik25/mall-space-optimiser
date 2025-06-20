
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Calendar, 
  Search, 
  Filter, 
  Clock, 
  DollarSign, 
  Building, 
  User,
  Phone,
  Mail,
  MapPin,
  Eye,
  Download
} from 'lucide-react';

const OwnerBookings = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterSpace, setFilterSpace] = useState('all');
  const [dateRange, setDateRange] = useState('all');

  const [bookings] = useState([
    {
      id: 'BK001',
      space: 'Shop A-101',
      client: 'Fashion Hub',
      type: 'Monthly Lease',
      startDate: '2024-06-01',
      endDate: '2024-06-30',
      duration: 'Full Month',
      amount: 75000,
      status: 'active',
      contact: 'manager@fashionhub.com',
      phone: '+91 9876543210',
      paymentStatus: 'paid',
      bookingDate: '2024-05-15'
    },
    {
      id: 'BK002',
      space: 'Atrium North',
      client: 'Tech Expo 2024',
      type: 'Event Booking',
      startDate: '2024-06-25',
      endDate: '2024-06-25',
      duration: '09:00 - 17:00',
      amount: 48000,
      status: 'confirmed',
      contact: 'john@techexpo.com',
      phone: '+91 9876543211',
      paymentStatus: 'pending',
      bookingDate: '2024-06-10'
    },
    {
      id: 'BK003',
      space: 'Shop B-201',
      client: 'Home Decor Plus',
      type: 'Monthly Lease',
      startDate: '2024-06-01',
      endDate: '2024-06-30',
      duration: 'Full Month',
      amount: 125000,
      status: 'active',
      contact: 'info@homedecorplus.com',
      phone: '+91 9876543212',
      paymentStatus: 'paid',
      bookingDate: '2024-05-20'
    },
    {
      id: 'BK004',
      space: 'Atrium North',
      client: 'Wedding Planners Co',
      type: 'Event Booking',
      startDate: '2024-07-05',
      endDate: '2024-07-05',
      duration: '18:00 - 23:00',
      amount: 65000,
      status: 'confirmed',
      contact: 'events@weddingplanners.com',
      phone: '+91 9876543213',
      paymentStatus: 'advance-paid',
      bookingDate: '2024-06-15'
    },
    {
      id: 'BK005',
      space: 'Shop A-102',
      client: 'Tech Accessories',
      type: 'Monthly Lease',
      startDate: '2024-06-01',
      endDate: '2024-06-30',
      duration: 'Full Month',
      amount: 68000,
      status: 'active',
      contact: 'store@techaccess.com',
      phone: '+91 9876543214',
      paymentStatus: 'paid',
      bookingDate: '2024-05-25'
    },
    {
      id: 'BK006',
      space: 'Shop B-202',
      client: 'Sports Arena',
      type: 'Monthly Lease',
      startDate: '2024-06-01',
      endDate: '2024-06-30',
      duration: 'Full Month',
      amount: 98000,
      status: 'active',
      contact: 'manager@sportsarena.com',
      phone: '+91 9876543215',
      paymentStatus: 'overdue',
      bookingDate: '2024-05-10'
    }
  ]);

  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = booking.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         booking.space.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         booking.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || booking.status === filterStatus;
    const matchesSpace = filterSpace === 'all' || booking.space === filterSpace;
    
    return matchesSearch && matchesStatus && matchesSpace;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'confirmed': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPaymentStatusColor = (status) => {
    switch (status) {
      case 'paid': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'advance-paid': return 'bg-blue-100 text-blue-800';
      case 'overdue': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatCurrency = (amount) => {
    return `₹${amount.toLocaleString()}`;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const uniqueSpaces = [...new Set(bookings.map(booking => booking.space))];

  const totalRevenue = filteredBookings.reduce((sum, booking) => sum + booking.amount, 0);
  const pendingPayments = filteredBookings.filter(booking => booking.paymentStatus === 'pending' || booking.paymentStatus === 'overdue');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Bookings & Leases</h2>
          <p className="text-gray-600">Track all bookings and lease agreements for your spaces</p>
        </div>
        <Button variant="outline" className="flex items-center gap-2">
          <Download className="h-4 w-4" />
          Export Report
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Bookings</p>
                <p className="text-2xl font-bold text-gray-900">{filteredBookings.length}</p>
              </div>
              <div className="bg-blue-500 p-3 rounded-lg">
                <Calendar className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalRevenue)}</p>
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
                <p className="text-sm font-medium text-gray-600">Active Leases</p>
                <p className="text-2xl font-bold text-gray-900">
                  {filteredBookings.filter(b => b.status === 'active').length}
                </p>
              </div>
              <div className="bg-purple-500 p-3 rounded-lg">
                <Building className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending Payments</p>
                <p className="text-2xl font-bold text-gray-900">{pendingPayments.length}</p>
              </div>
              <div className="bg-orange-500 p-3 rounded-lg">
                <Clock className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search bookings..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="confirmed">Confirmed</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filterSpace} onValueChange={setFilterSpace}>
              <SelectTrigger>
                <SelectValue placeholder="Space" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Spaces</SelectItem>
                {uniqueSpaces.map((space) => (
                  <SelectItem key={space} value={space}>{space}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger>
                <SelectValue placeholder="Date Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Time</SelectItem>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
                <SelectItem value="quarter">This Quarter</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Clear Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Bookings List */}
      <div className="space-y-4">
        {filteredBookings.map((booking) => (
          <Card key={booking.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-start gap-4">
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <Building className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{booking.space}</h3>
                      <Badge className={getStatusColor(booking.status)}>
                        {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                      </Badge>
                      <Badge className={getPaymentStatusColor(booking.paymentStatus)}>
                        {booking.paymentStatus.replace('-', ' ').toUpperCase()}
                      </Badge>
                    </div>
                    <p className="text-sm font-medium text-gray-900 mb-1">{booking.client}</p>
                    <p className="text-sm text-gray-600 mb-2">{booking.type}</p>
                    
                    <div className="flex items-center gap-6 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {formatDate(booking.startDate)} - {formatDate(booking.endDate)}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {booking.duration}
                      </span>
                      <span className="flex items-center gap-1">
                        <DollarSign className="h-4 w-4" />
                        {formatCurrency(booking.amount)}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900 mb-1">Booking ID: {booking.id}</p>
                  <p className="text-sm text-gray-600">Booked: {formatDate(booking.bookingDate)}</p>
                </div>
              </div>

              <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                <div className="flex items-center gap-6 text-sm text-gray-600">
                  <span className="flex items-center gap-1">
                    <Mail className="h-4 w-4" />
                    {booking.contact}
                  </span>
                  <span className="flex items-center gap-1">
                    <Phone className="h-4 w-4" />
                    {booking.phone}
                  </span>
                </div>
                
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-1" />
                    View Details
                  </Button>
                  {booking.paymentStatus === 'pending' && (
                    <Button size="sm" variant="outline" className="text-green-600 border-green-300 hover:bg-green-50">
                      Send Reminder
                    </Button>
                  )}
                  {booking.paymentStatus === 'overdue' && (
                    <Button size="sm" variant="outline" className="text-red-600 border-red-300 hover:bg-red-50">
                      Urgent Follow-up
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredBookings.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No bookings found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default OwnerBookings;
