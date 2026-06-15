import { useState } from 'react';
import {
  MapPin, BedDouble, Bath, Maximize, Heart, ShoppingCart, Phone, MessageCircle,
  Calendar, Share2, CheckCircle, ChevronRight,
} from 'lucide-react';
import { mockProperties } from '../data/mockData';
import { useApp } from '../store/AppContext';
import PropertyGallery from '../components/property/PropertyGallery';
import PropertyCard from '../components/property/PropertyCard';
import { formatPrice, formatSurface } from '../utils/format';
import Badge from '../components/ui/Badge';

export default function PropertyDetailPage() {
  const { state, navigate, addToCart, toggleFavorite, isFavorite, isInCart } = useApp();
  const [activeTab, setActiveTab] = useState<'details' | 'contact'>('details');
  const [contactForm, setContactForm] = useState({ name: '', phone: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const property = mockProperties.find(p => p.id === state.currentPropertyId) ?? mockProperties[0];
  const fav = isFavorite(property.id);
  const inCart = isInCart(property.id);

  const similar = mockProperties
    .filter(p => p.id !== property.id && (p.type === property.type || p.city === property.city))
    .slice(0, 3);

  const handleContact = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const amenityIcons: { key: keyof typeof property; label: string }[] = [
    { key: 'hasPool', label: 'Piscine' },
    { key: 'hasParking', label: 'Parking' },
    { key: 'hasGarden', label: 'Jardin' },
    { key: 'hasBalcony', label: 'Terrasse/Balcon' },
    { key: 'hasSecurity', label: 'Sécurité 24h' },
    { key: 'hasAC', label: 'Climatisation' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-2 text-sm text-gray-500">
          <button onClick={() => navigate('home')} className="hover:text-[#0F4C81] transition-colors">Accueil</button>
          <ChevronRight size={14} />
          <button onClick={() => navigate('catalog')} className="hover:text-[#0F4C81] transition-colors">Catalogue</button>
          <ChevronRight size={14} />
          <span className="text-gray-800 font-medium line-clamp-1">{property.title}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Main content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Gallery */}
            <PropertyGallery images={property.images} title={property.title} />

            {/* Title row */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 flex-wrap mb-2">
                    <Badge variant={property.transaction === 'vente' ? 'primary' : 'success'}>
                      {property.transaction === 'vente' ? 'À Vendre' : 'À Louer'}
                    </Badge>
                    {property.isLuxury && <Badge variant="gold">Luxe</Badge>}
                    {property.isNew && <Badge variant="secondary">Nouveau</Badge>}
                    <Badge variant="gray">{property.type}</Badge>
                  </div>
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{property.title}</h1>
                  <div className="flex items-center gap-1.5 text-gray-500 mt-2">
                    <MapPin size={15} className="text-[#C8102E]" />
                    {property.address}, {property.neighborhood}, {property.city}
                  </div>
                </div>
                <button
                  onClick={() => toggleFavorite(property.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 text-sm font-medium transition-all ${
                    fav ? 'border-[#C8102E] bg-red-50 text-[#C8102E]' : 'border-gray-200 text-gray-500 hover:border-[#C8102E] hover:text-[#C8102E]'
                  }`}
                >
                  <Heart size={16} className={fav ? 'fill-[#C8102E]' : ''} />
                  {fav ? 'Retiré' : 'Favoris'}
                </button>
              </div>

              {/* Specs */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-6 border-t border-gray-100">
                <div className="text-center p-3 bg-gray-50 rounded-xl">
                  <Maximize size={20} className="text-[#0F4C81] mx-auto mb-1" />
                  <div className="font-bold text-gray-900">{formatSurface(property.surface)}</div>
                  <div className="text-xs text-gray-400">Surface</div>
                </div>
                {property.bedrooms && (
                  <div className="text-center p-3 bg-gray-50 rounded-xl">
                    <BedDouble size={20} className="text-[#0F4C81] mx-auto mb-1" />
                    <div className="font-bold text-gray-900">{property.bedrooms}</div>
                    <div className="text-xs text-gray-400">Chambres</div>
                  </div>
                )}
                {property.bathrooms && (
                  <div className="text-center p-3 bg-gray-50 rounded-xl">
                    <Bath size={20} className="text-[#0F4C81] mx-auto mb-1" />
                    <div className="font-bold text-gray-900">{property.bathrooms}</div>
                    <div className="text-xs text-gray-400">Salles de bain</div>
                  </div>
                )}
                {property.rooms && (
                  <div className="text-center p-3 bg-gray-50 rounded-xl">
                    <div className="w-5 h-5 border-2 border-[#0F4C81] rounded mx-auto mb-1" />
                    <div className="font-bold text-gray-900">{property.rooms}</div>
                    <div className="text-xs text-gray-400">Pièces</div>
                  </div>
                )}
              </div>
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
              <div className="flex border-b border-gray-100">
                {['details', 'contact'].map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab as typeof activeTab)}
                    className={`flex-1 py-4 text-sm font-semibold transition-all ${
                      activeTab === tab ? 'text-[#0F4C81] border-b-2 border-[#0F4C81]' : 'text-gray-400 hover:text-gray-600'
                    }`}
                  >
                    {tab === 'details' ? 'Détails & Équipements' : 'Demande de visite'}
                  </button>
                ))}
              </div>

              <div className="p-6">
                {activeTab === 'details' ? (
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-bold text-gray-900 mb-3">Description</h3>
                      <p className="text-gray-600 leading-relaxed text-sm">{property.description}</p>
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-3">Équipements & Prestations</h3>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {property.features.map(f => (
                          <div key={f} className="flex items-center gap-2 text-sm text-gray-600">
                            <CheckCircle size={14} className="text-emerald-500 flex-shrink-0" />
                            {f}
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-3">Services inclus</h3>
                      <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                        {amenityIcons.map(({ key, label }) => (
                          <div
                            key={key}
                            className={`flex flex-col items-center gap-1.5 p-3 rounded-xl text-center ${
                              property[key] ? 'bg-emerald-50 text-emerald-700' : 'bg-gray-50 text-gray-300'
                            }`}
                          >
                            <CheckCircle size={18} />
                            <span className="text-xs font-medium leading-tight">{label}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div>
                    {submitted ? (
                      <div className="text-center py-8">
                        <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                          <CheckCircle size={32} className="text-emerald-600" />
                        </div>
                        <h3 className="font-bold text-gray-900 text-lg mb-2">Demande envoyée !</h3>
                        <p className="text-gray-500 text-sm">Notre conseiller vous contactera dans les 2 heures.</p>
                      </div>
                    ) : (
                      <form onSubmit={handleContact} className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="text-xs font-medium text-gray-600 mb-1.5 block">Nom complet *</label>
                            <input
                              required
                              value={contactForm.name}
                              onChange={e => setContactForm(f => ({ ...f, name: e.target.value }))}
                              placeholder="Votre nom"
                              className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#0F4C81]/20 focus:border-[#0F4C81] transition-all"
                            />
                          </div>
                          <div>
                            <label className="text-xs font-medium text-gray-600 mb-1.5 block">Téléphone *</label>
                            <input
                              required
                              value={contactForm.phone}
                              onChange={e => setContactForm(f => ({ ...f, phone: e.target.value }))}
                              placeholder="+221 XX XXX XX XX"
                              className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#0F4C81]/20 focus:border-[#0F4C81] transition-all"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="text-xs font-medium text-gray-600 mb-1.5 block">Email</label>
                          <input
                            value={contactForm.email}
                            onChange={e => setContactForm(f => ({ ...f, email: e.target.value }))}
                            type="email"
                            placeholder="votre@email.com"
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#0F4C81]/20 focus:border-[#0F4C81] transition-all"
                          />
                        </div>
                        <div>
                          <label className="text-xs font-medium text-gray-600 mb-1.5 block">Message</label>
                          <textarea
                            value={contactForm.message}
                            onChange={e => setContactForm(f => ({ ...f, message: e.target.value }))}
                            rows={3}
                            placeholder="Je souhaite visiter ce bien..."
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#0F4C81]/20 focus:border-[#0F4C81] transition-all resize-none"
                          />
                        </div>
                        <button
                          type="submit"
                          className="w-full py-3.5 bg-[#0F4C81] hover:bg-[#0a3d6b] text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2"
                        >
                          <Calendar size={17} /> Planifier une visite
                        </button>
                      </form>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right: Sticky sidebar */}
          <div className="space-y-5">
            {/* Price card */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6 sticky top-24">
              <div className="mb-5">
                <div className="text-3xl font-bold text-[#0F4C81]">
                  {formatPrice(property.price, property.priceUnit)}
                </div>
                {property.priceFrequency && (
                  <div className="text-gray-400 text-sm">/ {property.priceFrequency}</div>
                )}
              </div>

              <div className="space-y-3 mb-5">
                <button
                  onClick={() => addToCart(property, property.transaction === 'location' ? 'location' : 'achat')}
                  disabled={inCart}
                  className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold transition-all ${
                    inCart ? 'bg-emerald-100 text-emerald-700' : 'bg-[#0F4C81] hover:bg-[#0a3d6b] text-white shadow-lg shadow-[#0F4C81]/20 hover:scale-[1.02]'
                  }`}
                >
                  <ShoppingCart size={18} />
                  {inCart ? '✓ Ajouté au panier' : 'Ajouter au panier'}
                </button>
                <button
                  onClick={() => setActiveTab('contact')}
                  className="w-full flex items-center justify-center gap-2 py-3.5 border-2 border-[#0F4C81] text-[#0F4C81] rounded-xl font-bold hover:bg-blue-50 transition-colors"
                >
                  <Calendar size={18} /> Visiter ce bien
                </button>
                <div className="grid grid-cols-2 gap-2">
                  <a
                    href={`tel:${property.agent?.phone ?? '+221774308344'}`}
                    className="flex items-center justify-center gap-2 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-sm font-medium transition-colors"
                  >
                    <Phone size={15} /> Appeler
                  </a>
                  <a
                    href={`https://wa.me/${(property.agent?.phone ?? '+221774308344').replace(/\s/g, '').replace('+', '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 py-3 bg-[#25D366] hover:bg-[#1da851] text-white rounded-xl text-sm font-medium transition-colors"
                  >
                    <MessageCircle size={15} /> WhatsApp
                  </a>
                </div>
              </div>

              {/* Agent */}
              {property.agent && (
                <div className="pt-5 border-t border-gray-100">
                  <p className="text-xs text-gray-400 mb-3 uppercase font-semibold tracking-wide">Conseiller dédié</p>
                  <div className="flex items-center gap-3">
                    <img src={property.agent.avatar} alt={property.agent.name} className="w-12 h-12 rounded-xl object-cover" />
                    <div>
                      <div className="font-bold text-gray-900 text-sm">{property.agent.name}</div>
                      <div className="text-gray-400 text-xs">{property.agent.title}</div>
                      <div className="text-[#0F4C81] text-xs font-medium mt-0.5">{property.agent.phone}</div>
                    </div>
                  </div>
                </div>
              )}

              <button
                onClick={() => navigator.share?.({ title: property.title, url: window.location.href })}
                className="mt-4 w-full flex items-center justify-center gap-2 py-2.5 text-gray-500 text-sm hover:text-gray-700 transition-colors border border-dashed border-gray-200 rounded-xl"
              >
                <Share2 size={14} /> Partager ce bien
              </button>
            </div>
          </div>
        </div>

        {/* Similar properties */}
        {similar.length > 0 && (
          <div className="mt-14">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Biens similaires</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {similar.map(p => (
                <PropertyCard key={p.id} property={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
