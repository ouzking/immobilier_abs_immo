import { Heart, MapPin, BedDouble, Bath, Maximize, ShoppingCart, Eye } from 'lucide-react';
import type { Property } from '../../types';
import { formatPrice, formatSurface } from '../../utils/format';
import { useApp } from '../../store/AppContext';
import Badge from '../ui/Badge';

const typeLabels: Record<string, string> = {
  villa: 'Villa',
  appartement: 'Appartement',
  terrain: 'Terrain',
  bureau: 'Bureau',
  immeuble: 'Immeuble',
  local_commercial: 'Local Commercial',
  maison: 'Maison',
  duplex: 'Duplex',
};

const transactionLabels: Record<string, { label: string; color: string }> = {
  vente: { label: 'À Vendre', color: 'bg-[#0F4C81]' },
  location: { label: 'À Louer', color: 'bg-emerald-600' },
  achat: { label: 'Achat', color: 'bg-[#C8102E]' },
};

interface Props {
  property: Property;
  view?: 'grid' | 'list';
}

export default function PropertyCard({ property, view = 'grid' }: Props) {
  const { navigate, addToCart, toggleFavorite, isFavorite, isInCart } = useApp();
  const tx = transactionLabels[property.transaction] ?? { label: property.transaction, color: 'bg-gray-500' };
  const fav = isFavorite(property.id);
  const inCart = isInCart(property.id);

  if (view === 'list') {
    return (
      <div className="group bg-white rounded-2xl border border-gray-100 hover:border-[#0F4C81]/20 hover:shadow-xl transition-all duration-300 overflow-hidden flex">
        <div className="relative w-64 flex-shrink-0 overflow-hidden">
          <img
            src={property.images[0]}
            alt={property.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 cursor-pointer"
            onClick={() => navigate('property', property.id)}
          />
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            <span className={`${tx.color} text-white text-xs font-bold px-2.5 py-1 rounded-full`}>{tx.label}</span>
            {property.isNew && <Badge variant="gold">Nouveau</Badge>}
            {property.isLuxury && <Badge variant="gold">Luxe</Badge>}
          </div>
          <button
            onClick={() => toggleFavorite(property.id)}
            className="absolute top-3 right-3 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-lg flex items-center justify-center shadow hover:scale-110 transition-transform"
          >
            <Heart size={15} className={fav ? 'text-[#C8102E] fill-[#C8102E]' : 'text-gray-400'} />
          </button>
        </div>
        <div className="flex-1 p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-1.5 text-gray-400 text-xs mb-2">
              <MapPin size={12} />{property.neighborhood}, {property.city}
            </div>
            <h3
              className="font-bold text-gray-900 text-lg mb-1 hover:text-[#0F4C81] cursor-pointer transition-colors line-clamp-1"
              onClick={() => navigate('property', property.id)}
            >
              {property.title}
            </h3>
            <p className="text-gray-500 text-sm line-clamp-2 mb-4">{property.shortDescription}</p>
            <div className="flex items-center gap-4 text-sm text-gray-500">
              {property.surface && <span className="flex items-center gap-1"><Maximize size={14} className="text-[#0F4C81]" />{formatSurface(property.surface)}</span>}
              {property.bedrooms && <span className="flex items-center gap-1"><BedDouble size={14} className="text-[#0F4C81]" />{property.bedrooms} ch.</span>}
              {property.bathrooms && <span className="flex items-center gap-1"><Bath size={14} className="text-[#0F4C81]" />{property.bathrooms} sdb.</span>}
            </div>
          </div>
          <div className="flex items-center justify-between mt-4">
            <div>
              <div className="text-2xl font-bold text-[#0F4C81]">
                {formatPrice(property.price, property.priceUnit, property.priceFrequency)}
              </div>
              <div className="text-xs text-gray-400">{typeLabels[property.type]}</div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => navigate('property', property.id)}
                className="p-2.5 border border-gray-200 rounded-xl hover:border-[#0F4C81] hover:text-[#0F4C81] transition-colors"
              >
                <Eye size={16} />
              </button>
              <button
                onClick={() => addToCart(property, property.transaction === 'location' ? 'location' : 'achat')}
                disabled={inCart}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                  inCart
                    ? 'bg-emerald-100 text-emerald-700 cursor-default'
                    : 'bg-[#0F4C81] hover:bg-[#0a3d6b] text-white'
                }`}
              >
                {inCart ? '✓ Ajouté' : 'Réserver'}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="group bg-white rounded-2xl border border-gray-100 hover:border-[#0F4C81]/20 hover:shadow-xl hover:shadow-[#0F4C81]/5 transition-all duration-300 overflow-hidden hover:-translate-y-1">
      {/* Image */}
      <div className="relative overflow-hidden aspect-[4/3]">
        <img
          src={property.images[0]}
          alt={property.title}
          className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 cursor-pointer"
          onClick={() => navigate('property', property.id)}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Top badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          <span className={`${tx.color} text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-sm`}>{tx.label}</span>
          {property.isNew && <span className="bg-[#D4AF37] text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-sm">Nouveau</span>}
          {property.isLuxury && <span className="bg-white/90 text-[#D4AF37] text-xs font-bold px-2.5 py-1 rounded-full shadow-sm border border-[#D4AF37]/30">Luxe</span>}
        </div>

        {/* Fav button */}
        <button
          onClick={() => toggleFavorite(property.id)}
          className="absolute top-3 right-3 w-9 h-9 bg-white/90 backdrop-blur-sm rounded-xl flex items-center justify-center shadow hover:scale-110 transition-transform"
        >
          <Heart size={16} className={fav ? 'text-[#C8102E] fill-[#C8102E]' : 'text-gray-400'} />
        </button>

        {/* Hover action */}
        <div className="absolute bottom-3 left-3 right-3 flex gap-2 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
          <button
            onClick={() => navigate('property', property.id)}
            className="flex-1 py-2.5 bg-white/90 backdrop-blur-sm text-gray-800 rounded-xl text-xs font-semibold hover:bg-white transition-colors flex items-center justify-center gap-1.5"
          >
            <Eye size={14} /> Voir les détails
          </button>
          <button
            onClick={() => addToCart(property, property.transaction === 'location' ? 'location' : 'achat')}
            disabled={inCart}
            className={`flex items-center gap-1.5 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
              inCart
                ? 'bg-emerald-500/90 text-white cursor-default'
                : 'bg-[#0F4C81]/90 hover:bg-[#0F4C81] text-white'
            }`}
          >
            <ShoppingCart size={14} /> {inCart ? 'Ajouté' : 'Réserver'}
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-center gap-1.5 text-gray-400 text-xs mb-2">
          <MapPin size={11} />{property.neighborhood}, {property.city}
        </div>
        <h3
          className="font-bold text-gray-900 text-base mb-1 hover:text-[#0F4C81] cursor-pointer transition-colors line-clamp-1"
          onClick={() => navigate('property', property.id)}
        >
          {property.title}
        </h3>
        <p className="text-gray-500 text-xs mb-4 line-clamp-2 leading-relaxed">{property.shortDescription}</p>

        {/* Specs */}
        <div className="flex items-center gap-3 text-xs text-gray-500 pb-4 border-b border-gray-100 flex-wrap">
          {property.surface && (
            <span className="flex items-center gap-1"><Maximize size={12} className="text-[#0F4C81]" />{formatSurface(property.surface)}</span>
          )}
          {property.bedrooms && (
            <span className="flex items-center gap-1"><BedDouble size={12} className="text-[#0F4C81]" />{property.bedrooms} ch.</span>
          )}
          {property.bathrooms && (
            <span className="flex items-center gap-1"><Bath size={12} className="text-[#0F4C81]" />{property.bathrooms} sdb.</span>
          )}
        </div>

        {/* Price */}
        <div className="flex items-center justify-between mt-4">
          <div>
            <div className="text-lg font-bold text-[#0F4C81] leading-none">
              {formatPrice(property.price, property.priceUnit)}
            </div>
            {property.priceFrequency && (
              <div className="text-xs text-gray-400 mt-0.5">/ {property.priceFrequency}</div>
            )}
          </div>
          <span className="px-2.5 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-lg">
            {typeLabels[property.type]}
          </span>
        </div>
      </div>
    </div>
  );
}
