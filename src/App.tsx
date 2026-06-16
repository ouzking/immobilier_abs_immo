import { AppProvider, useApp } from './store/AppContext';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import WhatsAppButton from './components/layout/WhatsAppButton';
import CartDrawer from './components/cart/CartDrawer';
import HomePage from './pages/HomePage';
import CatalogPage from './pages/CatalogPage';
import PropertyDetailPage from './pages/PropertyDetailPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import LoginPage from './pages/LoginPage';
import ForgotPasswordPage from './pages/forgot-password';
import RegisterPage from './pages/RegisterPage';
import ClientDashboardPage from './pages/ClientDashboardPage';
import AdminPage from './pages/AdminPage';
import ContactPage from './pages/ContactPage';

const noLayoutPages = ['login', 'register'];
const noFooterPages = ['admin'];

function AppContent() {
  const { state } = useApp();
  const { currentPage } = state;

  const showLayout = !noLayoutPages.includes(currentPage);
  const showFooter = showLayout && !noFooterPages.includes(currentPage);

  const renderPage = () => {
    switch (currentPage) {
      case 'home': return <HomePage />;
      case 'catalog': return <CatalogPage />;
      case 'property': return <PropertyDetailPage />;
      case 'cart': return <CartPage />;
      case 'checkout': return <CheckoutPage />;
      case 'login': return <LoginPage />;
      case 'forgot-password': return <ForgotPasswordPage />;
      case 'register': return <RegisterPage />;
      case 'dashboard': return <ClientDashboardPage />;
      case 'admin': return <AdminPage />;
      case 'contact': return <ContactPage />;
      case 'about': return <ContactPage />;
      case 'blog': return <CatalogPage />;
      case 'favorites': return <ClientDashboardPage />;
      default: return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {showLayout && <Header />}
      <main className="flex-1">
        {renderPage()}
      </main>
      {showFooter && <Footer />}
      {showLayout && <WhatsAppButton />}
      <CartDrawer />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
