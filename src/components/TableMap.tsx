import React from 'react';
import { CafeTable, SeatingArea } from '../types';
import { useApp } from '../context/AppContext';
import { Check, Users, Sparkles, MapPin, Armchair, Shield, Flame, SunMedium, MoonStar } from 'lucide-react';

interface TableMapProps {
  selectedArea: SeatingArea;
  onAreaChange: (area: SeatingArea) => void;
  selectedTableId: string | undefined;
  onSelectTable: (table: CafeTable) => void;
}

export const TableMap: React.FC<TableMapProps> = ({
  selectedArea,
  onAreaChange,
  selectedTableId,
  onSelectTable,
}) => {
  const { tables } = useApp();

  const areas: { id: SeatingArea; label: string; icon: React.ReactNode }[] = [
    { id: 'Indoor', label: 'Indoor Lounge', icon: <Armchair className="w-4 h-4" /> },
    { id: 'Outdoor', label: 'Garden Patio', icon: <SunMedium className="w-4 h-4" /> },
    { id: 'Private Cabin', label: 'Private VIP Cabin', icon: <Shield className="w-4 h-4" /> },
    { id: 'Rooftop', label: 'Rooftop Starlight', icon: <MoonStar className="w-4 h-4" /> },
  ];

  const currentAreaTables = tables.filter((t) => t.area === selectedArea);

  return (
    <div className="space-y-6">
      {/* Zone Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-[#e8dfd1] dark:border-[#2d261e] pb-3">
        {areas.map((area) => (
          <button
            key={area.id}
            onClick={() => onAreaChange(area.id)}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              selectedArea === area.id
                ? 'gold-gradient-bg text-[#120e0b] shadow-md scale-105'
                : 'bg-white dark:bg-[#1a1612] text-[#6b5c4f] dark:text-[#a39587] border border-[#e8dfd1] dark:border-[#2d261e] hover:border-[#d4af37]'
            }`}
          >
            {area.icon}
            <span>{area.label}</span>
          </button>
        ))}
      </div>

      {/* Interactive Floor Plan Map Box */}
      <div className="relative w-full h-[360px] sm:h-[400px] rounded-2xl bg-stone-100 dark:bg-[#120e0b] border-2 border-[#d4af37]/30 p-4 overflow-hidden shadow-inner flex flex-col justify-between">
        {/* Floor Map Decorative Background Texture */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none"></div>

        {/* Zone Header Bar inside map */}
        <div className="relative z-10 flex items-center justify-between text-xs font-bold text-[#1c130d] dark:text-[#f8f4ed] bg-white/80 dark:bg-[#1a1612]/80 backdrop-blur-md px-3.5 py-2 rounded-xl border border-[#d4af37]/20">
          <span className="flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-[#d4af37]" /> Floor Map: {selectedArea} Zone
          </span>
          <div className="flex items-center gap-3 text-[11px]">
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block"></span> Available
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block"></span> Selected
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500 inline-block"></span> Occupied
            </span>
          </div>
        </div>

        {/* Graphical Positioned Tables Canvas */}
        <div className="relative flex-1 my-2">
          {currentAreaTables.map((tbl) => {
            const isSelected = selectedTableId === tbl.id;
            const isOccupied = tbl.isOccupied;

            let bgColor = 'bg-white dark:bg-[#1f1a14] border-emerald-500 text-emerald-500';
            if (isOccupied) {
              bgColor = 'bg-red-500/10 border-red-500/50 text-red-500 cursor-not-allowed opacity-60';
            } else if (isSelected) {
              bgColor = 'gold-gradient-bg text-[#120e0b] border-[#d4af37] shadow-xl scale-110 z-20';
            }

            return (
              <button
                key={tbl.id}
                disabled={isOccupied}
                onClick={() => onSelectTable(tbl)}
                style={{
                  left: `${tbl.position.x}%`,
                  top: `${tbl.position.y}%`,
                  transform: 'translate(-50%, -50%)',
                }}
                className={`absolute p-3 rounded-2xl border-2 transition-all cursor-pointer flex flex-col items-center justify-center min-w-[75px] sm:min-w-[90px] shadow-md group hover:scale-105 ${bgColor}`}
              >
                <div className="flex items-center gap-1 font-extrabold text-xs">
                  <span>{tbl.tableNumber}</span>
                  {isSelected && <Check className="w-3.5 h-3.5" />}
                </div>

                <div className="flex items-center gap-1 text-[10px] mt-0.5 opacity-90">
                  <Users className="w-3 h-3" />
                  <span>{tbl.capacity} Seats</span>
                </div>

                {/* Hover Features Popup */}
                <div className="absolute bottom-full mb-2 hidden group-hover:block z-30 w-44 p-2 rounded-xl bg-[#1a1612] border border-[#d4af37] text-[10px] text-[#f8f4ed] shadow-2xl text-left pointer-events-none">
                  <div className="font-bold text-[#d4af37]">{tbl.tableNumber} - {tbl.capacity} Persons</div>
                  <ul className="mt-1 space-y-0.5 text-[#a39587]">
                    {tbl.features.map((f, i) => (
                      <li key={i}>• {f}</li>
                    ))}
                  </ul>
                </div>
              </button>
            );
          })}
        </div>

        {/* Floor Map Footer Guidance */}
        <div className="relative z-10 text-[11px] text-[#8c7b6c] dark:text-[#a39587] text-center italic bg-white/60 dark:bg-[#1a1612]/60 backdrop-blur-sm py-1.5 rounded-lg">
          💡 Click any green table icon to choose your preferred seating location.
        </div>
      </div>

      {/* Selected Table Detail Card */}
      {selectedTableId && (
        <div className="p-4 rounded-xl bg-[#d4af37]/10 border border-[#d4af37] flex items-center justify-between text-xs">
          <div className="space-y-0.5">
            <span className="text-[10px] uppercase font-bold text-[#d4af37] tracking-wider block">
              Selected Seating Location
            </span>
            <div className="font-serif text-sm font-bold text-[#1c130d] dark:text-[#f8f4ed]">
              {tables.find((t) => t.id === selectedTableId)?.tableNumber} ({selectedArea} Zone)
            </div>
            <p className="text-[#6b5c4f] dark:text-[#a39587]">
              {tables.find((t) => t.id === selectedTableId)?.features.join(' • ')}
            </p>
          </div>
          <span className="px-3 py-1.5 rounded-full gold-gradient-bg text-[#120e0b] font-extrabold text-xs shadow-md">
            Selected ✓
          </span>
        </div>
      )}
    </div>
  );
};
