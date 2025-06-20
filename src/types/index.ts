
// User and Authentication Types
export interface User {
  id: string;
  email: string;
  name: string;
  role: 'marketing' | 'owner';
  phone?: string;
  createdAt: string;
  updatedAt: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  token: string;
  refreshToken: string;
}

// Space and Pricing Types
export type SpaceType = 
  | 'Small Shop'
  | 'Medium Shop' 
  | 'Large Shop'
  | 'Atrium - North and West'
  | 'Atrium - South'
  | 'Cinema Theater'
  | 'Marketing Banner Space';

export type Duration = 'Week Days' | 'Week Ends' | 'Public Holidays' | 'All Days';
export type RentType = 'Day Wise' | 'Hour Wise' | 'Week Wise' | 'SqFt';
export type SpaceStatus = 'Available' | 'Occupied' | 'Maintenance' | 'Reserved';

export interface PricingRule {
  id: string;
  spaceType: SpaceType;
  duration: Duration;
  rentType: RentType;
  costPerUnit: number;
  isActive: boolean;
}

export interface Space {
  id: string;
  name: string;
  type: SpaceType;
  location: string;
  size: string;
  sizeInSqFt: number;
  status: SpaceStatus;
  floor: number;
  zone: string;
  amenities: string[];
  currentTenant?: Tenant;
  monthlyBaseRent: number;
  createdAt: string;
  updatedAt: string;
  ownerId?: string;
}

// Tenant and Booking Types
export interface Tenant {
  id: string;
  name: string;
  businessType: string;
  email: string;
  phone: string;
  address: string;
  gstNumber?: string;
  contactPerson: string;
  createdAt: string;
}

export interface Booking {
  id: string;
  spaceId: string;
  space: Space;
  tenantId: string;
  tenant: Tenant;
  startDate: string;
  endDate: string;
  startTime?: string;
  endTime?: string;
  duration: Duration;
  rentType: RentType;
  totalCost: number;
  costPerUnit: number;
  unitsBooked: number;
  status: 'Pending' | 'Confirmed' | 'Cancelled' | 'Completed';
  paymentStatus: 'Pending' | 'Partial' | 'Paid' | 'Overdue';
  discountApplied?: number;
  discountReason?: string;
  notes?: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

// Complaint Types
export interface Complaint {
  id: string;
  title: string;
  description: string;
  category: 'Electrical' | 'Carpentry' | 'Plumbing' | 'Security' | 'Cleaning' | 'Other';
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
  status: 'Open' | 'In Progress' | 'Resolved' | 'Closed';
  spaceId?: string;
  space?: Space;
  reportedBy: string;
  reporterContact: string;
  reporterPhone: string;
  assignedTo?: string;
  estimatedResolution?: string;
  actualResolution?: string;
  resolutionNotes?: string;
  createdAt: string;
  updatedAt: string;
  resolvedAt?: string;
}

// Analytics and Reports Types
export interface RevenueData {
  period: string;
  totalRevenue: number;
  spaceTypeBreakdown: Record<SpaceType, number>;
  occupancyRate: number;
  averageRentPerSqFt: number;
}

export interface UtilizationData {
  spaceId: string;
  spaceName: string;
  spaceType: SpaceType;
  totalAvailableHours: number;
  bookedHours: number;
  utilizationPercentage: number;
  revenue: number;
}

export interface VacancyAlert {
  id: string;
  spaceId: string;
  spaceName: string;
  alertType: 'Upcoming Vacancy' | 'Low Utilization' | 'Pricing Opportunity';
  message: string;
  severity: 'Info' | 'Warning' | 'Critical';
  suggestedAction?: string;
  createdAt: string;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message: string;
  errors?: string[];
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
  };
  message: string;
}

// Filter and Search Types
export interface SpaceFilters {
  type?: SpaceType;
  status?: SpaceStatus;
  floor?: number;
  zone?: string;
  minSize?: number;
  maxSize?: number;
  minRent?: number;
  maxRent?: number;
}

export interface BookingFilters {
  spaceId?: string;
  tenantId?: string;
  status?: Booking['status'];
  paymentStatus?: Booking['paymentStatus'];
  startDate?: string;
  endDate?: string;
}

export interface DateRange {
  start: string;
  end: string;
}

// Dashboard Types
export interface DashboardStats {
  totalSpaces: number;
  occupiedSpaces: number;
  vacantSpaces: number;
  totalRevenue: number;
  monthlyRevenue: number;
  occupancyRate: number;
  averageUtilization: number;
  pendingComplaints: number;
  activeBookings: number;
}

// Form Types
export interface CreateSpaceForm {
  name: string;
  type: SpaceType;
  location: string;
  size: string;
  sizeInSqFt: number;
  floor: number;
  zone: string;
  amenities: string[];
  monthlyBaseRent: number;
}

export interface CreateBookingForm {
  spaceId: string;
  tenantId: string;
  startDate: string;
  endDate: string;
  startTime?: string;
  endTime?: string;
  duration: Duration;
  rentType: RentType;
  unitsBooked: number;
  notes?: string;
}

export interface CreateComplaintForm {
  title: string;
  description: string;
  category: Complaint['category'];
  priority: Complaint['priority'];
  spaceId?: string;
  reporterContact: string;
  reporterPhone: string;
}
