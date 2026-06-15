import { useState } from 'react';
import { Search, SlidersHorizontal, X, ChevronDown } from 'lucide-react';
import type { FilterState } from '../../types';

const defaultFilters: FilterState = {
  transaction: '',
  type: '',
  city: '',
  minPrice: '',
  maxPrice: '',
  minSurface: '',
  maxSurface: '',
  rooms: '',
  hasPool: false,
  hasParking: false,
  hasGarden: false,
  searchQuery: '',
};

interface Props {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
  total: number;
}

export default function PropertyFilter({ filters, onChange, total }: Props) {
  const [showAdvanced, setShowAdvanced] = useState(false);

  const set = (key: keyof FilterState, value: string | boolean) =>
    onChange({ ...filters, [key]: value });

  const reset = () => onChange(defaultFilters);

  const hasActiveFilters = Object.entries(filters).some(([k, v]) =>
    k !== 'searchQuery' && v !== '' && v !== false
  );

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      {/* Main filter bar */}
      <div className="p-4 md:p-5">
        <div className="flex flex-col lg:flex-row gap-3">
          {/* Search */}
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              value={filters.searchQuery}
              onChange={e => set('searchQuery', e.target.value)}
              type="text"
              placeholder="Rechercher un bien, une ville, un quartier..."
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:ring-2 focus:ring-[#0F4C81]/20 focus:border-[#0F4C81] transition-all"
            />
          </div>

          {/* Transaction */}
          <div className="relative">
            <select
              value={filters.transaction}
              onChange={e => set('transaction', e.target.value)}
              className="w-full lg:w-40 pl-4 pr-9 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:ring-2 focus:ring-[#0F4C81]/20 focus:border-[#0F4C81] appearance-none cursor-pointer transition-all"
            >
              <option value="">Transaction</option>
              <option value="vente">Vente</option>
              <option value="location">Location</option>
            </select>
            <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>

          {/* Type */}
          <div className="relative">
            <select
              value={filters.type}
              onChange={e => set('type', e.target.value)}
              className="w-full lg:w-44 pl-4 pr-9 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:ring-2 focus:ring-[#0F4C81]/20 focus:border-[#0F4C81] appearance-none cursor-pointer transition-all"
            >
              <option value="">Type de bien</option>
              <option value="villa">Villa</option>
              <option value="appartement">Appartement</option>
              <option value="terrain">Terrain</option>
              <option value="bureau">Bureau</option>
              <option value="local_commercial">Local commercial</option>
              <option value="immeuble">Immeuble</option>
              <option value="duplex">Duplex</option>
            </select>
            <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>

          {/* City */}
          <div className="relative">
            <select
              value={filters.city}
              onChange={e => set('city', e.target.value)}
              className="w-full lg:w-40 pl-4 pr-9 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:ring-2 focus:ring-[#0F4C81]/20 focus:border-[#0F4C81] appearance-none cursor-pointer transition-all"
            >
              <option value="">Ville</option>
              <option value="Dakar">Dakar</option>
              <option value="Mbour">Mbour</option>
              <option value="Thiès">Thiès</option>
              <option value="Saint-Louis">Saint-Louis</option>
            </select>
            <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>

          {/* Advanced & Reset */}
          <div className="flex gap-2">
            <button
              onClick={() => setShowAdvanced(!showAdvanced)}
              className={`flex items-center gap-2 px-4 py-3 rounded-xl border text-sm font-medium transition-all ${
                showAdvanced ? 'bg-[#0F4C81] border-[#0F4C81] text-white' : 'border-gray-200 text-gray-600 hover:border-[#0F4C81] hover:text-[#0F4C81]'
              }`}
            >
              <SlidersHorizontal size={15} /> Filtres
            </button>
            {hasActiveFilters && (
              <button
                onClick={reset}
                className="flex items-center gap-1.5 px-4 py-3 rounded-xl border border-red-200 text-red-500 text-sm font-medium hover:bg-red-50 transition-all"
              >
                <X size={14} /> Réinitialiser
              </button>
            )}
          </div>
        </div>

        {/* Advanced filters */}
        {showAdvanced && (
          <div className="mt-4 pt-4 border-t border-gray-100 grid grid-cols-2 md:grid-cols-4 gap-3">
            <div>
              <label className="text-xs font-medium text-gray-500 mb-1.5 block">Prix min (FCFA)</label>
              <input
                value={filters.minPrice}
                onChange={e => set('minPrice', e.target.value)}
                type="number"
                placeholder="0"
                className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:ring-2 focus:ring-[#0F4C81]/20 focus:border-[#0F4C81] transition-all"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-gray-500 mb-1.5 block">Prix max (FCFA)</label>
              <input
                value={filters.maxPrice}
                onChange={e => set('maxPrice', e.target.value)}
                type="number"
                placeholder="Illimité"
                className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:ring-2 focus:ring-[#0F4C81]/20 focus:border-[#0F4C81] transition-all"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-gray-500 mb-1.5 block">Surface min (m²)</label>
              <input
                value={filters.minSurface}
                onChange={e => set('minSurface', e.target.value)}
                type="number"
                placeholder="0"
                className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:ring-2 focus:ring-[#0F4C81]/20 focus:border-[#0F4C81] transition-all"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-gray-500 mb-1.5 block">Chambres min</label>
              <select
                value={filters.rooms}
                onChange={e => set('rooms', e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:ring-2 focus:ring-[#0F4C81]/20 focus:border-[#0F4C81] cursor-pointer transition-all"
              >
                <option value="">Toutes</option>
                <option value="1">1+</option>
                <option value="2">2+</option>
                <option value="3">3+</option>
                <option value="4">4+</option>
                <option value="5">5+</option>
              </select>
            </div>
            {/* Amenities */}
            <div className="col-span-2 md:col-span-4 flex flex-wrap gap-3 mt-1">
              {[
                { key: 'hasPool', label: 'Piscine' },
                { key: 'hasParking', label: 'Parking' },
                { key: 'hasGarden', label: 'Jardin' },
              ].map(item => (
                <label key={item.key} className="flex items-center gap-2 cursor-pointer group">
                  <div
                    className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${
                      filters[item.key as keyof FilterState]
                        ? 'bg-[#0F4C81] border-[#0F4C81]'
                        : 'border-gray-300 group-hover:border-[#0F4C81]'
                    }`}
                    onClick={() => set(item.key as keyof FilterState, !filters[item.key as keyof FilterState])}
                  >
                    {filters[item.key as keyof FilterState] && (
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                  <span className="text-sm text-gray-600">{item.label}</span>
                </label>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Results count */}
      <div className="px-5 py-3 bg-gray-50 border-t border-gray-100 text-xs text-gray-500 flex items-center justify-between">
        <span><span className="font-bold text-gray-800">{total}</span> bien{total > 1 ? 's' : ''} trouvé{total > 1 ? 's' : ''}</span>
        {hasActiveFilters && (
          <span className="text-[#0F4C81] font-medium">Filtres actifs</span>
        )}
      </div>
    </div>
  );
}
