
import React from 'react';
import { motion } from 'framer-motion';

const Contact: React.FC = () => {
  return (
    <section id="contact" className="relative bg-brand-dark py-20 sm:py-32 overflow-hidden min-h-screen flex items-center">
        <div className="absolute inset-0 w-full h-full opacity-5 bg-[radial-gradient(#ff4500_1px,transparent_1px)] [background-size:24px_24px]"></div>
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold font-display">Get In Touch</h2>
          <p className="text-lg text-brand-light/70 mt-4 max-w-2xl mx-auto">
            Have a question, feedback, or a brilliant idea? We'd love to hear from you.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="max-w-lg mx-auto bg-black/20 p-8 rounded-3xl backdrop-blur-sm border border-white/10"
        >
          <form className="space-y-6">
            <div className="relative">
              <input type="text" id="name" className="peer w-full bg-transparent border-b-2 border-brand-light/30 focus:border-brand-primary text-white p-2 outline-none transition" placeholder=" "/>
              <label htmlFor="name" className="absolute left-2 -top-5 text-brand-light/50 text-sm peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-focus:-top-5 peer-focus:text-brand-primary peer-focus:text-sm transition-all duration-300">Name</label>
            </div>
            <div className="relative">
              <input type="email" id="email" className="peer w-full bg-transparent border-b-2 border-brand-light/30 focus:border-brand-primary text-white p-2 outline-none transition" placeholder=" "/>
              <label htmlFor="email" className="absolute left-2 -top-5 text-brand-light/50 text-sm peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-focus:-top-5 peer-focus:text-brand-primary peer-focus:text-sm transition-all duration-300">Email</label>
            </div>
            <div className="relative">
              <textarea id="message" rows={4} className="peer w-full bg-transparent border-b-2 border-brand-light/30 focus:border-brand-primary text-white p-2 outline-none transition" placeholder=" "></textarea>
              <label htmlFor="message" className="absolute left-2 -top-5 text-brand-light/50 text-sm peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-focus:-top-5 peer-focus:text-brand-primary peer-focus:text-sm transition-all duration-300">Message</label>
            </div>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit" 
              className="w-full bg-gradient-to-r from-brand-primary to-brand-secondary text-white font-bold py-3 px-8 rounded-full text-lg transition-transform duration-300"
            >
              Send Message
            </motion.button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
