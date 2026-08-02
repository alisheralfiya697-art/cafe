import React, { useState } from 'react';
import { GALLERY_ITEMS } from '../data/mockData';
import { GalleryItem } from '../types';
import { Maximize2, X, Sparkles } from 'lucide-react';

export const GalleryPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  const categories = ['All', 'Interiors', 'Event Celebrations', 'Signature Dishes', 'Decorations'];

  const filteredItems = GALLERY_ITEMS.filter((item) => {
    if (activeCategory === 'All') return true;
    return item.category === activeCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs uppercase font-extrabold tracking-widest text-[#d4af37]">
          Visual Storytelling
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#1c130d] dark:text-[#f8f4ed]">
          Café Gallery & Showcase
        </h1>
        <p className="text-xs sm:text-sm text-[#6b5c4f] dark:text-[#a39587]">
          Take a glance inside our royal interiors, candlelit proposal setups, artisanal latte art, and guest celebrations.
        </p>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center justify-center gap-2 flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
              activeCategory === cat
                ? 'gold-gradient-bg text-[#120e0b] shadow-md scale-105'
                : 'bg-white dark:bg-[#1a1612] text-[#6b5c4f] dark:text-[#a39587] border border-[#e8dfd1] dark:border-[#2d261e] hover:border-[#d4af37]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            onClick={() => setSelectedItem(item)}
            className="group relative rounded-2xl overflow-hidden h-72 border border-[#e8dfd1] dark:border-[#2d261e] shadow-md cursor-pointer"
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity"></div>

            <div className="absolute bottom-4 left-4 right-4 text-[#f8f4ed] space-y-1">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#d4af37] text-[#120e0b]">
                {item.category}
              </span>
              <h3 className="font-serif text-lg font-bold">{item.title}</h3>
              <p className="text-xs text-[#c4b5a5] line-clamp-1">{item.caption}</p>
            </div>

            <div className="absolute top-4 right-4 p-2 rounded-full bg-black/40 backdrop-blur-md text-[#d4af37] opacity-0 group-hover:opacity-100 transition-opacity">
              <Maximize2 className="w-4 h-4" />
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fadeIn">
          <div className="relative max-w-4xl w-full bg-[#1a1612] border-2 border-[#d4af37] rounded-3xl overflow-hidden shadow-2xl space-y-4 p-6 text-[#f8f4ed]">
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-black/50 text-[#f8f4ed] hover:text-[#d4af37] z-10"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="h-[450px] rounded-2xl overflow-hidden">
              <img
                src={selectedItem.image}
                alt={selectedItem.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="space-y-1">
              <span className="text-xs font-bold text-[#d4af37] uppercase tracking-wider">
                {selectedItem.category}
              </span>
              <h2 className="font-serif text-2xl font-bold">{selectedItem.title}</h2>
              <p className="text-xs text-[#c4b5a5]">{selectedItem.caption}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
