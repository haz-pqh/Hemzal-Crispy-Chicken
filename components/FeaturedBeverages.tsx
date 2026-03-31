
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Beverage } from '../types';
import { useCart } from '../contexts/CartContext';

const beverages: Beverage[] = [
  {
    id: 1,
    name: "Spicy Mango Tango",
    description: "A fiery blend of sweet mango and a hint of chili, perfect for the adventurous.",
    imageUrl: "https://images.unsplash.com/photo-1600096194534-95cf5ece1469?q=80&w=800",
    price: "$5.99",
    color: "from-yellow-400 to-orange-500",
    ingredients: ["Fresh Mango Pulp", "Chili Flakes", "Lime Juice", "Agave Syrup", "Sparkling Water"],
    nutritionalFacts: {
      calories: "120 kcal",
      sugar: "24g",
      fat: "0g"
    }
  },
  {
    id: 2,
    name: "Electric Blue Lemonade",
    description: "A zesty and vibrant lemonade that's as electrifying as it looks.",
    imageUrl: "https://images.unsplash.com/photo-1595981266686-0cf387d0a623?q=80&w=800",
    price: "$4.50",
    color: "from-blue-400 to-cyan-400",
    ingredients: ["Lemon Juice", "Blue Curacao Syrup", "Mint Leaves", "Cane Sugar", "Crushed Ice"],
    nutritionalFacts: {
      calories: "150 kcal",
      sugar: "32g",
      fat: "0g"
    }
  },
  {
    id: 3,
    name: "Crimson Berry Blast",
    description: "A rich concoction of mixed berries, bursting with antioxidants and flavor.",
    imageUrl: "https://images.unsplash.com/photo-1621495493132-2fc1fe9a0f44?q=80&w=800",
    price: "$6.25",
    color: "from-red-500 to-pink-500",
    ingredients: ["Raspberries", "Blueberries", "Strawberries", "Pomegranate Juice", "Honey"],
    nutritionalFacts: {
      calories: "140 kcal",
      sugar: "28g",
      fat: "0.5g"
    }
  },
  {
    id: 4,
    name: "Golden Ginger Fizz",
    description: "A refreshing and sparkling ginger ale with a touch of golden turmeric.",
    imageUrl: "https://images.unsplash.com/photo-1633596753085-05d5c02297c8?q=80&w=800",
    price: "$5.50",
    color: "from-amber-400 to-yellow-500",
    ingredients: ["Fresh Ginger Root", "Turmeric Powder", "Lemon Zest", "Sparkling Water", "Maple Syrup"],
    nutritionalFacts: {
      calories: "90 kcal",
      sugar: "18g",
      fat: "0g"
    }
  },
];

const BeverageCard: React.FC<{ beverage: Beverage; index: number; onSelect: (bev: Beverage) => void }> = ({ beverage, index, onSelect }) => {
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
            onClick={() => onSelect(beverage)}
            className="group relative rounded-3xl overflow-hidden shadow-lg bg-zinc-900 cursor-pointer"
        >
            <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${beverage.color}`}></div>
            <img src={`${beverage.imageUrl}&auto=format&fit=crop&w=800&h=900`} alt={beverage.name} className="w-full h-96 object-cover transform group-hover:scale-110 transition-transform duration-500" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20"></div>
            <div className="absolute bottom-0 left-0 p-6 text-white w-full">
                <h3 className="text-2xl font-bold font-display">{beverage.name}</h3>
                <p className="text-brand-light/80 mt-2 line-clamp-2">{beverage.description}</p>
                <div className="mt-4 flex items-center text-brand-primary font-semibold text-sm">
                    View Details
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </div>
            </div>
        </motion.div>
    );
};

const FeaturedBeverages: React.FC = () => {
  const [selectedBev, setSelectedBev] = useState<Beverage | null>(null);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    if (selectedBev) {
      addToCart(selectedBev, quantity);
      setSelectedBev(null);
      setQuantity(1);
    }
  };

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
            <BeverageCard key={bev.id} beverage={bev} index={index} onSelect={setSelectedBev} />
          ))}
        </div>

        <AnimatePresence>
          {selectedBev && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setSelectedBev(null)}
                    className="absolute inset-0 bg-black/90 backdrop-blur-sm"
                />
                <motion.div 
                    layoutId={`bev-${selectedBev.id}`}
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                    className="relative bg-zinc-900 rounded-3xl overflow-hidden max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-white/10"
                >
                    <button 
                        onClick={() => setSelectedBev(null)}
                        className="absolute top-4 right-4 z-50 bg-black/50 hover:bg-black/80 text-white p-2 rounded-full transition-colors"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>

                    <div className="flex flex-col md:flex-row">
                        <div className="md:w-1/2 h-64 md:h-auto">
                            <img src={`${selectedBev.imageUrl}&auto=format&fit=crop&w=1000&h=1200`} alt={selectedBev.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="md:w-1/2 p-8 md:p-12">
                            <div className={`w-16 h-1 bg-gradient-to-r ${selectedBev.color} mb-6`}></div>
                            <h3 className="text-4xl font-bold font-display text-white mb-4">{selectedBev.name}</h3>
                            <p className="text-brand-light/70 text-lg mb-8 leading-relaxed">{selectedBev.description}</p>
                            
                            <div className="space-y-8">
                                <div>
                                    <h4 className="text-brand-primary font-bold uppercase tracking-wider text-sm mb-4">Ingredients</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {selectedBev.ingredients?.map((ing, i) => (
                                            <span key={i} className="bg-white/5 border border-white/10 px-3 py-1 rounded-full text-sm text-brand-light/90">
                                                {ing}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <h4 className="text-brand-primary font-bold uppercase tracking-wider text-sm mb-4">Nutritional Facts</h4>
                                    <div className="grid grid-cols-3 gap-4">
                                        <div className="bg-white/5 p-4 rounded-2xl border border-white/5 text-center">
                                            <p className="text-xs text-brand-light/50 uppercase mb-1">Calories</p>
                                            <p className="text-lg font-bold text-white">{selectedBev.nutritionalFacts?.calories}</p>
                                        </div>
                                        <div className="bg-white/5 p-4 rounded-2xl border border-white/5 text-center">
                                            <p className="text-xs text-brand-light/50 uppercase mb-1">Sugar</p>
                                            <p className="text-lg font-bold text-white">{selectedBev.nutritionalFacts?.sugar}</p>
                                        </div>
                                        <div className="bg-white/5 p-4 rounded-2xl border border-white/5 text-center">
                                            <p className="text-xs text-brand-light/50 uppercase mb-1">Fat</p>
                                            <p className="text-lg font-bold text-white">{selectedBev.nutritionalFacts?.fat}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-10 flex flex-col sm:flex-row gap-4">
                                <div className="flex items-center bg-white/5 border border-white/10 rounded-2xl p-1">
                                    <motion.button 
                                        whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }}
                                        whileTap={{ scale: 0.9 }}
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                        className="w-12 h-12 flex items-center justify-center text-white rounded-xl transition-colors outline-none focus:ring-2 focus:ring-brand-primary/50"
                                        aria-label="Decrease quantity"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" /></svg>
                                    </motion.button>
                                    <span className="w-12 text-center text-white font-bold text-lg tabular-nums">{quantity}</span>
                                    <motion.button 
                                        whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }}
                                        whileTap={{ scale: 0.9 }}
                                        onClick={() => setQuantity(quantity + 1)}
                                        className="w-12 h-12 flex items-center justify-center text-white rounded-xl transition-colors outline-none focus:ring-2 focus:ring-brand-primary/50"
                                        aria-label="Increase quantity"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                                    </motion.button>
                                </div>
                                <button 
                                    onClick={handleAddToCart}
                                    className="flex-1 bg-gradient-to-r from-brand-primary to-brand-secondary text-white font-bold py-4 px-8 rounded-2xl hover:shadow-[0px_0px_20px_rgba(255,69,0,0.4)] transition-all duration-300"
                                >
                                    Add to Cart
                                </button>
                            </div>

                            <button 
                                onClick={() => setSelectedBev(null)}
                                className="mt-4 w-full text-brand-light/50 hover:text-white transition-colors duration-300 text-sm font-semibold"
                            >
                                Close Details
                            </button>
                        </div>
                    </div>
                </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default FeaturedBeverages;
