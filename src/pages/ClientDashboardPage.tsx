import { useState } from 'react';
import {
  LayoutDashboard, Heart, ShoppingBag, Calendar, Settings, LogOut,
  User, Bell, MapPin, ChevronRight, TrendingUp,
} from 'lucide-react';
import { useApp } from '../store/AppContext';
import { mockProperties } from '../data/mockData';
import PropertyCard from '../components/property/PropertyCard';
import { formatPrice } from '../utils/format';

const tabs = [
  { id: 'overview', label: 'Vue d\'ensemble', icon: LayoutDashboard },
  { id: 'favorites', label: 'Mes favoris', icon: Heart },
  { id: 'orders', label: 'Mes demandes', icon: ShoppingBag },
  { id: 'reservations', label: 'Réservations', icon: Calendar },
  { id: 'settings', label: 'Paramètres', icon: Settings },
];

const mockReservations = [
  { id: 'r1', property: mockProperties[0], date: '2024-04-15', time: '10:00', status: 'confirmé' },
  { id: 'r2', property: mockProperties[3], date: '2024-04-18', time: '14:30', status: 'en_attente' },
];

export default function ClientDashboardPage() {
  const { state, navigate, dispatch } = useApp();
  const [activeTab, setActiveTab] = useState('overview');

  const user = state.user;
  const favoriteProperties = mockProperties.filter(p => state.favorites.includes(p.id));

  const handleLogout = () => {
    dispatch({ type: 'SET_USER', payload: null });
    navigate('home');
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl border border-gray-100 p-5 mb-4">
              <div className="text-center pb-5 border-b border-gray-100">
                <div className="w-16 h-16 bg-gradient-to-br from-[#0F4C81] to-[#C8102E] rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <User size={28} className="text-white" />
                </div>
                <div className="font-bold text-gray-900">{user?.firstName} {user?.lastName}</div>
                <div className="text-gray-400 text-xs mt-0.5">{user?.email}</div>
                <span className="inline-block mt-2 px-3 py-1 bg-[#0F4C81]/10 text-[#0F4C81] text-xs font-semibold rounded-full">
                  Client Premium
                </span>
              </div>
              <div className="pt-4 space-y-0.5">
                {tabs.map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                      activeTab === tab.id ? 'bg-[#0F4C81] text-white' : 'text-gray-600 hover:bg-gray-50 hover:text-[#0F4C81]'
                    }`}
                  >
                    <tab.icon size={16} />
                    {tab.label}
                  </button>
                ))}
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 transition-all mt-3"
                >
                  <LogOut size={16} /> Déconnexion
                </button>
              </div>
            </div>

            {/* Quick stats */}
            <div className="bg-gradient-to-br from-[#0F4C81] to-[#0a3d6b] rounded-2xl p-5 text-white">
              <div className="text-xs font-semibold uppercase tracking-wider mb-4 text-blue-200">Statistiques</div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-blue-200 text-sm">Favoris</span>
                  <span className="font-bold">{state.favorites.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-blue-200 text-sm">Panier</span>
                  <span className="font-bold">{state.cart.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-blue-200 text-sm">Réservations</span>
                  <span className="font-bold">{mockReservations.length}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main */}
          <div className="lg:col-span-3 space-y-5">
            {activeTab === 'overview' && (
              <>
                <div className="bg-white rounded-2xl border border-gray-100 p-6">
                  <div className="flex items-center justify-between mb-5">
                    <div>
                      <h2 className="text-xl font-bold text-gray-900">Bonjour, {user?.firstName} 👋</h2>
                      <p className="text-gray-500 text-sm">Voici un aperçu de votre activité</p>
                    </div>
                    <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center">
                      <Bell size={18} className="text-amber-500" />
                    </div>
                  </div>

                  {/* Quick action cards */}
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    {[
                      { icon: Heart, label: 'Favoris', value: state.favorites.length, color: 'text-red-500 bg-red-50', tab: 'favorites' },
                      { icon: ShoppingBag, label: 'Demandes', value: state.cart.length, color: 'text-[#0F4C81] bg-blue-50', tab: 'orders' },
                      { icon: Calendar, label: 'Visites', value: mockReservations.length, color: 'text-emerald-600 bg-emerald-50', tab: 'reservations' },
                    ].map(c => (
                      <button
                        key={c.tab}
                        onClick={() => setActiveTab(c.tab)}
                        className="bg-gray-50 hover:bg-gray-100 rounded-xl p-4 text-center transition-colors group"
                      >
                        <div className={`w-10 h-10 ${c.color} rounded-xl flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform`}>
                          <c.icon size={18} />
                        </div>
                        <div className="text-2xl font-bold text-gray-900">{c.value}</div>
                        <div className="text-xs text-gray-500">{c.label}</div>
                      </button>
                    ))}
                  </div>

                  {/* Recommendations */}
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <TrendingUp size={16} className="text-[#0F4C81]" />
                      <span className="font-semibold text-gray-800 text-sm">Recommandés pour vous</span>
                    </div>
                    <div className="space-y-3">
                      {mockProperties.slice(0, 3).map(p => (
                        <div
                          key={p.id}
                          className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl cursor-pointer hover:bg-blue-50 transition-colors group"
                          onClick={() => navigate('property', p.id)}
                        >
                          <img src={p.images[0]} alt={p.title} className="w-12 h-12 rounded-xl object-cover" />
                          <div className="flex-1 min-w-0">
                            <div className="font-medium text-gray-900 text-sm line-clamp-1 group-hover:text-[#0F4C81]">{p.title}</div>
                            <div className="flex items-center gap-1 text-gray-400 text-xs mt-0.5">
                              <MapPin size={10} />{p.neighborhood}, {p.city}
                            </div>
                          </div>
                          <div className="text-right flex-shrink-0">
                            <div className="text-sm font-bold text-[#0F4C81]">{formatPrice(p.price, p.priceUnit)}</div>
                          </div>
                          <ChevronRight size={15} className="text-gray-300 group-hover:text-[#0F4C81]" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </>
            )}

            {activeTab === 'favorites' && (
              <div className="bg-white rounded-2xl border border-gray-100 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-5">Mes Favoris ({favoriteProperties.length})</h2>
                {favoriteProperties.length === 0 ? (
                  <div className="text-center py-12">
                    <Heart size={40} className="text-gray-200 mx-auto mb-3" />
                    <p className="text-gray-500">Aucun bien en favoris. Explorez notre catalogue !</p>
                    <button onClick={() => navigate('catalog')} className="mt-4 px-5 py-2.5 bg-[#0F4C81] text-white text-sm font-semibold rounded-xl">
                      Explorer
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {favoriteProperties.map(p => <PropertyCard key={p.id} property={p} />)}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'orders' && (
              <div className="bg-white rounded-2xl border border-gray-100 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-5">Mes Demandes</h2>
                {state.cart.length === 0 ? (
                  <div className="text-center py-12">
                    <ShoppingBag size={40} className="text-gray-200 mx-auto mb-3" />
                    <p className="text-gray-500">Aucune demande en cours.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {state.cart.map(item => (
                      <div key={item.property.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                        <img src={item.property.images[0]} alt="" className="w-16 h-16 rounded-xl object-cover" />
                        <div className="flex-1">
                          <div className="font-semibold text-gray-900">{item.property.title}</div>
                          <div className="text-sm text-gray-400 mt-0.5">{item.property.city}</div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-[#0F4C81]">{formatPrice(item.property.price, item.property.priceUnit)}</div>
                          <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full font-medium mt-1 inline-block">En attente</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'reservations' && (
              <div className="bg-white rounded-2xl border border-gray-100 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-5">Mes Réservations de visite</h2>
                <div className="space-y-4">
                  {mockReservations.map(r => (
                    <div key={r.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                      <img src={r.property.images[0]} alt="" className="w-16 h-16 rounded-xl object-cover" />
                      <div className="flex-1">
                        <div className="font-semibold text-gray-900">{r.property.title}</div>
                        <div className="text-sm text-gray-500 mt-0.5">
                          <Calendar size={12} className="inline mr-1" />
                          {new Date(r.date).toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })} à {r.time}
                        </div>
                      </div>
                      <span className={`text-xs px-3 py-1.5 rounded-full font-semibold ${
                        r.status === 'confirmé' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                      }`}>
                        {r.status === 'confirmé' ? 'Confirmé' : 'En attente'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="bg-white rounded-2xl border border-gray-100 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-5">Paramètres du compte</h2>
                <form className="space-y-5 max-w-lg" onSubmit={e => e.preventDefault()}>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1.5">Prénom</label>
                      <input defaultValue={user?.firstName} className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#0F4C81]/20 focus:border-[#0F4C81]" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1.5">Nom</label>
                      <input defaultValue={user?.lastName} className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#0F4C81]/20 focus:border-[#0F4C81]" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1.5">Email</label>
                    <input defaultValue={user?.email} type="email" className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#0F4C81]/20 focus:border-[#0F4C81]" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1.5">Téléphone</label>
                    <input defaultValue={user?.phone} className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#0F4C81]/20 focus:border-[#0F4C81]" />
                  </div>
                  <button type="submit" className="px-6 py-3 bg-[#0F4C81] text-white font-semibold rounded-xl hover:bg-[#0a3d6b] transition-colors">
                    Sauvegarder
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
