import { useState } from 'react';
import {
  MapPin, Phone, Mail, Clock, Send, CheckCircle,
  MessageCircle, Building2, ChevronRight,
} from 'lucide-react';

const offices = [
  {
    city: 'Dakar (Siège)',
    address: 'Almadies, Dakar, Sénégal',
    phone: '+221 77 430 83 44',
    email: 'contact@absimmo.sn',
    hours: 'Lun - Sam : 8h00 - 19h00',
  },
];

const services = [
  'Achat de bien immobilier',
  'Vente de bien immobilier',
  'Location résidentielle',
  'Location commerciale',
  'Gestion locative',
  'Expertise et estimation',
  'Conseil en investissement',
  'Financement immobilier',
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', service: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Hero */}
      <div className="bg-gradient-to-br from-[#0F4C81] to-[#0a3d6b] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <span className="text-[#D4AF37] text-sm font-semibold uppercase tracking-widest">Contact</span>
          <h1 className="text-3xl md:text-4xl font-bold mt-2 mb-3">Parlons de votre projet</h1>
          <p className="text-blue-200 text-lg max-w-xl mx-auto">
            Notre équipe d'experts est disponible pour répondre à toutes vos questions et vous accompagner.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl border border-gray-100 p-7 shadow-sm">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Envoyez-nous un message</h2>

              {submitted ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-5">
                    <CheckCircle size={32} className="text-emerald-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Message envoyé !</h3>
                  <p className="text-gray-500">Nous vous répondrons sous 2 heures ouvrées.</p>
                  <button
                    onClick={() => { setSubmitted(false); setForm({ name: '', email: '', phone: '', service: '', message: '' }); }}
                    className="mt-6 px-6 py-2.5 border border-[#0F4C81] text-[#0F4C81] rounded-xl text-sm font-medium hover:bg-blue-50 transition-colors"
                  >
                    Envoyer un autre message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1.5">Nom complet *</label>
                      <input required value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="Votre nom" className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#0F4C81]/20 focus:border-[#0F4C81] transition-all" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1.5">Téléphone *</label>
                      <input required value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} placeholder="+221 XX XXX XX XX" className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#0F4C81]/20 focus:border-[#0F4C81] transition-all" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1.5">Email</label>
                    <input value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} type="email" placeholder="votre@email.com" className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#0F4C81]/20 focus:border-[#0F4C81] transition-all" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1.5">Service souhaité</label>
                    <select value={form.service} onChange={e => setForm(f => ({ ...f, service: e.target.value }))} className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#0F4C81]/20 focus:border-[#0F4C81] transition-all cursor-pointer">
                      <option value="">Sélectionner un service</option>
                      {services.map(s => <option key={s}>{s}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1.5">Votre message *</label>
                    <textarea required value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} rows={5} placeholder="Décrivez votre projet immobilier en détail..." className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#0F4C81]/20 focus:border-[#0F4C81] transition-all resize-none" />
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2 py-3.5 bg-[#0F4C81] hover:bg-[#0a3d6b] disabled:opacity-60 text-white font-bold rounded-xl transition-all shadow-lg hover:scale-[1.02]"
                  >
                    {loading ? (
                      <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
                    ) : (
                      <><Send size={17} /> Envoyer le message</>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Sidebar info */}
          <div className="space-y-5">
            {/* Direct contact */}
            <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-4">Contact direct</h3>
              {offices.map(office => (
                <div key={office.city} className="space-y-3">
                  <div className="flex items-center gap-2 font-semibold text-gray-800 text-sm">
                    <Building2 size={15} className="text-[#0F4C81]" />
                    {office.city}
                  </div>
                  <div className="space-y-2.5 text-sm">
                    <div className="flex items-start gap-2.5 text-gray-500">
                      <MapPin size={14} className="text-[#D4AF37] flex-shrink-0 mt-0.5" />
                      {office.address}
                    </div>
                    <a href={`tel:${office.phone.replace(/\s/g, '')}`} className="flex items-center gap-2.5 text-gray-700 hover:text-[#0F4C81] transition-colors">
                      <Phone size={14} className="text-[#0F4C81] flex-shrink-0" />
                      {office.phone}
                    </a>
                    <a href={`mailto:${office.email}`} className="flex items-center gap-2.5 text-gray-700 hover:text-[#0F4C81] transition-colors">
                      <Mail size={14} className="text-[#0F4C81] flex-shrink-0" />
                      {office.email}
                    </a>
                    <div className="flex items-center gap-2.5 text-gray-500">
                      <Clock size={14} className="text-[#0F4C81] flex-shrink-0" />
                      {office.hours}
                    </div>
                  </div>
                </div>
              ))}

              <div className="mt-5 pt-5 border-t border-gray-100">
                <a
                  href="https://wa.me/221774308344"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 w-full py-3 bg-[#25D366] hover:bg-[#1da851] text-white rounded-xl font-semibold text-sm transition-colors justify-center"
                >
                  <MessageCircle size={18} /> Discuter sur WhatsApp
                </a>
              </div>
            </div>

            {/* Services */}
            <div className="bg-gradient-to-br from-[#0F4C81] to-[#0a3d6b] rounded-2xl p-5 text-white">
              <h3 className="font-bold mb-4 text-sm uppercase tracking-wider">Nos services</h3>
              <div className="space-y-2">
                {services.map(s => (
                  <div key={s} className="flex items-center gap-2 text-blue-200 text-sm">
                    <ChevronRight size={13} className="text-[#D4AF37]" />
                    {s}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
