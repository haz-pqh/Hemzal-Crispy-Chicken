
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    return newErrors;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
    // Clear error when user starts typing
    if (errors[id]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[id];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormData({ name: '', email: '', message: '' });
    
    // Reset success message after 5 seconds
    setTimeout(() => setIsSubmitted(false), 5000);
  };

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
          <form className="space-y-6" onSubmit={handleSubmit} noValidate>
            <div className="relative">
              <input 
                type="text" 
                id="name" 
                value={formData.name}
                onChange={handleChange}
                className={`peer w-full bg-transparent border-b-2 ${errors.name ? 'border-red-500' : 'border-brand-light/30'} focus:border-brand-primary text-white p-2 outline-none transition`} 
                placeholder=" "
              />
              <label htmlFor="name" className={`absolute left-2 -top-5 ${errors.name ? 'text-red-500' : 'text-brand-light/50'} text-sm peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-focus:-top-5 peer-focus:text-brand-primary peer-focus:text-sm transition-all duration-300`}>Name</label>
              <AnimatePresence>
                {errors.name && (
                  <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-red-500 text-xs mt-1 absolute">{errors.name}</motion.p>
                )}
              </AnimatePresence>
            </div>

            <div className="relative pt-4">
              <input 
                type="email" 
                id="email" 
                value={formData.email}
                onChange={handleChange}
                className={`peer w-full bg-transparent border-b-2 ${errors.email ? 'border-red-500' : 'border-brand-light/30'} focus:border-brand-primary text-white p-2 outline-none transition`} 
                placeholder=" "
              />
              <label htmlFor="email" className={`absolute left-2 top-4 ${errors.email ? 'text-red-500' : 'text-brand-light/50'} text-sm peer-placeholder-shown:top-6 peer-placeholder-shown:text-base peer-focus:top-4 peer-focus:text-brand-primary peer-focus:text-sm transition-all duration-300`}>Email</label>
              <AnimatePresence>
                {errors.email && (
                  <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-red-500 text-xs mt-1 absolute">{errors.email}</motion.p>
                )}
              </AnimatePresence>
            </div>

            <div className="relative pt-4">
              <textarea 
                id="message" 
                rows={4} 
                value={formData.message}
                onChange={handleChange}
                className={`peer w-full bg-transparent border-b-2 ${errors.message ? 'border-red-500' : 'border-brand-light/30'} focus:border-brand-primary text-white p-2 outline-none transition`} 
                placeholder=" "
              ></textarea>
              <label htmlFor="message" className={`absolute left-2 top-4 ${errors.message ? 'text-red-500' : 'text-brand-light/50'} text-sm peer-placeholder-shown:top-6 peer-placeholder-shown:text-base peer-focus:top-4 peer-focus:text-brand-primary peer-focus:text-sm transition-all duration-300`}>Message</label>
              <AnimatePresence>
                {errors.message && (
                  <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-red-500 text-xs mt-1 absolute">{errors.message}</motion.p>
                )}
              </AnimatePresence>
            </div>

            <div className="pt-6">
              <motion.button 
                whileHover={{ scale: isSubmitting ? 1 : 1.05 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.95 }}
                disabled={isSubmitting}
                type="submit" 
                className={`w-full bg-gradient-to-r from-brand-primary to-brand-secondary text-white font-bold py-3 px-8 rounded-full text-lg transition-all duration-300 flex items-center justify-center ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {isSubmitting ? (
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : 'Send Message'}
              </motion.button>
            </div>

            <AnimatePresence>
              {isSubmitted && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="bg-green-500/20 border border-green-500 text-green-400 p-4 rounded-2xl text-center text-sm"
                >
                  Message sent successfully! We'll get back to you soon.
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
