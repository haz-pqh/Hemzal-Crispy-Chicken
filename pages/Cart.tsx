
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../contexts/CartContext';
import { Trash2, ShoppingBag, ArrowLeft, Plus, Minus, CheckCircle2, Package, Mail, Loader2 } from 'lucide-react';
import { CartItem } from '../types';

const CartPage: React.FC = () => {
  const { cart, removeFromCart, clearCart, addToCart } = useCart();
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);
  const [lastOrder, setLastOrder] = useState<{ items: CartItem[], total: number } | null>(null);
  const [email, setEmail] = useState('');
  const [isSendingEmail, setIsSendingEmail] = useState(false);
  const [emailStatus, setEmailStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const subtotal = cart.reduce(
    (total, item) => {
      const priceValue = item.beverage.price ? parseFloat(item.beverage.price.replace('$', '')) : 0;
      return total + priceValue * item.quantity;
    },
    0
  );

  const handleCheckout = async () => {
    if (!email) {
      alert('Please enter your email address to receive order confirmation.');
      return;
    }

    const orderData = { items: [...cart], total: subtotal };
    setLastOrder(orderData);
    setIsOrderPlaced(true);
    clearCart();
    window.scrollTo(0, 0);

    // Send email notification
    setIsSendingEmail(true);
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, orderDetails: orderData }),
      });

      if (response.ok) {
        setEmailStatus('success');
      } else {
        setEmailStatus('error');
      }
    } catch (error) {
      console.error('Failed to send email:', error);
      setEmailStatus('error');
    } finally {
      setIsSendingEmail(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  };

  if (isOrderPlaced && lastOrder) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 sm:py-32 text-center">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center mb-8 mx-auto"
        >
          <CheckCircle2 className="w-12 h-12 text-green-500" />
        </motion.div>
        
        <h1 className="text-4xl font-bold text-white mb-4">Order Confirmed!</h1>
        <p className="text-brand-light/60 mb-6">
          Thank you for your purchase. Your refreshing beverages are being prepared and will be with you shortly.
        </p>

        {emailStatus === 'success' && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-2 text-green-400 mb-12 text-sm font-medium"
          >
            <Mail className="w-4 h-4" />
            Confirmation email sent to {email}
          </motion.div>
        )}

        {emailStatus === 'error' && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-2 text-brand-secondary mb-12 text-sm font-medium"
          >
            <Mail className="w-4 h-4" />
            Order confirmed, but we couldn't send the email notification.
          </motion.div>
        )}

        {isSendingEmail && (
          <div className="flex items-center justify-center gap-2 text-brand-light/40 mb-12 text-sm font-medium">
            <Loader2 className="w-4 h-4 animate-spin" />
            Sending confirmation email...
          </div>
        )}

        <div className="bg-white/5 border border-white/10 rounded-3xl p-8 text-left mb-12">
          <div className="flex items-center gap-3 mb-6 border-bottom border-white/10 pb-4">
            <Package className="w-5 h-5 text-brand-primary" />
            <h2 className="text-xl font-bold text-white">Order Details</h2>
          </div>
          
          <div className="space-y-4 mb-8">
            {lastOrder.items.map((item) => (
              <div key={item.beverage.id} className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <span className="text-brand-primary font-bold w-6">{item.quantity}x</span>
                  <span className="text-white">{item.beverage.name}</span>
                </div>
                <span className="text-brand-light/60">${(parseFloat(item.beverage.price.replace('$', '')) * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>

          <div className="h-px bg-white/10 my-6" />
          
          <div className="flex justify-between items-center text-xl font-bold">
            <span className="text-white">Total Paid</span>
            <span className="text-brand-primary">${lastOrder.total.toFixed(2)}</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => window.dispatchEvent(new CustomEvent('changePage', { detail: 'Home' }))}
            className="bg-white/5 border border-white/10 text-white font-bold py-4 px-8 rounded-2xl hover:bg-white/10 transition-all duration-300"
          >
            Back to Home
          </button>
          <button
            onClick={() => window.dispatchEvent(new CustomEvent('changePage', { detail: 'Drinks' }))}
            className="bg-brand-primary text-white font-bold py-4 px-8 rounded-2xl hover:shadow-[0px_0px_20px_rgba(255,69,0,0.4)] transition-all duration-300"
          >
            Order More
          </button>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mb-6"
        >
          <ShoppingBag className="w-10 h-10 text-brand-primary/40" />
        </motion.div>
        <h2 className="text-3xl font-bold text-white mb-4">Your cart is empty</h2>
        <p className="text-brand-light/60 mb-8 max-w-md">
          Looks like you haven't added any refreshing beverages to your cart yet.
        </p>
        <button
          onClick={() => window.dispatchEvent(new CustomEvent('changePage', { detail: 'Drinks' }))}
          className="bg-brand-primary text-white font-bold py-4 px-8 rounded-2xl hover:shadow-[0px_0px_20px_rgba(255,69,0,0.4)] transition-all duration-300 flex items-center gap-2"
        >
          <ArrowLeft className="w-5 h-5" />
          Browse Drinks
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-20 sm:py-32">
      <div className="flex flex-col md:flex-row gap-12">
        {/* Cart Items List */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-4xl font-bold text-white tracking-tight">Your Cart</h1>
            <button
              onClick={clearCart}
              className="text-brand-light/40 hover:text-brand-secondary transition-colors text-sm font-semibold flex items-center gap-2"
            >
              <Trash2 className="w-4 h-4" />
              Clear Cart
            </button>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-4"
          >
            {cart.map((item) => (
              <motion.div
                key={item.beverage.id}
                variants={itemVariants}
                className="bg-white/5 border border-white/10 rounded-3xl p-4 sm:p-6 flex items-center gap-4 sm:gap-6 group hover:border-brand-primary/30 transition-colors"
              >
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden bg-brand-dark flex-shrink-0">
                  <img
                    src={item.beverage.imageUrl}
                    alt={item.beverage.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="text-lg sm:text-xl font-bold text-white truncate">{item.beverage.name}</h3>
                  <p className="text-brand-primary font-bold">{item.beverage.price}</p>
                </div>

                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="flex items-center bg-white/5 rounded-xl p-1 border border-white/10">
                    <button
                      onClick={() => {
                        if (item.quantity > 1) {
                          addToCart(item.beverage, -1);
                        } else {
                          removeFromCart(item.beverage.id);
                        }
                      }}
                      className="w-8 h-8 flex items-center justify-center text-white hover:bg-white/10 rounded-lg transition-colors"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="w-8 text-center text-white font-bold">{item.quantity}</span>
                    <button
                      onClick={() => addToCart(item.beverage, 1)}
                      className="w-8 h-8 flex items-center justify-center text-white hover:bg-white/10 rounded-lg transition-colors"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.beverage.id)}
                    className="p-2 text-brand-light/20 hover:text-brand-secondary transition-colors"
                    aria-label="Remove item"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Order Summary */}
        <div className="w-full md:w-[380px]">
          <div className="bg-white/5 border border-white/10 rounded-3xl p-8 sticky top-32">
            <h2 className="text-2xl font-bold text-white mb-6">Order Summary</h2>
            
            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-brand-light/60">
                <span>Subtotal</span>
                <span className="text-white font-semibold">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-brand-light/60">
                <span>Shipping</span>
                <span className="text-brand-primary font-semibold">Free</span>
              </div>
              <div className="h-px bg-white/10 my-4" />
              <div className="flex justify-between text-xl font-bold text-white">
                <span>Total</span>
                <span className="text-brand-primary">${subtotal.toFixed(2)}</span>
              </div>
            </div>

            <div className="mb-6">
              <label htmlFor="email" className="block text-xs font-bold text-brand-light/40 uppercase mb-2 ml-1">
                Email for Confirmation
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-light/20" />
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-brand-light/20 focus:outline-none focus:border-brand-primary/50 transition-colors"
                  required
                />
              </div>
            </div>

            <button 
              onClick={handleCheckout}
              disabled={!email || cart.length === 0}
              className="w-full bg-gradient-to-r from-brand-primary to-brand-secondary text-white font-bold py-4 rounded-2xl hover:shadow-[0px_0px_30px_rgba(255,69,0,0.4)] transition-all duration-300 mb-4 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none"
            >
              Checkout Now
            </button>
            
            <p className="text-center text-brand-light/40 text-xs">
              Secure checkout powered by Hemzal Pay
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
