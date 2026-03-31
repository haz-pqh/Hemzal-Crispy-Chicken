
import React from 'react';
import { motion } from 'framer-motion';
import { Instagram, Facebook, Twitter } from 'lucide-react';

const SocialIcon: React.FC<{ children: React.ReactNode; label: string; href: string }> = ({ children, label, href }) => {
    return (
        <motion.a 
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            whileHover={{ scale: 1.2, rotate: 10 }}
            whileTap={{ scale: 0.9 }}
            className="text-brand-light/70 hover:text-brand-primary transition-colors"
        >
            {children}
        </motion.a>
    )
}

const Footer: React.FC = () => {
  return (
    <footer className="bg-zinc-900 text-brand-light/80 py-12">
      <div className="container mx-auto px-6 text-center">
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
        >
            <div className="flex justify-center space-x-6">
                <SocialIcon label="Facebook" href="https://facebook.com">
                    <Facebook className="w-6 h-6" />
                </SocialIcon>
                 <SocialIcon label="Twitter" href="https://twitter.com">
                    <Twitter className="w-6 h-6" />
                </SocialIcon>
                <SocialIcon label="Instagram" href="https://instagram.com">
                    <Instagram className="w-6 h-6" />
                </SocialIcon>
            </div>
            <div className="mt-8 border-t border-brand-light/20 pt-8">
                <p>&copy; {new Date().getFullYear()} Hemzal Crispy Chicken. All Rights Reserved.</p>
            </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
