import { useState, useMemo } from 'react';
import { Grid, List } from 'lucide-react';
import { mockProperties } from '../data/mockData';
import PropertyCard from '../components/property/PropertyCard';
import PropertyFilter from '../components/property/PropertyFilter';
import type { FilterState } from '../types';

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

const ITEMS_PER_PAGE = 6;

const sortOptions = [
  { value: 'newest', label: 'Plus récents' },
  { value: 'price_asc', label: 'Prix croissant' },
  { value: 'price_desc', label: 'Prix décroissant' },
  { value: 'surface_desc', label: 'Plus grande surface' },
];

export default function CatalogPage() {
  const [filters, setFilters] = useState<FilterState>(defaultFilters);
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [sort, setSort] = useState('newest');
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    let props = mockProperties.filter(p => {
      if (filters.transaction && p.transaction !== filters.transaction) return false;
      if (filters.type && p.type !== filters.type) return false;
      if (filters.city && p.city !== filters.city) return false;
      if (filters.minPrice && p.price < Number(filters.minPrice)) return false;
      if (filters.maxPrice && p.price > Number(filters.maxPrice)) return false;
      if (filters.minSurface && p.surface < Number(filters.minSurface)) return false;
      if (filters.rooms && (p.bedrooms ?? 0) < Number(filters.rooms)) return false;
      if (filters.hasPool && !p.hasPool) return false;
      if (filters.hasParking && !p.hasParking) return false;
      if (filters.hasGarden && !p.hasGarden) return false;
      if (filters.searchQuery) {
        const q = filters.searchQuery.toLowerCase();
        if (!p.title.toLowerCase().includes(q) && !p.city.toLowerCase().includes(q) && !p.neighborhood.toLowerCase().includes(q)) return false;
      }
      return true;
    });

    if (sort === 'price_asc') props.sort((a, b) => a.price - b.price);
    else if (sort === 'price_desc') props.sort((a, b) => b.price - a.price);
    else if (sort === 'surface_desc') props.sort((a, b) => b.surface - a.surface);
    else props.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    return props;
  }, [filters, sort]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const handleFilterChange = (f: FilterState) => {
    setFilters(f);
    setPage(1);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      {/* Header */}
      <div className="bg-[#0F4C81] text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Catalogue immobilier</h1>
          <p className="text-blue-200">Découvrez notre sélection de biens immobiliers au Sénégal</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Filter */}
        <div className="mb-6">
          <PropertyFilter filters={filters} onChange={handleFilterChange} total={filtered.length} />
        </div>

        {/* Toolbar */}
        <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
          <p className="text-gray-500 text-sm">
            <span className="font-bold text-gray-900">{filtered.length}</span> bien{filtered.length > 1 ? 's' : ''} correspondant à votre recherche
          </p>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 text-sm text-gray-500">
              <span>Trier :</span>
              <select
                value={sort}
                onChange={e => setSort(e.target.value)}
                className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm outline-none focus:border-[#0F4C81] cursor-pointer"
              >
                {sortOptions.map(o => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            </div>
            <div className="flex rounded-lg border border-gray-200 overflow-hidden">
              <button
                onClick={() => setView('grid')}
                className={`p-2 ${view === 'grid' ? 'bg-[#0F4C81] text-white' : 'text-gray-400 hover:text-gray-700'} transition-colors`}
              >
                <Grid size={17} />
              </button>
              <button
                onClick={() => setView('list')}
                className={`p-2 ${view === 'list' ? 'bg-[#0F4C81] text-white' : 'text-gray-400 hover:text-gray-700'} transition-colors`}
              >
                <List size={17} />
              </button>
            </div>
          </div>
        </div>

        {/* Grid / List */}
        {paginated.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🏠</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">Aucun bien trouvé</h3>
            <p className="text-gray-400">Modifiez vos critères de recherche pour voir plus de résultats.</p>
          </div>
        ) : view === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginated.map(p => (
              <PropertyCard key={p.id} property={p} view="grid" />
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {paginated.map(p => (
              <PropertyCard key={p.id} property={p} view="list" />
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-10">
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-4 py-2 rounded-lg border border-gray-200 text-sm font-medium disabled:opacity-40 hover:border-[#0F4C81] hover:text-[#0F4C81] transition-colors"
            >
              Précédent
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(n => (
              <button
                key={n}
                onClick={() => setPage(n)}
                className={`w-10 h-10 rounded-lg text-sm font-semibold transition-all ${
                  n === page ? 'bg-[#0F4C81] text-white' : 'border border-gray-200 text-gray-600 hover:border-[#0F4C81] hover:text-[#0F4C81]'
                }`}
              >
                {n}
              </button>
            ))}
            <button
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="px-4 py-2 rounded-lg border border-gray-200 text-sm font-medium disabled:opacity-40 hover:border-[#0F4C81] hover:text-[#0F4C81] transition-colors"
            >
              Suivant
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
