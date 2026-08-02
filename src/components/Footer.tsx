import React from 'react';
import { useApp } from '../context/AppContext';
import { Coffee, MapPin, Phone, Mail, Clock, MessageSquare, Instagram, Facebook, Twitter, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setCurrentPage } = useApp();

  return (
    <footer className="bg-[#191410] text-[#A89D91] border-t border-[#2E2720] pt-14 pb-8 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Col 1: Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#D4AF37] text-[#1F1710] flex items-center justify-center">
                <Coffee className="w-5 h-5" />
              </div>
              <span className="font-serif text-2xl font-bold text-[#F7F4EE]">Café Grandeur</span>
            </div>
            <p className="text-xs text-[#A89D91] leading-relaxed">
              India’s finest luxury artisanal coffee & custom event dining experience. Crafted with single-origin beans, gourmet patisserie, and unforgettable candlelit atmospheres.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://wa.me/919820145892?text=Hello%20Caf%C3%A9%20Grandeur!%20I%20want%20to%20reserve%20a%20table"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-md bg-[#231E18] text-[#D4AF37] border border-[#2E2720] text-xs font-semibold hover:border-[#D4AF37] transition-all"
              >
                <MessageSquare className="w-4 h-4 text-[#D4AF37]" />
                <span>WhatsApp Concierge</span>
              </a>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] font-bold text-[#D4AF37] mb-4 border-b border-[#2E2720] pb-2">
              Explore
            </h4>
            <ul className="space-y-2 text-xs">
              {['Home', 'Menu', 'Book Table', 'Decorate Event', 'Gallery', 'About Us', 'Contact'].map((item) => (
                <li key={item}>
                  <button
                    onClick={() => {
                      const pageId = item.toLowerCase().replace(/\s+/g, '').replace('booktable', 'booking').replace('decorateevent', 'decoration').replace('aboutus', 'about');
                      setCurrentPage(pageId);
                    }}
                    className="hover:text-[#F7F4EE] transition-colors cursor-pointer text-[#A89D91]"
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Hours & Location */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] font-bold text-[#D4AF37] mb-4 border-b border-[#2E2720] pb-2">
              Visit Us
            </h4>
            <ul className="space-y-3 text-xs text-[#A89D91]">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                <span>12, Gold Coast Promenade, Bandra West, Mumbai, Maharashtra 400050</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span>+91 98201 45892 / +91 22 4589 1200</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span>concierge@cafegrandeur.in</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                <span>Mon - Sun: 08:00 AM - 11:30 PM (Kitchen closes 11:00 PM)</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Newsletter */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] font-bold text-[#D4AF37] mb-4 border-b border-[#2E2720] pb-2">
              Royal VIP Circle
            </h4>
            <p className="text-xs text-[#A89D91] mb-3">
              Subscribe to receive exclusive invitation to tasting events, seasonal menu previews & secret discount codes.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="space-y-2">
              <input
                type="email"
                placeholder="Enter your email address"
                className="w-full px-3.5 py-2 rounded-md bg-[#231E18] border border-[#2E2720] text-xs text-[#F7F4EE] placeholder-[#6B5E51] focus:outline-none focus:border-[#D4AF37]"
              />
              <button
                type="submit"
                className="w-full py-2 rounded-md bg-[#D4AF37] text-[#1F1710] text-xs uppercase tracking-wider font-bold hover:opacity-90 transition-all cursor-pointer"
              >
                Join VIP Club
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#2E2720] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#6B5E51]">
          <p>© {new Date().getFullYear()} Café Grandeur India. All rights reserved. All prices in Indian Rupees (₹).</p>
          <div className="flex items-center gap-4">
            <Instagram className="w-4 h-4 hover:text-[#D4AF37] cursor-pointer" />
            <Facebook className="w-4 h-4 hover:text-[#D4AF37] cursor-pointer" />
            <Twitter className="w-4 h-4 hover:text-[#D4AF37] cursor-pointer" />
          </div>
        </div>
      </div>
    </footer>
  );
};
