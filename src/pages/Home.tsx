import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { UPCOMING_EVENTS, CUSTOMER_REVIEWS } from '../data/mockData';
import {
  Coffee,
  Calendar,
  Clock,
  Users,
  Sparkles,
  ArrowRight,
  Star,
  Gift,
  Award,
  ChevronRight,
  PartyPopper,
  MapPin,
  UtensilsCrossed,
} from 'lucide-react';

export const Home: React.FC = () => {
  const { setCurrentPage, menuItems, addToCart } = useApp();

  const [quickDate, setQuickDate] = useState('2026-08-05');
  const [quickTime, setQuickTime] = useState('07:30 PM');
  const [quickGuests, setQuickGuests] = useState(2);

  const popularItems = menuItems.filter((m) => m.popular).slice(0, 4);

  const handleQuickReserve = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage('booking');
  };

  return (
    <div className="space-y-20 pb-16">
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden rounded-2xl mx-4 sm:mx-6 lg:mx-8 mt-4 border border-[#E5E1D8] dark:border-[#2E2720] bg-[#F9F7F2] dark:bg-[#1A1612] shadow-sm">
        {/* Background Image with Clean Minimal Gradient Overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 scale-105 opacity-90"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1600&auto=format&fit=crop')`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#1F1710]/90 via-[#1F1710]/75 to-[#1F1710]/40 dark:from-[#0A0806]/95 dark:via-[#0A0806]/85 dark:to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 py-20 text-center space-y-8 text-[#FDFBF7]">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#F3D068] text-[10px] font-bold tracking-[0.2em] uppercase">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>EST. 1994 • Artisanal Coffee & Candlelit Dining</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-tight">
            Where Luxury Meets <span className="text-[#D4AF37] italic font-light block mt-1">the Artisanal Bean</span>
          </h1>

          <p className="text-sm sm:text-base text-[#E5E1D8] max-w-2xl mx-auto font-normal leading-relaxed">
            Savor single-origin Chickmagalur Arabica brews, Michelin-inspired French patisserie, and bespoke candlelit event table setups in Mumbai.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <button
              onClick={() => setCurrentPage('booking')}
              className="w-full sm:w-auto px-8 py-3.5 rounded-md bg-[#4B3621] text-[#FDFBF7] hover:bg-[#D4AF37] hover:text-[#1F1710] font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Your Table</span>
            </button>

            <button
              onClick={() => setCurrentPage('menu')}
              className="w-full sm:w-auto px-8 py-3.5 rounded-md bg-white/10 backdrop-blur-md border border-[#E5E1D8]/40 text-[#FDFBF7] hover:bg-white/20 font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <UtensilsCrossed className="w-4 h-4 text-[#D4AF37]" />
              <span>Explore Menu</span>
            </button>
          </div>

          {/* Key Metric Highlights */}
          <div className="pt-8 grid grid-cols-3 gap-4 border-t border-[#E5E1D8]/20 max-w-lg mx-auto text-center">
            <div>
              <span className="font-serif text-2xl font-bold text-[#D4AF37]">4.9 ★</span>
              <span className="block text-[10px] uppercase tracking-widest text-[#E5E1D8]/80 mt-1">1,200+ Reviews</span>
            </div>
            <div>
              <span className="font-serif text-2xl font-bold text-[#D4AF37]">12K+</span>
              <span className="block text-[10px] uppercase tracking-widest text-[#E5E1D8]/80 mt-1">Celebrations</span>
            </div>
            <div>
              <span className="font-serif text-2xl font-bold text-[#D4AF37]">25+</span>
              <span className="block text-[10px] uppercase tracking-widest text-[#E5E1D8]/80 mt-1">Master Baristas</span>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Booking Floating Widget */}
      <section className="max-w-5xl mx-auto px-4 -mt-10 relative z-20">
        <form
          onSubmit={handleQuickReserve}
          className="bg-white dark:bg-[#1C1814] border border-[#E5E1D8] dark:border-[#2E2720] rounded-xl p-4 sm:p-6 shadow-lg grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end"
        >
          <div>
            <label className="block text-[10px] uppercase tracking-widest font-bold text-[#6B5E51] dark:text-[#A89D91] mb-1.5 flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-[#D4AF37]" /> Date
            </label>
            <input
              type="date"
              value={quickDate}
              onChange={(e) => setQuickDate(e.target.value)}
              className="w-full px-3 py-2 rounded-md bg-[#FDFBF7] dark:bg-[#14110E] border border-[#E5E1D8] dark:border-[#2E2720] text-xs font-semibold text-[#2C2420] dark:text-[#F7F4EE]"
            />
          </div>

          <div>
            <label className="block text-[10px] uppercase tracking-widest font-bold text-[#6B5E51] dark:text-[#A89D91] mb-1.5 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-[#D4AF37]" /> Time Slot
            </label>
            <select
              value={quickTime}
              onChange={(e) => setQuickTime(e.target.value)}
              className="w-full px-3 py-2 rounded-md bg-[#FDFBF7] dark:bg-[#14110E] border border-[#E5E1D8] dark:border-[#2E2720] text-xs font-semibold text-[#2C2420] dark:text-[#F7F4EE]"
            >
              <option value="04:00 PM">04:00 PM (Sunset High Tea)</option>
              <option value="07:30 PM">07:30 PM (Candlelight Dinner)</option>
              <option value="09:00 PM">09:00 PM (Late Night Starlight)</option>
            </select>
          </div>

          <div>
            <label className="block text-[10px] uppercase tracking-widest font-bold text-[#6B5E51] dark:text-[#A89D91] mb-1.5 flex items-center gap-1">
              <Users className="w-3.5 h-3.5 text-[#D4AF37]" /> Guests
            </label>
            <select
              value={quickGuests}
              onChange={(e) => setQuickGuests(Number(e.target.value))}
              className="w-full px-3 py-2 rounded-md bg-[#FDFBF7] dark:bg-[#14110E] border border-[#E5E1D8] dark:border-[#2E2720] text-xs font-semibold text-[#2C2420] dark:text-[#F7F4EE]"
            >
              <option value={2}>2 Persons (Romantic)</option>
              <option value={4}>4 Persons (Family)</option>
              <option value={6}>6 Persons (Party)</option>
              <option value={10}>10+ Persons (VIP Group)</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 rounded-md bg-[#4B3621] text-[#FDFBF7] hover:bg-[#D4AF37] hover:text-[#1F1710] text-xs uppercase tracking-wider font-bold transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Check Availability</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </section>

      {/* Featured Offers */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8">
          <div>
            <span className="text-[10px] uppercase font-extrabold tracking-[0.2em] text-[#D4AF37]">
              Exclusive Royal Perks
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#2C2420] dark:text-[#F7F4EE] mt-1">
              Featured Offers & Combos
            </h2>
          </div>
          <button
            onClick={() => setCurrentPage('menu')}
            className="text-xs uppercase tracking-wider font-bold text-[#4B3621] dark:text-[#D4AF37] hover:underline flex items-center gap-1"
          >
            View Menu <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-xl bg-white dark:bg-[#1C1814] border border-[#E5E1D8] dark:border-[#2E2720] text-[#2C2420] dark:text-[#F7F4EE] shadow-sm space-y-4">
            <div className="w-10 h-10 rounded-full bg-[#4B3621] text-[#FDFBF7] flex items-center justify-center">
              <Coffee className="w-5 h-5 text-[#D4AF37]" />
            </div>
            <h3 className="font-serif text-xl font-bold text-[#2C2420] dark:text-[#F7F4EE]">
              Golden Sunset High Tea @ ₹699
            </h3>
            <p className="text-xs text-[#6B5E51] dark:text-[#A89D91] leading-relaxed">
              Includes 2 Artisanal Coffees/Teas, Truffle Croissants, and 2 Slices of Pastry. Available 4 PM - 7 PM daily.
            </p>
            <button
              onClick={() => setCurrentPage('booking')}
              className="text-xs font-bold text-[#4B3621] dark:text-[#D4AF37] hover:underline block"
            >
              Reserve High Tea Table →
            </button>
          </div>

          <div className="p-6 rounded-xl bg-white dark:bg-[#1C1814] border border-[#E5E1D8] dark:border-[#2E2720] text-[#2C2420] dark:text-[#F7F4EE] shadow-sm space-y-4">
            <div className="w-10 h-10 rounded-full bg-[#4B3621] text-[#FDFBF7] flex items-center justify-center">
              <Gift className="w-5 h-5 text-[#D4AF37]" />
            </div>
            <h3 className="font-serif text-xl font-bold text-[#2C2420] dark:text-[#F7F4EE]">
              Complimentary Birthday Cake
            </h3>
            <p className="text-xs text-[#6B5E51] dark:text-[#A89D91] leading-relaxed">
              Book a table of 4 or more with custom birthday decoration & receive a free 500g Belgian Truffle cake!
            </p>
            <button
              onClick={() => setCurrentPage('decoration')}
              className="text-xs font-bold text-[#4B3621] dark:text-[#D4AF37] hover:underline block"
            >
              Customize Decoration →
            </button>
          </div>

          <div className="p-6 rounded-xl bg-white dark:bg-[#1C1814] border border-[#E5E1D8] dark:border-[#2E2720] text-[#2C2420] dark:text-[#F7F4EE] shadow-sm space-y-4">
            <div className="w-10 h-10 rounded-full bg-[#4B3621] text-[#FDFBF7] flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-[#D4AF37]" />
            </div>
            <h3 className="font-serif text-xl font-bold text-[#2C2420] dark:text-[#F7F4EE]">
              15% OFF Group Bookings
            </h3>
            <p className="text-xs text-[#6B5E51] dark:text-[#A89D91] leading-relaxed">
              Use code <strong className="text-[#4B3621] dark:text-[#D4AF37] underline">FESTIVE15</strong> at checkout for group reservations and corporate events.
            </p>
            <button
              onClick={() => setCurrentPage('booking')}
              className="text-xs font-bold text-[#4B3621] dark:text-[#D4AF37] hover:underline block"
            >
              Book Group Table →
            </button>
          </div>
        </div>
      </section>

      {/* Popular Menu Items */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto space-y-2 mb-10">
          <span className="text-[10px] uppercase font-extrabold tracking-[0.2em] text-[#D4AF37]">
            Crafted To Perfection
          </span>
          <h2 className="font-serif text-3xl font-bold text-[#2C2420] dark:text-[#F7F4EE]">
            Popular Menu Items
          </h2>
          <p className="text-xs text-[#6B5E51] dark:text-[#A89D91]">
            Handcrafted with ethically sourced single-origin beans & Belgian cocoa.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {popularItems.map((item) => (
            <div
              key={item.id}
              className="p-4 rounded-xl bg-white dark:bg-[#1C1814] border border-[#E5E1D8] dark:border-[#2E2720] shadow-sm hover:border-[#4B3621] transition-all flex flex-col justify-between space-y-3 group"
            >
              <div className="relative overflow-hidden rounded-md h-44 bg-[#F2F0EB] dark:bg-[#241E18]">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-2 right-2 text-[10px] bg-[#1F1710]/90 text-[#F3D068] font-bold px-2 py-0.5 rounded border border-[#D4AF37]/30">
                  ⭐ {item.rating}
                </span>
                <span className="absolute bottom-2 left-2 text-[9px] bg-[#4B3621] text-[#FDFBF7] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                  {item.type}
                </span>
              </div>

              <div>
                <h4 className="font-serif text-base font-bold text-[#2C2420] dark:text-[#F7F4EE] line-clamp-1">
                  {item.name}
                </h4>
                <p className="text-xs text-[#6B5E51] dark:text-[#A89D91] line-clamp-2 mt-1">
                  {item.description}
                </p>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-[#F2F0EB] dark:border-[#2E2720]">
                <span className="font-bold text-base text-[#4B3621] dark:text-[#D4AF37]">₹{item.price}</span>
                <button
                  onClick={() => addToCart(item, 1)}
                  className="px-3.5 py-1.5 rounded bg-[#4B3621] text-[#FDFBF7] hover:bg-[#D4AF37] hover:text-[#1F1710] font-bold text-xs uppercase tracking-wider transition-all cursor-pointer"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Customize Decoration Callout Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-2xl overflow-hidden border border-[#E5E1D8] dark:border-[#2E2720] bg-[#1F1710] p-8 sm:p-12 text-[#FDFBF7] flex flex-col md:flex-row items-center justify-between gap-8 shadow-md">
          <div className="space-y-4 max-w-xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-[#D4AF37]/20 text-[#F3D068] text-[10px] uppercase tracking-widest font-bold">
              <PartyPopper className="w-4 h-4 text-[#D4AF37]" /> Personalize Your Special Moments
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold leading-tight text-[#F7F4EE]">
              Design Custom Event Decorations
            </h2>
            <p className="text-xs sm:text-sm text-[#A89D91] leading-relaxed">
              Planning a Birthday, Romantic Proposal, Anniversary, or Graduation? Customize helium balloon arches, red rose runners, fairy light backdrops, custom neon signs & playlist selection.
            </p>
            <button
              onClick={() => setCurrentPage('decoration')}
              className="px-6 py-3 rounded bg-[#D4AF37] text-[#1F1710] font-bold text-xs uppercase tracking-wider hover:opacity-90 transition-all inline-flex items-center gap-2 cursor-pointer"
            >
              <span>Build Custom Event Setup</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="w-full md:w-80 h-56 rounded-xl overflow-hidden border border-[#D4AF37]/30 shadow-lg shrink-0">
            <img
              src="https://images.unsplash.com/photo-1520854221256-17451cc331bf?q=80&w=800&auto=format&fit=crop"
              alt="Decoration Setup"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Customer Testimonials */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-lg mx-auto space-y-2 mb-10">
          <span className="text-[10px] uppercase font-extrabold tracking-[0.2em] text-[#D4AF37]">
            Loved By Guests
          </span>
          <h2 className="font-serif text-3xl font-bold text-[#2C2420] dark:text-[#F7F4EE]">
            Customer Stories
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CUSTOMER_REVIEWS.map((rev) => (
            <div
              key={rev.id}
              className="p-6 rounded-xl bg-white dark:bg-[#1C1814] border border-[#E5E1D8] dark:border-[#2E2720] shadow-sm space-y-4"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={rev.avatar}
                    alt={rev.name}
                    className="w-10 h-10 rounded-full object-cover border border-[#D4AF37]"
                  />
                  <div>
                    <h5 className="font-serif font-bold text-sm text-[#2C2420] dark:text-[#F7F4EE]">
                      {rev.name}
                    </h5>
                    <span className="text-[10px] text-[#6B5E51] dark:text-[#A89D91]">{rev.date}</span>
                  </div>
                </div>
                <div className="flex text-[#D4AF37] text-xs">
                  {'★'.repeat(rev.rating)}
                </div>
              </div>

              {rev.occasionTag && (
                <span className="inline-block text-[9px] uppercase tracking-wider font-bold px-2 py-0.5 rounded bg-[#F2F0EB] dark:bg-[#241E18] text-[#4B3621] dark:text-[#D4AF37]">
                  {rev.occasionTag}
                </span>
              )}

              <p className="text-xs text-[#6B5E51] dark:text-[#A89D91] italic leading-relaxed">
                "{rev.comment}"
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8">
          <div>
            <span className="text-[10px] uppercase font-extrabold tracking-[0.2em] text-[#D4AF37]">
              Live In Café
            </span>
            <h2 className="font-serif text-3xl font-bold text-[#2C2420] dark:text-[#F7F4EE] mt-1">
              Upcoming Events
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {UPCOMING_EVENTS.map((ev) => (
            <div
              key={ev.id}
              className="rounded-xl bg-white dark:bg-[#1C1814] border border-[#E5E1D8] dark:border-[#2E2720] shadow-sm overflow-hidden flex flex-col justify-between"
            >
              <div className="h-44 relative bg-[#F2F0EB] dark:bg-[#241E18]">
                <img src={ev.image} alt={ev.title} className="w-full h-full object-cover" />
                <span className="absolute top-2 left-2 text-[9px] uppercase font-bold tracking-wider bg-[#1F1710] text-[#FDFBF7] px-2 py-0.5 rounded">
                  {ev.category}
                </span>
              </div>

              <div className="p-5 space-y-3">
                <h4 className="font-serif text-lg font-bold text-[#2C2420] dark:text-[#F7F4EE]">
                  {ev.title}
                </h4>
                <div className="text-xs text-[#6B5E51] dark:text-[#A89D91] space-y-1">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#D4AF37]" /> {ev.date}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#D4AF37]" /> {ev.time}
                  </div>
                </div>
                <p className="text-xs text-[#6B5E51] dark:text-[#A89D91] line-clamp-2">
                  {ev.description}
                </p>

                <div className="pt-3 border-t border-[#F2F0EB] dark:border-[#2E2720] flex items-center justify-between">
                  <span className="text-xs font-bold text-[#4B3621] dark:text-[#D4AF37]">
                    {ev.pricePerPerson ? `₹${ev.pricePerPerson} / Person` : 'Free Entry'}
                  </span>
                  <button
                    onClick={() => setCurrentPage('booking')}
                    className="px-3 py-1.5 rounded bg-[#4B3621] text-[#FDFBF7] hover:bg-[#D4AF37] hover:text-[#1F1710] font-bold text-xs uppercase tracking-wider transition-all"
                  >
                    Reserve Spot
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
