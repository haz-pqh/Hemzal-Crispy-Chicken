
import React from 'react';
import { motion } from 'framer-motion';

interface AboutProps {
  setPage: (page: string) => void;
}

const About: React.FC<AboutProps> = ({ setPage }) => {
  return (
    <section id="about" className="py-20 sm:py-32 overflow-hidden bg-black/20">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h2 className="text-4xl md:text-5xl font-extrabold font-display">
              More Than Just a Drink, <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-primary to-brand-secondary">
                It's an Experience.
              </span>
            </h2>
            <p className="mt-6 text-lg text-brand-light/80 leading-relaxed">
              At Hemzal, we believe the perfect meal is a symphony of flavors. That's why we poured the same passion from our legendary crispy chicken into creating a line of beverages that don't just quench your thirst—they elevate your entire meal.
            </p>
            <p className="mt-4 text-lg text-brand-light/80 leading-relaxed">
              Using only the freshest ingredients and a dash of daring creativity, each drink is a masterpiece designed to complement the crunch and zest of our chicken. It's the ultimate pairing, the perfect partner in crime for your taste buds.
            </p>
            <motion.button 
              onClick={() => setPage('About')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-8 bg-transparent border-2 border-brand-primary text-brand-primary font-bold py-3 px-8 rounded-full text-lg transition-colors duration-300 hover:bg-brand-primary hover:text-white"
            >
              Our Story
            </motion.button>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative h-96 lg:h-[500px] rounded-3xl"
          >
            <div className="absolute -inset-2 rounded-3xl bg-gradient-to-r from-brand-primary to-brand-secondary opacity-50 blur-xl"></div>
            <img 
              src="https://images.unsplash.com/photo-1551024709-8f237c2045b5?q=80&w=1200&auto=format&fit=crop" 
              alt="Bartender crafting a drink" 
              className="relative w-full h-full object-cover rounded-3xl shadow-2xl"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
