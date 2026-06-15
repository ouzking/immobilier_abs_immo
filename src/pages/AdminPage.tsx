import { useState } from 'react';
import {
  LayoutDashboard, Building2, Users, CreditCard, Calendar, BarChart3,
  TrendingUp, TrendingDown, Plus, Eye, Pencil, Trash2, CheckCircle,
  Clock, AlertCircle,
} from 'lucide-react';
import { mockProperties } from '../data/mockData';
import { formatPrice } from '../utils/format';

const tabs = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'properties', label: 'Propriétés', icon: Building2 },
  { id: 'clients', label: 'Clients', icon: Users },
  { id: 'payments', label: 'Paiements', icon: CreditCard },
  { id: 'reservations', label: 'Réservations', icon: Calendar },
];

const kpis = [
  { label: 'Propriétés actives', value: '47', change: '+3', trend: 'up', icon: Building2, color: 'bg-blue-50 text-[#0F4C81]' },
  { label: 'Clients totaux', value: '1 247', change: '+28', trend: 'up', icon: Users, color: 'bg-emerald-50 text-emerald-600' },
  { label: 'Revenu ce mois', value: '28,5M FCFA', change: '+12%', trend: 'up', icon: CreditCard, color: 'bg-amber-50 text-amber-600' },
  { label: 'Visites planifiées', value: '16', change: '-2', trend: 'down', icon: Calendar, color: 'bg-purple-50 text-purple-600' },
];

const mockClients = [
  { id: 'c1', name: 'Aminata Diop', email: 'aminata@example.com', phone: '+221 77 XXX XX XX', status: 'Acquéreur', date: '2024-03-10' },
  { id: 'c2', name: 'Mamadou Coulibaly', email: 'mamadou@example.com', phone: '+225 XX XXX XX XX', status: 'Investisseur', date: '2024-02-28' },
  { id: 'c3', name: 'Sophie Marchand', email: 'sophie@example.com', phone: '+33 6 XX XX XX XX', status: 'Locataire', date: '2024-01-15' },
  { id: 'c4', name: 'Ibrahima Sarr', email: 'ibrahima@example.com', phone: '+221 76 XXX XX XX', status: 'Vendeur', date: '2024-03-05' },
];

const mockPayments = [
  { id: 'p1', client: 'Aminata Diop', amount: 350000000, type: 'Vente villa', status: 'completed', date: '2024-03-12' },
  { id: 'p2', client: 'Sophie Marchand', amount: 1200000, type: 'Location appartement', status: 'completed', date: '2024-03-08' },
  { id: 'p3', client: 'Ibrahim Ndiaye', amount: 85000000, type: 'Vente duplex', status: 'pending', date: '2024-03-15' },
  { id: 'p4', client: 'Marie Touré', amount: 450000, type: 'Location local', status: 'failed', date: '2024-03-14' },
];

const statusConfig = {
  completed: { label: 'Payé', color: 'bg-emerald-100 text-emerald-700' },
  pending: { label: 'En attente', color: 'bg-amber-100 text-amber-700' },
  failed: { label: 'Échoué', color: 'bg-red-100 text-red-700' },
};

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="min-h-screen bg-gray-50 pt-20 flex">
      {/* Sidebar */}
      <div className="w-64 bg-[#0a1628] flex-shrink-0 flex flex-col min-h-screen fixed left-0 top-20 bottom-0 z-40 hidden lg:flex">
        <div className="p-5 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-[#0F4C81] rounded-xl flex items-center justify-center">
              <Building2 size={18} className="text-white" />
            </div>
            <div>
              <div className="text-white font-bold text-sm">ABS IMMO</div>
              <div className="text-[#D4AF37] text-xs">Administration</div>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-[#0F4C81] text-white'
                  : 'text-gray-400 hover:bg-white/10 hover:text-white'
              }`}
            >
              <tab.icon size={17} />
              {tab.label}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#D4AF37] rounded-lg flex items-center justify-center">
              <span className="text-white text-xs font-bold">ES</span>
            </div>
            <div>
              <div className="text-white text-xs font-semibold">Elhadji Sané</div>
              <div className="text-gray-400 text-xs">Super Admin</div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 lg:ml-64 p-6">
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Tableau de bord</h1>
              <p className="text-gray-500 text-sm">Vue d'ensemble en temps réel · ABS Immo & Services</p>
            </div>

            {/* KPIs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {kpis.map(kpi => (
                <div key={kpi.label} className="bg-white rounded-2xl border border-gray-100 p-5">
                  <div className="flex items-center justify-between mb-3">
                    <div className={`w-10 h-10 ${kpi.color} rounded-xl flex items-center justify-center`}>
                      <kpi.icon size={18} />
                    </div>
                    <span className={`flex items-center gap-1 text-xs font-semibold ${kpi.trend === 'up' ? 'text-emerald-600' : 'text-red-500'}`}>
                      {kpi.trend === 'up' ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                      {kpi.change}
                    </span>
                  </div>
                  <div className="text-2xl font-bold text-gray-900">{kpi.value}</div>
                  <div className="text-xs text-gray-400 mt-0.5">{kpi.label}</div>
                </div>
              ))}
            </div>

            {/* Recent activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              <div className="bg-white rounded-2xl border border-gray-100 p-5">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-gray-900">Derniers paiements</h3>
                  <BarChart3 size={16} className="text-gray-400" />
                </div>
                <div className="space-y-3">
                  {mockPayments.slice(0, 3).map(p => (
                    <div key={p.id} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                      <div>
                        <div className="text-sm font-medium text-gray-800">{p.client}</div>
                        <div className="text-xs text-gray-400">{p.type}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-bold text-gray-900">{new Intl.NumberFormat('fr-FR').format(p.amount)} FCFA</div>
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusConfig[p.status as keyof typeof statusConfig].color}`}>
                          {statusConfig[p.status as keyof typeof statusConfig].label}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-gray-100 p-5">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-gray-900">Propriétés récentes</h3>
                  <button className="flex items-center gap-1.5 text-xs text-[#0F4C81] font-medium">
                    <Plus size={13} /> Ajouter
                  </button>
                </div>
                <div className="space-y-3">
                  {mockProperties.slice(0, 4).map(p => (
                    <div key={p.id} className="flex items-center gap-3">
                      <img src={p.images[0]} alt="" className="w-10 h-10 rounded-lg object-cover" />
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-gray-800 line-clamp-1">{p.title}</div>
                        <div className="text-xs text-gray-400">{p.city}</div>
                      </div>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${p.status === 'disponible' ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-500'}`}>
                        {p.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'properties' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Gestion des propriétés</h1>
                <p className="text-gray-500 text-sm">{mockProperties.length} biens dans le catalogue</p>
              </div>
              <button className="flex items-center gap-2 px-5 py-2.5 bg-[#0F4C81] text-white font-semibold rounded-xl hover:bg-[#0a3d6b] transition-colors text-sm">
                <Plus size={16} /> Ajouter un bien
              </button>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50">
                    <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Bien</th>
                    <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden sm:table-cell">Type</th>
                    <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Prix</th>
                    <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden md:table-cell">Statut</th>
                    <th className="px-5 py-3"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {mockProperties.map(p => (
                    <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <img src={p.images[0]} alt="" className="w-11 h-11 rounded-xl object-cover" />
                          <div className="min-w-0">
                            <div className="font-medium text-gray-900 text-sm line-clamp-1">{p.title}</div>
                            <div className="text-xs text-gray-400 flex items-center gap-1"><span>{p.neighborhood}, {p.city}</span></div>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-4 hidden sm:table-cell">
                        <span className="text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full font-medium capitalize">{p.type}</span>
                      </td>
                      <td className="px-5 py-4 text-sm font-bold text-[#0F4C81] whitespace-nowrap">
                        {new Intl.NumberFormat('fr-FR').format(p.price)}
                      </td>
                      <td className="px-5 py-4 hidden md:table-cell">
                        <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                          p.status === 'disponible' ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-500'
                        }`}>
                          {p.status}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2 justify-end">
                          <button className="p-2 text-gray-400 hover:text-[#0F4C81] hover:bg-blue-50 rounded-lg transition-colors"><Eye size={15} /></button>
                          <button className="p-2 text-gray-400 hover:text-amber-500 hover:bg-amber-50 rounded-lg transition-colors"><Pencil size={15} /></button>
                          <button className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"><Trash2 size={15} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'clients' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Gestion des clients</h1>
                <p className="text-gray-500 text-sm">{mockClients.length} clients enregistrés</p>
              </div>
              <button className="flex items-center gap-2 px-5 py-2.5 bg-[#0F4C81] text-white font-semibold rounded-xl text-sm hover:bg-[#0a3d6b] transition-colors">
                <Plus size={16} /> Ajouter client
              </button>
            </div>
            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50">
                    <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Client</th>
                    <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden sm:table-cell">Contact</th>
                    <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden md:table-cell">Statut</th>
                    <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden lg:table-cell">Date</th>
                    <th className="px-5 py-3"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {mockClients.map(c => (
                    <tr key={c.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 bg-gradient-to-br from-[#0F4C81] to-[#C8102E] rounded-xl flex items-center justify-center text-white text-sm font-bold">
                            {c.name.charAt(0)}
                          </div>
                          <span className="font-medium text-gray-900 text-sm">{c.name}</span>
                        </div>
                      </td>
                      <td className="px-5 py-4 hidden sm:table-cell">
                        <div className="text-sm text-gray-600">{c.email}</div>
                        <div className="text-xs text-gray-400">{c.phone}</div>
                      </td>
                      <td className="px-5 py-4 hidden md:table-cell">
                        <span className="text-xs bg-blue-100 text-[#0F4C81] px-2.5 py-1 rounded-full font-medium">{c.status}</span>
                      </td>
                      <td className="px-5 py-4 text-xs text-gray-400 hidden lg:table-cell">
                        {new Date(c.date).toLocaleDateString('fr-FR')}
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex gap-2 justify-end">
                          <button className="p-2 text-gray-400 hover:text-[#0F4C81] hover:bg-blue-50 rounded-lg transition-colors"><Eye size={15} /></button>
                          <button className="p-2 text-gray-400 hover:text-amber-500 hover:bg-amber-50 rounded-lg transition-colors"><Pencil size={15} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'payments' && (
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Gestion des paiements</h1>
            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50">
                    <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Client</th>
                    <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden sm:table-cell">Type</th>
                    <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Montant</th>
                    <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Statut</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {mockPayments.map(p => (
                    <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-5 py-4 text-sm font-medium text-gray-900">{p.client}</td>
                      <td className="px-5 py-4 text-sm text-gray-500 hidden sm:table-cell">{p.type}</td>
                      <td className="px-5 py-4 text-sm font-bold text-gray-900">{new Intl.NumberFormat('fr-FR').format(p.amount)} FCFA</td>
                      <td className="px-5 py-4">
                        <span className={`flex items-center gap-1.5 text-xs font-semibold w-fit px-2.5 py-1 rounded-full ${statusConfig[p.status as keyof typeof statusConfig].color}`}>
                          {p.status === 'completed' && <CheckCircle size={11} />}
                          {p.status === 'pending' && <Clock size={11} />}
                          {p.status === 'failed' && <AlertCircle size={11} />}
                          {statusConfig[p.status as keyof typeof statusConfig].label}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'reservations' && (
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Gestion des réservations</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {[
                { name: 'Aminata Diop', property: 'Villa de Prestige - Almadies', date: '15 Avr 2024 à 10h00', status: 'confirmé', agent: 'Elhadji Sané' },
                { name: 'Mamadou Coulibaly', property: 'Villa Contemporaine - Ngor', date: '18 Avr 2024 à 14h30', status: 'en_attente', agent: 'Fatou Diallo' },
                { name: 'Sophie Marchand', property: 'Appartement Luxe - Plateau', date: '20 Avr 2024 à 11h00', status: 'confirmé', agent: 'Moussa Ndiaye' },
                { name: 'Ibrahim Ndiaye', property: 'Duplex Moderne - Sacré-Cœur', date: '22 Avr 2024 à 16h00', status: 'annule', agent: 'Fatou Diallo' },
              ].map((r, i) => (
                <div key={i} className="bg-white rounded-2xl border border-gray-100 p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-bold text-gray-900">{r.name}</h4>
                      <p className="text-sm text-gray-500 mt-0.5">{r.property}</p>
                    </div>
                    <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                      r.status === 'confirmé' ? 'bg-emerald-100 text-emerald-700' :
                      r.status === 'en_attente' ? 'bg-amber-100 text-amber-700' :
                      'bg-red-100 text-red-600'
                    }`}>
                      {r.status}
                    </span>
                  </div>
                  <div className="text-xs text-gray-400 space-y-1">
                    <div className="flex items-center gap-1.5"><Calendar size={11} />{r.date}</div>
                    <div className="flex items-center gap-1.5"><Users size={11} />Agent : {r.agent}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
