
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Chicken } from '../types';
import { useCart } from '../contexts/CartContext';

const chickens: Chicken[] = [
  {
    id: 1,
    name: "Classic Crispy Drumstick",
    description: "Our signature drumstick, marinated in 11 secret herbs and spices, fried to golden perfection.",
    imageUrl: "https://images.unsplash.com/photo-1562967914-608f82629710?q=80&w=800",
    price: "$3.99",
    category: "Classic",
    color: "from-orange-400 to-red-500",
    ingredients: ["Fresh Chicken Drumstick", "Secret Spice Blend", "Buttermilk", "Flour", "Vegetable Oil"],
    nutritionalFacts: {
      calories: "280 kcal",
      protein: "22g",
      fat: "18g"
    }
  },
  {
    id: 2,
    name: "Spicy Buffalo Wings",
    description: "Tossed in our house-made spicy buffalo sauce, served with a side of cooling ranch.",
    imageUrl: "https://images.unsplash.com/photo-1567620832903-9fc6debc209f?q=80&w=800",
    price: "$8.50",
    category: "Wings",
    color: "from-red-500 to-orange-600",
    ingredients: ["Chicken Wings", "Buffalo Sauce", "Cayenne Pepper", "Butter", "Garlic Powder"],
    nutritionalFacts: {
      calories: "450 kcal",
      protein: "35g",
      fat: "32g"
    }
  },
  {
    id: 3,
    name: "Honey Garlic Thighs",
    description: "Juicy chicken thighs glazed with a sweet and savory honey garlic sauce.",
    imageUrl: "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?q=80&w=800",
    price: "$5.25",
    category: "Glazed",
    color: "from-yellow-500 to-amber-600",
    ingredients: ["Chicken Thighs", "Natural Honey", "Minced Garlic", "Soy Sauce", "Ginger"],
    nutritionalFacts: {
      calories: "320 kcal",
      protein: "28g",
      fat: "14g"
    }
  },
  {
    id: 4,
    name: "Lemon Herb Breast",
    description: "Grilled chicken breast infused with fresh lemon zest and garden herbs.",
    imageUrl: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?q=80&w=800",
    price: "$7.50",
    category: "Grilled",
    color: "from-green-400 to-yellow-500",
    ingredients: ["Chicken Breast", "Lemon Zest", "Rosemary", "Thyme", "Olive Oil"],
    nutritionalFacts: {
      calories: "210 kcal",
      protein: "42g",
      fat: "4g"
    }
  },
  {
    id: 5,
    name: "Korean Fried Chicken",
    description: "Double-fried for extra crunch, coated in a spicy and sweet gochujang glaze.",
    imageUrl: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?q=80&w=800",
    price: "$9.99",
    category: "Specialty",
    color: "from-red-600 to-rose-700",
    ingredients: ["Chicken Pieces", "Gochujang", "Rice Flour", "Sesame Seeds", "Garlic"],
    nutritionalFacts: {
      calories: "520 kcal",
      protein: "38g",
      fat: "28g"
    }
  },
  {
    id: 6,
    name: "Southern Fried Strips",
    description: "Tender chicken strips breaded in a traditional southern-style cornmeal mix.",
    imageUrl: "https://images.unsplash.com/photo-1562967914-608f82629710?q=80&w=800",
    price: "$6.25",
    category: "Strips",
    color: "from-amber-400 to-orange-500",
    ingredients: ["Chicken Tenderloins", "Cornmeal", "Black Pepper", "Paprika", "Buttermilk"],
    nutritionalFacts: {
      calories: "380 kcal",
      protein: "32g",
      fat: "20g"
    }
  },
  {
    id: 7,
    name: "Teriyaki Glazed Wings",
    description: "Sweet and sticky teriyaki glaze with toasted sesame seeds and green onions.",
    imageUrl: "https://images.unsplash.com/photo-1527477396000-e27163b481c2?q=80&w=800",
    price: "$8.75",
    category: "Wings",
    color: "from-zinc-700 to-zinc-900",
    ingredients: ["Chicken Wings", "Teriyaki Sauce", "Sesame Seeds", "Green Onions", "Ginger"],
    nutritionalFacts: {
      calories: "410 kcal",
      protein: "34g",
      fat: "26g"
    }
  },
  {
    id: 8,
    name: "Garlic Parmesan Bites",
    description: "Bite-sized chicken pieces tossed in garlic butter and aged parmesan cheese.",
    imageUrl: "https://images.unsplash.com/photo-1569058242253-92a9c71f9867?q=80&w=800",
    price: "$7.25",
    category: "Specialty",
    color: "from-yellow-200 to-yellow-400",
    ingredients: ["Chicken Breast Bites", "Parmesan Cheese", "Garlic Butter", "Parsley", "Breadcrumbs"],
    nutritionalFacts: {
      calories: "350 kcal",
      protein: "30g",
      fat: "22g"
    }
  }
];

const ChickenCard: React.FC<{ chicken: Chicken; index: number; onSelect: (chk: Chicken) => void }> = ({ chicken, index, onSelect }) => {
    const cardVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: { duration: 0.5, delay: index * 0.05 }
        }
    };

    return (
        <motion.div
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            whileHover={{ y: -10, scale: 1.03 }}
            onClick={() => onSelect(chicken)}
            className="group relative rounded-3xl overflow-hidden shadow-lg bg-zinc-900 cursor-pointer"
        >
            <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${chicken.color}`}></div>
            <img src={`${chicken.imageUrl}&auto=format&fit=crop&w=800&h=900`} alt={chicken.name} className="w-full h-96 object-cover transform group-hover:scale-110 transition-transform duration-500" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20"></div>
            <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-white uppercase tracking-widest border border-white/10">
                {chicken.category}
            </div>
            <div className="absolute bottom-0 left-0 p-6 text-white w-full">
                <h3 className="text-2xl font-bold font-display">{chicken.name}</h3>
                <p className="text-brand-light/80 mt-2 line-clamp-2">{chicken.description}</p>
                <div className="mt-4 flex items-center justify-between">
                    <span className="text-brand-primary font-bold text-xl">{chicken.price}</span>
                    <div className="flex items-center text-brand-primary font-semibold text-sm">
                        View Details
                        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

const FeaturedChickens: React.FC = () => {
  const [selectedChk, setSelectedChk] = useState<Chicken | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 15]);
  const { addToCart } = useCart();

  const categories = ["All", ...Array.from(new Set(chickens.map(b => b.category)))];

  const filteredChickens = chickens.filter(chk => {
    const priceValue = parseFloat(chk.price.replace('$', ''));
    const matchesCategory = activeCategory === "All" || chk.category === activeCategory;
    const matchesPrice = priceValue >= priceRange[0] && priceValue <= priceRange[1];
    return matchesCategory && matchesPrice;
  });

  const handleAddToCart = () => {
    if (selectedChk) {
      addToCart(selectedChk, quantity);
      setSelectedChk(null);
      setQuantity(1);
    }
  };

  return (
    <section id="chickens" className="py-20 sm:py-32 bg-brand-dark">
      <div className="container mx-auto px-6">
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold font-display">Our Signature Chickens</h2>
          <p className="text-lg text-brand-light/70 mt-4 max-w-2xl mx-auto">
            Crispy, juicy, and seasoned to perfection. Discover your new favorite.
          </p>
        </motion.div>

        {/* Filters */}
        <div className="mb-12 space-y-8">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2 rounded-full font-bold transition-all duration-300 border-2 ${
                  activeCategory === cat 
                    ? "bg-brand-primary border-brand-primary text-white shadow-[0px_0px_15px_rgba(255,69,0,0.4)]" 
                    : "bg-transparent border-white/10 text-brand-light/60 hover:border-brand-primary/50 hover:text-brand-primary"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="max-w-md mx-auto">
            <div className="flex justify-between items-center mb-4">
              <span className="text-brand-light/60 font-bold uppercase text-xs tracking-widest">Price Range</span>
              <span className="text-brand-primary font-bold">${priceRange[0]} - ${priceRange[1]}</span>
            </div>
            <input 
              type="range" 
              min="0" 
              max="15" 
              step="0.5"
              value={priceRange[1]}
              onChange={(e) => setPriceRange([priceRange[0], parseFloat(e.target.value)])}
              className="w-full h-2 bg-white/5 rounded-lg appearance-none cursor-pointer accent-brand-primary"
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredChickens.map((chk, index) => (
              <ChickenCard key={chk.id} chicken={chk} index={index} onSelect={setSelectedChk} />
            ))}
          </AnimatePresence>
        </div>

        {filteredChickens.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="text-brand-light/40 text-xl italic">No chickens match your current filters.</p>
            <button 
              onClick={() => { setActiveCategory("All"); setPriceRange([0, 15]); }}
              className="mt-4 text-brand-primary font-bold hover:underline"
            >
              Reset Filters
            </button>
          </motion.div>
        )}

        <AnimatePresence>
          {selectedChk && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setSelectedChk(null)}
                    className="absolute inset-0 bg-black/90 backdrop-blur-sm"
                />
                <motion.div 
                    layoutId={`chk-${selectedChk.id}`}
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                    className="relative bg-zinc-900 rounded-3xl overflow-hidden max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-white/10"
                >
                    <button 
                        onClick={() => setSelectedChk(null)}
                        className="absolute top-4 right-4 z-50 bg-black/50 hover:bg-black/80 text-white p-2 rounded-full transition-colors"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>

                    <div className="flex flex-col md:flex-row">
                        <div className="md:w-1/2 h-64 md:h-auto">
                            <img src={`${selectedChk.imageUrl}&auto=format&fit=crop&w=1000&h=1200`} alt={selectedChk.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="md:w-1/2 p-8 md:p-12">
                            <div className={`w-16 h-1 bg-gradient-to-r ${selectedChk.color} mb-6`}></div>
                            <h3 className="text-4xl font-bold font-display text-white mb-4">{selectedChk.name}</h3>
                            <p className="text-brand-light/70 text-lg mb-8 leading-relaxed">{selectedChk.description}</p>
                            
                            <div className="space-y-8">
                                <div>
                                    <h4 className="text-brand-primary font-bold uppercase tracking-wider text-sm mb-4">Ingredients</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {selectedChk.ingredients?.map((ing, i) => (
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
                                            <p className="text-lg font-bold text-white">{selectedChk.nutritionalFacts?.calories}</p>
                                        </div>
                                        <div className="bg-white/5 p-4 rounded-2xl border border-white/5 text-center">
                                            <p className="text-xs text-brand-light/50 uppercase mb-1">Protein</p>
                                            <p className="text-lg font-bold text-white">{selectedChk.nutritionalFacts?.protein}</p>
                                        </div>
                                        <div className="bg-white/5 p-4 rounded-2xl border border-white/5 text-center">
                                            <p className="text-xs text-brand-light/50 uppercase mb-1">Fat</p>
                                            <p className="text-lg font-bold text-white">{selectedChk.nutritionalFacts?.fat}</p>
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
                                onClick={() => setSelectedChk(null)}
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

export default FeaturedChickens;
