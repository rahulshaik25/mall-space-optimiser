
// User and Authentication Types
export const USER_ROLES = {
  MARKETING: 'marketing',
  OWNER: 'owner'
};

// Space Types
export const SPACE_TYPES = [
  'Small Shop',
  'Medium Shop', 
  'Large Shop',
  'Atrium - North and West',
  'Atrium - South',
  'Cinema Theater',
  'Marketing Banner Space'
];

export const DURATION_TYPES = ['Week Days', 'Week Ends', 'Public Holidays', 'All Days'];
export const RENT_TYPES = ['Day Wise', 'Hour Wise', 'Week Wise', 'SqFt'];
export const SPACE_STATUSES = ['Available', 'Occupied', 'Maintenance', 'Reserved'];

// Complaint Types
export const COMPLAINT_CATEGORIES = ['Electrical', 'Carpentry', 'Plumbing', 'Security', 'Cleaning', 'Other'];
export const COMPLAINT_PRIORITIES = ['Low', 'Medium', 'High', 'Critical'];
export const COMPLAINT_STATUSES = ['Open', 'In Progress', 'Resolved', 'Closed'];

// Booking Statuses
export const BOOKING_STATUSES = ['Pending', 'Confirmed', 'Cancelled', 'Completed'];
export const PAYMENT_STATUSES = ['Pending', 'Partial', 'Paid', 'Overdue'];
