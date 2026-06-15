import { X, ShoppingCart, Trash2, ArrowRight, MapPin } from 'lucide-react';
import { useApp } from '../../store/AppContext';
import { formatPrice } from '../../utils/format';

const actionLabels: Record<string, string> = {
  achat: 'Demande d\'achat',
  location: 'Demande de location',
  reservation: 'Réservation',
};

export default function CartDrawer() {
  const { state, dispatch, removeFromCart, navigate } = useApp();

  if (!state.isCartOpen) return null;

  const total = state.cart.reduce((sum, item) => sum + item.property.price, 0);

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
        onClick={() => dispatch({ type: 'CLOSE_CART' })}
      />

      {/* Drawer */}
      <div className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-md bg-white shadow-2xl flex flex-col animate-slideInRight">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 bg-[#0F4C81] rounded-xl flex items-center justify-center">
              <ShoppingCart size={18} className="text-white" />
            </div>
            <div>
              <h2 className="font-bold text-gray-900">Mon Panier</h2>
              <p className="text-xs text-gray-400">{state.cart.length} bien{state.cart.length > 1 ? 's' : ''} sélectionné{state.cart.length > 1 ? 's' : ''}</p>
            </div>
          </div>
          <button
            onClick={() => dispatch({ type: 'CLOSE_CART' })}
            className="w-9 h-9 bg-gray-100 hover:bg-gray-200 rounded-xl flex items-center justify-center transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {state.cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-16">
              <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mb-4">
                <ShoppingCart size={28} className="text-gray-300" />
              </div>
              <h3 className="font-semibold text-gray-700 mb-2">Panier vide</h3>
              <p className="text-gray-400 text-sm mb-6">Ajoutez des biens immobiliers pour commencer.</p>
              <button
                onClick={() => navigate('catalog')}
                className="px-5 py-2.5 bg-[#0F4C81] text-white text-sm font-semibold rounded-xl hover:bg-[#0a3d6b] transition-colors"
              >
                Explorer les biens
              </button>
            </div>
          ) : (
            state.cart.map(item => (
              <div key={item.property.id} className="bg-gray-50 rounded-2xl p-4 flex gap-3">
                <img
                  src={item.property.images[0]}
                  alt={item.property.title}
                  className="w-20 h-20 rounded-xl object-cover flex-shrink-0 cursor-pointer hover:opacity-90 transition-opacity"
                  onClick={() => navigate('property', item.property.id)}
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <h4
                      className="font-semibold text-gray-900 text-sm leading-snug line-clamp-2 cursor-pointer hover:text-[#0F4C81] transition-colors"
                      onClick={() => navigate('property', item.property.id)}
                    >
                      {item.property.title}
                    </h4>
                    <button
                      onClick={() => removeFromCart(item.property.id)}
                      className="text-gray-300 hover:text-red-500 transition-colors flex-shrink-0"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                  <div className="flex items-center gap-1.5 text-gray-400 text-xs mt-1 mb-2">
                    <MapPin size={10} />{item.property.neighborhood}, {item.property.city}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[#0F4C81] text-sm">
                      {formatPrice(item.property.price, item.property.priceUnit)}
                    </span>
                    <span className="text-xs bg-[#0F4C81]/10 text-[#0F4C81] px-2 py-0.5 rounded-full font-medium">
                      {actionLabels[item.action]}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {state.cart.length > 0 && (
          <div className="px-6 py-5 border-t border-gray-100 bg-white">
            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-600 font-medium">Valeur estimée</span>
              <span className="font-bold text-xl text-gray-900">
                {formatPrice(total, 'FCFA')}
              </span>
            </div>
            <button
              onClick={() => navigate('checkout')}
              className="w-full flex items-center justify-center gap-2 py-3.5 bg-[#0F4C81] hover:bg-[#0a3d6b] text-white font-bold rounded-xl transition-all duration-200 hover:scale-[1.02] shadow-lg shadow-[#0F4C81]/20"
            >
              Finaliser la demande <ArrowRight size={18} />
            </button>
            <button
              onClick={() => navigate('cart')}
              className="w-full mt-2 py-3 border border-gray-200 text-gray-600 font-medium rounded-xl hover:bg-gray-50 text-sm transition-colors"
            >
              Voir le panier complet
            </button>
          </div>
        )}
      </div>
    </>
  );
}
