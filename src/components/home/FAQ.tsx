import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const faqs = [
  {
    q: 'Comment ABS Immo & Services peut m\'aider à trouver un bien ?',
    a: 'Notre équipe de conseillers experts analyse vos besoins, votre budget et vos préférences pour vous proposer une sélection personnalisée de biens correspondant exactement à vos critères. Nous organisons les visites, négocions les prix et vous accompagnons jusqu\'à la signature finale.',
  },
  {
    q: 'Quels sont vos honoraires d\'agence ?',
    a: 'Nos honoraires sont transparents et conformes aux pratiques du marché immobilier sénégalais. Pour une vente, les honoraires sont généralement de 3 à 5% du prix de vente. Pour une location, ils correspondent à un mois de loyer. Nous vous présentons toujours les coûts complets avant tout engagement.',
  },
  {
    q: 'Proposez-vous des services de gestion locative ?',
    a: 'Oui, nous offrons un service complet de gestion locative : recherche de locataires solvables, rédaction des baux, collecte des loyers, gestion des travaux et des sinistres, et reporting mensuel. Nous gérons tout pour que votre investissement soit serein et rentable.',
  },
  {
    q: 'Puis-je acheter un bien au Sénégal depuis l\'étranger ?',
    a: 'Absolument. Nous avons une expérience significative avec la diaspora sénégalaise. Nos services incluent des visites virtuelles, la gestion complète des démarches administratives à distance, et l\'accompagnement juridique. Vous signez uniquement lorsque vous êtes pleinement satisfait.',
  },
  {
    q: 'Quels types de financement proposez-vous ?',
    a: 'Nous avons des partenariats avec les principales banques du Sénégal (Ecobank, CBAO, BHS, SG, etc.) pour vous obtenir les meilleures conditions de crédit immobilier. Nous pouvons aussi vous orienter vers des solutions de financement islamique (Murabaha) ou des montages participatifs.',
  },
  {
    q: 'Comment se déroule une transaction immobilière avec vous ?',
    a: 'En 5 étapes : 1) Consultation initiale et définition de vos besoins. 2) Sélection et visite des biens. 3) Négociation et offre d\'achat. 4) Due diligence juridique et technique. 5) Signature et transfert de propriété. Chaque étape est documentée et sécurisée.',
  },
  {
    q: 'Couvrez-vous d\'autres villes que Dakar ?',
    a: 'Oui, nous opérons dans toutes les grandes villes du Sénégal : Thiès, Saly, Saint-Louis, Ziguinchor, Touba, Kaolack, et d\'autres. Nous avons également des partenaires dans plusieurs pays d\'Afrique de l\'Ouest pour les investisseurs souhaitant diversifier leurs actifs régionalement.',
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14">
          <span className="text-[#C8102E] text-sm font-semibold uppercase tracking-widest">FAQ</span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-3 mb-5">Questions fréquentes</h2>
          <p className="text-gray-500 text-lg">Tout ce que vous devez savoir avant de commencer votre projet immobilier.</p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className={`bg-white rounded-xl border transition-all duration-300 overflow-hidden ${
                open === i ? 'border-[#0F4C81]/30 shadow-md' : 'border-gray-100 hover:border-gray-200'
              }`}
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between p-6 text-left"
              >
                <span className={`font-semibold text-base pr-4 ${open === i ? 'text-[#0F4C81]' : 'text-gray-900'}`}>
                  {faq.q}
                </span>
                <div className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 ${
                  open === i ? 'bg-[#0F4C81] text-white' : 'bg-gray-100 text-gray-500'
                }`}>
                  {open === i ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </div>
              </button>
              {open === i && (
                <div className="px-6 pb-6">
                  <p className="text-gray-600 text-sm leading-relaxed border-t border-gray-100 pt-4">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
