import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';

interface HeaderProps {
  currentPage: string;
  setPage: (page: string) => void;
}

const Header: React.FC<HeaderProps> = ({ currentPage, setPage }) => {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMenuOpen]);

  const navItems = ['Home', 'Drinks', 'About', 'Contact'];

  const menuVariants: Variants = {
    hidden: { opacity: 0, y: '-100%' },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { type: 'spring', stiffness: 100, damping: 20, when: 'beforeChildren', staggerChildren: 0.1 } 
    },
    exit: { opacity: 0, y: '-100%', transition: { duration: 0.3, ease: 'easeInOut' } }
  };

  const menuItemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const handleNavClick = (page: string) => {
    setPage(page);
    window.scrollTo(0, 0);
  };

  return (
    <>
      <motion.header
        initial={false}
        animate={{ 
          backgroundColor: scrolled || isMenuOpen ? 'rgba(26, 26, 26, 0.8)' : 'rgba(26, 26, 26, 0)',
          backdropFilter: scrolled || isMenuOpen ? 'blur(10px)' : 'blur(0px)',
        }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="fixed top-0 left-0 right-0 z-50 w-full"
      >
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <button onClick={() => handleNavClick('Home')} aria-label="Go to Home page" className="focus:outline-none">
            <svg width="180" height="50" viewBox="0 0 180 50" xmlns="http://www.w3.org/2000/svg">
              <defs>
                  <filter id="logo-shadow" x="-50%" y="-50%" width="200%" height="200%">
                      <feDropShadow dx="1" dy="1" stdDeviation="1.5" floodColor="#000000" floodOpacity="0.5" />
                  </filter>
              </defs>
              <text
                  x="50%"
                  y="25"
                  dominantBaseline="middle"
                  textAnchor="middle"
                  style={{
                      fontFamily: "'Lobster', cursive",
                      fontSize: '32px',
                      fill: '#ff4500',
                      filter: 'url(#logo-shadow)',
                  }}
              >
                  Hemzal
              </text>
              <text
                  x="50%"
                  y="42"
                  dominantBaseline="middle"
                  textAnchor="middle"
                  style={{
                      fontFamily: "'Poppins', sans-serif",
                      fontSize: '9px',
                      fontWeight: 700,
                      fill: '#f5f5f5',
                      textTransform: 'uppercase',
                      letterSpacing: '1.5px',
                  }}
              >
                  Crispy Chicken
              </text>
            </svg>
          </button>
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item}
                onClick={() => handleNavClick(item)}
                className={`relative text-brand-light font-semibold transition-colors duration-300 ${currentPage === item ? 'text-brand-primary' : 'hover:text-brand-primary'}`}
              >
                {item}
                {currentPage === item && (
                  <motion.div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-brand-primary" layoutId="underline" />
                )}
              </button>
            ))}
          </nav>
          <motion.button 
            onClick={() => handleNavClick('Drinks')}
            whileHover={{ scale: 1.05, boxShadow: "0px 0px 15px rgba(255, 69, 0, 0.4)" }}
            whileTap={{ scale: 0.95 }}
            className="hidden md:block bg-gradient-to-r from-brand-primary to-brand-secondary text-white font-bold py-2 px-6 rounded-full"
          >
            Order Now
          </motion.button>
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu" className="z-50 relative w-6 h-6">
              <motion.span
                  className="absolute h-0.5 w-full bg-white rounded-full"
                  style={{ top: '25%' }}
                  variants={{ closed: { rotate: 0, y: 0 }, open: { rotate: 45, y: 6 } }}
                  animate={isMenuOpen ? "open" : "closed"}
              />
              <motion.span
                  className="absolute h-0.5 w-full bg-white rounded-full"
                  style={{ top: '50%', transform: 'translateY(-50%)' }}
                  variants={{ closed: { opacity: 1 }, open: { opacity: 0 } }}
                  animate={isMenuOpen ? "open" : "closed"}
                  transition={{ duration: 0.1 }}
              />
              <motion.span
                  className="absolute h-0.5 w-full bg-white rounded-full"
                  style={{ bottom: '25%' }}
                  variants={{ closed: { rotate: 0, y: 0 }, open: { rotate: -45, y: -6 } }}
                  animate={isMenuOpen ? "open" : "closed"}
              />
            </button>
          </div>
        </div>
      </motion.header>
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 bg-brand-dark/95 backdrop-blur-md z-40 flex flex-col items-center justify-center md:hidden"
          >
            <nav className="flex flex-col items-center space-y-8">
              {navItems.map((item) => (
                <motion.button
                  key={item}
                  variants={menuItemVariants}
                  onClick={() => { handleNavClick(item); setIsMenuOpen(false); }}
                  className="text-3xl text-brand-light hover:text-brand-primary transition-colors duration-300 font-semibold"
                >
                  {item}
                </motion.button>
              ))}
              <motion.button
                variants={menuItemVariants}
                onClick={() => { handleNavClick('Drinks'); setIsMenuOpen(false); }}
                whileHover={{ scale: 1.05, boxShadow: "0px 0px 15px rgba(255, 69, 0, 0.4)" }}
                whileTap={{ scale: 0.95 }}
                className="mt-6 bg-gradient-to-r from-brand-primary to-brand-secondary text-white font-bold py-3 px-8 rounded-full text-lg"
              >
                Order Now
              </motion.button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;