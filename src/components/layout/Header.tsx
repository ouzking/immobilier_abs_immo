import { useState, useEffect } from 'react';
import {
  Building2, Phone, Mail, Menu, X, ShoppingCart, Heart, ChevronDown,
  Home, Search, User, LogIn,
} from 'lucide-react';
import { useApp } from '../../store/AppContext';

const navLinks = [
  { label: 'Accueil', page: 'home' },
  {
    label: 'Propriétés',
    page: 'catalog',
    sub: [
      { label: 'Vente', page: 'catalog', filter: 'vente' },
      { label: 'Location', page: 'catalog', filter: 'location' },
      { label: 'Villas', page: 'catalog', filter: 'villa' },
      { label: 'Appartements', page: 'catalog', filter: 'appartement' },
      { label: 'Terrains', page: 'catalog', filter: 'terrain' },
      { label: 'Bureaux & Commerces', page: 'catalog', filter: 'bureau' },
    ],
  },
  { label: 'Services', page: 'contact' },
  { label: 'À propos', page: 'about' },
  //{ label: 'Blog', page: 'blog' },
  { label: 'Contact', page: 'contact' },
];

export default function Header() {
  const { state, navigate, dispatch } = useApp();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isHome = state.currentPage === 'home';
  const isTransparent = isHome && !scrolled && !mobileOpen;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isTransparent
          ? 'bg-transparent'
          : 'bg-white shadow-lg border-b border-gray-100'
      }`}
    >
      {/* Top bar */}
      {!isTransparent && (
        <div className="bg-[#0F4C81] text-white py-2 px-4 hidden md:block">
          <div className="max-w-7xl mx-auto flex items-center justify-between text-xs">
            <div className="flex items-center gap-6">
              <a href="tel:+221774308344" className="flex items-center gap-1.5 hover:text-[#D4AF37] transition-colors">
                <Phone size={12} /> +221 77 430 83 44
              </a>
              <a href="mailto:contact@absimmo.sn" className="flex items-center gap-1.5 hover:text-[#D4AF37] transition-colors">
                <Mail size={12} /> elhadjisane1990@gmail.com
              </a>
            </div>
            <div className="flex items-center gap-4">
              <span>Lun - Sam : 8h00 - 19h00</span>
            </div>
          </div>
        </div>
      )}

      {/* Main nav */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          {/* Logo */}
<button
  onClick={() => navigate('home')}
  className="flex items-center gap-3 flex-shrink-0 group"
>
  <div className="w-14 h-14 flex items-center justify-center transition-all duration-300 group-hover:scale-105">
    <img
      src="/asset/absimmo.jpeg"
      alt="ABS IMMO"
      className="w-full h-full object-contain"
    />
  </div>

  <div className="flex flex-col leading-none">
    <span
      className={`font-bold text-lg tracking-tight transition-colors duration-300 ${
        isTransparent ? 'text-white' : 'text-[#0F4C81]'
      }`}
    >
      ABS IMMO
    </span>

    <span
      className={`text-[10px] font-semibold tracking-widest uppercase transition-colors duration-300 ${
        isTransparent ? 'text-[#D4AF37]' : 'text-[#C8102E]'
      }`}
    >
      & Services
    </span>
  </div>
</button>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map(link => (
              <div
                key={link.page + link.label}
                className="relative"
                onMouseEnter={() => link.sub && setActiveDropdown(link.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button
                  onClick={() => navigate(link.page)}
                  className={`flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isTransparent
                      ? 'text-white hover:text-[#D4AF37]'
                      : state.currentPage === link.page
                      ? 'text-[#0F4C81] bg-blue-50'
                      : 'text-gray-700 hover:text-[#0F4C81] hover:bg-gray-50'
                  }`}
                >
                  {link.label}
                  {link.sub && <ChevronDown size={14} className="opacity-70" />}
                </button>
                {link.sub && activeDropdown === link.label && (
                  <div className="absolute top-full left-0 mt-1 w-52 bg-white rounded-xl shadow-2xl border border-gray-100 py-2 animate-fadeIn">
                    {link.sub.map(sub => (
                      <button
                        key={sub.label}
                        onClick={() => { navigate(sub.page); setActiveDropdown(null); }}
                        className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-[#0F4C81] transition-colors"
                      >
                        {sub.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate('catalog')}
              className={`hidden md:flex p-2.5 rounded-lg transition-colors ${isTransparent ? 'text-white hover:text-[#D4AF37]' : 'text-gray-500 hover:text-[#0F4C81] hover:bg-gray-100'}`}
            >
              <Search size={20} />
            </button>
            <button
              onClick={() => navigate('favorites')}
              className={`hidden md:flex p-2.5 rounded-lg transition-colors relative ${isTransparent ? 'text-white hover:text-[#D4AF37]' : 'text-gray-500 hover:text-[#0F4C81] hover:bg-gray-100'}`}
            >
              <Heart size={20} />
              {state.favorites.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-[#C8102E] text-white text-[10px] rounded-full flex items-center justify-center font-bold">
                  {state.favorites.length}
                </span>
              )}
            </button>
            <button
              onClick={() => dispatch({ type: 'OPEN_CART' })}
              className={`hidden md:flex p-2.5 rounded-lg transition-colors relative ${isTransparent ? 'text-white hover:text-[#D4AF37]' : 'text-gray-500 hover:text-[#0F4C81] hover:bg-gray-100'}`}
            >
              <ShoppingCart size={20} />
              {state.cart.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-[#C8102E] text-white text-[10px] rounded-full flex items-center justify-center font-bold">
                  {state.cart.length}
                </span>
              )}
            </button>

            {state.user ? (
              <button
                onClick={() => navigate('dashboard')}
                className={`hidden md:flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${isTransparent ? 'text-white hover:text-[#D4AF37]' : 'text-[#0F4C81] hover:bg-blue-50'}`}
              >
                <User size={16} /> Mon espace
              </button>
            ) : (
              <button
                onClick={() => navigate('login')}
                className={`hidden md:flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                  isTransparent
                    ? 'border border-white/40 text-white hover:bg-white hover:text-[#0F4C81]'
                    : 'bg-[#0F4C81] text-white hover:bg-[#0a3d6b]'
                }`}
              >
                <LogIn size={15} /> Connexion
              </button>
            )}

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className={`lg:hidden p-2.5 rounded-lg transition-colors ${isTransparent ? 'text-white' : 'text-gray-700'}`}
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 shadow-xl animate-slideDown">
          <div className="max-w-7xl mx-auto px-4 py-4 space-y-1">
            {navLinks.map(link => (
              <button
                key={link.page + link.label}
                onClick={() => { navigate(link.page); setMobileOpen(false); }}
                className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-sm font-medium text-gray-700 hover:bg-blue-50 hover:text-[#0F4C81] transition-colors"
              >
                <Home size={16} className="text-[#0F4C81]" />
                {link.label}
              </button>
            ))}
            <div className="pt-3 border-t border-gray-100 flex gap-3">
              <button
                onClick={() => { navigate('login'); setMobileOpen(false); }}
                className="flex-1 py-3 bg-[#0F4C81] text-white rounded-lg text-sm font-semibold"
              >
                Connexion
              </button>
              <button
                onClick={() => { navigate('register'); setMobileOpen(false); }}
                className="flex-1 py-3 border border-[#0F4C81] text-[#0F4C81] rounded-lg text-sm font-semibold"
              >
                Inscription
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
