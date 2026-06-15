import { ArrowRight } from 'lucide-react';
import { mockProperties } from '../../data/mockData';
import PropertyCard from '../property/PropertyCard';
import { useApp } from '../../store/AppContext';

interface Props {
  title?: string;
  subtitle?: string;
  filter?: 'featured' | 'luxury' | 'new';
  limit?: number;
}

export default function FeaturedProperties({
  title = 'Propriétés à la une',
  subtitle = 'Découvrez notre sélection exclusive de biens d\'exception',
  filter = 'featured',
  limit = 6,
}: Props) {
  const { navigate } = useApp();

  const properties = mockProperties
    .filter(p => {
      if (filter === 'featured') return p.isFeatured;
      if (filter === 'luxury') return p.isLuxury;
      if (filter === 'new') return p.isNew;
      return true;
    })
    .slice(0, limit);

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-[#C8102E] text-sm font-semibold uppercase tracking-widest">Sélection</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">{title}</h2>
            <p className="text-gray-500 mt-2 max-w-xl">{subtitle}</p>
          </div>
          <button
            onClick={() => navigate('catalog')}
            className="flex items-center gap-2 text-[#0F4C81] font-semibold text-sm hover:gap-3 transition-all flex-shrink-0"
          >
            Voir tous les biens <ArrowRight size={16} />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map(p => (
            <PropertyCard key={p.id} property={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
