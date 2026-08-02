import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { EventOccasion, DecorationOption, CustomDecorationSelection } from '../types';
import { DECORATION_OPTIONS } from '../data/mockData';
import {
  Sparkles,
  Check,
  Plus,
  Upload,
  Image as ImageIcon,
  Music,
  Palette,
  Eye,
  ArrowRight,
  DollarSign,
  Heart,
  PartyPopper,
  Flame,
  Award,
} from 'lucide-react';

export const DecorationPage: React.FC = () => {
  const { setDraftDecoration, setCurrentPage, showToast } = useApp();

  const [selectedOccasion, setSelectedOccasion] = useState<EventOccasion>('Birthday');
  const [selectedOptionIds, setSelectedOptionIds] = useState<string[]>([
    'dec-1',
    'dec-6',
    'dec-9',
  ]);
  const [themeColor, setThemeColor] = useState<string>('Classic Gold & White');
  const [playlistChoice, setPlaylistChoice] = useState<string>('Acoustic Jazz & Saxophone');
  const [nameBoardText, setNameBoardText] = useState<string>('Happy Birthday Aarav!');
  const [customInstructions, setCustomInstructions] = useState<string>(
    'Please keep the candles lit before guest arrival at 7:30 PM.'
  );
  const [budgetCap, setBudgetCap] = useState<number>(5000);
  const [uploadedImages, setUploadedImages] = useState<string[]>([
    'https://images.unsplash.com/photo-1520854221256-17451cc331bf?q=80&w=800&auto=format&fit=crop',
  ]);

  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState<boolean>(false);

  const occasions: { id: EventOccasion; label: string; icon: string }[] = [
    { id: 'Birthday', label: 'Birthday', icon: '🎂' },
    { id: 'Anniversary', label: 'Anniversary', icon: '💖' },
    { id: 'Proposal', label: 'Proposal', icon: '💍' },
    { id: 'Baby Shower', label: 'Baby Shower', icon: '👶' },
    { id: 'Engagement', label: 'Engagement', icon: '✨' },
    { id: 'Romantic Dinner', label: 'Romantic Dinner', icon: '🕯️' },
    { id: 'Graduation', label: 'Graduation', icon: '🎓' },
    { id: 'Corporate Meeting', label: 'Corporate Event', icon: '💼' },
    { id: 'Custom Event', label: 'Custom Occasion', icon: '🎉' },
  ];

  const themeColors = [
    'Classic Gold & White',
    'Midnight Black & Gold',
    'Blush Rose & Gold',
    'Forest Green & Brass',
    'Royal Violet & Silver',
  ];

  const playlists = [
    'Acoustic Jazz & Saxophone',
    'Classical Piano Serenade',
    'Romantic Strings & Cello',
    'Chill Ambient Lofi Beats',
    'Custom Spotify Playlist Link',
  ];

  const toggleOption = (id: string) => {
    if (selectedOptionIds.includes(id)) {
      setSelectedOptionIds(selectedOptionIds.filter((item) => item !== id));
    } else {
      setSelectedOptionIds([...selectedOptionIds, id]);
    }
  };

  const selectedOptions = DECORATION_OPTIONS.filter((o) => selectedOptionIds.includes(o.id));
  const estimatedTotal = selectedOptions.reduce((sum, o) => sum + o.price, 0);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setUploadedImages((prev) => [...prev, event.target!.result as string]);
          showToast('Inspiration image uploaded!');
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAttachToBooking = () => {
    const dec: CustomDecorationSelection = {
      occasion: selectedOccasion,
      selectedOptionIds,
      themeColor,
      playlistChoice,
      nameBoardText,
      customInstructions,
      budgetCap,
      inspirationImages: uploadedImages,
      estimatedTotal,
    };

    setDraftDecoration(dec);
    showToast(`Decoration bundle attached! Total: ₹${estimatedTotal}`);
    setCurrentPage('booking');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs uppercase font-extrabold tracking-widest text-[#d4af37]">
          Personalized Event Configurator
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#1c130d] dark:text-[#f8f4ed]">
          Customize Event Decoration
        </h1>
        <p className="text-xs sm:text-sm text-[#6b5c4f] dark:text-[#a39587]">
          Transform your table into a masterpiece with helium arches, red roses, candelabras, custom neon boards, and playlist selection.
        </p>
      </div>

      {/* Occasion Selector Grid */}
      <div className="space-y-3">
        <label className="block text-xs uppercase font-extrabold text-[#d4af37] tracking-wider">
          1. Select Event Occasion
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-9 gap-3">
          {occasions.map((occ) => (
            <button
              key={occ.id}
              onClick={() => setSelectedOccasion(occ.id)}
              className={`p-3 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1.5 ${
                selectedOccasion === occ.id
                  ? 'gold-gradient-bg text-[#120e0b] font-bold border-[#d4af37] shadow-lg scale-105'
                  : 'bg-white dark:bg-[#1a1612] text-[#6b5c4f] dark:text-[#a39587] border-[#e8dfd1] dark:border-[#2d261e] hover:border-[#d4af37]'
              }`}
            >
              <span className="text-xl">{occ.icon}</span>
              <span className="text-xs">{occ.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Decoration Options Grid */}
        <div className="lg:col-span-2 space-y-6">
          <label className="block text-xs uppercase font-extrabold text-[#d4af37] tracking-wider">
            2. Choose Decoration Components
          </label>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {DECORATION_OPTIONS.map((opt) => {
              const isSelected = selectedOptionIds.includes(opt.id);
              return (
                <div
                  key={opt.id}
                  onClick={() => toggleOption(opt.id)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer flex gap-3 ${
                    isSelected
                      ? 'bg-[#d4af37]/15 border-[#d4af37] shadow-md'
                      : 'bg-white dark:bg-[#1a1612] border-[#e8dfd1] dark:border-[#2d261e] hover:border-[#d4af37]'
                  }`}
                >
                  <img
                    src={opt.image}
                    alt={opt.title}
                    className="w-16 h-16 rounded-xl object-cover shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-1">
                      <h4 className="font-serif text-sm font-bold text-[#1c130d] dark:text-[#f8f4ed] truncate">
                        {opt.title}
                      </h4>
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => {}}
                        className="accent-[#d4af37] w-4 h-4 mt-0.5"
                      />
                    </div>
                    <p className="text-[11px] text-[#6b5c4f] dark:text-[#a39587] line-clamp-2 mt-1">
                      {opt.description}
                    </p>
                    <div className="mt-2 font-bold text-xs text-[#d4af37]">₹{opt.price}</div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Additional Options: Theme Colors, Playlist, Custom Signage Text */}
          <div className="p-6 rounded-3xl bg-white dark:bg-[#1a1612] border border-[#e8dfd1] dark:border-[#2d261e] shadow-md space-y-6">
            <h3 className="font-serif text-lg font-bold text-[#1c130d] dark:text-[#f8f4ed] flex items-center gap-2">
              <Palette className="w-5 h-5 text-[#d4af37]" /> Theme Styling & Music
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#8c7b6c] dark:text-[#a39587] mb-1">
                  Theme Color Palette
                </label>
                <select
                  value={themeColor}
                  onChange={(e) => setThemeColor(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#faf7f2] dark:bg-[#120e0b] border border-[#e8dfd1] dark:border-[#2d261e] text-xs font-semibold text-[#1c130d] dark:text-[#f8f4ed]"
                >
                  {themeColors.map((tc) => (
                    <option key={tc} value={tc}>
                      {tc}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#8c7b6c] dark:text-[#a39587] mb-1">
                  Background Music Playlist
                </label>
                <select
                  value={playlistChoice}
                  onChange={(e) => setPlaylistChoice(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#faf7f2] dark:bg-[#120e0b] border border-[#e8dfd1] dark:border-[#2d261e] text-xs font-semibold text-[#1c130d] dark:text-[#f8f4ed]"
                >
                  {playlists.map((pl) => (
                    <option key={pl} value={pl}>
                      {pl}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#8c7b6c] dark:text-[#a39587] mb-1">
                Name Board / Neon Sign Text Message
              </label>
              <input
                type="text"
                value={nameBoardText}
                onChange={(e) => setNameBoardText(e.target.value)}
                placeholder="e.g. Happy 25th Birthday Aarav!"
                className="w-full px-3 py-2 rounded-xl bg-[#faf7f2] dark:bg-[#120e0b] border border-[#e8dfd1] dark:border-[#2d261e] text-xs font-semibold text-[#1c130d] dark:text-[#f8f4ed]"
              />
            </div>

            {/* Inspiration Upload & Instructions */}
            <div className="space-y-3">
              <label className="block text-xs font-semibold text-[#8c7b6c] dark:text-[#a39587]">
                Upload Inspiration Photos & Custom Instructions
              </label>

              <div className="flex flex-wrap items-center gap-3">
                {uploadedImages.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt="Inspiration"
                    className="w-16 h-16 rounded-xl object-cover border border-[#d4af37]"
                  />
                ))}
                <label className="w-16 h-16 rounded-xl border-2 border-dashed border-[#d4af37]/50 hover:border-[#d4af37] bg-[#faf7f2] dark:bg-[#120e0b] flex flex-col items-center justify-center cursor-pointer text-[#d4af37]">
                  <Upload className="w-5 h-5" />
                  <span className="text-[9px] font-bold mt-0.5">Upload</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              </div>

              <textarea
                rows={2}
                value={customInstructions}
                onChange={(e) => setCustomInstructions(e.target.value)}
                placeholder="Describe any special floral preference, placement, or surprise timing..."
                className="w-full p-3 rounded-xl bg-[#faf7f2] dark:bg-[#120e0b] border border-[#e8dfd1] dark:border-[#2d261e] text-xs text-[#1c130d] dark:text-[#f8f4ed]"
              />
            </div>
          </div>
        </div>

        {/* Sidebar Summary & Live Cost Calculator */}
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-white dark:bg-[#1a1612] border-2 border-[#d4af37] shadow-xl space-y-5 sticky top-28">
            <div className="border-b border-[#e8dfd1] dark:border-[#2d261e] pb-3">
              <span className="text-[10px] uppercase font-bold text-[#d4af37] tracking-wider block">
                Live Budget Summary
              </span>
              <h3 className="font-serif text-2xl font-bold text-[#1c130d] dark:text-[#f8f4ed]">
                {selectedOccasion} Package
              </h3>
            </div>

            <div className="space-y-2 text-xs text-[#6b5c4f] dark:text-[#a39587] max-h-48 overflow-y-auto">
              {selectedOptions.length === 0 ? (
                <p className="italic text-center py-4">No decoration options selected yet.</p>
              ) : (
                selectedOptions.map((opt) => (
                  <div key={opt.id} className="flex justify-between items-center py-1">
                    <span className="truncate pr-2">• {opt.title}</span>
                    <span className="font-bold text-[#1c130d] dark:text-[#f8f4ed]">₹{opt.price}</span>
                  </div>
                ))
              )}
            </div>

            <div className="pt-3 border-t border-[#e8dfd1] dark:border-[#2d261e] space-y-2">
              <div className="flex justify-between text-xs font-semibold text-[#8c7b6c]">
                <span>Theme Palette</span>
                <span className="text-[#1c130d] dark:text-[#f8f4ed]">{themeColor}</span>
              </div>
              <div className="flex justify-between text-xs font-semibold text-[#8c7b6c]">
                <span>Music Playlist</span>
                <span className="text-[#1c130d] dark:text-[#f8f4ed]">{playlistChoice}</span>
              </div>

              <div className="pt-2 flex justify-between items-center font-serif text-lg font-bold">
                <span className="text-[#1c130d] dark:text-[#f8f4ed]">Total Estimated Cost</span>
                <span className="gold-gradient-text text-2xl">₹{estimatedTotal}</span>
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <button
                onClick={() => setIsPreviewModalOpen(true)}
                className="w-full py-2.5 rounded-xl border border-[#d4af37] text-[#d4af37] font-bold text-xs flex items-center justify-center gap-1.5 hover:bg-[#d4af37]/10 transition-all cursor-pointer"
              >
                <Eye className="w-4 h-4" /> Preview Visual Setup
              </button>

              <button
                onClick={handleAttachToBooking}
                className="w-full py-3.5 rounded-xl gold-gradient-bg text-[#120e0b] font-extrabold text-xs shadow-xl hover:brightness-110 flex items-center justify-center gap-2 cursor-pointer transition-all"
              >
                <span>Attach to Table Reservation</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Visual Preview Modal */}
      {isPreviewModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="w-full max-w-2xl bg-[#faf7f2] dark:bg-[#1a1612] border-2 border-[#d4af37] rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-[#e8dfd1] dark:border-[#2d261e] pb-3">
              <div>
                <span className="text-[10px] font-bold text-[#d4af37] uppercase">Visual Mock Preview</span>
                <h3 className="font-serif text-2xl font-bold text-[#1c130d] dark:text-[#f8f4ed]">
                  {selectedOccasion} Table Setup
                </h3>
              </div>
              <button
                onClick={() => setIsPreviewModalOpen(false)}
                className="text-[#8c7b6c] hover:text-[#d4af37]"
              >
                ✕
              </button>
            </div>

            {/* Visual Simulated Mock Rendering */}
            <div className="relative rounded-2xl overflow-hidden h-64 border border-[#d4af37]/40 shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1520854221256-17451cc331bf?q=80&w=1200&auto=format&fit=crop"
                alt="Table Preview"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30"></div>

              {/* Overlay Board */}
              <div className="absolute bottom-4 left-4 right-4 bg-black/60 backdrop-blur-md p-4 rounded-xl border border-[#d4af37]/40 text-[#f8f4ed] space-y-1">
                <span className="text-xs font-bold text-[#f3d068] flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" /> Signage: "{nameBoardText}"
                </span>
                <p className="text-[11px] text-[#c4b5a5]">
                  Palette: {themeColor} • Music: {playlistChoice}
                </p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#d4af37]/10 border border-[#d4af37]/30 text-xs text-[#1c130d] dark:text-[#f8f4ed] space-y-2">
              <span className="font-bold block">Included Components ({selectedOptions.length}):</span>
              <ul className="grid grid-cols-2 gap-1 text-[11px] text-[#6b5c4f] dark:text-[#a39587]">
                {selectedOptions.map((o) => (
                  <li key={o.id}>✓ {o.title}</li>
                ))}
              </ul>
            </div>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setIsPreviewModalOpen(false)}
                className="px-5 py-2.5 rounded-xl border border-[#e8dfd1] dark:border-[#2d261e] text-xs font-bold text-[#6b5c4f] dark:text-[#a39587]"
              >
                Back to Edit
              </button>
              <button
                onClick={() => {
                  setIsPreviewModalOpen(false);
                  handleAttachToBooking();
                }}
                className="px-6 py-2.5 rounded-xl gold-gradient-bg text-[#120e0b] font-bold text-xs"
              >
                Confirm & Proceed to Booking
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
