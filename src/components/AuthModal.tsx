import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, User, Mail, Lock, Phone, Sparkles } from 'lucide-react';

export const AuthModal: React.FC = () => {
  const { isAuthModalOpen, setIsAuthModalOpen, loginUser } = useApp();
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('aarav.mehta@gmail.com');
  const [name, setName] = useState('Aarav Mehta');

  if (!isAuthModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      loginUser(email, name);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-md bg-[#faf7f2] dark:bg-[#1a1612] border border-[#d4af37]/40 rounded-2xl p-6 sm:p-8 shadow-2xl relative space-y-6">
        <button
          onClick={() => setIsAuthModalOpen(false)}
          className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-[#e8dfd1] dark:hover:bg-[#2d261e] text-[#6b5c4f] dark:text-[#a39587]"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-full gold-gradient-bg mx-auto flex items-center justify-center shadow-md">
            <Sparkles className="w-6 h-6 text-[#120e0b]" />
          </div>
          <h3 className="font-serif text-2xl font-bold text-[#1c130d] dark:text-[#f8f4ed]">
            {isSignUp ? 'Join Royal VIP Club' : 'Welcome Back'}
          </h3>
          <p className="text-xs text-[#6b5c4f] dark:text-[#a39587]">
            {isSignUp
              ? 'Create an account to manage bookings & earn 150 VIP Gold Beans'
              : 'Sign in to access your saved table bookings and rewards'}
          </p>
        </div>

        {/* Quick Google Sign-In Demo Button */}
        <button
          type="button"
          onClick={() => loginUser('aarav.mehta@gmail.com', 'Aarav Mehta')}
          className="w-full py-2.5 px-4 rounded-xl border border-[#e8dfd1] dark:border-[#2d261e] bg-white dark:bg-[#120e0b] hover:border-[#d4af37] text-xs font-semibold text-[#1c130d] dark:text-[#f8f4ed] flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
            />
            <path
              fill="#34A853"
              d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.27v3.15C3.25 21.3 7.31 24 12 24z"
            />
            <path
              fill="#FBBC05"
              d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.27C.46 8.2 0 10.04 0 12s.46 3.8 1.27 5.42l4.01-3.15z"
            />
            <path
              fill="#EA4335"
              d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.25 2.7 1.27 6.58l4.01 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
            />
          </svg>
          <span>Continue with Google</span>
        </button>

        <div className="relative flex items-center justify-center">
          <div className="border-t border-[#e8dfd1] dark:border-[#2d261e] w-full"></div>
          <span className="bg-[#faf7f2] dark:bg-[#1a1612] px-2 text-[10px] text-[#8c7b6c] uppercase tracking-wider font-semibold absolute">
            Or with Email
          </span>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignUp && (
            <div>
              <label className="block text-xs font-semibold text-[#8c7b6c] dark:text-[#a39587] mb-1">
                Full Name
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-[#8c7b6c] absolute left-3 top-2.5" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Aarav Mehta"
                  className="w-full pl-9 pr-3 py-2 rounded-xl bg-white dark:bg-[#120e0b] border border-[#e8dfd1] dark:border-[#2d261e] text-xs text-[#1c130d] dark:text-[#f8f4ed] focus:outline-none focus:border-[#d4af37]"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-[#8c7b6c] dark:text-[#a39587] mb-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-[#8c7b6c] absolute left-3 top-2.5" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="aarav.mehta@gmail.com"
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-white dark:bg-[#120e0b] border border-[#e8dfd1] dark:border-[#2d261e] text-xs text-[#1c130d] dark:text-[#f8f4ed] focus:outline-none focus:border-[#d4af37]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#8c7b6c] dark:text-[#a39587] mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#8c7b6c] absolute left-3 top-2.5" />
              <input
                type="password"
                required
                defaultValue="password123"
                placeholder="••••••••"
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-white dark:bg-[#120e0b] border border-[#e8dfd1] dark:border-[#2d261e] text-xs text-[#1c130d] dark:text-[#f8f4ed] focus:outline-none focus:border-[#d4af37]"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 rounded-xl gold-gradient-bg text-[#120e0b] font-bold text-xs shadow-md hover:brightness-110 cursor-pointer"
          >
            {isSignUp ? 'Create VIP Account' : 'Sign In'}
          </button>
        </form>

        <div className="text-center">
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-xs text-[#d4af37] font-semibold hover:underline"
          >
            {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Register"}
          </button>
        </div>
      </div>
    </div>
  );
};
