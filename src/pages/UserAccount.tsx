import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  User,
  Calendar,
  Clock,
  MapPin,
  Award,
  Tag,
  QrCode,
  Sparkles,
  Check,
  XCircle,
  RefreshCw,
  LogOut,
  Heart,
  ChevronRight,
  ShieldCheck,
} from 'lucide-react';

export const UserAccountPage: React.FC = () => {
  const {
    userProfile,
    logoutUser,
    reservations,
    cancelReservation,
    rescheduleReservation,
    setActiveReservationForQR,
    setIsAuthModalOpen,
    setCurrentPage,
    showToast,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'bookings' | 'rewards' | 'coupons' | 'favorites'>(
    'bookings'
  );
  const [rescheduleResId, setRescheduleResId] = useState<string | null>(null);
  const [newResDate, setNewResDate] = useState('2026-08-10');
  const [newResTime, setNewResTime] = useState('08:00 PM');

  if (!userProfile) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center space-y-4">
        <div className="w-16 h-16 rounded-full gold-gradient-bg text-[#120e0b] mx-auto flex items-center justify-center">
          <User className="w-8 h-8" />
        </div>
        <h2 className="font-serif text-2xl font-bold text-[#1c130d] dark:text-[#f8f4ed]">
          Sign In Required
        </h2>
        <p className="text-xs text-[#6b5c4f] dark:text-[#a39587]">
          Please sign in or register to view your table booking history, loyalty points, and saved decoration presets.
        </p>
        <button
          onClick={() => setIsAuthModalOpen(true)}
          className="px-6 py-3 rounded-xl gold-gradient-bg text-[#120e0b] font-bold text-xs shadow-lg"
        >
          Sign In Now
        </button>
      </div>
    );
  }

  const handleConfirmReschedule = (resId: string) => {
    rescheduleReservation(resId, newResDate, newResTime);
    setRescheduleResId(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Profile Banner Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#23160f] via-[#3a2519] to-[#1a1612] border-2 border-[#d4af37] text-[#f8f4ed] shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <img
            src={
              userProfile.avatar ||
              'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop'
            }
            alt={userProfile.name}
            className="w-20 h-20 rounded-full object-cover border-2 border-[#d4af37] shadow-xl"
          />
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h1 className="font-serif text-2xl font-bold">{userProfile.name}</h1>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded gold-gradient-bg text-[#120e0b]">
                {userProfile.vipTier}
              </span>
            </div>
            <p className="text-xs text-[#c4b5a5]">
              {userProfile.email} • {userProfile.phone}
            </p>
            <div className="flex items-center gap-2 pt-1 text-xs text-[#f3d068] font-bold">
              <Award className="w-4 h-4 text-[#d4af37]" />
              <span>{userProfile.loyaltyPoints} Gold Beans Balance (₹{Math.floor(userProfile.loyaltyPoints / 10)} Value)</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={logoutUser}
            className="px-4 py-2 rounded-xl bg-red-500/20 text-red-400 border border-red-500/30 text-xs font-bold flex items-center gap-1.5 hover:bg-red-500/30"
          >
            <LogOut className="w-4 h-4" /> Sign Out
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-3 border-b border-[#e8dfd1] dark:border-[#2d261e] pb-3">
        {[
          { id: 'bookings', label: 'Booking History', icon: <Calendar className="w-4 h-4" /> },
          { id: 'rewards', label: 'Loyalty Rewards', icon: <Award className="w-4 h-4" /> },
          { id: 'coupons', label: 'Coupons & Promos', icon: <Tag className="w-4 h-4" /> },
          { id: 'favorites', label: 'Favorite Tables', icon: <Heart className="w-4 h-4" /> },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === tab.id
                ? 'gold-gradient-bg text-[#120e0b] shadow-md scale-105'
                : 'bg-white dark:bg-[#1a1612] text-[#6b5c4f] dark:text-[#a39587] border border-[#e8dfd1] dark:border-[#2d261e]'
            }`}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab Content 1: Booking History */}
      {activeTab === 'bookings' && (
        <div className="space-y-4">
          <h3 className="font-serif text-xl font-bold text-[#1c130d] dark:text-[#f8f4ed]">
            Your Table Reservations
          </h3>

          {reservations.length === 0 ? (
            <div className="text-center py-12 bg-white dark:bg-[#1a1612] rounded-2xl border border-[#e8dfd1] dark:border-[#2d261e]">
              <p className="text-xs text-[#8c7b6c]">No reservation history found.</p>
              <button
                onClick={() => setCurrentPage('booking')}
                className="mt-3 px-4 py-2 rounded-xl gold-gradient-bg text-[#120e0b] font-bold text-xs"
              >
                Book A Table Now
              </button>
            </div>
          ) : (
            reservations.map((res) => (
              <div
                key={res.id}
                className="p-6 rounded-2xl bg-white dark:bg-[#1a1612] border border-[#e8dfd1] dark:border-[#2d261e] shadow-md space-y-4"
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-[#e8dfd1] dark:border-[#2d261e] pb-3">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-[#d4af37]">
                      Reservation #{res.id}
                    </span>
                    <h4 className="font-serif text-lg font-bold text-[#1c130d] dark:text-[#f8f4ed]">
                      {res.seatingArea} Zone {res.tableNumber ? `(${res.tableNumber})` : ''}
                    </h4>
                  </div>
                  <span
                    className={`text-xs font-bold px-3 py-1 rounded-full ${
                      res.status === 'Confirmed'
                        ? 'bg-emerald-500/20 text-emerald-400'
                        : res.status === 'Completed'
                        ? 'bg-blue-500/20 text-blue-400'
                        : 'bg-red-500/20 text-red-400'
                    }`}
                  >
                    {res.status}
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs text-[#6b5c4f] dark:text-[#a39587]">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-[#d4af37]" />
                    <span>{res.date}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-[#d4af37]" />
                    <span>{res.timeSlot}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-[#d4af37]" />
                    <span>{res.guests} Guests</span>
                  </div>
                  {res.decoration && (
                    <div className="flex items-center gap-1.5 text-amber-500 font-bold">
                      <Sparkles className="w-4 h-4" />
                      <span>{res.decoration.occasion} Decoration</span>
                    </div>
                  )}
                </div>

                {/* Reschedule inline editor */}
                {rescheduleResId === res.id && (
                  <div className="p-4 rounded-xl bg-[#d4af37]/10 border border-[#d4af37] space-y-3 animate-fadeIn">
                    <span className="text-xs font-bold text-[#d4af37] block">
                      Select New Reschedule Date & Time
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <input
                        type="date"
                        value={newResDate}
                        onChange={(e) => setNewResDate(e.target.value)}
                        className="px-3 py-2 rounded-lg bg-white dark:bg-[#120e0b] text-xs font-semibold"
                      />
                      <select
                        value={newResTime}
                        onChange={(e) => setNewResTime(e.target.value)}
                        className="px-3 py-2 rounded-lg bg-white dark:bg-[#120e0b] text-xs font-semibold"
                      >
                        <option value="04:30 PM">04:30 PM</option>
                        <option value="07:30 PM">07:30 PM</option>
                        <option value="09:00 PM">09:00 PM</option>
                      </select>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleConfirmReschedule(res.id)}
                        className="px-4 py-2 rounded-lg gold-gradient-bg text-[#120e0b] font-bold text-xs"
                      >
                        Confirm Reschedule
                      </button>
                      <button
                        onClick={() => setRescheduleResId(null)}
                        className="px-4 py-2 rounded-lg border border-[#2d261e] text-xs"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="pt-2 border-t border-[#e8dfd1] dark:border-[#2d261e] flex flex-wrap gap-2 justify-end">
                  <button
                    onClick={() => setActiveReservationForQR(res)}
                    className="px-3.5 py-1.5 rounded-xl gold-gradient-bg text-[#120e0b] font-bold text-xs flex items-center gap-1.5 shadow-sm"
                  >
                    <QrCode className="w-3.5 h-3.5" /> Digital QR Pass
                  </button>

                  {res.status === 'Confirmed' && (
                    <>
                      <button
                        onClick={() => setRescheduleResId(res.id)}
                        className="px-3.5 py-1.5 rounded-xl border border-[#d4af37] text-[#d4af37] font-bold text-xs flex items-center gap-1 hover:bg-[#d4af37]/10"
                      >
                        <RefreshCw className="w-3.5 h-3.5" /> Reschedule
                      </button>

                      <button
                        onClick={() => cancelReservation(res.id)}
                        className="px-3.5 py-1.5 rounded-xl border border-red-500/40 text-red-400 font-bold text-xs flex items-center gap-1 hover:bg-red-500/10"
                      >
                        <XCircle className="w-3.5 h-3.5" /> Cancel Booking
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Tab Content 2: Loyalty Rewards */}
      {activeTab === 'rewards' && (
        <div className="p-6 rounded-3xl bg-white dark:bg-[#1a1612] border border-[#e8dfd1] dark:border-[#2d261e] shadow-md space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-[#d4af37] uppercase">
                VIP Loyalty Program
              </span>
              <h3 className="font-serif text-2xl font-bold text-[#1c130d] dark:text-[#f8f4ed]">
                Your Loyalty Beans Wallet
              </h3>
            </div>
            <div className="text-right">
              <span className="font-serif text-3xl font-bold gold-gradient-text">
                {userProfile.loyaltyPoints} Pts
              </span>
              <span className="text-[10px] text-[#8c7b6c] block">
                = ₹{Math.floor(userProfile.loyaltyPoints / 10)} Discount Value
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-xs font-semibold text-[#8c7b6c]">
              <span>Gold VIP Tier Progress</span>
              <span>1,250 / 2,000 Pts (Platinum Royal Next)</span>
            </div>
            <div className="w-full h-3 rounded-full bg-[#faf7f2] dark:bg-[#120e0b] border border-[#e8dfd1] dark:border-[#2d261e] overflow-hidden">
              <div className="h-full gold-gradient-bg w-[62%] rounded-full"></div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
            <div className="p-4 rounded-xl bg-[#d4af37]/10 border border-[#d4af37]/30 text-xs space-y-1">
              <span className="font-bold text-[#d4af37] block">Earn 150 Beans Per Booking</span>
              <p className="text-[#6b5c4f] dark:text-[#a39587]">
                Book table online and get instant 150 points added to your balance.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-[#d4af37]/10 border border-[#d4af37]/30 text-xs space-y-1">
              <span className="font-bold text-[#d4af37] block">10 Points = ₹1 INR</span>
              <p className="text-[#6b5c4f] dark:text-[#a39587]">
                Redeem points directly on your coffee & dessert cart orders.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-[#d4af37]/10 border border-[#d4af37]/30 text-xs space-y-1">
              <span className="font-bold text-[#d4af37] block">Complimentary Birthday Dessert</span>
              <p className="text-[#6b5c4f] dark:text-[#a39587]">
                Gold members get a free pastry during their birthday month.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tab Content 3: Coupons */}
      {activeTab === 'coupons' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { code: 'WELCOME50', title: 'Flat ₹50 OFF', desc: 'Min order ₹250 on coffee cart' },
            { code: 'GOLD200', title: 'Flat ₹200 OFF', desc: 'Min order ₹1,000 on dining cart' },
            { code: 'FESTIVE15', title: '15% OFF Event Table', desc: 'Valid on group event reservations' },
          ].map((c) => (
            <div
              key={c.code}
              className="p-6 rounded-2xl bg-white dark:bg-[#1a1612] border-2 border-dashed border-[#d4af37] shadow-md space-y-3 text-center"
            >
              <span className="text-[10px] font-bold bg-[#d4af37]/20 text-[#d4af37] px-2.5 py-1 rounded-full uppercase">
                Promo Voucher
              </span>
              <h4 className="font-serif text-2xl font-bold gold-gradient-text">{c.code}</h4>
              <p className="text-xs font-semibold text-[#1c130d] dark:text-[#f8f4ed]">{c.title}</p>
              <p className="text-[11px] text-[#8c7b6c]">{c.desc}</p>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(c.code);
                  showToast(`Coupon code ${c.code} copied!`);
                }}
                className="w-full py-2 rounded-xl gold-gradient-bg text-[#120e0b] font-bold text-xs"
              >
                Copy Coupon Code
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Tab Content 4: Favorite Tables */}
      {activeTab === 'favorites' && (
        <div className="p-6 rounded-3xl bg-white dark:bg-[#1a1612] border border-[#e8dfd1] dark:border-[#2d261e] shadow-md space-y-4">
          <h3 className="font-serif text-xl font-bold text-[#1c130d] dark:text-[#f8f4ed]">
            Your Saved Preferred Tables
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-[#faf7f2] dark:bg-[#120e0b] border border-[#e8dfd1] dark:border-[#2d261e] flex justify-between items-center">
              <div>
                <span className="font-bold text-[#d4af37] block">Table ROOF-1 (Rooftop Starlight)</span>
                <span className="text-[#8c7b6c]">Panoramic skyline view • 2 Persons</span>
              </div>
              <button
                onClick={() => setCurrentPage('booking')}
                className="px-3 py-1.5 rounded-lg gold-gradient-bg text-[#120e0b] font-bold"
              >
                Book Spot
              </button>
            </div>

            <div className="p-4 rounded-xl bg-[#faf7f2] dark:bg-[#120e0b] border border-[#e8dfd1] dark:border-[#2d261e] flex justify-between items-center">
              <div>
                <span className="font-bold text-[#d4af37] block">Table T-01 (Indoor Cozy Nook)</span>
                <span className="text-[#8c7b6c]">Velvet armchairs & ambient lamp • 2 Persons</span>
              </div>
              <button
                onClick={() => setCurrentPage('booking')}
                className="px-3 py-1.5 rounded-lg gold-gradient-bg text-[#120e0b] font-bold"
              >
                Book Spot
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
