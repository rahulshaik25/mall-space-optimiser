
import { 
  User, 
  LoginCredentials, 
  AuthResponse, 
  Space, 
  Booking, 
  Complaint, 
  Tenant,
  PricingRule,
  RevenueData,
  UtilizationData,
  VacancyAlert,
  DashboardStats,
  ApiResponse,
  PaginatedResponse,
  SpaceFilters,
  BookingFilters,
  CreateSpaceForm,
  CreateBookingForm,
  CreateComplaintForm
} from '../types';

// Base API configuration
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080/api';

class ApiService {
  private token: string | null = null;

  constructor() {
    this.token = localStorage.getItem('authToken');
  }

  private async request<T>(
    endpoint: string, 
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${API_BASE_URL}${endpoint}`;
    
    const headers = {
      'Content-Type': 'application/json',
      ...(this.token && { Authorization: `Bearer ${this.token}` }),
      ...options.headers,
    };

    try {
      const response = await fetch(url, {
        ...options,
        headers,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Authentication APIs
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await this.request<AuthResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
    
    if (response.success && response.data.token) {
      this.token = response.data.token;
      localStorage.setItem('authToken', response.data.token);
    }
    
    return response.data;
  }

  async logout(): Promise<void> {
    try {
      await this.request('/auth/logout', { method: 'POST' });
    } finally {
      this.token = null;
      localStorage.removeItem('authToken');
    }
  }

  async getCurrentUser(): Promise<User> {
    const response = await this.request<User>('/auth/me');
    return response.data;
  }

  // Space Management APIs
  async getSpaces(filters?: SpaceFilters): Promise<Space[]> {
    const queryParams = new URLSearchParams();
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined) {
          queryParams.append(key, value.toString());
        }
      });
    }
    
    const response = await this.request<Space[]>(`/spaces?${queryParams}`);
    return response.data;
  }

  async getSpace(id: string): Promise<Space> {
    const response = await this.request<Space>(`/spaces/${id}`);
    return response.data;
  }

  async createSpace(spaceData: CreateSpaceForm): Promise<Space> {
    const response = await this.request<Space>('/spaces', {
      method: 'POST',
      body: JSON.stringify(spaceData),
    });
    return response.data;
  }

  async updateSpace(id: string, spaceData: Partial<Space>): Promise<Space> {
    const response = await this.request<Space>(`/spaces/${id}`, {
      method: 'PUT',
      body: JSON.stringify(spaceData),
    });
    return response.data;
  }

  async deleteSpace(id: string): Promise<void> {
    await this.request(`/spaces/${id}`, { method: 'DELETE' });
  }

  // Booking APIs
  async getBookings(filters?: BookingFilters): Promise<Booking[]> {
    const queryParams = new URLSearchParams();
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined) {
          queryParams.append(key, value.toString());
        }
      });
    }
    
    const response = await this.request<Booking[]>(`/bookings?${queryParams}`);
    return response.data;
  }

  async getBooking(id: string): Promise<Booking> {
    const response = await this.request<Booking>(`/bookings/${id}`);
    return response.data;
  }

  async createBooking(bookingData: CreateBookingForm): Promise<Booking> {
    const response = await this.request<Booking>('/bookings', {
      method: 'POST',
      body: JSON.stringify(bookingData),
    });
    return response.data;
  }

  async updateBooking(id: string, bookingData: Partial<Booking>): Promise<Booking> {
    const response = await this.request<Booking>(`/bookings/${id}`, {
      method: 'PUT',
      body: JSON.stringify(bookingData),
    });
    return response.data;
  }

  async cancelBooking(id: string, reason?: string): Promise<void> {
    await this.request(`/bookings/${id}/cancel`, {
      method: 'POST',
      body: JSON.stringify({ reason }),
    });
  }

  // Complaint APIs
  async getComplaints(): Promise<Complaint[]> {
    const response = await this.request<Complaint[]>('/complaints');
    return response.data;
  }

  async getComplaint(id: string): Promise<Complaint> {
    const response = await this.request<Complaint>(`/complaints/${id}`);
    return response.data;
  }

  async createComplaint(complaintData: CreateComplaintForm): Promise<Complaint> {
    const response = await this.request<Complaint>('/complaints', {
      method: 'POST',
      body: JSON.stringify(complaintData),
    });
    return response.data;
  }

  async updateComplaint(id: string, complaintData: Partial<Complaint>): Promise<Complaint> {
    const response = await this.request<Complaint>(`/complaints/${id}`, {
      method: 'PUT',
      body: JSON.stringify(complaintData),
    });
    return response.data;
  }

  // Tenant APIs
  async getTenants(): Promise<Tenant[]> {
    const response = await this.request<Tenant[]>('/tenants');
    return response.data;
  }

  async createTenant(tenantData: Omit<Tenant, 'id' | 'createdAt'>): Promise<Tenant> {
    const response = await this.request<Tenant>('/tenants', {
      method: 'POST',
      body: JSON.stringify(tenantData),
    });
    return response.data;
  }

  // Pricing APIs
  async getPricingRules(): Promise<PricingRule[]> {
    const response = await this.request<PricingRule[]>('/pricing-rules');
    return response.data;
  }

  async updatePricingRule(id: string, ruleData: Partial<PricingRule>): Promise<PricingRule> {
    const response = await this.request<PricingRule>(`/pricing-rules/${id}`, {
      method: 'PUT',
      body: JSON.stringify(ruleData),
    });
    return response.data;
  }

  async calculateBookingCost(
    spaceId: string,
    duration: string,
    rentType: string,
    unitsBooked: number,
    startDate: string,
    endDate: string
  ): Promise<{ totalCost: number; costPerUnit: number; breakdown: any }> {
    const response = await this.request<any>('/pricing/calculate', {
      method: 'POST',
      body: JSON.stringify({
        spaceId,
        duration,
        rentType,
        unitsBooked,
        startDate,
        endDate,
      }),
    });
    return response.data;
  }

  // Analytics and Reports APIs
  async getDashboardStats(): Promise<DashboardStats> {
    const response = await this.request<DashboardStats>('/analytics/dashboard');
    return response.data;
  }

  async getRevenueReport(startDate: string, endDate: string): Promise<RevenueData[]> {
    const response = await this.request<RevenueData[]>(
      `/analytics/revenue?startDate=${startDate}&endDate=${endDate}`
    );
    return response.data;
  }

  async getUtilizationReport(startDate: string, endDate: string): Promise<UtilizationData[]> {
    const response = await this.request<UtilizationData[]>(
      `/analytics/utilization?startDate=${startDate}&endDate=${endDate}`
    );
    return response.data;
  }

  async getVacancyAlerts(): Promise<VacancyAlert[]> {
    const response = await this.request<VacancyAlert[]>('/analytics/vacancy-alerts');
    return response.data;
  }

  // Calendar APIs
  async getCalendarData(startDate: string, endDate: string): Promise<any[]> {
    const response = await this.request<any[]>(
      `/calendar?startDate=${startDate}&endDate=${endDate}`
    );
    return response.data;
  }
}

export const apiService = new ApiService();
export default apiService;
