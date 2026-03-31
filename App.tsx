

import React, { useState } from 'react';
// FIX: Import the `Transition` type from framer-motion to resolve the type error.
import { motion, AnimatePresence, Transition } from 'framer-motion';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Drinks from './pages/Drinks';
import AboutPage from './pages/About';
import Contact from './pages/Contact';

const App: React.FC = () => {
  const [page, setPage] = useState('Home');

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
        return <Home setPage={setPage} />;
      case 'Drinks':
        return <Drinks />;
      case 'About':
        return <AboutPage setPage={setPage} />;
      case 'Contact':
        return <Contact />;
      default:
        return <Home setPage={setPage} />;
    }
  };

  return (
    <div className="bg-brand-dark min-h-screen overflow-x-hidden">
      <Header currentPage={page} setPage={setPage} />
      <main>
        <AnimatePresence mode="wait">
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
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
};

export default App;
