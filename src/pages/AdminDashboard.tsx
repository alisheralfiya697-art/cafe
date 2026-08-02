import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { MenuItem, Reservation, CafeTable } from '../types';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from 'recharts';
import {
  ShieldCheck,
  TrendingUp,
  Users,
  Calendar,
  Utensils,
  Sparkles,
  PackageCheck,
  DollarSign,
  Search,
  Plus,
  Check,
  X,
  Eye,
  Edit2,
  Lock,
  Layers,
  Clock,
  MapPin,
  RefreshCw,
} from 'lucide-react';

export const AdminDashboardPage: React.FC = () => {
  const {
    reservations,
    tables,
    toggleTableOccupancy,
    menuItems,
    addMenuItem,
    toggleMenuItemAvailability,
    dailyStats,
    showToast,
  } = useApp();

  const [activeAdminTab, setActiveAdminTab] = useState<
    'overview' | 'bookings' | 'occupancy' | 'menu' | 'customers' | 'calendar' | 'inventory'
  >('overview');

  const [bookingFilterStatus, setBookingFilterStatus] = useState<string>('all');
  const [bookingSearch, setBookingSearch] = useState<string>('');

  // Add Menu Item Modal
  const [isAddMenuOpen, setIsAddMenuOpen] = useState(false);
  const [newItemName, setNewItemName] = useState('');
  const [newItemCategory, setNewItemCategory] = useState<'Coffee' | 'Tea' | 'Desserts' | 'Snacks' | 'Main Course'>('Coffee');
  const [newItemPrice, setNewItemPrice] = useState(300);
  const [newItemDesc, setNewItemDesc] = useState('');
  const [newItemImg, setNewItemImg] = useState('https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=800&auto=format&fit=crop');

  const totalRevenue = dailyStats.reduce((sum, d) => sum + d.revenue, 0);
  const totalBookingsCount = reservations.length;
  const occupiedTablesCount = tables.filter((t) => t.isOccupied).length;
  const occupancyPercentage = Math.round((occupiedTablesCount / tables.length) * 100);

  const filteredReservations = reservations.filter((r) => {
    if (bookingFilterStatus !== 'all' && r.status !== bookingFilterStatus) return false;
    if (
      bookingSearch &&
      !r.userName.toLowerCase().includes(bookingSearch.toLowerCase()) &&
      !r.id.toLowerCase().includes(bookingSearch.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  const handleAddNewMenu = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemName) return;

    const item: MenuItem = {
      id: `item-${Date.now()}`,
      name: newItemName,
      category: newItemCategory,
      price: Number(newItemPrice),
      description: newItemDesc || 'Handcrafted signature dish by Chef.',
      image: newItemImg,
      type: 'veg',
      rating: 5.0,
      prepTime: '10 mins',
      available: true,
    };

    addMenuItem(item);
    setIsAddMenuOpen(false);
    setNewItemName('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-amber-950 via-[#23160f] to-[#120e0b] border-2 border-amber-500 text-white shadow-2xl flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-amber-500 text-black font-extrabold shadow-lg">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] uppercase tracking-widest font-bold text-amber-400">
              Management Portal
            </span>
            <h1 className="font-serif text-3xl font-bold">Café Admin Dashboard</h1>
          </div>
        </div>

        <div className="flex items-center gap-3 text-xs">
          <span className="px-3 py-1.5 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold">
            Live Occupancy: {occupancyPercentage}% ({occupiedTablesCount}/{tables.length} Tables)
          </span>
        </div>
      </div>

      {/* Admin Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto border-b border-[#e8dfd1] dark:border-[#2d261e] pb-3">
        {[
          { id: 'overview', label: 'Analytics & Revenue', icon: <TrendingUp className="w-4 h-4" /> },
          { id: 'bookings', label: 'Manage Bookings', icon: <Calendar className="w-4 h-4" /> },
          { id: 'occupancy', label: 'Seat Occupancy Map', icon: <Layers className="w-4 h-4" /> },
          { id: 'menu', label: 'Menu Management', icon: <Utensils className="w-4 h-4" /> },
          { id: 'customers', label: 'Customer CRM', icon: <Users className="w-4 h-4" /> },
          { id: 'inventory', label: 'Inventory Monitor', icon: <PackageCheck className="w-4 h-4" /> },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveAdminTab(tab.id as any)}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeAdminTab === tab.id
                ? 'bg-amber-500 text-black shadow-md font-extrabold scale-105'
                : 'bg-white dark:bg-[#1a1612] text-[#6b5c4f] dark:text-[#a39587] border border-[#e8dfd1] dark:border-[#2d261e]'
            }`}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab 1: Analytics & Revenue Overview */}
      {activeAdminTab === 'overview' && (
        <div className="space-y-8 animate-fadeIn">
          {/* Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-white dark:bg-[#1a1612] border border-[#e8dfd1] dark:border-[#2d261e] shadow-md space-y-2">
              <span className="text-xs text-[#8c7b6c] block">Weekly Revenue (INR)</span>
              <span className="font-serif text-3xl font-bold gold-gradient-text">
                ₹{totalRevenue.toLocaleString('en-IN')}
              </span>
              <span className="text-[10px] text-emerald-500 font-bold block">↑ +18.4% vs last week</span>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-[#1a1612] border border-[#e8dfd1] dark:border-[#2d261e] shadow-md space-y-2">
              <span className="text-xs text-[#8c7b6c] block">Total Table Bookings</span>
              <span className="font-serif text-3xl font-bold text-[#1c130d] dark:text-[#f8f4ed]">
                {totalBookingsCount}
              </span>
              <span className="text-[10px] text-emerald-500 font-bold block">100% Confirmation Rate</span>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-[#1a1612] border border-[#e8dfd1] dark:border-[#2d261e] shadow-md space-y-2">
              <span className="text-xs text-[#8c7b6c] block">Current Seat Occupancy</span>
              <span className="font-serif text-3xl font-bold text-[#1c130d] dark:text-[#f8f4ed]">
                {occupancyPercentage}%
              </span>
              <span className="text-[10px] text-amber-500 font-bold block">
                {occupiedTablesCount} Tables Occupied
              </span>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-[#1a1612] border border-[#e8dfd1] dark:border-[#2d261e] shadow-md space-y-2">
              <span className="text-xs text-[#8c7b6c] block">Average Order Value</span>
              <span className="font-serif text-3xl font-bold text-[#1c130d] dark:text-[#f8f4ed]">
                ₹840
              </span>
              <span className="text-[10px] text-emerald-500 font-bold block">High Tea & Event Additions</span>
            </div>
          </div>

          {/* Recharts Revenue Chart */}
          <div className="p-6 rounded-3xl bg-white dark:bg-[#1a1612] border border-[#e8dfd1] dark:border-[#2d261e] shadow-md space-y-4">
            <h3 className="font-serif text-xl font-bold text-[#1c130d] dark:text-[#f8f4ed]">
              Daily Revenue Report (INR ₹)
            </h3>
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={dailyStats}>
                  <defs>
                    <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#d4af37" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#d4af37" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="day" stroke="#a39587" fontSize={12} />
                  <YAxis stroke="#a39587" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1a1612',
                      borderColor: '#d4af37',
                      color: '#f8f4ed',
                      borderRadius: '12px',
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke="#d4af37"
                    strokeWidth={3}
                    fillOpacity={1}
                    fill="url(#colorRev)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Manage Bookings */}
      {activeAdminTab === 'bookings' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="p-4 rounded-2xl bg-white dark:bg-[#1a1612] border border-[#e8dfd1] dark:border-[#2d261e] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-[#8c7b6c] absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search guest name or ref ID..."
                value={bookingSearch}
                onChange={(e) => setBookingSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#faf7f2] dark:bg-[#120e0b] border border-[#e8dfd1] dark:border-[#2d261e] text-xs"
              />
            </div>

            <div className="flex items-center gap-2">
              {['all', 'Confirmed', 'Completed', 'Cancelled'].map((st) => (
                <button
                  key={st}
                  onClick={() => setBookingFilterStatus(st)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold border ${
                    bookingFilterStatus === st
                      ? 'bg-[#d4af37] text-black border-[#d4af37]'
                      : 'border-[#e8dfd1] dark:border-[#2d261e] text-[#8c7b6c]'
                  }`}
                >
                  {st.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-[#e8dfd1] dark:border-[#2d261e] bg-white dark:bg-[#1a1612]">
            <table className="w-full text-left text-xs text-[#1c130d] dark:text-[#f8f4ed]">
              <thead className="bg-[#faf7f2] dark:bg-[#120e0b] border-b border-[#e8dfd1] dark:border-[#2d261e] text-[#8c7b6c] font-bold uppercase text-[10px]">
                <tr>
                  <th className="p-3.5">Booking Ref</th>
                  <th className="p-3.5">Guest Name</th>
                  <th className="p-3.5">Date & Time</th>
                  <th className="p-3.5">Seating Table</th>
                  <th className="p-3.5">Decoration Package</th>
                  <th className="p-3.5">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e8dfd1] dark:divide-[#2d261e]">
                {filteredReservations.map((r) => (
                  <tr key={r.id} className="hover:bg-[#faf7f2]/50 dark:hover:bg-[#120e0b]/50">
                    <td className="p-3.5 font-mono font-bold text-[#d4af37]">#{r.id}</td>
                    <td className="p-3.5">
                      <span className="font-bold block">{r.userName}</span>
                      <span className="text-[10px] text-[#8c7b6c]">{r.userPhone}</span>
                    </td>
                    <td className="p-3.5">
                      {r.date} @ {r.timeSlot}
                    </td>
                    <td className="p-3.5 font-bold">
                      {r.seatingArea} {r.tableNumber ? `(${r.tableNumber})` : ''}
                    </td>
                    <td className="p-3.5">
                      {r.decoration ? (
                        <span className="text-amber-500 font-bold flex items-center gap-1">
                          <Sparkles className="w-3 h-3" /> {r.decoration.occasion} Setup
                        </span>
                      ) : (
                        <span className="text-[#8c7b6c]">Standard Table</span>
                      )}
                    </td>
                    <td className="p-3.5">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400">
                        {r.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 3: Live Seat Occupancy */}
      {activeAdminTab === 'occupancy' && (
        <div className="p-6 rounded-3xl bg-white dark:bg-[#1a1612] border border-[#e8dfd1] dark:border-[#2d261e] shadow-md space-y-6 animate-fadeIn">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-[#d4af37] uppercase">Floor Occupancy Control</span>
              <h3 className="font-serif text-2xl font-bold text-[#1c130d] dark:text-[#f8f4ed]">
                Live Table Status
              </h3>
            </div>
            <p className="text-xs text-[#8c7b6c]">Click any table to toggle Occupied/Vacant state.</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {tables.map((t) => (
              <div
                key={t.id}
                onClick={() => toggleTableOccupancy(t.id)}
                className={`p-4 rounded-2xl border-2 transition-all cursor-pointer space-y-2 ${
                  t.isOccupied
                    ? 'bg-red-500/10 border-red-500 text-red-400'
                    : 'bg-emerald-500/10 border-emerald-500 text-emerald-400'
                }`}
              >
                <div className="flex items-center justify-between font-bold">
                  <span>{t.tableNumber}</span>
                  <span className="text-[10px] uppercase">{t.isOccupied ? 'Occupied' : 'Vacant'}</span>
                </div>
                <div className="text-xs text-[#1c130d] dark:text-[#f8f4ed]">
                  {t.area} Zone • {t.capacity} Capacity
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: Menu Management */}
      {activeAdminTab === 'menu' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-xl font-bold text-[#1c130d] dark:text-[#f8f4ed]">
              Café Menu List ({menuItems.length} Items)
            </h3>
            <button
              onClick={() => setIsAddMenuOpen(true)}
              className="px-4 py-2 rounded-xl gold-gradient-bg text-[#120e0b] font-bold text-xs flex items-center gap-1.5 shadow-md"
            >
              <Plus className="w-4 h-4" /> Add New Menu Item
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {menuItems.map((item) => (
              <div
                key={item.id}
                className="p-4 rounded-2xl bg-white dark:bg-[#1a1612] border border-[#e8dfd1] dark:border-[#2d261e] shadow-md flex gap-3"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 rounded-xl object-cover shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="font-serif font-bold text-sm text-[#1c130d] dark:text-[#f8f4ed] truncate">
                    {item.name}
                  </h4>
                  <span className="text-xs font-bold text-[#d4af37] block">₹{item.price}</span>
                  <button
                    onClick={() => toggleMenuItemAvailability(item.id)}
                    className={`mt-2 text-[10px] font-bold px-2 py-0.5 rounded ${
                      item.available
                        ? 'bg-emerald-500/20 text-emerald-400'
                        : 'bg-red-500/20 text-red-400'
                    }`}
                  >
                    {item.available ? 'In Stock ✓' : 'Out of Stock ✕'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 5: Customer CRM */}
      {activeAdminTab === 'customers' && (
        <div className="p-6 rounded-3xl bg-white dark:bg-[#1a1612] border border-[#e8dfd1] dark:border-[#2d261e] shadow-md space-y-4 animate-fadeIn">
          <h3 className="font-serif text-xl font-bold text-[#1c130d] dark:text-[#f8f4ed]">
            VIP Customer CRM
          </h3>
          <div className="p-4 rounded-xl bg-[#faf7f2] dark:bg-[#120e0b] border border-[#e8dfd1] dark:border-[#2d261e] flex items-center justify-between text-xs">
            <div>
              <span className="font-bold text-[#1c130d] dark:text-[#f8f4ed] block">Aarav Mehta</span>
              <span className="text-[#8c7b6c]">aarav.mehta@gmail.com • +91 98201 45892</span>
            </div>
            <span className="font-bold text-[#d4af37]">1,250 Gold Beans (Gold VIP)</span>
          </div>
        </div>
      )}

      {/* Tab 6: Inventory Monitor */}
      {activeAdminTab === 'inventory' && (
        <div className="p-6 rounded-3xl bg-white dark:bg-[#1a1612] border border-[#e8dfd1] dark:border-[#2d261e] shadow-md space-y-4 animate-fadeIn">
          <h3 className="font-serif text-xl font-bold text-[#1c130d] dark:text-[#f8f4ed]">
            Café Stock & Props Monitor
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-[#faf7f2] dark:bg-[#120e0b] border border-[#e8dfd1] dark:border-[#2d261e] space-y-1">
              <span className="font-bold text-[#1c130d] dark:text-[#f8f4ed] block">
                Chickmagalur Arabica Beans
              </span>
              <span className="text-emerald-500 font-bold block">42.5 Kg Stock (Optimal)</span>
            </div>
            <div className="p-4 rounded-xl bg-[#faf7f2] dark:bg-[#120e0b] border border-[#e8dfd1] dark:border-[#2d261e] space-y-1">
              <span className="font-bold text-[#1c130d] dark:text-[#f8f4ed] block">
                Helium Balloon Tanks & Props
              </span>
              <span className="text-emerald-500 font-bold block">18 Tanks (Ready)</span>
            </div>
            <div className="p-4 rounded-xl bg-[#faf7f2] dark:bg-[#120e0b] border border-[#e8dfd1] dark:border-[#2d261e] space-y-1">
              <span className="font-bold text-[#1c130d] dark:text-[#f8f4ed] block">
                Kashmiri Saffron & Gold Leaf
              </span>
              <span className="text-amber-500 font-bold block">High Demand Stock</span>
            </div>
          </div>
        </div>
      )}

      {/* Add New Menu Modal */}
      {isAddMenuOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="w-full max-w-md bg-[#faf7f2] dark:bg-[#1a1612] border-2 border-[#d4af37] rounded-3xl p-6 shadow-2xl space-y-4">
            <div className="flex justify-between items-center border-b border-[#e8dfd1] dark:border-[#2d261e] pb-2">
              <h3 className="font-serif text-xl font-bold text-[#1c130d] dark:text-[#f8f4ed]">
                Add New Menu Item
              </h3>
              <button onClick={() => setIsAddMenuOpen(false)}>
                <X className="w-5 h-5 text-[#8c7b6c]" />
              </button>
            </div>

            <form onSubmit={handleAddNewMenu} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-[#8c7b6c] mb-1">Item Title</label>
                <input
                  type="text"
                  required
                  value={newItemName}
                  onChange={(e) => setNewItemName(e.target.value)}
                  placeholder="e.g. Saffron Pistachio Latte"
                  className="w-full px-3 py-2 rounded-xl bg-white dark:bg-[#120e0b] border text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#8c7b6c] mb-1">Category</label>
                <select
                  value={newItemCategory}
                  onChange={(e) => setNewItemCategory(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-xl bg-white dark:bg-[#120e0b] border text-xs"
                >
                  <option value="Coffee">Coffee</option>
                  <option value="Tea">Tea</option>
                  <option value="Desserts">Desserts</option>
                  <option value="Snacks">Snacks</option>
                  <option value="Main Course">Main Course</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#8c7b6c] mb-1">Price in INR (₹)</label>
                <input
                  type="number"
                  required
                  value={newItemPrice}
                  onChange={(e) => setNewItemPrice(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl bg-white dark:bg-[#120e0b] border text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#8c7b6c] mb-1">Description</label>
                <textarea
                  rows={2}
                  value={newItemDesc}
                  onChange={(e) => setNewItemDesc(e.target.value)}
                  className="w-full p-2 rounded-xl bg-white dark:bg-[#120e0b] border text-xs"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl gold-gradient-bg text-[#120e0b] font-bold text-xs"
              >
                Add Item To Menu
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
