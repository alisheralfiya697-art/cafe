export type ThemeMode = 'dark' | 'light';

export type Currency = 'INR';

export type FoodType = 'veg' | 'non-veg' | 'eggless' | 'vegan';

export interface MenuItem {
  id: string;
  name: string;
  category: 'Coffee' | 'Tea' | 'Desserts' | 'Snacks' | 'Main Course' | 'Beverages' | 'Breakfast';
  price: number; // in INR (₹)
  description: string;
  image: string;
  type: FoodType;
  popular?: boolean;
  chefSpecial?: boolean;
  rating: number;
  prepTime: string;
  available: boolean;
  options?: {
    milk?: string[];
    sweetness?: string[];
    additions?: { name: string; price: number }[];
  };
}

export interface CartItem {
  id: string;
  menuItem: MenuItem;
  quantity: number;
  selectedMilk?: string;
  selectedSweetness?: string;
  selectedAdditions?: { name: string; price: number }[];
  itemTotal: number;
  specialInstructions?: string;
}

export type SeatingArea = 'Indoor' | 'Outdoor' | 'Private Cabin' | 'Rooftop';

export interface CafeTable {
  id: string;
  tableNumber: string;
  area: SeatingArea;
  capacity: number; // 2, 4, 6, 8
  isOccupied?: boolean;
  isReserved?: boolean;
  features: string[]; // e.g. "Window View", "Corner Booth", "Sofa Seating", "AC Front"
  position: { x: number; y: number }; // percentage positions on floor plan
  shape: 'round' | 'rect' | 'booth';
}

export type EventOccasion =
  | 'Birthday'
  | 'Anniversary'
  | 'Proposal'
  | 'Baby Shower'
  | 'Engagement'
  | 'Romantic Dinner'
  | 'Graduation'
  | 'Corporate Meeting'
  | 'Custom Event';

export interface DecorationOption {
  id: string;
  title: string;
  category:
    | 'Balloons'
    | 'Flowers'
    | 'Lighting'
    | 'Candles'
    | 'Signage'
    | 'Cake'
    | 'Photo Wall'
    | 'Table Style'
    | 'Music'
    | 'VIP Setup';
  description: string;
  price: number; // INR
  image: string;
  popular?: boolean;
}

export interface CustomDecorationSelection {
  occasion: EventOccasion;
  selectedOptionIds: string[];
  themeColor: string;
  playlistChoice: string;
  nameBoardText?: string;
  customInstructions?: string;
  budgetCap?: number;
  inspirationImages?: string[]; // mock base64 or URLs
  estimatedTotal: number;
}

export interface Reservation {
  id: string; // e.g. "CG-8921"
  userId: string;
  userName: string;
  userEmail: string;
  userPhone: string;
  date: string; // YYYY-MM-DD
  timeSlot: string; // e.g. "07:30 PM"
  guests: number;
  seatingArea: SeatingArea;
  tableId?: string;
  tableNumber?: string;
  status: 'Confirmed' | 'Checked-In' | 'Completed' | 'Cancelled';
  specialRequests?: string;
  decoration?: CustomDecorationSelection;
  qrCodeData: string;
  createdAt: string;
  totalCost?: number;
}

export interface CustomerReview {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  date: string;
  comment: string;
  occasionTag?: string;
}

export interface CafeEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  description: string;
  image: string;
  pricePerPerson?: number;
  category: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Interiors' | 'Event Celebrations' | 'Signature Dishes' | 'Decorations';
  image: string;
  caption: string;
}

export interface Coupon {
  code: string;
  discountPercent?: number;
  flatDiscount?: number;
  minOrderAmount: number;
  description: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  loyaltyPoints: number;
  vipTier: 'Silver' | 'Gold VIP' | 'Platinum Royal';
  favoriteTableIds: string[];
  savedDecorationPresets: CustomDecorationSelection[];
}

export interface DailyRevenueStat {
  day: string;
  revenue: number; // INR
  bookings: number;
  orders: number;
}
