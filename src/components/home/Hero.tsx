import { useState } from 'react';
import { Search, MapPin, Home, TrendingUp, ChevronDown } from 'lucide-react';
import { useApp } from '../../store/AppContext';
import Button from '../ui/Button';

const stats = [
  { value: '500+', label: 'Propriétés' },
  { value: '1 200+', label: 'Clients satisfaits' },
  { value: '15+', label: 'Années d\'expérience' },
  { value: '98%', label: 'Satisfaction client' },
];

const transactionTabs = [
  { key: 'vente', label: 'Acheter', icon: Home },
  { key: 'location', label: 'Louer', icon: TrendingUp },
  { key: 'terrain', label: 'Terrain', icon: MapPin },
];

export default function Hero() {
  const { navigate } = useApp();
  const [activeTab, setActiveTab] = useState('vente');
  const [location, setLocation] = useState('');
  const [type, setType] = useState('');

  const handleSearch = () => navigate('catalog');

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src="https://i.pinimg.com/736x/d9/9d/37/d99d376762d7dec72f94c6f4a554c129.jpg"
          alt="Luxury property"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a1628]/80 via-[#0F4C81]/60 to-[#0a1628]/90" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a1628]/40 via-transparent to-[#0a1628]/20" />
      </div>

      {/* Animated particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-[#D4AF37] rounded-full opacity-60 animate-float"
            style={{
              left: `${10 + i * 15}%`,
              top: `${20 + (i % 3) * 20}%`,
              animationDelay: `${i * 0.8}s`,
              animationDuration: `${4 + i}s`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 pt-32 pb-20">
        <div className="text-center mb-12">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-[#D4AF37]/20 border border-[#D4AF37]/40 backdrop-blur-sm rounded-full px-4 py-1.5 text-[#D4AF37] text-sm font-medium mb-6 animate-fadeInDown">
            <span className="w-2 h-2 bg-[#D4AF37] rounded-full animate-pulse" />
            N°1 de l'immobilier premium au Sénégal
          </div>

          {/* Headline */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-6 leading-tight tracking-tight animate-fadeInUp">
            Trouvez votre{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#f0d060]">
              propriété idéale
            </span>
            <br />
            avec ABS Immo & Services
          </h1>

          <p className="text-xl md:text-2xl text-blue-100 font-light mb-10 max-w-2xl mx-auto animate-fadeInUp" style={{ animationDelay: '0.15s' }}>
            Achat, Vente, Location et Gestion immobilière au Sénégal
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-fadeInUp" style={{ animationDelay: '0.25s' }}>
            <Button
              size="xl"
              variant="gold"
              icon={<Search size={20} />}
              onClick={() => navigate('catalog')}
              className="shadow-2xl shadow-[#D4AF37]/30 font-bold"
            >
              Explorer les biens
            </Button>
            <Button
              size="xl"
              variant="outline"
              className="border-white/60 text-white hover:bg-white hover:text-[#0F4C81] backdrop-blur-sm"
              onClick={() => navigate('contact')}
            >
              Contacter un conseiller
            </Button>
          </div>
        </div>

        {/* Search bar */}
        <div className="max-w-4xl mx-auto animate-fadeInUp" style={{ animationDelay: '0.35s' }}>
          <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-1.5 shadow-2xl">
            {/* Tabs */}
            <div className="flex gap-1 mb-3 px-2 pt-2">
              {transactionTabs.map(tab => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                    activeTab === tab.key
                      ? 'bg-white text-[#0F4C81] shadow-md'
                      : 'text-white/70 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <tab.icon size={15} />
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Inputs */}
            <div className="flex flex-col md:flex-row gap-2 p-2">
              <div className="relative flex-1">
                <MapPin size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  value={location}
                  onChange={e => setLocation(e.target.value)}
                  type="text"
                  placeholder="Ville, quartier..."
                  className="w-full pl-10 pr-4 py-3.5 bg-white rounded-xl text-sm text-gray-800 placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-[#0F4C81]/30"
                />
              </div>
              <div className="relative flex-1">
                <Home size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <select
                  value={type}
                  onChange={e => setType(e.target.value)}
                  className="w-full pl-10 pr-8 py-3.5 bg-white rounded-xl text-sm text-gray-800 outline-none appearance-none focus:ring-2 focus:ring-[#0F4C81]/30 cursor-pointer"
                >
                  <option value="">Type de bien</option>
                  <option value="villa">Villa</option>
                  <option value="appartement">Appartement</option>
                  <option value="terrain">Terrain</option>
                  <option value="bureau">Bureau</option>
                  <option value="local_commercial">Local commercial</option>
                  <option value="immeuble">Immeuble</option>
                </select>
                <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
              <div className="relative flex-1">
                <TrendingUp size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <select className="w-full pl-10 pr-8 py-3.5 bg-white rounded-xl text-sm text-gray-800 outline-none appearance-none focus:ring-2 focus:ring-[#0F4C81]/30 cursor-pointer">
                  <option value="">Budget</option>
                  <option>Moins de 50M FCFA</option>
                  <option>50M - 100M FCFA</option>
                  <option>100M - 200M FCFA</option>
                  <option>200M - 500M FCFA</option>
                  <option>Plus de 500M FCFA</option>
                </select>
                <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
              <button
                onClick={handleSearch}
                className="flex items-center gap-2 px-7 py-3.5 bg-[#C8102E] hover:bg-[#a50d24] text-white rounded-xl text-sm font-bold transition-all duration-200 shadow-lg hover:shadow-red-500/30 hover:scale-105 flex-shrink-0"
              >
                <Search size={17} /> Rechercher
              </button>
            </div>
          </div>
        </div>

        {/* Mini stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-14 max-w-3xl mx-auto animate-fadeInUp" style={{ animationDelay: '0.45s' }}>
          {stats.map(s => (
            <div key={s.label} className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-[#D4AF37]">{s.value}</div>
              <div className="text-blue-200 text-xs mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 animate-bounce opacity-60">
        <span className="text-white text-xs">Découvrir</span>
        <ChevronDown size={20} className="text-white" />
      </div>
    </section>
  );
}
