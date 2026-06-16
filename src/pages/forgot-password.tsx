import { useState } from 'react';
import {
  Building2,
  ArrowLeft,
  Mail,
  Send,
  CheckCircle,
} from 'lucide-react';
import { useApp } from '../store/AppContext';

export default function ForgotPasswordPage() {
  const { navigate } = useApp();

  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);

    // Simulation d'envoi
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex">
      {/* Partie gauche */}
      <div className="flex-1 flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-md">
          {/* Retour */}
          <button
            onClick={() => navigate('login')}
            className="flex items-center gap-2 text-gray-600 hover:text-[#0F4C81] mb-6 transition-colors"
          >
            <ArrowLeft size={18} />
            <span>Retour à la connexion</span>
          </button>

          {/* Logo */}
          <button
            onClick={() => navigate('home')}
            className="flex items-center gap-3 mb-10 group"
          >
            <div className="w-10 h-10 bg-[#0F4C81] rounded-xl flex items-center justify-center group-hover:bg-[#0a3d6b] transition-colors">
              <Building2 size={20} className="text-white" />
            </div>

            <span className="font-bold text-[#0F4C81] text-lg">
              ABS IMMO & SERVICES
            </span>
          </button>

          {!success ? (
            <>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Mot de passe oublié
              </h1>

              <p className="text-gray-500 mb-8">
                Saisissez votre adresse email et nous vous enverrons un lien
                pour réinitialiser votre mot de passe.
              </p>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Adresse email
                  </label>

                  <div className="relative">
                    <Mail
                      size={16}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                    />

                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="votre@email.com"
                      className="w-full pl-10 pr-4 py-3.5 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#0F4C81]/20 focus:border-[#0F4C81] transition-all"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 py-3.5 bg-[#0F4C81] hover:bg-[#0a3d6b] disabled:opacity-60 text-white font-bold rounded-xl transition-all shadow-lg shadow-[#0F4C81]/20 hover:scale-[1.02]"
                >
                  {loading ? (
                    <svg
                      className="animate-spin h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                      />
                    </svg>
                  ) : (
                    <>
                      <Send size={17} />
                      Envoyer le lien
                    </>
                  )}
                </button>
              </form>
            </>
          ) : (
            <div className="bg-white border border-green-100 rounded-3xl p-8 shadow-lg">
              <div className="flex justify-center mb-4">
                <CheckCircle
                  size={60}
                  className="text-green-500"
                />
              </div>

              <h2 className="text-2xl font-bold text-center text-gray-900 mb-3">
                Email envoyé
              </h2>

              <p className="text-center text-gray-600 mb-6">
                Si un compte existe avec l'adresse
                <span className="font-semibold"> {email}</span>,
                vous recevrez un lien de réinitialisation.
              </p>

              <button
                onClick={() => navigate('login')}
                className="w-full py-3 bg-[#0F4C81] hover:bg-[#0a3d6b] text-white font-semibold rounded-xl transition-colors"
              >
                Retour à la connexion
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Partie droite */}
      <div className="hidden lg:block w-1/2 relative overflow-hidden">
        <img
          src="https://images.pexels.com/photos/1732414/pexels-photo-1732414.jpeg?auto=compress&cs=tinysrgb&w=1200"
          alt="Luxury Interior"
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628]/80 via-[#0F4C81]/30 to-transparent" />

        <div className="absolute bottom-10 left-10 right-10">
          <blockquote className="text-white text-xl font-light leading-relaxed italic mb-4">
            "Votre partenaire de confiance pour tous vos projets immobiliers au Sénégal."
          </blockquote>

          <div className="flex items-center gap-3">
            <img
              src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=60"
              alt="Elhadji Sané"
              className="w-10 h-10 rounded-full object-cover border-2 border-white/50"
            />

            <div>
              <div className="text-white font-semibold text-sm">
                Elhadji Sané
              </div>

              <div className="text-blue-200 text-xs">
                Fondateur, ABS Immo & Services
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}