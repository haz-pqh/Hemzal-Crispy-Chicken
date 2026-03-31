

import React, { useState } from 'react';
// FIX: Import the `Transition` type from framer-motion to resolve the type error.
import { motion, AnimatePresence, Transition } from 'framer-motion';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Drinks from './pages/Drinks';
import AboutPage from './pages/About';
import Contact from './pages/Contact';
import CartPage from './pages/Cart';
import HistoryPage from './pages/History';
import LoadingSpinner from './components/LoadingSpinner';
import { CartProvider } from './contexts/CartContext';

const App: React.FC = () => {
  const [page, setPage] = useState('Home');
  const [isLoading, setIsLoading] = useState(false);

  const handlePageChange = (newPage: string) => {
    if (newPage === page) return;
    setIsLoading(true);
    // Simulate a brief loading period for UX
    setTimeout(() => {
      setPage(newPage);
      setIsLoading(false);
    }, 600);
  };

  // Listen for custom page change events
  React.useEffect(() => {
    const handleCustomPageChange = (e: any) => {
      handlePageChange(e.detail);
    };
    window.addEventListener('changePage', handleCustomPageChange);
    return () => window.removeEventListener('changePage', handleCustomPageChange);
  }, [page]);

  const pageVariants = {
    initial: {
      opacity: 0,
      y: 20,
    },
    in: {
      opacity: 1,
      y: 0,
    },
    out: {
      opacity: 0,
      y: -20,
    },
  };

  // FIX: Add the explicit `Transition` type to the pageTransition object.
  const pageTransition: Transition = {
    type: 'tween',
    ease: 'anticipate',
    duration: 0.5,
  };

  const renderPage = () => {
    switch (page) {
      case 'Home':
        return <Home setPage={handlePageChange} />;
      case 'Drinks':
        return <Drinks />;
      case 'About':
        return <AboutPage setPage={handlePageChange} />;
      case 'Contact':
        return <Contact />;
      case 'Cart':
        return <CartPage />;
      case 'History':
        return <HistoryPage />;
      default:
        return <Home setPage={handlePageChange} />;
    }
  };

  return (
    <CartProvider>
      <div className="bg-brand-dark min-h-screen overflow-x-hidden">
        <Header currentPage={page} setPage={handlePageChange} />
        <AnimatePresence>
          {isLoading && <LoadingSpinner />}
        </AnimatePresence>
        <main>
          <AnimatePresence mode="wait">
            {!isLoading && (
              <motion.div
                key={page}
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={pageTransition}
              >
                {renderPage()}
              </motion.div>
            )}
          </AnimatePresence>
        </main>
        <Footer />
      </div>
    </CartProvider>
  );
};

export default App;
