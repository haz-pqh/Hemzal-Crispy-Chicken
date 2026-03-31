import React from 'react';
import { motion, Variants, useScroll, useTransform } from 'framer-motion';

interface HeroProps {
  setPage: (page: string) => void;
}

const AnimatedTextCharacter: React.FC<{ text: string; className?: string }> = ({ text, className }) => {
  const letters = Array.from(text);

  const container: Variants = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: i * 0.1 },
    }),
  };

  const child: Variants = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    <motion.div
      className={`overflow-hidden flex flex-wrap justify-center ${className}`}
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {letters.map((letter, index) => (
        <motion.span variants={child} key={index}>
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </motion.div>
  );
};

const Hero: React.FC<HeroProps> = ({ setPage }) => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  return (
    <section id="home" className="relative h-screen flex items-center justify-center text-center overflow-hidden">
      <motion.div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1562967914-608f82629710?q=80&w=2073&auto=format&fit=crop')`,
          y,
        }}
        initial={{ scale: 1.15 }}
        animate={{ scale: 1 }}
        transition={{ duration: 10, ease: "easeOut" }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30 z-10"></div>
      
      <div className="relative z-20 px-4">
        <AnimatedTextCharacter text="Hemzal's" className="font-display text-4xl md:text-6xl font-extrabold text-brand-light/80" />
        <AnimatedTextCharacter text="Crispy Chicken" className="font-display text-6xl md:text-9xl font-extrabold text-white bg-clip-text text-transparent bg-gradient-to-r from-brand-primary to-brand-secondary my-2" />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="max-w-2xl mx-auto mt-4 text-lg md:text-xl text-brand-light/70"
        >
          Experience the ultimate crunch and flavor. 
          Freshly prepared crispy chicken, seasoned for the bold.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 2 }}
        >
          <motion.button 
            onClick={() => setPage('Chickens')}
            whileHover={{ scale: 1.05, boxShadow: "0px 0px 30px rgba(255, 69, 0, 0.4)" }}
            whileTap={{ scale: 0.95 }}
            className="mt-8 bg-gradient-to-r from-brand-primary to-brand-secondary text-white font-bold py-3 px-8 rounded-full text-lg shadow-lg shadow-brand-primary/20 transition-shadow duration-300"
          >
            Order Now
          </motion.button>
        </motion.div>
      </div>
      <motion.div
        className="absolute bottom-8 z-20"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <a href="#chickens" onClick={(e) => { e.preventDefault(); document.getElementById('chickens')?.scrollIntoView({behavior: 'smooth'})}} aria-label="Scroll to chickens section">
            <svg className="w-6 h-6 text-brand-light/50" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
        </a>
      </motion.div>
    </section>
  );
};

export default Hero;
