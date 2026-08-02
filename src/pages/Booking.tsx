import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { SeatingArea, CafeTable, Reservation } from '../types';
import { TableMap } from '../components/TableMap';
import {
  Calendar,
  Clock,
  Users,
  MapPin,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  Shield,
  QrCode,
  Gift,
  Mail,
  Phone,
  User,
} from 'lucide-react';

export const BookingPage: React.FC = () => {
  const {
    userProfile,
    addReservation,
    draftDecoration,
    setDraftDecoration,
    setActiveReservationForQR,
    setCurrentPage,
    showToast,
  } = useApp();

  const [date, setDate] = useState<string>('2026-08-05');
  const [timeSlot, setTimeSlot] = useState<string>('07:30 PM');
  const [guests, setGuests] = useState<number>(2);
  const [seatingArea, setSeatingArea] = useState<SeatingArea>('Rooftop');
  const [selectedTable, setSelectedTable] = useState<CafeTable | undefined>(undefined);

  const [userName, setUserName] = useState<string>(userProfile?.name || 'Aarav Mehta');
  const [userEmail, setUserEmail] = useState<string>(userProfile?.email || 'aarav.mehta@gmail.com');
  const [userPhone, setUserPhone] = useState<string>(userProfile?.phone || '+91 98201 45892');
  const [specialRequests, setSpecialRequests] = useState<string>('Anniversary dinner by window view');

  const [createdReservation, setCreatedReservation] = useState<Reservation | null>(null);

  const timeSlots = [
    '08:00 AM (Breakfast)',
    '11:30 AM (Brunch)',
    '02:00 PM (Afternoon)',
    '04:30 PM (Sunset High Tea)',
    '07:00 PM (Prime Dinner)',
    '08:30 PM (Candlelight Session)',
    '10:00 PM (Late Starlight)',
  ];

  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();

    const resData = {
      userId: userProfile?.id || 'guest-101',
      userName,
      userEmail,
      userPhone,
      date,
      timeSlot,
      guests,
      seatingArea,
      tableId: selectedTable?.id,
      tableNumber: selectedTable?.tableNumber,
      specialRequests,
      decoration: draftDecoration || undefined,
      totalCost: draftDecoration ? draftDecoration.estimatedTotal : 0,
    };

    const newRes = addReservation(resData);
    setCreatedReservation(newRes);

    // Simulate Email & SMS Confirmation Toast
    showToast(`📩 Reservation Pass & QR Code sent to ${userEmail} and ${userPhone}!`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs uppercase font-extrabold tracking-widest text-[#d4af37]">
          Online Table Reservation
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#1c130d] dark:text-[#f8f4ed]">
          Book Your Royal Table
        </h1>
        <p className="text-xs sm:text-sm text-[#6b5c4f] dark:text-[#a39587]">
          Select date, guests, seating preference, and your preferred table on our interactive floor map. Earn 150 VIP Gold Beans instantly upon confirmation.
        </p>
      </div>

      {createdReservation ? (
        /* Confirmation Screen */
        <div className="max-w-2xl mx-auto bg-white dark:bg-[#1a1612] border-2 border-[#d4af37] rounded-3xl p-8 shadow-2xl text-center space-y-6 animate-fadeIn">
          <div className="w-20 h-20 rounded-full gold-gradient-bg text-[#120e0b] mx-auto flex items-center justify-center shadow-lg">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <span className="text-xs uppercase font-bold text-[#d4af37] tracking-wider">
              Booking Confirmed
            </span>
            <h2 className="font-serif text-3xl font-bold text-[#1c130d] dark:text-[#f8f4ed]">
              We Look Forward To Serving You!
            </h2>
            <p className="text-xs text-[#6b5c4f] dark:text-[#a39587]">
              An official email and SMS confirmation with your digital QR entry pass has been dispatched.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#faf7f2] dark:bg-[#120e0b] border border-[#e8dfd1] dark:border-[#2d261e] text-left text-xs space-y-3">
            <div className="flex justify-between items-center font-bold pb-2 border-b border-[#e8dfd1] dark:border-[#2d261e]">
              <span className="text-[#d4af37]">Ref ID: #{createdReservation.id}</span>
              <span className="bg-emerald-500/20 text-emerald-400 px-2.5 py-0.5 rounded-full">
                {createdReservation.status}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-[#1c130d] dark:text-[#f8f4ed]">
              <div>
                <span className="text-[#8c7b6c] block text-[10px]">Guest Name</span>
                <span className="font-semibold">{createdReservation.userName}</span>
              </div>
              <div>
                <span className="text-[#8c7b6c] block text-[10px]">Date & Time</span>
                <span className="font-semibold">
                  {createdReservation.date} @ {createdReservation.timeSlot}
                </span>
              </div>
              <div>
                <span className="text-[#8c7b6c] block text-[10px]">Seating Zone</span>
                <span className="font-semibold">
                  {createdReservation.seatingArea}{' '}
                  {createdReservation.tableNumber ? `(${createdReservation.tableNumber})` : ''}
                </span>
              </div>
              <div>
                <span className="text-[#8c7b6c] block text-[10px]">Party Size</span>
                <span className="font-semibold">{createdReservation.guests} Persons</span>
              </div>
            </div>

            {createdReservation.decoration && (
              <div className="pt-2 border-t border-[#e8dfd1] dark:border-[#2d261e] text-amber-500 font-semibold flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" />
                <span>
                  Attached Event Decoration: {createdReservation.decoration.occasion} Setup (₹
                  {createdReservation.decoration.estimatedTotal})
                </span>
              </div>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              onClick={() => setActiveReservationForQR(createdReservation)}
              className="flex-1 py-3 rounded-xl gold-gradient-bg text-[#120e0b] font-bold text-xs flex items-center justify-center gap-2 shadow-md hover:brightness-110 cursor-pointer"
            >
              <QrCode className="w-4 h-4" /> View Digital QR Pass
            </button>
            <button
              onClick={() => setCurrentPage('account')}
              className="flex-1 py-3 rounded-xl bg-white dark:bg-[#1f1a14] border border-[#d4af37]/40 text-[#d4af37] font-bold text-xs hover:bg-[#d4af37]/10 cursor-pointer"
            >
              View My Bookings History
            </button>
          </div>
        </div>
      ) : (
        /* Booking Flow Form */
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Seating Map & Form */}
          <div className="lg:col-span-2 space-y-8">
            {/* Step 1: Date, Time & Guests */}
            <div className="p-6 rounded-3xl bg-white dark:bg-[#1a1612] border border-[#e8dfd1] dark:border-[#2d261e] shadow-md space-y-4">
              <h3 className="font-serif text-xl font-bold text-[#1c130d] dark:text-[#f8f4ed] flex items-center gap-2">
                <span className="w-6 h-6 rounded-full gold-gradient-bg text-[#120e0b] text-xs flex items-center justify-center font-bold">
                  1
                </span>
                Reservation Date & Party Size
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#8c7b6c] dark:text-[#a39587] mb-1">
                    Select Date
                  </label>
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-[#faf7f2] dark:bg-[#120e0b] border border-[#e8dfd1] dark:border-[#2d261e] text-xs font-semibold text-[#1c130d] dark:text-[#f8f4ed]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#8c7b6c] dark:text-[#a39587] mb-1">
                    Select Time Slot
                  </label>
                  <select
                    value={timeSlot}
                    onChange={(e) => setTimeSlot(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-[#faf7f2] dark:bg-[#120e0b] border border-[#e8dfd1] dark:border-[#2d261e] text-xs font-semibold text-[#1c130d] dark:text-[#f8f4ed]"
                  >
                    {timeSlots.map((ts) => (
                      <option key={ts} value={ts}>
                        {ts}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#8c7b6c] dark:text-[#a39587] mb-1">
                    Guests Count
                  </label>
                  <select
                    value={guests}
                    onChange={(e) => setGuests(Number(e.target.value))}
                    className="w-full px-3 py-2.5 rounded-xl bg-[#faf7f2] dark:bg-[#120e0b] border border-[#e8dfd1] dark:border-[#2d261e] text-xs font-semibold text-[#1c130d] dark:text-[#f8f4ed]"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 10, 12].map((num) => (
                      <option key={num} value={num}>
                        {num} {num === 1 ? 'Guest' : 'Guests'}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Step 2: Interactive Table Map */}
            <div className="p-6 rounded-3xl bg-white dark:bg-[#1a1612] border border-[#e8dfd1] dark:border-[#2d261e] shadow-md space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-serif text-xl font-bold text-[#1c130d] dark:text-[#f8f4ed] flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full gold-gradient-bg text-[#120e0b] text-xs flex items-center justify-center font-bold">
                    2
                  </span>
                  Seating Preference & Interactive Map
                </h3>
              </div>

              <TableMap
                selectedArea={seatingArea}
                onAreaChange={(area) => {
                  setSeatingArea(area);
                  setSelectedTable(undefined);
                }}
                selectedTableId={selectedTable?.id}
                onSelectTable={(table) => setSelectedTable(table)}
              />
            </div>
          </div>

          {/* Sidebar Guest Details & Submit */}
          <div className="space-y-6">
            {/* Attached Decoration Notice */}
            {draftDecoration ? (
              <div className="p-5 rounded-2xl bg-gradient-to-br from-[#23160f] to-[#3a2519] border border-[#d4af37] text-[#f8f4ed] space-y-3 shadow-xl">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase font-bold text-[#f3d068] flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" /> Attached Event Decoration
                  </span>
                  <button
                    onClick={() => setDraftDecoration(null)}
                    className="text-xs text-red-400 font-bold hover:underline"
                  >
                    Remove
                  </button>
                </div>
                <h4 className="font-serif font-bold text-lg text-[#f3d068]">
                  {draftDecoration.occasion} Custom Setup
                </h4>
                <p className="text-xs text-[#c4b5a5]">
                  Theme: {draftDecoration.themeColor} • Music: {draftDecoration.playlistChoice}
                </p>
                <div className="text-xs font-bold text-[#d4af37]">
                  Decoration Cost: ₹{draftDecoration.estimatedTotal}
                </div>
              </div>
            ) : (
              <div className="p-5 rounded-2xl bg-white dark:bg-[#1a1612] border border-[#e8dfd1] dark:border-[#2d261e] space-y-3">
                <h4 className="font-serif font-bold text-base text-[#1c130d] dark:text-[#f8f4ed] flex items-center gap-2">
                  <Gift className="w-4 h-4 text-[#d4af37]" /> Celebrating Something Special?
                </h4>
                <p className="text-xs text-[#6b5c4f] dark:text-[#a39587]">
                  Add custom balloon arches, flowers, candles, neon signs & cake arrangement to your table.
                </p>
                <button
                  onClick={() => setCurrentPage('decoration')}
                  className="w-full py-2 rounded-xl border border-[#d4af37] text-[#d4af37] font-bold text-xs hover:bg-[#d4af37] hover:text-[#120e0b] transition-all cursor-pointer"
                >
                  Configure Event Decoration
                </button>
              </div>
            )}

            {/* Guest Details Form */}
            <form
              onSubmit={handleConfirmBooking}
              className="p-6 rounded-3xl bg-white dark:bg-[#1a1612] border border-[#e8dfd1] dark:border-[#2d261e] shadow-md space-y-4"
            >
              <h3 className="font-serif text-lg font-bold text-[#1c130d] dark:text-[#f8f4ed]">
                Guest Contact Details
              </h3>

              <div>
                <label className="block text-xs font-semibold text-[#8c7b6c] dark:text-[#a39587] mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-[#8c7b6c] absolute left-3 top-2.5" />
                  <input
                    type="text"
                    required
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#faf7f2] dark:bg-[#120e0b] border border-[#e8dfd1] dark:border-[#2d261e] text-xs font-semibold text-[#1c130d] dark:text-[#f8f4ed]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#8c7b6c] dark:text-[#a39587] mb-1">
                  Email Address (For Pass)
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-[#8c7b6c] absolute left-3 top-2.5" />
                  <input
                    type="email"
                    required
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#faf7f2] dark:bg-[#120e0b] border border-[#e8dfd1] dark:border-[#2d261e] text-xs font-semibold text-[#1c130d] dark:text-[#f8f4ed]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#8c7b6c] dark:text-[#a39587] mb-1">
                  Phone Number (For SMS Confirmation)
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-[#8c7b6c] absolute left-3 top-2.5" />
                  <input
                    type="tel"
                    required
                    value={userPhone}
                    onChange={(e) => setUserPhone(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#faf7f2] dark:bg-[#120e0b] border border-[#e8dfd1] dark:border-[#2d261e] text-xs font-semibold text-[#1c130d] dark:text-[#f8f4ed]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#8c7b6c] dark:text-[#a39587] mb-1">
                  Special Instructions
                </label>
                <textarea
                  rows={2}
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                  placeholder="e.g. Quiet corner, high chair required, dietary allergies..."
                  className="w-full p-3 rounded-xl bg-[#faf7f2] dark:bg-[#120e0b] border border-[#e8dfd1] dark:border-[#2d261e] text-xs text-[#1c130d] dark:text-[#f8f4ed]"
                />
              </div>

              <div className="pt-2 border-t border-[#e8dfd1] dark:border-[#2d261e] space-y-3">
                <div className="flex justify-between text-xs text-[#8c7b6c]">
                  <span>Table Reservation Charge</span>
                  <span className="font-bold text-emerald-500">FREE</span>
                </div>
                {draftDecoration && (
                  <div className="flex justify-between text-xs text-[#8c7b6c]">
                    <span>Event Decoration Package</span>
                    <span className="font-bold text-[#d4af37]">₹{draftDecoration.estimatedTotal}</span>
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl gold-gradient-bg text-[#120e0b] font-extrabold text-sm shadow-xl hover:brightness-110 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Confirm Reservation</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
