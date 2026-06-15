import { Shield, Award, Users, Clock, TrendingUp, Headphones, Star, CheckCircle } from 'lucide-react';

const reasons = [
  {
    icon: Shield,
    title: 'Sécurité & Transparence',
    description: 'Chaque transaction est sécurisée et documentée. Nous garantissons la légalité et la traçabilité complète de vos opérations immobilières.',
    color: 'text-[#0F4C81]',
    bg: 'bg-blue-50',
  },
  {
    icon: Award,
    title: 'Expertise Reconnue',
    description: '15 ans d\'expérience dans l\'immobilier sénégalais. Notre équipe certifiée maîtrise tous les aspects juridiques, fiscaux et commerciaux.',
    color: 'text-[#C8102E]',
    bg: 'bg-red-50',
  },
  {
    icon: Users,
    title: 'Réseau International',
    description: 'Un réseau étendu d\'investisseurs, promoteurs et partenaires financiers en Afrique, Europe et Amérique du Nord pour maximiser vos opportunités.',
    color: 'text-[#D4AF37]',
    bg: 'bg-amber-50',
  },
  {
    icon: Clock,
    title: 'Réactivité 24/7',
    description: 'Notre équipe est disponible 7j/7 pour répondre à vos questions. Nous respectons rigoureusement vos délais et nos engagements.',
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
  },
  {
    icon: TrendingUp,
    title: 'Optimisation de Valeur',
    description: 'Nous maximisons la valeur de votre bien grâce à notre expertise du marché local et nos outils d\'analyse immobilière de pointe.',
    color: 'text-violet-600',
    bg: 'bg-violet-50',
  },
  {
    icon: Headphones,
    title: 'Accompagnement Total',
    description: 'De la recherche à la signature, nous vous guidons à chaque étape. Financement, notaire, déménagement : tout est géré pour vous.',
    color: 'text-[#0F4C81]',
    bg: 'bg-blue-50',
  },
];

const certifications = [
  'Membre de la Chambre Nationale des Agents Immobiliers',
  'Partenaire des banques leaders du Sénégal',
  'Certifié ISO 9001 Qualité de Service',
  'Agréé par le Ministère de l\'Urbanisme',
];

export default function WhyChooseUs() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="max-w-2xl mx-auto text-center mb-16">
          <span className="text-[#C8102E] text-sm font-semibold uppercase tracking-widest">Pourquoi nous ?</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mt-3 mb-5">
            L'excellence à votre service
          </h2>
          <p className="text-gray-500 text-lg leading-relaxed">
            ABS Immo & Services incarne les plus hauts standards de l'immobilier. Découvrez pourquoi 1 200+ clients nous font confiance.
          </p>
        </div>

        {/* Reasons grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {reasons.map((reason, i) => (
            <div
              key={reason.title}
              className="group p-7 rounded-2xl border border-gray-100 hover:border-[#0F4C81]/20 hover:shadow-xl hover:shadow-[#0F4C81]/5 transition-all duration-300 hover:-translate-y-1"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className={`w-12 h-12 ${reason.bg} rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                <reason.icon size={22} className={reason.color} />
              </div>
              <h3 className="font-bold text-gray-900 text-lg mb-2">{reason.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{reason.description}</p>
              <div className="mt-4 flex items-center gap-1.5">
                {[1, 2, 3, 4, 5].map(s => (
                  <Star key={s} size={12} className="text-[#D4AF37] fill-[#D4AF37]" />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Certifications */}
        <div className="bg-gradient-to-r from-[#0F4C81]/5 to-[#C8102E]/5 rounded-2xl p-8 border border-gray-100">
          <div className="flex flex-col lg:flex-row items-center gap-8">
            <div className="lg:w-1/3 text-center lg:text-left">
              <div className="text-5xl font-bold text-[#0F4C81] mb-1">A+</div>
              <div className="text-[#D4AF37] font-semibold">Agence Certifiée Premium</div>
              <p className="text-gray-500 text-sm mt-2">La note maximale attribuée par nos organismes de certification</p>
            </div>
            <div className="lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {certifications.map(cert => (
                <div key={cert} className="flex items-start gap-3">
                  <CheckCircle size={18} className="text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 text-sm">{cert}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
