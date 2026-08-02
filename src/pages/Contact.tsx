import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageSquare,
  Send,
  Instagram,
  Facebook,
  Twitter,
  CheckCircle2,
} from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { showToast } = useApp();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('General Inquiry');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    showToast('Thank you! Your message has been received by our Concierge.');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs uppercase font-extrabold tracking-widest text-[#d4af37]">
          We Would Love To Hear From You
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#1c130d] dark:text-[#f8f4ed]">
          Get In Touch
        </h1>
        <p className="text-xs sm:text-sm text-[#6b5c4f] dark:text-[#a39587]">
          Have a question regarding custom event styling, corporate bulk bookings, or barista workshops? Contact our royal concierge.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Left: Contact Info & WhatsApp CTA */}
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-white dark:bg-[#1a1612] border border-[#e8dfd1] dark:border-[#2d261e] shadow-md space-y-4">
            <h3 className="font-serif text-xl font-bold text-[#1c130d] dark:text-[#f8f4ed]">
              Café Address & Contact
            </h3>

            <div className="space-y-4 text-xs text-[#6b5c4f] dark:text-[#a39587]">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-xl bg-[#d4af37]/10 text-[#d4af37] shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <strong className="text-[#1c130d] dark:text-[#f8f4ed] block">Location</strong>
                  <span>12, Gold Coast Promenade, Bandra West, Mumbai, Maharashtra 400050</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 rounded-xl bg-[#d4af37]/10 text-[#d4af37] shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <strong className="text-[#1c130d] dark:text-[#f8f4ed] block">Phone / Booking Hotline</strong>
                  <span>+91 98201 45892 / +91 22 4589 1200</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 rounded-xl bg-[#d4af37]/10 text-[#d4af37] shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <strong className="text-[#1c130d] dark:text-[#f8f4ed] block">Concierge Email</strong>
                  <span>concierge@cafegrandeur.in</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 rounded-xl bg-[#d4af37]/10 text-[#d4af37] shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <strong className="text-[#1c130d] dark:text-[#f8f4ed] block">Opening Hours</strong>
                  <span>Monday - Sunday: 08:00 AM - 11:30 PM</span>
                </div>
              </div>
            </div>

            {/* Direct WhatsApp Concierge CTA */}
            <div className="pt-2">
              <a
                href="https://wa.me/919820145892?text=Hello%20Caf%C3%A9%20Grandeur!%20I%20have%20an%20inquiry%20regarding%20table%20reservation."
                target="_blank"
                rel="noreferrer"
                className="w-full py-3 rounded-xl bg-emerald-600 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg hover:bg-emerald-500 transition-all"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Chat Instantly on WhatsApp (+91 98201 45892)</span>
              </a>
            </div>
          </div>

          {/* Styled Google Maps Component Representation */}
          <div className="rounded-3xl overflow-hidden border-2 border-[#d4af37]/40 shadow-xl h-64 relative bg-stone-200 dark:bg-[#120e0b]">
            <iframe
              title="Google Map Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3771.428581895689!2d72.82888031526484!3d19.055819987098675!2m3!1f0!f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c913eb06f4ef%3A0xf6a760b2d6a5ff44!2sBandra%20West%2C%20Mumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1628100000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
            ></iframe>
          </div>
        </div>

        {/* Right: Contact Form */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#1a1612] border border-[#e8dfd1] dark:border-[#2d261e] shadow-md space-y-6">
          <h3 className="font-serif text-2xl font-bold text-[#1c130d] dark:text-[#f8f4ed]">
            Send Us A Message
          </h3>

          {submitted ? (
            <div className="p-8 text-center space-y-3 bg-[#d4af37]/10 rounded-2xl border border-[#d4af37]">
              <CheckCircle2 className="w-12 h-12 text-[#d4af37] mx-auto" />
              <h4 className="font-serif text-xl font-bold text-[#1c130d] dark:text-[#f8f4ed]">
                Message Sent!
              </h4>
              <p className="text-xs text-[#6b5c4f] dark:text-[#a39587]">
                Our Concierge team will respond to your email within 2 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#8c7b6c] dark:text-[#a39587] mb-1">
                  Your Full Name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Aarav Mehta"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#faf7f2] dark:bg-[#120e0b] border border-[#e8dfd1] dark:border-[#2d261e] text-xs text-[#1c130d] dark:text-[#f8f4ed]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#8c7b6c] dark:text-[#a39587] mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="aarav@gmail.com"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#faf7f2] dark:bg-[#120e0b] border border-[#e8dfd1] dark:border-[#2d261e] text-xs text-[#1c130d] dark:text-[#f8f4ed]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#8c7b6c] dark:text-[#a39587] mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98201 45892"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#faf7f2] dark:bg-[#120e0b] border border-[#e8dfd1] dark:border-[#2d261e] text-xs text-[#1c130d] dark:text-[#f8f4ed]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#8c7b6c] dark:text-[#a39587] mb-1">
                  Subject
                </label>
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#faf7f2] dark:bg-[#120e0b] border border-[#e8dfd1] dark:border-[#2d261e] text-xs text-[#1c130d] dark:text-[#f8f4ed]"
                >
                  <option value="General Inquiry">General Inquiry</option>
                  <option value="Custom Decoration Event">Custom Decoration Event</option>
                  <option value="Corporate Event Booking">Corporate Event Booking</option>
                  <option value="Franchise & Press">Franchise & Press</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#8c7b6c] dark:text-[#a39587] mb-1">
                  Your Message
                </label>
                <textarea
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="How can we assist you today?"
                  className="w-full p-3 rounded-xl bg-[#faf7f2] dark:bg-[#120e0b] border border-[#e8dfd1] dark:border-[#2d261e] text-xs text-[#1c130d] dark:text-[#f8f4ed]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl gold-gradient-bg text-[#120e0b] font-extrabold text-xs shadow-xl hover:brightness-110 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Submit Message</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
