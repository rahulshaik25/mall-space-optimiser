
// Base API configuration
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080/api';

class ApiService {
  constructor() {
    this.token = localStorage.getItem('authToken');
  }

  async request(endpoint, options = {}) {
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
  async login(credentials) {
    const response = await this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
    
    if (response.success && response.data.token) {
      this.token = response.data.token;
      localStorage.setItem('authToken', response.data.token);
    }
    
    return response.data;
  }

  async logout() {
    try {
      await this.request('/auth/logout', { method: 'POST' });
    } finally {
      this.token = null;
      localStorage.removeItem('authToken');
    }
  }

  async getCurrentUser() {
    const response = await this.request('/auth/me');
    return response.data;
  }

  // Space Management APIs
  async getSpaces(filters = {}) {
    const queryParams = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined) {
        queryParams.append(key, value.toString());
      }
    });
    
    const response = await this.request(`/spaces?${queryParams}`);
    return response.data;
  }

  async getSpace(id) {
    const response = await this.request(`/spaces/${id}`);
    return response.data;
  }

  async createSpace(spaceData) {
    const response = await this.request('/spaces', {
      method: 'POST',
      body: JSON.stringify(spaceData),
    });
    return response.data;
  }

  async updateSpace(id, spaceData) {
    const response = await this.request(`/spaces/${id}`, {
      method: 'PUT',
      body: JSON.stringify(spaceData),
    });
    return response.data;
  }

  async deleteSpace(id) {
    await this.request(`/spaces/${id}`, { method: 'DELETE' });
  }

  // Booking APIs
  async getBookings(filters = {}) {
    const queryParams = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined) {
        queryParams.append(key, value.toString());
      }
    });
    
    const response = await this.request(`/bookings?${queryParams}`);
    return response.data;
  }

  async getBooking(id) {
    const response = await this.request(`/bookings/${id}`);
    return response.data;
  }

  async createBooking(bookingData) {
    const response = await this.request('/bookings', {
      method: 'POST',
      body: JSON.stringify(bookingData),
    });
    return response.data;
  }

  async updateBooking(id, bookingData) {
    const response = await this.request(`/bookings/${id}`, {
      method: 'PUT',
      body: JSON.stringify(bookingData),
    });
    return response.data;
  }

  async cancelBooking(id, reason) {
    await this.request(`/bookings/${id}/cancel`, {
      method: 'POST',
      body: JSON.stringify({ reason }),
    });
  }

  // Complaint APIs
  async getComplaints() {
    const response = await this.request('/complaints');
    return response.data;
  }

  async getComplaint(id) {
    const response = await this.request(`/complaints/${id}`);
    return response.data;
  }

  async createComplaint(complaintData) {
    const response = await this.request('/complaints', {
      method: 'POST',
      body: JSON.stringify(complaintData),
    });
    return response.data;
  }

  async updateComplaint(id, complaintData) {
    const response = await this.request(`/complaints/${id}`, {
      method: 'PUT',
      body: JSON.stringify(complaintData),
    });
    return response.data;
  }

  // Tenant APIs
  async getTenants() {
    const response = await this.request('/tenants');
    return response.data;
  }

  async createTenant(tenantData) {
    const response = await this.request('/tenants', {
      method: 'POST',
      body: JSON.stringify(tenantData),
    });
    return response.data;
  }

  // Pricing APIs
  async getPricingRules() {
    const response = await this.request('/pricing-rules');
    return response.data;
  }

  async updatePricingRule(id, ruleData) {
    const response = await this.request(`/pricing-rules/${id}`, {
      method: 'PUT',
      body: JSON.stringify(ruleData),
    });
    return response.data;
  }

  async calculateBookingCost(spaceId, duration, rentType, unitsBooked, startDate, endDate) {
    const response = await this.request('/pricing/calculate', {
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
  async getDashboardStats() {
    const response = await this.request('/analytics/dashboard');
    return response.data;
  }

  async getRevenueReport(startDate, endDate) {
    const response = await this.request(
      `/analytics/revenue?startDate=${startDate}&endDate=${endDate}`
    );
    return response.data;
  }

  async getUtilizationReport(startDate, endDate) {
    const response = await this.request(
      `/analytics/utilization?startDate=${startDate}&endDate=${endDate}`
    );
    return response.data;
  }

  async getVacancyAlerts() {
    const response = await this.request('/analytics/vacancy-alerts');
    return response.data;
  }

  // Calendar APIs
  async getCalendarData(startDate, endDate) {
    const response = await this.request(
      `/calendar?startDate=${startDate}&endDate=${endDate}`
    );
    return response.data;
  }
}

export const apiService = new ApiService();
export default apiService;
