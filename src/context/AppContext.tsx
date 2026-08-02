import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  ThemeMode,
  MenuItem,
  CartItem,
  CafeTable,
  DecorationOption,
  Reservation,
  UserProfile,
  Coupon,
  CustomDecorationSelection,
  DailyRevenueStat,
} from '../types';
import {
  INITIAL_MENU_ITEMS,
  CAFE_TABLES,
  DECORATION_OPTIONS,
  INITIAL_USER_PROFILE,
  INITIAL_RESERVATIONS,
  AVAILABLE_COUPONS,
  INITIAL_DAILY_STATS,
} from '../data/mockData';

interface AppContextType {
  themeMode: ThemeMode;
  toggleTheme: () => void;
  currentPage: string;
  setCurrentPage: (page: string) => void;
  cart: CartItem[];
  addToCart: (
    item: MenuItem,
    quantity?: number,
    options?: {
      milk?: string;
      sweetness?: string;
      additions?: { name: string; price: number }[];
      instructions?: string;
    }
  ) => void;
  removeFromCart: (cartItemId: string) => void;
  updateCartQuantity: (cartItemId: string, quantity: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;

  activeCoupon: Coupon | null;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  appliedLoyaltyPoints: number;
  setAppliedLoyaltyPoints: (pts: number) => void;

  userProfile: UserProfile | null;
  loginUser: (email: string, name?: string) => void;
  logoutUser: () => void;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;

  reservations: Reservation[];
  addReservation: (reservationData: Omit<Reservation, 'id' | 'createdAt' | 'qrCodeData'>) => Reservation;
  cancelReservation: (reservationId: string) => void;
  rescheduleReservation: (reservationId: string, newDate: string, newTime: string) => void;
  activeReservationForQR: Reservation | null;
  setActiveReservationForQR: (res: Reservation | null) => void;

  draftDecoration: CustomDecorationSelection | null;
  setDraftDecoration: (dec: CustomDecorationSelection | null) => void;

  // Admin Data & Mode
  isAdminMode: boolean;
  setIsAdminMode: (admin: boolean) => void;
  tables: CafeTable[];
  toggleTableOccupancy: (tableId: string) => void;
  menuItems: MenuItem[];
  addMenuItem: (item: MenuItem) => void;
  updateMenuItem: (item: MenuItem) => void;
  toggleMenuItemAvailability: (itemId: string) => void;
  dailyStats: DailyRevenueStat[];

  // Notification Toast
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [themeMode, setThemeMode] = useState<ThemeMode>('dark');
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [activeCoupon, setActiveCoupon] = useState<Coupon | null>(null);
  const [appliedLoyaltyPoints, setAppliedLoyaltyPoints] = useState<number>(0);

  const [userProfile, setUserProfile] = useState<UserProfile | null>(INITIAL_USER_PROFILE);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);

  const [reservations, setReservations] = useState<Reservation[]>(INITIAL_RESERVATIONS);
  const [activeReservationForQR, setActiveReservationForQR] = useState<Reservation | null>(null);
  const [draftDecoration, setDraftDecoration] = useState<CustomDecorationSelection | null>(null);

  const [isAdminMode, setIsAdminMode] = useState<boolean>(false);
  const [tables, setTables] = useState<CafeTable[]>(CAFE_TABLES);
  const [menuItems, setMenuItems] = useState<MenuItem[]>(INITIAL_MENU_ITEMS);
  const [dailyStats, setDailyStats] = useState<DailyRevenueStat[]>(INITIAL_DAILY_STATS);

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    if (themeMode === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [themeMode]);

  const toggleTheme = () => {
    setThemeMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Cart operations
  const addToCart = (
    item: MenuItem,
    quantity = 1,
    options?: {
      milk?: string;
      sweetness?: string;
      additions?: { name: string; price: number }[];
      instructions?: string;
    }
  ) => {
    const additionsCost = options?.additions?.reduce((sum, a) => sum + a.price, 0) || 0;
    const unitPrice = item.price + additionsCost;
    const cartItemId = `${item.id}-${options?.milk || ''}-${options?.sweetness || ''}-${options?.additions?.map((a) => a.name).join(',') || ''}`;

    setCart((prev) => {
      const existing = prev.find((i) => i.id === cartItemId);
      if (existing) {
        return prev.map((i) =>
          i.id === cartItemId
            ? {
                ...i,
                quantity: i.quantity + quantity,
                itemTotal: (i.quantity + quantity) * unitPrice,
              }
            : i
        );
      }
      return [
        ...prev,
        {
          id: cartItemId,
          menuItem: item,
          quantity,
          selectedMilk: options?.milk,
          selectedSweetness: options?.sweetness,
          selectedAdditions: options?.additions,
          specialInstructions: options?.instructions,
          itemTotal: quantity * unitPrice,
        },
      ];
    });

    showToast(`Added "${item.name}" to cart!`);
  };

  const removeFromCart = (cartItemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== cartItemId));
  };

  const updateCartQuantity = (cartItemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart((prev) =>
      prev.map((i) => {
        if (i.id === cartItemId) {
          const additionsCost = i.selectedAdditions?.reduce((s, a) => s + a.price, 0) || 0;
          const unitPrice = i.menuItem.price + additionsCost;
          return { ...i, quantity, itemTotal: quantity * unitPrice };
        }
        return i;
      })
    );
  };

  const clearCart = () => {
    setCart([]);
    setActiveCoupon(null);
    setAppliedLoyaltyPoints(0);
  };

  const applyCoupon = (code: string) => {
    const found = AVAILABLE_COUPONS.find((c) => c.code.toUpperCase() === code.trim().toUpperCase());
    if (!found) {
      return { success: false, message: 'Invalid coupon code.' };
    }
    const cartTotal = cart.reduce((sum, item) => sum + item.itemTotal, 0);
    if (cartTotal < found.minOrderAmount) {
      return {
        success: false,
        message: `Minimum order amount of ₹${found.minOrderAmount} required for code ${found.code}.`,
      };
    }
    setActiveCoupon(found);
    return { success: true, message: `Coupon ${found.code} applied successfully!` };
  };

  const removeCoupon = () => {
    setActiveCoupon(null);
  };

  // Auth Operations
  const loginUser = (email: string, name?: string) => {
    setUserProfile({
      id: `usr-${Date.now().toString().slice(-4)}`,
      name: name || email.split('@')[0],
      email: email,
      phone: '+91 98765 43210',
      loyaltyPoints: 350,
      vipTier: 'Gold VIP',
      favoriteTableIds: ['tbl-1'],
      savedDecorationPresets: [],
    });
    setIsAuthModalOpen(false);
    showToast(`Welcome back, ${name || email.split('@')[0]}!`);
  };

  const logoutUser = () => {
    setUserProfile(null);
    showToast('Logged out successfully.');
  };

  // Reservation Operations
  const addReservation = (
    reservationData: Omit<Reservation, 'id' | 'createdAt' | 'qrCodeData'>
  ): Reservation => {
    const newId = `CG-${Math.floor(1000 + Math.random() * 9000)}`;
    const newReservation: Reservation = {
      ...reservationData,
      id: newId,
      createdAt: new Date().toISOString().split('T')[0],
      qrCodeData: `CG-RESERVATION-${newId}-${reservationData.userName.toUpperCase().replace(/\s+/g, '')}`,
      status: 'Confirmed',
    };

    setReservations((prev) => [newReservation, ...prev]);

    // Reward loyalty points
    if (userProfile) {
      setUserProfile((prev) => (prev ? { ...prev, loyaltyPoints: prev.loyaltyPoints + 150 } : null));
    }

    // Update table status if tableId assigned
    if (reservationData.tableId) {
      setTables((prev) =>
        prev.map((t) => (t.id === reservationData.tableId ? { ...t, isReserved: true } : t))
      );
    }

    setDraftDecoration(null); // Reset draft
    showToast(`Reservation #${newId} Confirmed! +150 Loyalty Beans Earned 🎉`);
    return newReservation;
  };

  const cancelReservation = (reservationId: string) => {
    setReservations((prev) =>
      prev.map((r) => (r.id === reservationId ? { ...r, status: 'Cancelled' } : r))
    );
    showToast(`Reservation #${reservationId} has been cancelled.`);
  };

  const rescheduleReservation = (reservationId: string, newDate: string, newTime: string) => {
    setReservations((prev) =>
      prev.map((r) => (r.id === reservationId ? { ...r, date: newDate, timeSlot: newTime } : r))
    );
    showToast(`Reservation #${reservationId} rescheduled to ${newDate} at ${newTime}.`);
  };

  // Admin Functions
  const toggleTableOccupancy = (tableId: string) => {
    setTables((prev) =>
      prev.map((t) => (t.id === tableId ? { ...t, isOccupied: !t.isOccupied } : t))
    );
    showToast('Table occupancy status updated.');
  };

  const addMenuItem = (item: MenuItem) => {
    setMenuItems((prev) => [item, ...prev]);
    showToast(`Added new item "${item.name}" to menu.`);
  };

  const updateMenuItem = (item: MenuItem) => {
    setMenuItems((prev) => prev.map((m) => (m.id === item.id ? item : m)));
    showToast(`Updated "${item.name}".`);
  };

  const toggleMenuItemAvailability = (itemId: string) => {
    setMenuItems((prev) =>
      prev.map((m) => (m.id === itemId ? { ...m, available: !m.available } : m))
    );
    showToast('Menu item availability toggled.');
  };

  return (
    <AppContext.Provider
      value={{
        themeMode,
        toggleTheme,
        currentPage,
        setCurrentPage,
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        activeCoupon,
        applyCoupon,
        removeCoupon,
        appliedLoyaltyPoints,
        setAppliedLoyaltyPoints,
        userProfile,
        loginUser,
        logoutUser,
        isAuthModalOpen,
        setIsAuthModalOpen,
        reservations,
        addReservation,
        cancelReservation,
        rescheduleReservation,
        activeReservationForQR,
        setActiveReservationForQR,
        draftDecoration,
        setDraftDecoration,
        isAdminMode,
        setIsAdminMode,
        tables,
        toggleTableOccupancy,
        menuItems,
        addMenuItem,
        updateMenuItem,
        toggleMenuItemAvailability,
        dailyStats,
        toastMessage,
        showToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
