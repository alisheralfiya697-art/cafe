import React from 'react';
import { useApp } from '../context/AppContext';
import { X, Calendar, Clock, Users, MapPin, Sparkles, CheckCircle2, Download, Share2 } from 'lucide-react';

export const QRCodeModal: React.FC = () => {
  const { activeReservationForQR, setActiveReservationForQR, showToast } = useApp();

  if (!activeReservationForQR) return null;

  const res = activeReservationForQR;

  const handleDownloadPass = () => {
    showToast('Reservation Pass downloaded to your device!');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="w-full max-w-sm bg-[#faf7f2] dark:bg-[#1a1612] border-2 border-[#d4af37] rounded-3xl p-6 shadow-2xl relative space-y-5 text-center overflow-hidden">
        {/* Decorative Header Badge */}
        <div className="absolute top-0 inset-x-0 bg-gradient-to-r from-[#d4af37] via-[#f3d068] to-[#d4af37] text-[#120e0b] text-[10px] uppercase font-extrabold tracking-widest py-1">
          VIP Table Reservation Pass
        </div>

        <button
          onClick={() => setActiveReservationForQR(null)}
          className="absolute top-4 right-4 p-1 rounded-full bg-[#120e0b]/20 text-[#8c7b6c] hover:text-[#d4af37]"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="pt-4 space-y-1">
          <h3 className="font-serif text-2xl font-bold gold-gradient-text">Café Grandeur</h3>
          <p className="text-[10px] uppercase tracking-widest text-[#8c7b6c]">Bandra West, Mumbai</p>
        </div>

        {/* QR Code Matrix Display (SVG Generated) */}
        <div className="p-4 bg-white dark:bg-[#120e0b] rounded-2xl border border-[#d4af37]/30 inline-block mx-auto shadow-inner">
          <svg
            className="w-40 h-40 mx-auto"
            viewBox="0 0 100 100"
            shapeRendering="crispEdges"
          >
            <rect width="100" height="100" fill="#ffffff" />
            {/* Position Markers */}
            <rect x="5" y="5" width="25" height="25" fill="#120e0b" />
            <rect x="8" y="8" width="19" height="19" fill="#ffffff" />
            <rect x="12" y="12" width="11" height="11" fill="#d4af37" />

            <rect x="70" y="5" width="25" height="25" fill="#120e0b" />
            <rect x="73" y="8" width="19" height="19" fill="#ffffff" />
            <rect x="77" y="12" width="11" height="11" fill="#d4af37" />

            <rect x="5" y="70" width="25" height="25" fill="#120e0b" />
            <rect x="8" y="73" width="19" height="19" fill="#ffffff" />
            <rect x="12" y="77" width="11" height="11" fill="#d4af37" />

            {/* Simulated Data Grid Pattern */}
            <rect x="35" y="10" width="8" height="8" fill="#120e0b" />
            <rect x="48" y="10" width="8" height="8" fill="#d4af37" />
            <rect x="35" y="25" width="8" height="8" fill="#120e0b" />
            <rect x="48" y="25" width="8" height="8" fill="#120e0b" />

            <rect x="10" y="38" width="8" height="8" fill="#d4af37" />
            <rect x="25" y="38" width="8" height="8" fill="#120e0b" />
            <rect x="38" y="38" width="8" height="8" fill="#120e0b" />
            <rect x="52" y="38" width="8" height="8" fill="#d4af37" />
            <rect x="68" y="38" width="8" height="8" fill="#120e0b" />
            <rect x="82" y="38" width="8" height="8" fill="#120e0b" />

            <rect x="38" y="52" width="8" height="8" fill="#120e0b" />
            <rect x="52" y="52" width="8" height="8" fill="#120e0b" />
            <rect x="68" y="52" width="8" height="8" fill="#d4af37" />
            <rect x="82" y="52" width="8" height="8" fill="#120e0b" />

            <rect x="38" y="68" width="8" height="8" fill="#d4af37" />
            <rect x="52" y="68" width="8" height="8" fill="#120e0b" />
            <rect x="68" y="68" width="8" height="8" fill="#120e0b" />
            <rect x="82" y="68" width="8" height="8" fill="#d4af37" />

            <rect x="38" y="82" width="8" height="8" fill="#120e0b" />
            <rect x="52" y="82" width="8" height="8" fill="#d4af37" />
            <rect x="68" y="82" width="8" height="8" fill="#120e0b" />
          </svg>
          <span className="text-[10px] font-mono text-[#8c7b6c] block mt-1">
            REF: {res.id}
          </span>
        </div>

        {/* Reservation Details Breakdown */}
        <div className="bg-white dark:bg-[#120e0b] p-3.5 rounded-xl border border-[#e8dfd1] dark:border-[#2d261e] text-left text-xs space-y-2">
          <div className="flex justify-between items-center pb-2 border-b border-[#e8dfd1] dark:border-[#2d261e]">
            <span className="font-bold text-[#1c130d] dark:text-[#f8f4ed]">{res.userName}</span>
            <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full font-bold">
              {res.status}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-[11px] text-[#6b5c4f] dark:text-[#a39587]">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[#d4af37]" />
              <span>{res.date}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#d4af37]" />
              <span>{res.timeSlot}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-[#d4af37]" />
              <span>{res.guests} Guests</span>
            </div>
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#d4af37]" />
              <span>{res.seatingArea} {res.tableNumber ? `(${res.tableNumber})` : ''}</span>
            </div>
          </div>

          {res.decoration && (
            <div className="pt-2 border-t border-[#e8dfd1] dark:border-[#2d261e] flex items-center gap-1.5 text-amber-500 font-medium text-[11px]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Includes Custom {res.decoration.occasion} Setup</span>
            </div>
          )}
        </div>

        {/* Buttons */}
        <div className="flex gap-2">
          <button
            onClick={handleDownloadPass}
            className="flex-1 py-2.5 rounded-xl gold-gradient-bg text-[#120e0b] font-bold text-xs flex items-center justify-center gap-1.5 hover:brightness-110 shadow-md"
          >
            <Download className="w-3.5 h-3.5" /> Download Pass
          </button>
          <button
            onClick={() => {
              navigator.clipboard.writeText(`Café Grandeur Reservation Pass #${res.id} for ${res.userName} on ${res.date}`);
              showToast('Pass link copied to clipboard!');
            }}
            className="px-3 py-2.5 rounded-xl bg-white dark:bg-[#1f1a14] border border-[#d4af37]/40 text-[#d4af37] font-bold text-xs flex items-center justify-center"
            title="Share Pass"
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
