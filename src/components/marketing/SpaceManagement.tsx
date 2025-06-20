
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { 
  Building, 
  Plus, 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  MapPin,
  DollarSign,
  Calendar,
  AlertCircle
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const SpaceManagement = () => {
  const [spaces, setSpaces] = useState([
    {
      id: 1,
      name: 'Shop A-101',
      type: 'Small Shop',
      location: 'Ground Floor, Zone A',
      size: '500 sq ft',
      status: 'Occupied',
      tenant: 'Fashion Hub',
      monthlyRent: 75000,
      leaseEnd: '2024-12-31'
    },
    {
      id: 2,
      name: 'Shop B-205',
      type: 'Medium Shop',
      location: 'Second Floor, Zone B',
      size: '1200 sq ft',
      status: 'Vacant',
      tenant: null,
      monthlyRent: 180000,
      leaseEnd: null
    },
    {
      id: 3,
      name: 'Atrium North',
      type: 'Atrium',
      location: 'Central Area',
      size: '2000 sq ft',
      status: 'Partially Booked',
      tenant: 'Multiple Events',
      monthlyRent: 450000,
      leaseEnd: 'Various'
    },
    {
      id: 4,
      name: 'Cinema Hall 1',
      type: 'Cinema Theater',
      location: 'Top Floor',
      size: '5000 sq ft',
      status: 'Occupied',
      tenant: 'PVR Cinemas',
      monthlyRent: 800000,
      leaseEnd: '2025-06-30'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const { toast } = useToast();

  const [newSpace, setNewSpace] = useState({
    name: '',
    type: '',
    location: '',
    size: '',
    monthlyRent: ''
  });

  const spaceTypes = [
    'Small Shop',
    'Medium Shop', 
    'Large Shop',
    'Atrium - North and West',
    'Atrium - South',
    'Cinema Theater',
    'Marketing Banner Space'
  ];

  const filteredSpaces = spaces.filter(space => {
    const matchesSearch = space.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         space.tenant?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         space.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || space.type === filterType;
    const matchesStatus = filterStatus === 'all' || space.status.toLowerCase() === filterStatus;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  const handleAddSpace = () => {
    if (newSpace.name && newSpace.type && newSpace.location && newSpace.size && newSpace.monthlyRent) {
      const space = {
        id: spaces.length + 1,
        ...newSpace,
        monthlyRent: parseInt(newSpace.monthlyRent),
        status: 'Vacant',
        tenant: null,
        leaseEnd: null
      };
      setSpaces([...spaces, space]);
      setNewSpace({ name: '', type: '', location: '', size: '', monthlyRent: '' });
      setIsAddDialogOpen(false);
      toast({
        title: "Space Added",
        description: `${space.name} has been added successfully.`,
      });
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Occupied': return 'bg-green-100 text-green-800';
      case 'Vacant': return 'bg-red-100 text-red-800';
      case 'Partially Booked': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Space Management</h2>
          <p className="text-gray-600">Manage all business spaces in the mall</p>
        </div>
        
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
              <Plus className="h-4 w-4 mr-2" />
              Add New Space
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Add New Business Space</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="name">Space Name</Label>
                <Input
                  id="name"
                  placeholder="e.g., Shop A-101"
                  value={newSpace.name}
                  onChange={(e) => setNewSpace({ ...newSpace, name: e.target.value })}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="type">Space Type</Label>
                <Select value={newSpace.type} onValueChange={(value) => setNewSpace({ ...newSpace, type: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select space type" />
                  </SelectTrigger>
                  <SelectContent>
                    {spaceTypes.map((type) => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  placeholder="e.g., Ground Floor, Zone A"
                  value={newSpace.location}
                  onChange={(e) => setNewSpace({ ...newSpace, location: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="size">Size</Label>
                <Input
                  id="size"
                  placeholder="e.g., 500 sq ft"
                  value={newSpace.size}
                  onChange={(e) => setNewSpace({ ...newSpace, size: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="rent">Monthly Rent (₹)</Label>
                <Input
                  id="rent"
                  type="number"
                  placeholder="e.g., 75000"
                  value={newSpace.monthlyRent}
                  onChange={(e) => setNewSpace({ ...newSpace, monthlyRent: e.target.value })}
                />
              </div>

              <Button onClick={handleAddSpace} className="w-full">
                Add Space
              </Button>
            </div>
          </DialogContent>
        </Dialog>
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
                {spaceTypes.map((type) => (
                  <SelectItem key={type} value={type}>{type}</SelectItem>
                ))}
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
              <Filter className="h-4 w-4" />
              Advanced Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Spaces Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <MapPin className="h-4 w-4" />
                {space.location}
              </div>
              
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Building className="h-4 w-4" />
                {space.size}
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-600">
                <DollarSign className="h-4 w-4" />
                ₹{space.monthlyRent.toLocaleString()}/month
              </div>

              {space.tenant && (
                <div className="pt-2 border-t">
                  <p className="text-sm font-medium text-gray-900">Current Tenant</p>
                  <p className="text-sm text-gray-600">{space.tenant}</p>
                  {space.leaseEnd && (
                    <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                      <Calendar className="h-4 w-4" />
                      Lease ends: {space.leaseEnd}
                    </div>
                  )}
                </div>
              )}

              <div className="flex gap-2 pt-3 border-t">
                <Button variant="outline" size="sm" className="flex-1">
                  <Edit className="h-4 w-4 mr-1" />
                  Edit
                </Button>
                <Button variant="outline" size="sm" className="text-red-600 hover:bg-red-50">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredSpaces.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No spaces found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SpaceManagement;
