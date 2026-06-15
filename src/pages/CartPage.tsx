import { Trash2, ShoppingCart, ArrowRight, MapPin } from 'lucide-react';
import { useApp } from '../store/AppContext';
import { formatPrice } from '../utils/format';

export default function CartPage() {
  const { state, removeFromCart, navigate } = useApp();
  const total = state.cart.reduce((sum, item) => sum + item.property.price, 0);

  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Mon Panier Immobilier</h1>
        <p className="text-gray-500 mb-8">Récapitulatif de vos biens sélectionnés</p>

        {state.cart.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-gray-100">
            <div className="w-20 h-20 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-5">
              <ShoppingCart size={36} className="text-gray-300" />
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">Votre panier est vide</h3>
            <p className="text-gray-400 mb-6">Parcourez notre catalogue et ajoutez des biens qui vous intéressent.</p>
            <button
              onClick={() => navigate('catalog')}
              className="px-6 py-3 bg-[#0F4C81] text-white font-semibold rounded-xl hover:bg-[#0a3d6b] transition-colors"
            >
              Explorer le catalogue
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Items */}
            <div className="lg:col-span-2 space-y-4">
              {state.cart.map(item => (
                <div key={item.property.id} className="bg-white rounded-2xl border border-gray-100 p-5 flex gap-4">
                  <img
                    src={item.property.images[0]}
                    alt={item.property.title}
                    className="w-24 h-24 rounded-xl object-cover flex-shrink-0 cursor-pointer"
                    onClick={() => navigate('property', item.property.id)}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3
                          className="font-bold text-gray-900 hover:text-[#0F4C81] cursor-pointer transition-colors"
                          onClick={() => navigate('property', item.property.id)}
                        >
                          {item.property.title}
                        </h3>
                        <div className="flex items-center gap-1.5 text-gray-400 text-xs mt-1">
                          <MapPin size={11} />{item.property.neighborhood}, {item.property.city}
                        </div>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.property.id)}
                        className="text-gray-300 hover:text-red-500 transition-colors"
                      >
                        <Trash2 size={17} />
                      </button>
                    </div>
                    <div className="flex items-center justify-between mt-3">
                      <span className="text-xl font-bold text-[#0F4C81]">
                        {formatPrice(item.property.price, item.property.priceUnit)}
                      </span>
                      <span className="px-3 py-1 bg-[#0F4C81]/10 text-[#0F4C81] text-xs font-semibold rounded-full capitalize">
                        {item.action}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div>
              <div className="bg-white rounded-2xl border border-gray-100 p-6 sticky top-24">
                <h3 className="font-bold text-gray-900 text-lg mb-5">Récapitulatif</h3>
                <div className="space-y-3 mb-5">
                  {state.cart.map(item => (
                    <div key={item.property.id} className="flex items-center justify-between text-sm">
                      <span className="text-gray-600 line-clamp-1 pr-2">{item.property.title}</span>
                      <span className="font-medium text-gray-900 flex-shrink-0">
                        {new Intl.NumberFormat('fr-FR').format(item.property.price)} FCFA
                      </span>
                    </div>
                  ))}
                </div>
                <div className="pt-4 border-t border-gray-100">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-gray-900">Total estimé</span>
                    <span className="text-xl font-bold text-[#0F4C81]">
                      {formatPrice(total, 'FCFA')}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 mb-5">Hors frais d'agence et frais notariaux</p>
                  <button
                    onClick={() => navigate('checkout')}
                    className="w-full flex items-center justify-center gap-2 py-3.5 bg-[#0F4C81] hover:bg-[#0a3d6b] text-white font-bold rounded-xl transition-all hover:scale-[1.02] shadow-lg shadow-[#0F4C81]/20"
                  >
                    Finaliser ma demande <ArrowRight size={17} />
                  </button>
                  <button
                    onClick={() => navigate('catalog')}
                    className="w-full mt-2 py-3 text-gray-500 text-sm hover:text-[#0F4C81] transition-colors"
                  >
                    + Ajouter d'autres biens
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
