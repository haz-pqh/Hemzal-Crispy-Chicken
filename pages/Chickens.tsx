
import React from 'react';
import { motion } from 'framer-motion';
import FeaturedChickens from '../components/FeaturedChickens';

const Chickens: React.FC = () => {
  return (
    <div className="pt-32 min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-16 px-6"
      >
        <h1 className="text-5xl md:text-6xl font-extrabold font-display bg-clip-text text-transparent bg-gradient-to-r from-brand-primary to-brand-secondary">
          Our Full Collection
        </h1>
        <p className="text-lg text-brand-light/70 mt-4 max-w-2xl mx-auto">
          Explore our entire range of crispy, juicy chickens, each prepared with our signature spice blends.
        </p>
      </motion.div>
      <FeaturedChickens />
    </div>
  );
};

export default Chickens;
