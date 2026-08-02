import React from 'react';
import { Coffee, Award, Heart, ShieldCheck, Sparkles, Utensils, Users } from 'lucide-react';

export const AboutPage: React.FC = () => {
  const team = [
    {
      name: 'Vikramaditya Sengupta',
      role: 'Founder & Master Roaster',
      bio: '15+ years of bean sourcing across Chickmagalur & Ethiopia. Certified Q-Grader.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop',
    },
    {
      name: 'Chef Camille Laurent',
      role: 'Executive Pastry Chef',
      bio: 'Trained in Paris at Le Cordon Bleu. Specialist in Opera cakes & French croissants.',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop',
    },
    {
      name: 'Anish Kapur',
      role: 'Head Event Decorator & Stylist',
      bio: 'Curated over 3,000 candlelit proposals, golden birthdays, and starlight celebrations.',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop',
    },
  ];

  const awards = [
    { title: 'Best Specialty Café 2024', issuer: 'Bombay Culinary Awards' },
    { title: 'Top 10 Romantic Dining Spots', issuer: 'Vogue India Living' },
    { title: 'Michelin Recommended Desserts', issuer: 'Asia Gastronomy Guide' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs uppercase font-extrabold tracking-widest text-[#d4af37]">
          Our Legacy & Passion
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#1c130d] dark:text-[#f8f4ed]">
          About Café Grandeur
        </h1>
        <p className="text-xs sm:text-sm text-[#6b5c4f] dark:text-[#a39587]">
          Established in 2018 at Bandra West Promenade, Mumbai — dedicated to elevating daily coffee drinking into a royal, memorable affair.
        </p>
      </div>

      {/* Story Section */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        <div className="space-y-4">
          <span className="text-xs uppercase font-bold text-[#d4af37] tracking-wider flex items-center gap-1.5">
            <Coffee className="w-4 h-4" /> The Grandeur Journey
          </span>
          <h2 className="font-serif text-3xl font-bold text-[#1c130d] dark:text-[#f8f4ed]">
            A Celebration of Single-Origin Beans & Bespoke Dining
          </h2>
          <p className="text-xs sm:text-sm text-[#6b5c4f] dark:text-[#a39587] leading-relaxed">
            Café Grandeur was born out of a simple dream: to combine world-class artisanal coffee roasting with bespoke event dining. We believe coffee is not just a morning routine — it is an sensory journey that pairs best with good company and exquisite ambiance.
          </p>
          <p className="text-xs sm:text-sm text-[#6b5c4f] dark:text-[#a39587] leading-relaxed">
            From our 100% shade-grown shade Arabica beans direct from Chickmagalur estates to our custom candlelit celebration setups, every detail in our café is curated to delight your senses.
          </p>
        </div>

        <div className="rounded-3xl overflow-hidden border-2 border-[#d4af37]/40 shadow-2xl h-80">
          <img
            src="https://images.unsplash.com/photo-1442512595331-e89e73853f31?q=80&w=1000&auto=format&fit=crop"
            alt="Roasting Coffee"
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      {/* Team */}
      <section className="space-y-8">
        <div className="text-center max-w-md mx-auto">
          <span className="text-xs uppercase font-bold text-[#d4af37] tracking-wider">
            Masters Behind The Magic
          </span>
          <h2 className="font-serif text-3xl font-bold text-[#1c130d] dark:text-[#f8f4ed]">
            Our Artisanal Team
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {team.map((m) => (
            <div
              key={m.name}
              className="p-6 rounded-2xl bg-white dark:bg-[#1a1612] border border-[#e8dfd1] dark:border-[#2d261e] shadow-md text-center space-y-3"
            >
              <img
                src={m.image}
                alt={m.name}
                className="w-20 h-20 rounded-full object-cover mx-auto border-2 border-[#d4af37]"
              />
              <h3 className="font-serif text-lg font-bold text-[#1c130d] dark:text-[#f8f4ed]">
                {m.name}
              </h3>
              <span className="text-xs font-semibold text-[#d4af37] block">{m.role}</span>
              <p className="text-xs text-[#6b5c4f] dark:text-[#a39587]">{m.bio}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Awards & Recognition */}
      <section className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-[#23160f] via-[#3a2519] to-[#1a1612] border-2 border-[#d4af37] text-[#f8f4ed] space-y-6">
        <div className="text-center space-y-1">
          <Award className="w-8 h-8 text-[#f3d068] mx-auto" />
          <h2 className="font-serif text-3xl font-bold gold-gradient-text">Awards & Honors</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          {awards.map((a) => (
            <div
              key={a.title}
              className="p-4 rounded-2xl bg-[#120e0b]/60 border border-[#d4af37]/30 space-y-1"
            >
              <span className="font-serif text-lg font-bold text-[#f3d068] block">{a.title}</span>
              <span className="text-xs text-[#c4b5a5]">{a.issuer}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
