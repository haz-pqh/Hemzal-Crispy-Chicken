import React from 'react';
import { motion } from 'framer-motion';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-brand-dark/50 backdrop-blur-sm">
      <motion.div
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "linear",
        }}
        className="w-12 h-12 border-4 border-brand-primary border-t-transparent rounded-full"
      />
    </div>
  );
};

export default LoadingSpinner;
