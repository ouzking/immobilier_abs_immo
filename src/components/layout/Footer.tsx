import { Building2, Phone, Mail, MapPin } from 'lucide-react';

import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube
} from 'react-icons/fa';
import { useApp } from '../../store/AppContext';

const footerLinks = {
  services: [
    { label: 'Vente immobilière', page: 'catalog' },
    { label: 'Location', page: 'catalog' },
    { label: 'Gestion locative', page: 'contact' },
    { label: 'Expertise & Estimation', page: 'contact' },
    { label: 'Conseil en investissement', page: 'contact' },
  ],
  types: [
    { label: 'Villas & Maisons', page: 'catalog' },
    { label: 'Appartements', page: 'catalog' },
    { label: 'Terrains', page: 'catalog' },
    { label: 'Bureaux', page: 'catalog' },
    { label: 'Locaux commerciaux', page: 'catalog' },
    { label: 'Immeubles', page: 'catalog' },
  ],
  company: [
    { label: 'À propos', page: 'about' },
    { label: 'Notre équipe', page: 'about' },
    { label: 'Témoignages', page: 'home' },
    { label: 'Blog immobilier', page: 'blog' },
    { label: 'Contact', page: 'contact' },
    { label: 'Espace client', page: 'dashboard' },
  ],
};

const cities = ['Dakar', 'Thiès', 'Saly', 'Saint-Louis', 'Ziguinchor', 'Touba'];

export default function Footer() {
  const { navigate } = useApp();

  return (
    <footer className="bg-[#0a1628] text-white">
      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-16 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <button onClick={() => navigate('home')} className="flex items-center gap-3 mb-6 group">
              <div className="w-12 h-12 bg-[#0F4C81] rounded-xl flex items-center justify-center group-hover:bg-[#D4AF37] transition-colors duration-300">
                <Building2 size={26} className="text-white" />
              </div>
              <div>
                <div className="font-bold text-xl tracking-tight">ABS IMMO & SERVICES</div>
                <div className="text-[#D4AF37] text-xs font-semibold tracking-widest uppercase">Excellence Immobilière</div>
              </div>
            </button>
            <p className="text-gray-400 text-sm leading-relaxed mb-6 max-w-xs">
              Votre partenaire de confiance pour l'achat, la vente, la location et la gestion de biens immobiliers au Sénégal et en Afrique de l'Ouest.
            </p>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-3 text-gray-400">
                <Phone size={15} className="text-[#D4AF37] flex-shrink-0" />
                <a href="tel:+221774308344" className="hover:text-white transition-colors">+221 77 430 83 44</a>
              </div>
              <div className="flex items-center gap-3 text-gray-400">
                <Mail size={15} className="text-[#D4AF37] flex-shrink-0" />
                <a href="mailto:contact@absimmo.sn" className="hover:text-white transition-colors">contact@absimmo.sn</a>
              </div>
              <div className="flex items-start gap-3 text-gray-400">
                <MapPin size={15} className="text-[#D4AF37] flex-shrink-0 mt-0.5" />
                <span>Dakar, Sénégal</span>
              </div>
            </div>
            {/* Social */}
            <div className="flex items-center gap-3 mt-6">
  {[
    { icon: FaFacebookF, label: 'Facebook' },
    { icon: FaInstagram, label: 'Instagram' },
    { icon: FaLinkedinIn, label: 'LinkedIn' },
    { icon: FaTwitter, label: 'Twitter' },
    { icon: FaYoutube, label: 'YouTube' },
  ].map(({ icon: Icon, label }) => (
    <a
      key={label}
      href="#"
      aria-label={label}
      className="w-9 h-9 bg-white/10 rounded-lg flex items-center justify-center hover:bg-[#0F4C81] hover:text-white transition-all duration-200"
    >
      <Icon size={16} />
    </a>
  ))}
</div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-white mb-5 text-sm uppercase tracking-wider">Nos Services</h3>
            <ul className="space-y-2.5">
              {footerLinks.services.map(link => (
                <li key={link.label}>
                  <button
                    onClick={() => navigate(link.page)}
                    className="text-gray-400 hover:text-[#D4AF37] text-sm transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Property types */}
          <div>
            <h3 className="font-semibold text-white mb-5 text-sm uppercase tracking-wider">Nos Biens</h3>
            <ul className="space-y-2.5">
              {footerLinks.types.map(link => (
                <li key={link.label}>
                  <button
                    onClick={() => navigate(link.page)}
                    className="text-gray-400 hover:text-[#D4AF37] text-sm transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-white mb-5 text-sm uppercase tracking-wider">Entreprise</h3>
            <ul className="space-y-2.5">
              {footerLinks.company.map(link => (
                <li key={link.label}>
                  <button
                    onClick={() => navigate(link.page)}
                    className="text-gray-400 hover:text-[#D4AF37] text-sm transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>

            {/* Cities */}
            <div className="mt-7">
              <h4 className="text-xs uppercase tracking-wider text-gray-500 mb-3">Zones couvertes</h4>
              <div className="flex flex-wrap gap-2">
                {cities.map(city => (
                  <span key={city} className="px-2.5 py-1 bg-white/10 rounded-md text-xs text-gray-400 hover:bg-[#0F4C81]/40 hover:text-white cursor-pointer transition-colors">
                    {city}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter */}
        <div className="mt-12 p-6 bg-white/5 rounded-2xl border border-white/10">
          <div className="flex flex-col md:flex-row items-center gap-4 justify-between">
            <div>
              <h4 className="font-semibold text-white mb-1">Restez informé des nouvelles opportunités</h4>
              <p className="text-gray-400 text-sm">Recevez les meilleures offres immobilières en exclusivité.</p>
            </div>
            <div className="flex gap-2 w-full md:w-auto">
              <input
                type="email"
                placeholder="votre@email.com"
                className="flex-1 md:w-64 bg-white/10 border border-white/20 rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-gray-500 outline-none focus:border-[#D4AF37] transition-colors"
              />
              <button className="px-5 py-2.5 bg-[#D4AF37] hover:bg-[#b8962d] text-white rounded-lg text-sm font-semibold transition-colors flex-shrink-0">
                S'abonner
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-gray-500">
          <span>© {new Date().getFullYear()} ABS Immo & Services. Tous droits réservés. Fondateur : Elhadji Sané.</span>
          <div className="flex items-center gap-6">
            <button className="hover:text-gray-300 transition-colors">Mentions légales</button>
            <button className="hover:text-gray-300 transition-colors">Politique de confidentialité</button>
            <button className="hover:text-gray-300 transition-colors">CGU</button>
          </div>
        </div>
      </div>
    </footer>
  );
}
