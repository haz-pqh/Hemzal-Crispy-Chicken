
import React from 'react';
import { motion } from 'framer-motion';
import { Beverage } from '../types';

const beverages: Beverage[] = [
  {
    id: 1,
    name: "Spicy Mango Tango",
    description: "A fiery blend of sweet mango and a hint of chili, perfect for the adventurous.",
    imageUrl: "https://images.unsplash.com/photo-1600096194534-95cf5ece1469?q=80&w=800",
    color: "from-yellow-400 to-orange-500",
  },
  {
    id: 2,
    name: "Electric Blue Lemonade",
    description: "A zesty and vibrant lemonade that's as electrifying as it looks.",
    imageUrl: "https://images.unsplash.com/photo-1595981266686-0cf387d0a623?q=80&w=800",
    color: "from-blue-400 to-cyan-400",
  },
  {
    id: 3,
    name: "Crimson Berry Blast",
    description: "A rich concoction of mixed berries, bursting with antioxidants and flavor.",
    imageUrl: "https://images.unsplash.com/photo-1621495493132-2fc1fe9a0f44?q=80&w=800",
    color: "from-red-500 to-pink-500",
  },
  {
    id: 4,
    name: "Golden Ginger Fizz",
    description: "A refreshing and sparkling ginger ale with a touch of golden turmeric.",
    imageUrl: "https://images.unsplash.com/photo-1633596753085-05d5c02297c8?q=80&w=800",
    color: "from-amber-400 to-yellow-500",
  },
];

const BeverageCard: React.FC<{ beverage: Beverage; index: number }> = ({ beverage, index }) => {
    const cardVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: { duration: 0.5, delay: index * 0.1 }
        }
    };

    return (
        <motion.div
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            whileHover={{ y: -10, scale: 1.03 }}
            className="group relative rounded-3xl overflow-hidden shadow-lg bg-zinc-900"
        >
            <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${beverage.color}`}></div>
            <img src={`${beverage.imageUrl}&auto=format&fit=crop&w=800&h=900`} alt={beverage.name} className="w-full h-96 object-cover transform group-hover:scale-110 transition-transform duration-500" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20"></div>
            <div className="absolute bottom-0 left-0 p-6 text-white">
                <h3 className="text-2xl font-bold font-display">{beverage.name}</h3>
                <p className="text-brand-light/80 mt-2">{beverage.description}</p>
            </div>
        </motion.div>
    );
};

const FeaturedBeverages: React.FC = () => {
  return (
    <section id="drinks" className="py-20 sm:py-32 bg-brand-dark">
      <div className="container mx-auto px-6">
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold font-display">Our Signature Collection</h2>
          <p className="text-lg text-brand-light/70 mt-4 max-w-2xl mx-auto">
            Crafted to perfection. Each sip is an experience waiting to happen.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {beverages.map((bev, index) => (
            <BeverageCard key={bev.id} beverage={bev} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedBeverages;
