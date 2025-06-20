
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { 
  AlertTriangle, 
  Plus, 
  Search, 
  Filter, 
  Clock, 
  User, 
  MapPin,
  Wrench,
  Zap,
  Droplets,
  Shield,
  Phone,
  Mail,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Complaint {
  id: string;
  title: string;
  category: string;
  priority: string;
  status: string;
  location: string;
  reporter: string;
  contact: string;
  phone: string;
  description: string;
  createdAt: string;
  assignedTo: string;
  estimatedResolution?: string;
  resolvedAt?: string;
}

const ComplaintManagement = () => {
  const [complaints, setComplaints] = useState<Complaint[]>([
    {
      id: 'CMP001',
      title: 'AC Not Working in Shop A-101',
      category: 'electrical',
      priority: 'high',
      status: 'open',
      location: 'Shop A-101, Ground Floor',
      reporter: 'Fashion Hub Store',
      contact: 'manager@fashionhub.com',
      phone: '+91 9876543210',
      description: 'Air conditioning unit stopped working since yesterday. Store is getting too hot for customers.',
      createdAt: '2024-06-20T09:30:00',
      assignedTo: 'Electrical Team',
      estimatedResolution: '2024-06-21T17:00:00'
    },
    {
      id: 'CMP002',
      title: 'Water Leakage in Atrium North',
      category: 'plumbing',
      priority: 'urgent',
      status: 'in-progress',
      location: 'Atrium North, Central Area',
      reporter: 'Security Team',
      contact: 'security@emall.com',
      phone: '+91 9876543211',
      description: 'Water leaking from ceiling near the main entrance. Customers are complaining.',
      createdAt: '2024-06-20T11:15:00',
      assignedTo: 'Plumbing Team',
      estimatedResolution: '2024-06-20T18:00:00'
    },
    {
      id: 'CMP003',
      title: 'Broken Door Lock - Cinema Hall 2',
      category: 'carpentry',
      priority: 'medium',
      status: 'resolved',
      location: 'Cinema Hall 2, Top Floor',
      reporter: 'PVR Cinemas',
      contact: 'operations@pvr.com',
      phone: '+91 9876543212',
      description: 'Main entrance door lock is broken. Security concern for the theater.',
      createdAt: '2024-06-19T14:20:00',
      assignedTo: 'Carpentry Team',
      resolvedAt: '2024-06-20T10:30:00'
    },
    {
      id: 'CMP004',
      title: 'CCTV Camera Malfunction',
      category: 'security',
      priority: 'high',
      status: 'open',
      location: 'Zone B, Second Floor',
      reporter: 'Mall Security',
      contact: 'security@emall.com',
      phone: '+91 9876543213',
      description: 'CCTV camera 15 is not recording. Blind spot created in Zone B corridor.',
      createdAt: '2024-06-20T13:45:00',
      assignedTo: 'Security Team',
      estimatedResolution: '2024-06-21T12:00:00'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const { toast } = useToast();

  const [newComplaint, setNewComplaint] = useState({
    title: '',
    category: '',
    priority: '',
    location: '',
    reporter: '',
    contact: '',
    phone: '',
    description: ''
  });

  const categories = [
    { value: 'electrical', label: 'Electrical', icon: Zap },
    { value: 'plumbing', label: 'Plumbing', icon: Droplets },
    { value: 'carpentry', label: 'Carpentry', icon: Wrench },
    { value: 'security', label: 'Security', icon: Shield },
    { value: 'cleaning', label: 'Cleaning', icon: AlertTriangle },
    { value: 'other', label: 'Other', icon: AlertTriangle }
  ];

  const priorities = [
    { value: 'low', label: 'Low', color: 'bg-gray-100 text-gray-800' },
    { value: 'medium', label: 'Medium', color: 'bg-yellow-100 text-yellow-800' },
    { value: 'high', label: 'High', color: 'bg-orange-100 text-orange-800' },
    { value: 'urgent', label: 'Urgent', color: 'bg-red-100 text-red-800' }
  ];

  const statuses = [
    { value: 'open', label: 'Open', color: 'bg-blue-100 text-blue-800' },
    { value: 'in-progress', label: 'In Progress', color: 'bg-yellow-100 text-yellow-800' },
    { value: 'resolved', label: 'Resolved', color: 'bg-green-100 text-green-800' },
    { value: 'closed', label: 'Closed', color: 'bg-gray-100 text-gray-800' }
  ];

  const filteredComplaints = complaints.filter(complaint => {
    const matchesSearch = complaint.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         complaint.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         complaint.reporter.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || complaint.category === filterCategory;
    const matchesStatus = filterStatus === 'all' || complaint.status === filterStatus;
    const matchesPriority = filterPriority === 'all' || complaint.priority === filterPriority;
    
    return matchesSearch && matchesCategory && matchesStatus && matchesPriority;
  });

  const handleCreateComplaint = () => {
    if (!newComplaint.title || !newComplaint.category || !newComplaint.priority) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    const complaint: Complaint = {
      id: `CMP${String(complaints.length + 1).padStart(3, '0')}`,
      ...newComplaint,
      status: 'open',
      createdAt: new Date().toISOString(),
      assignedTo: `${newComplaint.category.charAt(0).toUpperCase() + newComplaint.category.slice(1)} Team`
    };

    setComplaints([complaint, ...complaints]);
    setNewComplaint({
      title: '',
      category: '',
      priority: '',
      location: '',
      reporter: '',
      contact: '',
      phone: '',
      description: ''
    });
    setIsCreateDialogOpen(false);

    toast({
      title: "Complaint Created",
      description: `Complaint ${complaint.id} has been created and assigned.`,
    });
  };

  const updateComplaintStatus = (complaintId: string, newStatus: string) => {
    setComplaints(complaints.map(complaint => 
      complaint.id === complaintId 
        ? { 
            ...complaint, 
            status: newStatus,
            ...(newStatus === 'resolved' && { resolvedAt: new Date().toISOString() })
          }
        : complaint
    ));

    toast({
      title: "Status Updated",
      description: `Complaint ${complaintId} status updated to ${newStatus}.`,
    });
  };

  const getCategoryIcon = (category) => {
    const categoryData = categories.find(cat => cat.value === category);
    return categoryData ? categoryData.icon : AlertTriangle;
  };

  const getPriorityColor = (priority) => {
    const priorityData = priorities.find(p => p.value === priority);
    return priorityData ? priorityData.color : 'bg-gray-100 text-gray-800';
  };

  const getStatusColor = (status) => {
    const statusData = statuses.find(s => s.value === status);
    return statusData ? statusData.color : 'bg-gray-100 text-gray-800';
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Complaint Management</h2>
          <p className="text-gray-600">Track and resolve maintenance issues</p>
        </div>
        
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
              <Plus className="h-4 w-4 mr-2" />
              New Complaint
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create New Complaint</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label>Title *</Label>
                <Input
                  placeholder="Brief description of the issue"
                  value={newComplaint.title}
                  onChange={(e) => setNewComplaint({ ...newComplaint, title: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label>Category *</Label>
                <Select value={newComplaint.category} onValueChange={(value) => setNewComplaint({ ...newComplaint, category: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => {
                      const Icon = category.icon;
                      return (
                        <SelectItem key={category.value} value={category.value}>
                          <div className="flex items-center gap-2">
                            <Icon className="h-4 w-4" />
                            {category.label}
                          </div>
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Priority *</Label>
                <Select value={newComplaint.priority} onValueChange={(value) => setNewComplaint({ ...newComplaint, priority: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    {priorities.map((priority) => (
                      <SelectItem key={priority.value} value={priority.value}>
                        {priority.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Location</Label>
                <Input
                  placeholder="e.g., Shop A-101, Ground Floor"
                  value={newComplaint.location}
                  onChange={(e) => setNewComplaint({ ...newComplaint, location: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label>Reporter Name</Label>
                <Input
                  placeholder="Who is reporting this issue"
                  value={newComplaint.reporter}
                  onChange={(e) => setNewComplaint({ ...newComplaint, reporter: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label>Contact Email</Label>
                <Input
                  type="email"
                  placeholder="reporter@example.com"
                  value={newComplaint.contact}
                  onChange={(e) => setNewComplaint({ ...newComplaint, contact: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label>Phone Number</Label>
                <Input
                  placeholder="+91 9876543210"
                  value={newComplaint.phone}
                  onChange={(e) => setNewComplaint({ ...newComplaint, phone: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea
                  placeholder="Detailed description of the issue"
                  value={newComplaint.description}
                  onChange={(e) => setNewComplaint({ ...newComplaint, description: e.target.value })}
                  rows={3}
                />
              </div>

              <Button onClick={handleCreateComplaint} className="w-full">
                Create Complaint
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search complaints..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                {statuses.map((status) => (
                  <SelectItem key={status.value} value={status.value}>
                    {status.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={filterPriority} onValueChange={setFilterPriority}>
              <SelectTrigger>
                <SelectValue placeholder="Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priorities</SelectItem>
                {priorities.map((priority) => (
                  <SelectItem key={priority.value} value={priority.value}>
                    {priority.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Clear Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Complaints List */}
      <div className="space-y-4">
        {filteredComplaints.map((complaint) => {
          const CategoryIcon = getCategoryIcon(complaint.category);
          
          return (
            <Card key={complaint.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-start gap-4">
                    <div className="bg-gray-100 p-3 rounded-lg">
                      <CategoryIcon className="h-6 w-6 text-gray-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{complaint.title}</h3>
                        <Badge className={getPriorityColor(complaint.priority)}>
                          {complaint.priority.charAt(0).toUpperCase() + complaint.priority.slice(1)}
                        </Badge>
                        <Badge className={getStatusColor(complaint.status)}>
                          {complaint.status.charAt(0).toUpperCase() + complaint.status.slice(1)}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{complaint.description}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {complaint.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <User className="h-4 w-4" />
                          {complaint.reporter}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {formatDate(complaint.createdAt)}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900 mb-1">ID: {complaint.id}</p>
                    <p className="text-sm text-gray-600">Assigned to: {complaint.assignedTo}</p>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    {complaint.contact && (
                      <span className="flex items-center gap-1">
                        <Mail className="h-4 w-4" />
                        {complaint.contact}
                      </span>
                    )}
                    {complaint.phone && (
                      <span className="flex items-center gap-1">
                        <Phone className="h-4 w-4" />
                        {complaint.phone}
                      </span>
                    )}
                  </div>
                  
                  <div className="flex gap-2">
                    {complaint.status === 'open' && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => updateComplaintStatus(complaint.id, 'in-progress')}
                      >
                        Start Work
                      </Button>
                    )}
                    {complaint.status === 'in-progress' && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-green-600 border-green-300 hover:bg-green-50"
                        onClick={() => updateComplaintStatus(complaint.id, 'resolved')}
                      >
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Mark Resolved
                      </Button>
                    )}
                    {complaint.status === 'resolved' && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-gray-600 border-gray-300 hover:bg-gray-50"
                        onClick={() => updateComplaintStatus(complaint.id, 'closed')}
                      >
                        <XCircle className="h-4 w-4 mr-1" />
                        Close
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredComplaints.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <AlertTriangle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No complaints found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ComplaintManagement;
