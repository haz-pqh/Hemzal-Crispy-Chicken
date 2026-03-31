
import React from 'react';
import { motion } from 'framer-motion';

interface AboutProps {
  setPage: (page: string) => void;
}

const About: React.FC<AboutProps> = ({ setPage }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <section id="about" className="py-20 sm:py-32 overflow-hidden bg-black/20">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.h2 
              variants={itemVariants}
              className="text-4xl md:text-5xl font-extrabold font-display leading-tight"
            >
              More Than Just a Drink, <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-primary to-brand-secondary">
                It's an Experience.
              </span>
            </motion.h2>
            <motion.p 
              variants={itemVariants}
              className="mt-6 text-lg text-brand-light/80 leading-relaxed"
            >
              At Hemzal, we believe the perfect meal is a symphony of flavors. That's why we poured the same passion from our legendary crispy chicken into creating a line of beverages that don't just quench your thirst—they elevate your entire meal.
            </motion.p>
            <motion.p 
              variants={itemVariants}
              className="mt-4 text-lg text-brand-light/80 leading-relaxed"
            >
              Using only the freshest ingredients and a dash of daring creativity, each drink is a masterpiece designed to complement the crunch and zest of our chicken. It's the ultimate pairing, the perfect partner in crime for your taste buds.
            </motion.p>
            <motion.div variants={itemVariants}>
              <motion.button 
                onClick={() => setPage('About')}
                whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 69, 0, 0.1)" }}
                whileTap={{ scale: 0.95 }}
                className="mt-8 bg-transparent border-2 border-brand-primary text-brand-primary font-bold py-3 px-8 rounded-full text-lg transition-all duration-300 hover:text-white"
              >
                Our Story
              </motion.button>
            </motion.div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50, scale: 0.95 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="relative h-96 lg:h-[500px] rounded-3xl"
          >
            <div className="absolute -inset-2 rounded-3xl bg-gradient-to-r from-brand-primary to-brand-secondary opacity-30 blur-2xl"></div>
            <img 
              src="https://images.unsplash.com/photo-1551024709-8f237c2045b5?q=80&w=1200&auto=format&fit=crop" 
              alt="Bartender crafting a drink" 
              className="relative w-full h-full object-cover rounded-3xl shadow-2xl border border-white/10"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
