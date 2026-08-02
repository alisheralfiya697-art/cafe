import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { AuthModal } from './components/AuthModal';
import { QRCodeModal } from './components/QRCodeModal';

import { Home } from './pages/Home';
import { MenuPage } from './pages/Menu';
import { BookingPage } from './pages/Booking';
import { DecorationPage } from './pages/Decoration';
import { GalleryPage } from './pages/Gallery';
import { AboutPage } from './pages/About';
import { ContactPage } from './pages/Contact';
import { UserAccountPage } from './pages/UserAccount';
import { AdminDashboardPage } from './pages/AdminDashboard';
import { CheckCircle2, MessageSquare, ArrowUp } from 'lucide-react';

const MainContent: React.FC = () => {
  const { currentPage, toastMessage } = useApp();

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home />;
      case 'menu':
        return <MenuPage />;
      case 'booking':
        return <BookingPage />;
      case 'decoration':
        return <DecorationPage />;
      case 'gallery':
        return <GalleryPage />;
      case 'about':
        return <AboutPage />;
      case 'contact':
        return <ContactPage />;
      case 'account':
        return <UserAccountPage />;
      case 'admin':
        return <AdminDashboardPage />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#faf7f2] dark:bg-[#0e0c0a] text-[#1c130d] dark:text-[#f8f4ed] selection:bg-[#d4af37] selection:text-[#120e0b]">
      <Header />

      <main className="flex-1 transition-all duration-300">
        {renderPage()}
      </main>

      <Footer />

      {/* Global Modals & Drawers */}
      <CartDrawer />
      <AuthModal />
      <QRCodeModal />

      {/* Toast Notification Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#120e0b] border-2 border-[#d4af37] text-[#f8f4ed] px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 animate-bounce max-w-sm">
          <CheckCircle2 className="w-5 h-5 text-[#f3d068] shrink-0" />
          <span className="text-xs font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* Floating WhatsApp Action Widget */}
      <a
        href="https://wa.me/919820145892?text=Hello%20Caf%C3%A9%20Grandeur!%20I%20want%20to%20reserve%20a%20table"
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 left-6 z-40 p-3.5 rounded-full bg-emerald-600 text-white shadow-2xl hover:scale-110 transition-transform flex items-center justify-center border-2 border-white/20"
        title="WhatsApp Concierge"
      >
        <MessageSquare className="w-6 h-6" />
      </a>
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
