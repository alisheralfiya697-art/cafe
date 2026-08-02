import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { MenuItem, FoodType } from '../types';
import { Search, Filter, Plus, Star, Clock, Sparkles, Check, X, Coffee } from 'lucide-react';

export const MenuPage: React.FC = () => {
  const { menuItems, addToCart } = useApp();

  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'popular' | 'price-asc' | 'price-desc' | 'rating'>('popular');

  // Customization Modal State
  const [customizingItem, setCustomizingItem] = useState<MenuItem | null>(null);
  const [selectedMilk, setSelectedMilk] = useState<string>('');
  const [selectedSweetness, setSelectedSweetness] = useState<string>('Standard');
  const [selectedAdditions, setSelectedAdditions] = useState<{ name: string; price: number }[]>([]);
  const [specialInstructions, setSpecialInstructions] = useState<string>('');
  const [customQuantity, setCustomQuantity] = useState<number>(1);

  const categories = ['All', 'Coffee', 'Tea', 'Desserts', 'Snacks', 'Main Course', 'Beverages', 'Breakfast'];

  const filteredItems = menuItems.filter((item) => {
    if (!item.available) return false;
    if (activeCategory !== 'All' && item.category !== activeCategory) return false;
    if (selectedType !== 'all' && item.type !== selectedType) return false;
    if (
      searchQuery &&
      !item.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !item.description.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  const sortedItems = [...filteredItems].sort((a, b) => {
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    return (b.popular ? 1 : 0) - (a.popular ? 1 : 0);
  });

  const handleOpenCustomize = (item: MenuItem) => {
    setCustomizingItem(item);
    setSelectedMilk(item.options?.milk?.[0] || '');
    setSelectedSweetness(item.options?.sweetness?.[0] || 'Standard');
    setSelectedAdditions([]);
    setSpecialInstructions('');
    setCustomQuantity(1);
  };

  const handleConfirmAddToCart = () => {
    if (customizingItem) {
      addToCart(customizingItem, customQuantity, {
        milk: selectedMilk || undefined,
        sweetness: selectedSweetness,
        additions: selectedAdditions,
        instructions: specialInstructions,
      });
      setCustomizingItem(null);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-[10px] uppercase font-extrabold tracking-[0.2em] text-[#D4AF37]">
          Gourmet Culinary & Specialty Brews
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#2C2420] dark:text-[#F7F4EE]">
          Our Artisanal Menu
        </h1>
        <p className="text-xs sm:text-sm text-[#6B5E51] dark:text-[#A89D91]">
          Every dish and brew is individually prepared with single-origin Indian Arabica, organic tea leaves, and pure Belgian chocolate. All prices in INR (₹).
        </p>
      </div>

      {/* Controls: Search, Sort, Type filter */}
      <div className="bg-white dark:bg-[#1C1814] border border-[#E5E1D8] dark:border-[#2E2720] p-4 sm:p-6 rounded-xl shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Search Bar */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-[#8C7B6C] absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search cappuccino, truffle cake, pasta..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-md bg-[#FDFBF7] dark:bg-[#14110E] border border-[#E5E1D8] dark:border-[#2E2720] text-xs text-[#2C2420] dark:text-[#F7F4EE] focus:outline-none focus:border-[#4B3621]"
            />
          </div>

          {/* Type Filter Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: 'all', label: 'All Items' },
              { id: 'veg', label: '🌿 Pure Veg' },
              { id: 'non-veg', label: '🍗 Non-Veg' },
              { id: 'eggless', label: '🎂 Eggless' },
              { id: 'vegan', label: '🌱 Vegan' },
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => setSelectedType(t.id)}
                className={`px-3 py-1.5 rounded-md text-xs uppercase tracking-wider font-semibold border transition-all cursor-pointer ${
                  selectedType === t.id
                    ? 'bg-[#4B3621] text-[#FDFBF7] border-[#4B3621]'
                    : 'bg-[#FDFBF7] dark:bg-[#14110E] text-[#6B5E51] dark:text-[#A89D91] border-[#E5E1D8] dark:border-[#2E2720]'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* Sort Selector */}
          <div className="w-full md:w-auto">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="w-full px-3 py-2 rounded-md bg-[#FDFBF7] dark:bg-[#14110E] border border-[#E5E1D8] dark:border-[#2E2720] text-xs text-[#2C2420] dark:text-[#F7F4EE] font-semibold"
            >
              <option value="popular">Popular First</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Top Rated (5★)</option>
            </select>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pt-2 border-t border-[#E5E1D8] dark:border-[#2E2720] pb-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-md text-xs uppercase tracking-wider font-bold transition-all whitespace-nowrap cursor-pointer ${
                activeCategory === cat
                  ? 'bg-[#4B3621] text-[#FDFBF7]'
                  : 'text-[#6B5E51] dark:text-[#A89D91] hover:text-[#2C2420]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Menu Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedItems.map((item) => (
          <div
            key={item.id}
            className="rounded-xl bg-white dark:bg-[#1C1814] border border-[#E5E1D8] dark:border-[#2E2720] p-4 shadow-sm hover:border-[#4B3621] transition-all flex flex-col justify-between space-y-4 group"
          >
            <div className="relative h-48 rounded-md overflow-hidden bg-[#F2F0EB] dark:bg-[#241E18]">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#1F1710]/90 text-[#F3D068] border border-[#D4AF37]/30">
                  ⭐ {item.rating}
                </span>
                {item.chefSpecial && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#D4AF37] text-[#1F1710]">
                    Chef's Choice
                  </span>
                )}
              </div>
              <span className="absolute bottom-2.5 right-2.5 text-[10px] font-semibold bg-[#1F1710]/90 text-[#E5E1D8] px-2 py-0.5 rounded flex items-center gap-1">
                <Clock className="w-3 h-3 text-[#D4AF37]" /> {item.prepTime}
              </span>
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <h3 className="font-serif text-lg font-bold text-[#2C2420] dark:text-[#F7F4EE]">
                  {item.name}
                </h3>
                <span className="text-[9px] font-bold px-2 py-0.5 rounded bg-[#F2F0EB] dark:bg-[#241E18] text-[#6B5E51] dark:text-[#A89D91] uppercase tracking-wider">
                  {item.type}
                </span>
              </div>
              <p className="text-xs text-[#6B5E51] dark:text-[#A89D91] leading-relaxed line-clamp-2">
                {item.description}
              </p>
            </div>

            <div className="pt-3 border-t border-[#F2F0EB] dark:border-[#2E2720] flex items-center justify-between">
              <div>
                <span className="text-[9px] uppercase tracking-widest text-[#8C7B6C] block">Price</span>
                <span className="font-serif text-xl font-bold text-[#4B3621] dark:text-[#D4AF37]">
                  ₹{item.price}
                </span>
              </div>

              {item.options ? (
                <button
                  onClick={() => handleOpenCustomize(item)}
                  className="px-4 py-2 rounded border border-[#4B3621] dark:border-[#D4AF37] text-[#4B3621] dark:text-[#D4AF37] font-bold text-xs uppercase tracking-wider hover:bg-[#4B3621] hover:text-[#FDFBF7] transition-all cursor-pointer flex items-center gap-1"
                >
                  <Sparkles className="w-3.5 h-3.5" /> Customize
                </button>
              ) : (
                <button
                  onClick={() => addToCart(item, 1)}
                  className="px-4 py-2 rounded bg-[#4B3621] text-[#FDFBF7] hover:bg-[#D4AF37] hover:text-[#1F1710] font-bold text-xs uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" /> Add
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Item Customization Modal */}
      {customizingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-lg bg-[#faf7f2] dark:bg-[#1a1612] border-2 border-[#d4af37] rounded-3xl p-6 shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-bold text-[#d4af37] uppercase tracking-wider">
                  Customize Order
                </span>
                <h3 className="font-serif text-2xl font-bold text-[#1c130d] dark:text-[#f8f4ed]">
                  {customizingItem.name}
                </h3>
              </div>
              <button
                onClick={() => setCustomizingItem(null)}
                className="text-[#8c7b6c] hover:text-[#d4af37]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Choice of Milk */}
            {customizingItem.options?.milk && (
              <div className="space-y-2">
                <label className="block text-xs font-bold text-[#1c130d] dark:text-[#f8f4ed]">
                  Select Milk Preference
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {customizingItem.options.milk.map((milk) => (
                    <button
                      key={milk}
                      onClick={() => setSelectedMilk(milk)}
                      className={`p-2.5 rounded-xl text-xs font-semibold border text-left flex items-center justify-between ${
                        selectedMilk === milk
                          ? 'border-[#d4af37] bg-[#d4af37]/20 text-[#d4af37]'
                          : 'border-[#e8dfd1] dark:border-[#2d261e] text-[#6b5c4f]'
                      }`}
                    >
                      <span>{milk}</span>
                      {selectedMilk === milk && <Check className="w-3.5 h-3.5" />}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Sweetness */}
            {customizingItem.options?.sweetness && (
              <div className="space-y-2">
                <label className="block text-xs font-bold text-[#1c130d] dark:text-[#f8f4ed]">
                  Sweetness Level
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {customizingItem.options.sweetness.map((sw) => (
                    <button
                      key={sw}
                      onClick={() => setSelectedSweetness(sw)}
                      className={`p-2.5 rounded-xl text-xs font-semibold border text-left flex items-center justify-between ${
                        selectedSweetness === sw
                          ? 'border-[#d4af37] bg-[#d4af37]/20 text-[#d4af37]'
                          : 'border-[#e8dfd1] dark:border-[#2d261e] text-[#6b5c4f]'
                      }`}
                    >
                      <span>{sw}</span>
                      {selectedSweetness === sw && <Check className="w-3.5 h-3.5" />}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Extra Additions */}
            {customizingItem.options?.additions && (
              <div className="space-y-2">
                <label className="block text-xs font-bold text-[#1c130d] dark:text-[#f8f4ed]">
                  Extra Shots & Flavors
                </label>
                <div className="space-y-2">
                  {customizingItem.options.additions.map((add) => {
                    const isChecked = selectedAdditions.some((a) => a.name === add.name);
                    return (
                      <label
                        key={add.name}
                        onClick={() => {
                          if (isChecked) {
                            setSelectedAdditions((prev) => prev.filter((a) => a.name !== add.name));
                          } else {
                            setSelectedAdditions((prev) => [...prev, add]);
                          }
                        }}
                        className={`p-2.5 rounded-xl border flex items-center justify-between text-xs font-semibold cursor-pointer ${
                          isChecked
                            ? 'border-[#d4af37] bg-[#d4af37]/10 text-[#d4af37]'
                            : 'border-[#e8dfd1] dark:border-[#2d261e] text-[#6b5c4f]'
                        }`}
                      >
                        <span>{add.name}</span>
                        <span className="font-bold">+₹{add.price}</span>
                      </label>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Special Instructions */}
            <div>
              <label className="block text-xs font-bold text-[#1c130d] dark:text-[#f8f4ed] mb-1">
                Special Instructions for Barista
              </label>
              <textarea
                rows={2}
                placeholder="e.g. Extra hot, serve with water, lactose free..."
                value={specialInstructions}
                onChange={(e) => setSpecialInstructions(e.target.value)}
                className="w-full p-3 rounded-xl bg-white dark:bg-[#120e0b] border border-[#e8dfd1] dark:border-[#2d261e] text-xs text-[#1c130d] dark:text-[#f8f4ed]"
              />
            </div>

            {/* Modal Actions */}
            <div className="pt-3 border-t border-[#e8dfd1] dark:border-[#2d261e] flex items-center justify-between">
              <div>
                <span className="text-[10px] text-[#8c7b6c] block">Total Item Price</span>
                <span className="font-serif text-2xl font-bold gold-gradient-text">
                  ₹
                  {(customizingItem.price +
                    selectedAdditions.reduce((sum, a) => sum + a.price, 0)) *
                    customQuantity}
                </span>
              </div>

              <button
                onClick={handleConfirmAddToCart}
                className="px-6 py-3 rounded-xl gold-gradient-bg text-[#120e0b] font-bold text-xs shadow-lg hover:brightness-110"
              >
                Add Customized Brew to Order
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
