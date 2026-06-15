import { useState } from 'react';
import { Building2, User, Mail, Lock, Phone, Eye, EyeOff, CheckCircle } from 'lucide-react';
import { useApp } from '../store/AppContext';

export default function RegisterPage() {
  const { navigate, dispatch } = useApp();
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', phone: '', password: '', confirm: '' });
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [agreed, setAgreed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.password !== form.confirm) return;
    setLoading(true);
    setTimeout(() => {
      dispatch({
        type: 'SET_USER',
        payload: {
          id: 'u2',
          firstName: form.firstName,
          lastName: form.lastName,
          email: form.email,
          phone: form.phone,
          role: 'client',
          createdAt: new Date().toISOString(),
        },
      });
      navigate('dashboard');
    }, 1200);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left: image */}
      <div className="hidden lg:block w-1/2 relative overflow-hidden">
        <img
          src="https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=1200"
          alt="Luxury property"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a1628]/80 to-transparent" />
        <div className="absolute top-1/2 -translate-y-1/2 left-10 right-10">
          <h2 className="text-white text-3xl font-bold mb-4 leading-tight">
            Rejoignez la communauté<br />
            <span className="text-[#D4AF37]">ABS Immo Premium</span>
          </h2>
          <div className="space-y-3">
            {[
              'Accès exclusif aux nouvelles offres en avant-première',
              'Alertes personnalisées selon vos critères',
              'Suivi de vos dossiers en temps réel',
              'Conseiller dédié disponible 24h/7j',
            ].map(b => (
              <div key={b} className="flex items-start gap-2.5 text-blue-100 text-sm">
                <CheckCircle size={16} className="text-[#D4AF37] flex-shrink-0 mt-0.5" />
                {b}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right: form */}
      <div className="flex-1 flex items-center justify-center px-6 py-16 bg-gray-50">
        <div className="w-full max-w-md bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
          <button onClick={() => navigate('home')} className="flex items-center gap-3 mb-8 group">
            <div className="w-9 h-9 bg-[#0F4C81] rounded-xl flex items-center justify-center">
              <Building2 size={18} className="text-white" />
            </div>
            <span className="font-bold text-[#0F4C81]">ABS IMMO & SERVICES</span>
          </button>

          <h1 className="text-2xl font-bold text-gray-900 mb-1">Créer un compte</h1>
          <p className="text-gray-500 text-sm mb-6">Rejoignez des milliers de clients satisfaits</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              {[
                { field: 'firstName', label: 'Prénom', icon: User, placeholder: 'Prénom' },
                { field: 'lastName', label: 'Nom', icon: User, placeholder: 'Nom' },
              ].map(({ field, label, icon: Icon, placeholder }) => (
                <div key={field}>
                  <label className="block text-xs font-medium text-gray-600 mb-1.5">{label} *</label>
                  <div className="relative">
                    <Icon size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      required
                      value={form[field as keyof typeof form]}
                      onChange={e => setForm(f => ({ ...f, [field]: e.target.value }))}
                      placeholder={placeholder}
                      className="w-full pl-9 pr-3 py-3 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#0F4C81]/20 focus:border-[#0F4C81] transition-all"
                    />
                  </div>
                </div>
              ))}
            </div>

            {[
              { field: 'email', type: 'email', label: 'Email', icon: Mail, placeholder: 'votre@email.com' },
              { field: 'phone', type: 'tel', label: 'Téléphone', icon: Phone, placeholder: '+221 XX XXX XX XX' },
            ].map(({ field, type, label, icon: Icon, placeholder }) => (
              <div key={field}>
                <label className="block text-xs font-medium text-gray-600 mb-1.5">{label} *</label>
                <div className="relative">
                  <Icon size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type={type}
                    required
                    value={form[field as keyof typeof form]}
                    onChange={e => setForm(f => ({ ...f, [field]: e.target.value }))}
                    placeholder={placeholder}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#0F4C81]/20 focus:border-[#0F4C81] transition-all"
                  />
                </div>
              </div>
            ))}

            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1.5">Mot de passe *</label>
              <div className="relative">
                <Lock size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type={showPwd ? 'text' : 'password'}
                  required
                  value={form.password}
                  onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                  placeholder="Minimum 8 caractères"
                  className="w-full pl-10 pr-10 py-3 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#0F4C81]/20 focus:border-[#0F4C81] transition-all"
                />
                <button type="button" onClick={() => setShowPwd(!showPwd)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400">
                  {showPwd ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1.5">Confirmer le mot de passe *</label>
              <div className="relative">
                <Lock size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="password"
                  required
                  value={form.confirm}
                  onChange={e => setForm(f => ({ ...f, confirm: e.target.value }))}
                  placeholder="Répéter le mot de passe"
                  className={`w-full pl-10 pr-4 py-3 border rounded-xl text-sm outline-none focus:ring-2 transition-all ${
                    form.confirm && form.password !== form.confirm ? 'border-red-400 focus:ring-red-200' : 'border-gray-200 focus:ring-[#0F4C81]/20 focus:border-[#0F4C81]'
                  }`}
                />
              </div>
            </div>

            <label className="flex items-start gap-2.5 cursor-pointer">
              <div
                onClick={() => setAgreed(!agreed)}
                className={`w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-all ${agreed ? 'bg-[#0F4C81] border-[#0F4C81]' : 'border-gray-300'}`}
              >
                {agreed && <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>}
              </div>
              <span className="text-xs text-gray-500 leading-relaxed">
                J'accepte les <button type="button" className="text-[#0F4C81] font-medium underline">conditions d'utilisation</button> et la <button type="button" className="text-[#0F4C81] font-medium underline">politique de confidentialité</button> d'ABS Immo & Services.
              </span>
            </label>

            <button
              type="submit"
              disabled={loading || !agreed}
              className="w-full py-3.5 bg-[#0F4C81] hover:bg-[#0a3d6b] disabled:opacity-60 text-white font-bold rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 hover:scale-[1.02]"
            >
              {loading ? <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg> : 'Créer mon compte gratuitement'}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-5">
            Déjà membre ?{' '}
            <button onClick={() => navigate('login')} className="text-[#0F4C81] font-semibold hover:underline">
              Se connecter
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
