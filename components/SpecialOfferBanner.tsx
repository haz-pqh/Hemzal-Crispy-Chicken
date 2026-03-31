import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SpecialOfferBanner: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const isDismissed = sessionStorage.getItem('specialOfferDismissed');
    if (!isDismissed) {
      setIsVisible(true);
    }
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    sessionStorage.setItem('specialOfferDismissed', 'true');
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className="bg-gradient-to-r from-brand-primary to-brand-secondary text-white overflow-hidden relative z-30"
        >
          <div className="container mx-auto px-6 py-3 pt-20 md:pt-24 flex items-center justify-center text-center">
            <p className="font-bold text-sm md:text-base pr-8">
              🔥 SPECIAL OFFER: Buy 2 Signature Chickens, Get 1 FREE! Limited time only. 🔥
            </p>
            <button
              onClick={handleDismiss}
              className="absolute right-4 md:right-6 p-1 hover:bg-white/20 rounded-full transition-colors"
              aria-label="Dismiss offer"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SpecialOfferBanner;
