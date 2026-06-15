import { useState } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { mockTestimonials } from '../../data/mockData';

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  const prev = () => setActiveIndex(i => (i - 1 + mockTestimonials.length) % mockTestimonials.length);
  const next = () => setActiveIndex(i => (i + 1) % mockTestimonials.length);

  const visible = [
    mockTestimonials[(activeIndex) % mockTestimonials.length],
    mockTestimonials[(activeIndex + 1) % mockTestimonials.length],
    mockTestimonials[(activeIndex + 2) % mockTestimonials.length],
  ];

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <span className="text-[#C8102E] text-sm font-semibold uppercase tracking-widest">Témoignages</span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-3 mb-5">
            Ce que disent nos clients
          </h2>
          <p className="text-gray-500 text-lg">
            Des centaines de familles et d'investisseurs nous ont confié leurs projets. Voici leurs témoignages.
          </p>
        </div>

        {/* Desktop grid */}
        <div className="hidden md:grid grid-cols-3 gap-6 mb-10">
          {visible.map((t, i) => (
            <div
              key={t.id + i}
              className={`bg-white rounded-2xl p-7 shadow-sm border transition-all duration-500 ${
                i === 1 ? 'border-[#0F4C81]/20 shadow-lg shadow-[#0F4C81]/5 scale-105' : 'border-gray-100'
              }`}
            >
              <Quote size={32} className="text-[#0F4C81]/20 mb-4" />
              <p className="text-gray-600 text-sm leading-relaxed mb-6 italic">{t.content}</p>
              <div className="flex items-center gap-3 mt-auto">
                <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full object-cover border-2 border-[#D4AF37]/30" />
                <div>
                  <div className="font-semibold text-gray-900">{t.name}</div>
                  <div className="text-gray-400 text-xs">{t.role} · {t.city}</div>
                </div>
              </div>
              <div className="flex gap-1 mt-4">
                {[1, 2, 3, 4, 5].map(s => (
                  <Star key={s} size={13} className="text-[#D4AF37] fill-[#D4AF37]" />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Mobile single */}
        <div className="md:hidden mb-8">
          <div className="bg-white rounded-2xl p-7 shadow-lg border border-gray-100">
            <Quote size={32} className="text-[#0F4C81]/20 mb-4" />
            <p className="text-gray-600 text-sm leading-relaxed mb-6 italic">{mockTestimonials[activeIndex].content}</p>
            <div className="flex items-center gap-3">
              <img src={mockTestimonials[activeIndex].avatar} alt={mockTestimonials[activeIndex].name} className="w-12 h-12 rounded-full object-cover border-2 border-[#D4AF37]/30" />
              <div>
                <div className="font-semibold text-gray-900">{mockTestimonials[activeIndex].name}</div>
                <div className="text-gray-400 text-xs">{mockTestimonials[activeIndex].role}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={prev}
            className="w-11 h-11 rounded-full border border-gray-200 flex items-center justify-center hover:bg-[#0F4C81] hover:border-[#0F4C81] hover:text-white transition-all duration-200 text-gray-600"
          >
            <ChevronLeft size={18} />
          </button>
          <div className="flex gap-2">
            {mockTestimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className={`rounded-full transition-all duration-200 ${
                  i === activeIndex ? 'w-6 h-2.5 bg-[#0F4C81]' : 'w-2.5 h-2.5 bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
          <button
            onClick={next}
            className="w-11 h-11 rounded-full border border-gray-200 flex items-center justify-center hover:bg-[#0F4C81] hover:border-[#0F4C81] hover:text-white transition-all duration-200 text-gray-600"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}
