
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { 
  Calendar, 
  Plus, 
  ChevronLeft, 
  ChevronRight, 
  Clock,
  User,
  Building,
  DollarSign,
  Phone,
  Mail
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const BookingCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [isBookingDialogOpen, setIsBookingDialogOpen] = useState(false);
  const [bookings, setBookings] = useState([
    {
      id: 1,
      date: '2024-06-20',
      space: 'Atrium North',
      client: 'Tech Expo 2024',
      duration: '09:00 - 17:00',
      amount: 48000,
      status: 'confirmed',
      contact: 'john@techexpo.com',
      phone: '+91 9876543210'
    },
    {
      id: 2,
      date: '2024-06-22',
      space: 'Shop A-105',
      client: 'Fashion Week Pop-up',
      duration: 'Full Day',
      amount: 15000,
      status: 'pending',
      contact: 'style@fashion.com',
      phone: '+91 9876543211'
    },
    {
      id: 3,
      date: '2024-06-25',
      space: 'Cinema Hall 2',
      client: 'Private Screening',
      duration: '19:00 - 22:00',
      amount: 25000,
      status: 'confirmed',
      contact: 'events@movies.com',
      phone: '+91 9876543212'
    }
  ]);

  const [newBooking, setNewBooking] = useState({
    space: '',
    client: '',
    contact: '',
    phone: '',
    startTime: '',
    endTime: '',
    amount: '',
    notes: ''
  });

  const { toast } = useToast();

  const spaces = [
    'Shop A-101', 'Shop A-102', 'Shop B-201', 'Shop B-202',
    'Atrium North', 'Atrium South', 'Cinema Hall 1', 'Cinema Hall 2',
    'Marketing Banner - Zone A', 'Marketing Banner - Zone B'
  ];

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { 
      month: 'long', 
      year: 'numeric' 
    });
  };

  const getBookingsForDate = (day) => {
    const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return bookings.filter(booking => booking.date === dateStr);
  };

  const navigateMonth = (direction) => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + direction));
  };

  const handleBookingSubmit = () => {
    if (!selectedDate || !newBooking.space || !newBooking.client) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    const booking = {
      id: bookings.length + 1,
      date: `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(selectedDate).padStart(2, '0')}`,
      space: newBooking.space,
      client: newBooking.client,
      duration: `${newBooking.startTime} - ${newBooking.endTime}`,
      amount: parseInt(newBooking.amount),
      status: 'pending',
      contact: newBooking.contact,
      phone: newBooking.phone
    };

    setBookings([...bookings, booking]);
    setNewBooking({
      space: '',
      client: '',
      contact: '',
      phone: '',
      startTime: '',
      endTime: '',
      amount: '',
      notes: ''
    });
    setIsBookingDialogOpen(false);
    setSelectedDate(null);

    toast({
      title: "Booking Created",
      description: `Booking for ${newBooking.space} has been created successfully.`,
    });
  };

  const daysInMonth = getDaysInMonth(currentDate);
  const firstDay = getFirstDayOfMonth(currentDate);
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Booking Calendar</h2>
          <p className="text-gray-600">Manage space bookings and availability</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                {formatDate(currentDate)}
              </CardTitle>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => navigateMonth(-1)}>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" onClick={() => navigateMonth(1)}>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-7 gap-2 mb-4">
              {days.map(day => (
                <div key={day} className="p-2 text-center text-sm font-medium text-gray-600">
                  {day}
                </div>
              ))}
            </div>
            
            <div className="grid grid-cols-7 gap-2">
              {/* Empty cells for days before month starts */}
              {Array.from({ length: firstDay }, (_, i) => (
                <div key={`empty-${i}`} className="p-2 h-24"></div>
              ))}
              
              {/* Days of the month */}
              {Array.from({ length: daysInMonth }, (_, i) => {
                const day = i + 1;
                const dayBookings = getBookingsForDate(day);
                const isToday = new Date().getDate() === day && 
                              new Date().getMonth() === currentDate.getMonth() &&
                              new Date().getFullYear() === currentDate.getFullYear();
                
                return (
                  <div
                    key={day}
                    className={`p-2 h-24 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors ${
                      isToday ? 'bg-blue-50 border-blue-300' : ''
                    } ${selectedDate === day ? 'ring-2 ring-blue-500' : ''}`}
                    onClick={() => setSelectedDate(day)}
                  >
                    <div className="flex justify-between items-start">
                      <span className={`text-sm font-medium ${isToday ? 'text-blue-600' : 'text-gray-900'}`}>
                        {day}
                      </span>
                      {dayBookings.length > 0 && (
                        <Badge variant="secondary" className="text-xs">
                          {dayBookings.length}
                        </Badge>
                      )}
                    </div>
                    
                    <div className="mt-1 space-y-1">
                      {dayBookings.slice(0, 2).map(booking => (
                        <div
                          key={booking.id}
                          className={`text-xs p-1 rounded truncate ${
                            booking.status === 'confirmed' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-orange-100 text-orange-800'
                          }`}
                          title={`${booking.space} - ${booking.client}`}
                        >
                          {booking.space}
                        </div>
                      ))}
                      {dayBookings.length > 2 && (
                        <div className="text-xs text-gray-500">
                          +{dayBookings.length - 2} more
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Dialog open={isBookingDialogOpen} onOpenChange={setIsBookingDialogOpen}>
                <DialogTrigger asChild>
                  <Button 
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                    disabled={!selectedDate}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    New Booking
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>
                      Create Booking - {selectedDate && `${currentDate.getMonth() + 1}/${selectedDate}/${currentDate.getFullYear()}`}
                    </DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 pt-4">
                    <div className="space-y-2">
                      <Label>Space</Label>
                      <Select value={newBooking.space} onValueChange={(value) => setNewBooking({ ...newBooking, space: value })}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select space" />
                        </SelectTrigger>
                        <SelectContent>
                          {spaces.map((space) => (
                            <SelectItem key={space} value={space}>{space}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Client Name</Label>
                      <Input
                        placeholder="Enter client name"
                        value={newBooking.client}
                        onChange={(e) => setNewBooking({ ...newBooking, client: e.target.value })}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Start Time</Label>
                        <Input
                          type="time"
                          value={newBooking.startTime}
                          onChange={(e) => setNewBooking({ ...newBooking, startTime: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>End Time</Label>
                        <Input
                          type="time"
                          value={newBooking.endTime}
                          onChange={(e) => setNewBooking({ ...newBooking, endTime: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Contact Email</Label>
                      <Input
                        type="email"
                        placeholder="client@example.com"
                        value={newBooking.contact}
                        onChange={(e) => setNewBooking({ ...newBooking, contact: e.target.value })}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Phone Number</Label>
                      <Input
                        placeholder="+91 9876543210"
                        value={newBooking.phone}
                        onChange={(e) => setNewBooking({ ...newBooking, phone: e.target.value })}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Amount (₹)</Label>
                      <Input
                        type="number"
                        placeholder="Enter booking amount"
                        value={newBooking.amount}
                        onChange={(e) => setNewBooking({ ...newBooking, amount: e.target.value })}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Notes</Label>
                      <Textarea
                        placeholder="Additional notes..."
                        value={newBooking.notes}
                        onChange={(e) => setNewBooking({ ...newBooking, notes: e.target.value })}
                      />
                    </div>

                    <Button onClick={handleBookingSubmit} className="w-full">
                      Create Booking
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>

              <Button variant="outline" className="w-full">
                View Available Spaces
              </Button>
              <Button variant="outline" className="w-full">
                Export Calendar
              </Button>
            </CardContent>
          </Card>

          {/* Today's Bookings */}
          <Card>
            <CardHeader>
              <CardTitle>Today's Bookings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {bookings.filter(booking => booking.date === new Date().toISOString().split('T')[0]).map(booking => (
                  <div key={booking.id} className="p-3 border border-gray-200 rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium text-sm">{booking.space}</h4>
                      <Badge className={booking.status === 'confirmed' ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'}>
                        {booking.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-1">{booking.client}</p>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {booking.duration}
                      </span>
                      <span className="flex items-center gap-1">
                        <DollarSign className="h-3 w-3" />
                        ₹{booking.amount.toLocaleString()}
                      </span>
                    </div>
                  </div>
                ))}
                {bookings.filter(booking => booking.date === new Date().toISOString().split('T')[0]).length === 0 && (
                  <p className="text-sm text-gray-500 text-center py-4">No bookings for today</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default BookingCalendar;
