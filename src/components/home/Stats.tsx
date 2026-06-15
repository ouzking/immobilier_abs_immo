import { useRef, useEffect, useState } from 'react';

interface CountUpProps {
  end: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
}

function CountUp({ end, duration = 2000, suffix = '', prefix = '' }: CountUpProps) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && !started) {
          setStarted(true);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    const step = end / (duration / 16);
    let current = 0;
    const timer = setInterval(() => {
      current = Math.min(current + step, end);
      setCount(Math.floor(current));
      if (current >= end) clearInterval(timer);
    }, 16);
    return () => clearInterval(timer);
  }, [started, end, duration]);

  return (
    <span ref={ref}>
      {prefix}{count.toLocaleString('fr-FR')}{suffix}
    </span>
  );
}

const statsData = [
  { value: 500, suffix: '+', label: 'Propriétés en portefeuille', description: 'Villas, appartements, terrains et commerces' },
  { value: 1200, suffix: '+', label: 'Clients satisfaits', description: 'Particuliers, entreprises et investisseurs' },
  { value: 15, suffix: ' ans', label: 'D\'expérience', description: 'Dans l\'immobilier sénégalais et ouest-africain' },
  { value: 98, suffix: '%', label: 'Satisfaction client', description: 'Taux de recommandation mesuré annuellement' },
  { value: 8, suffix: '', label: 'Villes couvertes', description: 'Dakar, Thiès, Saly, Saint-Louis et plus' },
  { value: 50, suffix: 'Mds+', label: 'FCFA de transactions', description: 'Volume total géré depuis notre création' },
];

export default function Stats() {
  return (
    <section className="py-20 bg-gradient-to-br from-[#0F4C81] via-[#0a3d6b] to-[#0a1628] relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#C8102E]/10 rounded-full blur-3xl" />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMC4yIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-5" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14">
          <span className="text-[#D4AF37] text-sm font-semibold uppercase tracking-widest">Nos chiffres</span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mt-2">L'excellence en chiffres</h2>
          <p className="text-blue-200 mt-3 max-w-xl mx-auto">Des résultats concrets qui témoignent de notre engagement envers l'excellence immobilière.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 lg:gap-8">
          {statsData.map((stat, i) => (
            <div
              key={stat.label}
              className="relative bg-white/10 backdrop-blur-sm rounded-2xl p-6 lg:p-8 border border-white/10 hover:border-[#D4AF37]/40 hover:bg-white/15 transition-all duration-300 group"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="text-4xl lg:text-5xl font-bold text-white mb-2 group-hover:text-[#D4AF37] transition-colors duration-300">
                <CountUp end={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-[#D4AF37] font-semibold text-sm mb-1">{stat.label}</div>
              <div className="text-blue-300 text-xs leading-relaxed">{stat.description}</div>
              <div className="absolute bottom-0 left-6 right-6 h-0.5 bg-gradient-to-r from-transparent via-[#D4AF37]/60 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-full" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
