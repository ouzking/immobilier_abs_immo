import { useState } from 'react';
import { Check, ChevronRight, CreditCard, Smartphone, Banknote, Globe } from 'lucide-react';
import { useApp } from '../store/AppContext';
import { formatPrice } from '../utils/format';

const steps = ['Informations', 'Adresse', 'Paiement', 'Confirmation'];

const paymentMethods = [
  { id: 'orange_money', label: 'Orange Money', icon: '🟠', color: 'bg-orange-50 border-orange-200' },
  { id: 'wave', label: 'Wave', icon: '🔵', color: 'bg-blue-50 border-blue-200' },
  { id: 'free_money', label: 'Free Money', icon: '🟡', color: 'bg-yellow-50 border-yellow-200' },
  { id: 'visa', label: 'Visa / Mastercard', icon: '💳', color: 'bg-gray-50 border-gray-200' },
  { id: 'paypal', label: 'PayPal', icon: '🅿️', color: 'bg-blue-50 border-blue-200' },
  { id: 'stripe', label: 'Stripe', icon: '⚡', color: 'bg-purple-50 border-purple-200' },
];

export default function CheckoutPage() {
  const { state, navigate } = useApp();
  const [step, setStep] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', phone: '',
    address: '', city: '', country: 'Sénégal',
  });

  const total = state.cart.reduce((sum, item) => sum + item.property.price, 0);

  const handleNext = () => {
    if (step < 3) setStep(s => s + 1);
  };

  if (step === 3) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl border border-gray-100 p-10 text-center max-w-md w-full shadow-lg">
          <div className="w-20 h-20 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Check size={40} className="text-emerald-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Demande confirmée !</h2>
          <p className="text-gray-500 mb-2">
            Votre demande a bien été transmise à notre équipe.
          </p>
          <p className="text-gray-500 text-sm mb-8">
            Un conseiller ABS Immo & Services vous contactera dans les <strong>2 heures</strong> pour finaliser votre dossier.
          </p>
          <div className="bg-[#0F4C81]/5 rounded-xl p-4 mb-6 text-left">
            <p className="text-sm font-semibold text-gray-700 mb-1">Référence dossier</p>
            <p className="text-[#0F4C81] font-bold">ABS-{Date.now().toString().slice(-8)}</p>
          </div>
          <button
            onClick={() => navigate('home')}
            className="w-full py-3.5 bg-[#0F4C81] text-white font-bold rounded-xl hover:bg-[#0a3d6b] transition-colors"
          >
            Retour à l'accueil
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Finaliser votre demande</h1>
        <p className="text-gray-500 mb-8">Complétez les informations pour soumettre votre dossier</p>

        {/* Steps */}
        <div className="flex items-center gap-0 mb-10">
          {steps.map((s, i) => (
            <div key={s} className="flex items-center flex-1 last:flex-none">
              <div className="flex flex-col items-center">
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                    i < step ? 'bg-emerald-500 text-white' :
                    i === step ? 'bg-[#0F4C81] text-white shadow-lg shadow-[#0F4C81]/30' :
                    'bg-gray-200 text-gray-400'
                  }`}
                >
                  {i < step ? <Check size={16} /> : i + 1}
                </div>
                <span className={`text-xs mt-1.5 font-medium whitespace-nowrap ${i === step ? 'text-[#0F4C81]' : 'text-gray-400'}`}>
                  {s}
                </span>
              </div>
              {i < steps.length - 1 && (
                <div className={`flex-1 h-0.5 mx-2 mb-4 transition-colors ${i < step ? 'bg-emerald-400' : 'bg-gray-200'}`} />
              )}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              {step === 0 && (
                <div className="space-y-4">
                  <h3 className="font-bold text-gray-900 text-lg mb-5">Vos informations personnelles</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1.5">Prénom *</label>
                      <input value={form.firstName} onChange={e => setForm(f => ({ ...f, firstName: e.target.value }))} placeholder="Votre prénom" className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#0F4C81]/20 focus:border-[#0F4C81] transition-all" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1.5">Nom *</label>
                      <input value={form.lastName} onChange={e => setForm(f => ({ ...f, lastName: e.target.value }))} placeholder="Votre nom" className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#0F4C81]/20 focus:border-[#0F4C81] transition-all" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1.5">Email *</label>
                    <input value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} type="email" placeholder="votre@email.com" className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#0F4C81]/20 focus:border-[#0F4C81] transition-all" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1.5">Téléphone *</label>
                    <input value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} placeholder="+221 XX XXX XX XX" className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#0F4C81]/20 focus:border-[#0F4C81] transition-all" />
                  </div>
                </div>
              )}
              {step === 1 && (
                <div className="space-y-4">
                  <h3 className="font-bold text-gray-900 text-lg mb-5">Votre adresse</h3>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1.5">Adresse complète *</label>
                    <input value={form.address} onChange={e => setForm(f => ({ ...f, address: e.target.value }))} placeholder="Numéro et nom de rue" className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#0F4C81]/20 focus:border-[#0F4C81] transition-all" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1.5">Ville *</label>
                      <input value={form.city} onChange={e => setForm(f => ({ ...f, city: e.target.value }))} placeholder="Dakar" className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#0F4C81]/20 focus:border-[#0F4C81] transition-all" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1.5">Pays</label>
                      <select value={form.country} onChange={e => setForm(f => ({ ...f, country: e.target.value }))} className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#0F4C81]/20 focus:border-[#0F4C81] transition-all cursor-pointer">
                        <option>Sénégal</option>
                        <option>France</option>
                        <option>Côte d'Ivoire</option>
                        <option>USA</option>
                        <option>Autre</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}
              {step === 2 && (
                <div className="space-y-4">
                  <h3 className="font-bold text-gray-900 text-lg mb-5">Mode de paiement</h3>
                  <p className="text-sm text-gray-500 mb-4">Sélectionnez votre moyen de paiement préféré (mode démonstration)</p>
                  <div className="grid grid-cols-2 gap-3">
                    {paymentMethods.map(method => (
                      <button
                        key={method.id}
                        onClick={() => setPaymentMethod(method.id)}
                        className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all text-left ${
                          paymentMethod === method.id
                            ? 'border-[#0F4C81] bg-blue-50'
                            : `${method.color} hover:border-[#0F4C81]/40`
                        }`}
                      >
                        <span className="text-2xl">{method.icon}</span>
                        <span className="text-sm font-medium text-gray-700">{method.label}</span>
                        {paymentMethod === method.id && (
                          <div className="ml-auto w-5 h-5 bg-[#0F4C81] rounded-full flex items-center justify-center flex-shrink-0">
                            <Check size={12} className="text-white" />
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                  <p className="text-xs text-gray-400 mt-4 p-3 bg-amber-50 border border-amber-100 rounded-xl">
                    ℹ️ Mode démonstration. Aucune transaction réelle ne sera effectuée. Notre équipe vous contactera pour finaliser le paiement.
                  </p>
                </div>
              )}
            </div>

            {/* Nav buttons */}
            <div className="flex items-center justify-between mt-5">
              {step > 0 ? (
                <button
                  onClick={() => setStep(s => s - 1)}
                  className="px-6 py-3 border border-gray-200 text-gray-600 rounded-xl font-medium hover:bg-gray-50 transition-colors"
                >
                  Retour
                </button>
              ) : (
                <button onClick={() => navigate('cart')} className="px-6 py-3 border border-gray-200 text-gray-600 rounded-xl font-medium hover:bg-gray-50 transition-colors">
                  ← Panier
                </button>
              )}
              <button
                onClick={handleNext}
                className="flex items-center gap-2 px-7 py-3 bg-[#0F4C81] hover:bg-[#0a3d6b] text-white font-bold rounded-xl transition-all shadow-lg"
              >
                {step === 2 ? 'Confirmer la demande' : 'Continuer'}
                <ChevronRight size={17} />
              </button>
            </div>
          </div>

          {/* Order summary */}
          <div>
            <div className="bg-white rounded-2xl border border-gray-100 p-5 sticky top-24">
              <h3 className="font-bold text-gray-900 mb-4">Récapitulatif</h3>
              <div className="space-y-3 mb-4">
                {state.cart.map(item => (
                  <div key={item.property.id} className="flex items-center gap-3">
                    <img src={item.property.images[0]} alt="" className="w-12 h-12 rounded-lg object-cover" />
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-medium text-gray-800 line-clamp-1">{item.property.title}</div>
                      <div className="text-xs text-[#0F4C81] font-bold">{formatPrice(item.property.price, item.property.priceUnit)}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="pt-4 border-t border-gray-100">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-gray-700">Total</span>
                  <span className="text-lg font-bold text-[#0F4C81]">{formatPrice(total, 'FCFA')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
