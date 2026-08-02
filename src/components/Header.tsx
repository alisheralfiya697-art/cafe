import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Coffee,
  ShoppingBag,
  User,
  Sun,
  Moon,
  Menu as MenuIcon,
  X,
  ShieldCheck,
  Calendar,
  Sparkles,
  Award,
} from 'lucide-react';

export const Header: React.FC = () => {
  const {
    themeMode,
    toggleTheme,
    currentPage,
    setCurrentPage,
    cart,
    setIsCartOpen,
    userProfile,
    setIsAuthModalOpen,
    isAdminMode,
    setIsAdminMode,
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const cartItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'menu', label: 'Menu' },
    { id: 'booking', label: 'Book Table', badge: 'Popular' },
    { id: 'decoration', label: 'Decorate Event', badge: 'Custom' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'about', label: 'About Us' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-[#FDFBF7]/90 dark:bg-[#14110E]/90 border-b border-[#E5E1D8] dark:border-[#2E2720] transition-colors duration-300">
      {/* Top Banner for VIP Loyalty announcement */}
      <div className="bg-[#1F1710] text-[#D4AF37] text-xs py-1.5 px-4 text-center font-medium flex items-center justify-center gap-2 border-b border-[#D4AF37]/20">
        <Sparkles className="w-3.5 h-3.5 animate-pulse text-[#F3D068]" />
        <span className="tracking-wide">Book Online & Earn 150 VIP Gold Beans | Get 15% OFF with Code <strong className="underline tracking-wider font-bold">FESTIVE15</strong></span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <button
            onClick={() => setCurrentPage('home')}
            className="flex items-center gap-3 group text-left cursor-pointer focus:outline-none"
          >
            <div className="w-10 h-10 rounded-full bg-[#4B3621] dark:bg-[#D4AF37] text-[#FDFBF7] dark:text-[#14110E] flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
              <Coffee className="w-5 h-5" />
            </div>
            <div>
              <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-[#2C2420] dark:text-[#F7F4EE] block">
                Café Grandeur
              </span>
              <span className="text-[9px] tracking-[0.2em] uppercase text-[#6B5E51] dark:text-[#A89D91] font-sans block">
                Luxury & Event Dining
              </span>
            </div>
          </button>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => {
              const isActive = currentPage === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => setCurrentPage(link.id)}
                  className={`relative px-3 py-2 text-xs uppercase tracking-wider font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                    isActive
                      ? 'text-[#4B3621] dark:text-[#D4AF37] border-b-2 border-[#4B3621] dark:border-[#D4AF37]'
                      : 'text-[#6B5E51] dark:text-[#A89D91] hover:text-[#2C2420] dark:hover:text-[#F7F4EE]'
                  }`}
                >
                  {link.label}
                  {link.badge && (
                    <span className="text-[8px] uppercase tracking-widest px-1.5 py-0.5 rounded bg-[#D4AF37] text-[#1F1710] font-bold">
                      {link.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Action Icons & Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Admin Dashboard Switch */}
            <button
              onClick={() => {
                setIsAdminMode(!isAdminMode);
                if (!isAdminMode) setCurrentPage('admin');
              }}
              title="Toggle Admin Portal"
              className={`hidden sm:flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1.5 rounded-md border transition-all ${
                isAdminMode
                  ? 'bg-[#4B3621] text-[#FDFBF7] border-[#4B3621] shadow-sm'
                  : 'bg-[#F2F0EB] dark:bg-[#1C1814] text-[#6B5E51] dark:text-[#A89D91] border-[#E5E1D8] dark:border-[#2E2720] hover:border-[#4B3621]'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>{isAdminMode ? 'Admin Active' : 'Admin'}</span>
            </button>

            {/* Dark / Light Mode Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full border border-[#E5E1D8] dark:border-[#2E2720] text-[#2C2420] dark:text-[#F7F4EE] hover:bg-[#E5E1D8]/40 dark:hover:bg-[#2E2720]/40 transition-colors"
              title={`Switch to ${themeMode === 'dark' ? 'Light' : 'Dark'} Mode`}
            >
              {themeMode === 'dark' ? <Sun className="w-4 h-4 text-[#D4AF37]" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Cart Drawer Icon */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 rounded-full border border-[#E5E1D8] dark:border-[#2E2720] text-[#2C2420] dark:text-[#F7F4EE] hover:bg-[#E5E1D8]/40 dark:hover:bg-[#2E2720]/40 transition-colors"
              title="View Cart"
            >
              <ShoppingBag className="w-4 h-4" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#4B3621] dark:bg-[#D4AF37] text-[#FDFBF7] dark:text-[#1F1710] text-[10px] font-bold rounded-full flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </button>

            {/* User Account Button */}
            {userProfile ? (
              <button
                onClick={() => setCurrentPage('account')}
                className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-full border border-[#E5E1D8] dark:border-[#2E2720] bg-white dark:bg-[#1C1814] text-xs font-semibold hover:border-[#4B3621] transition-all"
              >
                <img
                  src={userProfile.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100&auto=format&fit=crop'}
                  alt={userProfile.name}
                  className="w-5 h-5 rounded-full object-cover border border-[#D4AF37]"
                />
                <span className="hidden md:inline text-[#2C2420] dark:text-[#F7F4EE]">
                  {userProfile.name.split(' ')[0]}
                </span>
                <span className="text-[9px] bg-[#D4AF37] text-[#1F1710] px-1.5 py-0.5 rounded font-bold">
                  {userProfile.loyaltyPoints} ₹
                </span>
              </button>
            ) : (
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-md bg-[#4B3621] dark:bg-[#D4AF37] text-[#FDFBF7] dark:text-[#1F1710] text-xs uppercase tracking-wider font-bold hover:opacity-90 transition-all cursor-pointer"
              >
                <User className="w-3.5 h-3.5" />
                <span>Sign In</span>
              </button>
            )}

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-md border border-[#E5E1D8] dark:border-[#2E2720] text-[#2C2420] dark:text-[#F7F4EE]"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#E5E1D8] dark:border-[#2E2720] bg-[#FDFBF7] dark:bg-[#14110E] px-4 pt-3 pb-6 space-y-2 animate-fadeIn">
          {navLinks.map((link) => {
            const isActive = currentPage === link.id;
            return (
              <button
                key={link.id}
                onClick={() => {
                  setCurrentPage(link.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-left px-4 py-3 text-xs uppercase tracking-wider font-semibold flex items-center justify-between rounded-md ${
                  isActive
                    ? 'bg-[#4B3621] text-[#FDFBF7]'
                    : 'text-[#6B5E51] dark:text-[#A89D91]'
                }`}
              >
                <span>{link.label}</span>
                {link.badge && (
                  <span className="text-[8px] uppercase tracking-widest px-2 py-0.5 rounded bg-[#D4AF37] text-[#1F1710] font-bold">
                    {link.badge}
                  </span>
                )}
              </button>
            );
          })}

          <div className="pt-2 border-t border-[#E5E1D8] dark:border-[#2E2720] flex items-center justify-between">
            <button
              onClick={() => {
                setIsAdminMode(!isAdminMode);
                if (!isAdminMode) setCurrentPage('admin');
                setMobileMenuOpen(false);
              }}
              className="text-xs font-bold px-3 py-2 rounded bg-[#F2F0EB] dark:bg-[#1C1814] text-[#4B3621] dark:text-[#D4AF37] border border-[#E5E1D8] dark:border-[#2E2720] flex items-center gap-1.5"
            >
              <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
              {isAdminMode ? 'Admin Active' : 'Switch to Admin Portal'}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
