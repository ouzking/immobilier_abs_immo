import { useState } from 'react';
import {
  Building2,
  Eye,
  EyeOff,
  Mail,
  Lock,
  ArrowRight,
  ArrowLeft,
} from 'lucide-react';
import { useApp } from '../store/AppContext';

export default function LoginPage() {
  const { navigate, dispatch } = useApp();

  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);

    setTimeout(() => {
      dispatch({
        type: 'SET_USER',
        payload: {
          id: 'u1',
          firstName: 'Amadou',
          lastName: 'Diallo',
          email: form.email,
          phone: '+221 77 000 00 00',
          role: 'client',
          createdAt: new Date().toISOString(),
        },
      });

      navigate('dashboard');
    }, 1200);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side */}
      <div className="flex-1 flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-md">
          {/* Retour accueil */}
          <button
            onClick={() => navigate('home')}
            className="flex items-center gap-2 text-gray-600 hover:text-[#0F4C81] mb-6 transition-colors"
          >
            <ArrowLeft size={18} />
            <span>Retour à l'accueil</span>
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

          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Connexion
          </h1>

          <p className="text-gray-500 mb-8">
            Accédez à votre espace personnel sécurisé
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
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
                  value={form.email}
                  onChange={(e) =>
                    setForm((f) => ({
                      ...f,
                      email: e.target.value,
                    }))
                  }
                  placeholder="votre@email.com"
                  className="w-full pl-10 pr-4 py-3.5 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#0F4C81]/20 focus:border-[#0F4C81] transition-all"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-sm font-medium text-gray-700">
                  Mot de passe
                </label>

                <button
                  type="button"
                  onClick={() => navigate('forgot-password')}
                  className="text-[#0F4C81] text-xs font-medium hover:underline"
                >
                  Mot de passe oublié ?
                </button>
              </div>

              <div className="relative">
                <Lock
                  size={16}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type={showPwd ? 'text' : 'password'}
                  required
                  value={form.password}
                  onChange={(e) =>
                    setForm((f) => ({
                      ...f,
                      password: e.target.value,
                    }))
                  }
                  placeholder="••••••••"
                  className="w-full pl-10 pr-11 py-3.5 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#0F4C81]/20 focus:border-[#0F4C81] transition-all"
                />

                <button
                  type="button"
                  onClick={() => setShowPwd(!showPwd)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPwd ? (
                    <EyeOff size={16} />
                  ) : (
                    <Eye size={16} />
                  )}
                </button>
              </div>
            </div>

            {/* Submit */}
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
                  <ArrowRight size={17} />
                  Se connecter
                </>
              )}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            Pas encore de compte ?{' '}
            <button
              onClick={() => navigate('register')}
              className="text-[#0F4C81] font-semibold hover:underline"
            >
              Créer un compte
            </button>
          </p>
        </div>
      </div>

      {/* Right Side */}
      <div className="hidden lg:block w-1/2 relative overflow-hidden">
        <img
          src="https://images.pexels.com/photos/1732414/pexels-photo-1732414.jpeg?auto=compress&cs=tinysrgb&w=1200"
          alt="Luxury interior"
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628]/80 via-[#0F4C81]/30 to-transparent" />

        <div className="absolute bottom-10 left-10 right-10">
          <blockquote className="text-white text-xl font-light leading-relaxed italic mb-4">
            "Votre partenaire de confiance pour tous vos projets immobiliers au
            Sénégal."
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
