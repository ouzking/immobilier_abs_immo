import { Phone, ArrowRight } from 'lucide-react';
import { useApp } from '../../store/AppContext';

export default function CTA() {
  const { navigate } = useApp();

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="https://images.pexels.com/photos/2404843/pexels-photo-2404843.jpeg?auto=compress&cs=tinysrgb&w=1920"
          alt="Luxury property"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a1628]/95 via-[#0F4C81]/80 to-[#0a1628]/70" />
      </div>
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <span className="inline-block text-[#D4AF37] text-sm font-semibold uppercase tracking-widest mb-4">
          Commençons ensemble
        </span>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
          Prêt à concrétiser votre<br />
          <span className="text-[#D4AF37]">projet immobilier ?</span>
        </h2>
        <p className="text-blue-100 text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
          Nos conseillers experts sont disponibles pour vous accompagner à chaque étape.
          Consultation gratuite et sans engagement.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => navigate('contact')}
            className="flex items-center gap-2 px-8 py-4 bg-[#D4AF37] hover:bg-[#b8962d] text-white font-bold rounded-xl transition-all duration-200 hover:scale-105 shadow-lg shadow-[#D4AF37]/30"
          >
            Consultation gratuite <ArrowRight size={18} />
          </button>
          <a
            href="tel:+221774308344"
            className="flex items-center gap-2 px-8 py-4 border-2 border-white/40 text-white font-semibold rounded-xl hover:bg-white hover:text-[#0F4C81] transition-all duration-200 backdrop-blur-sm"
          >
            <Phone size={18} /> +221 77 430 83 44
          </a>
        </div>
        <p className="text-blue-200 text-sm mt-8">
          Disponible du lundi au samedi, de 8h à 19h · Réponse garantie sous 2 heures
        </p>
      </div>
    </section>
  );
}
