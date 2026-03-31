
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, ArrowLeft, Package, Calendar, DollarSign } from 'lucide-react';
import { CartItem } from '../types';

interface Order {
  id?: string;
  items: CartItem[];
  total: number;
  date: string;
}

const HistoryPage: React.FC = () => {
  const [orderHistory, setOrderHistory] = useState<Order[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('hemzal_order_history');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Migrate old data if necessary
        const migrated = parsed.map((order: any) => ({
          ...order,
          items: order.items.map((item: any) => ({
            ...item,
            chicken: item.chicken || item.beverage // Fallback for old data
          }))
        }));
        setOrderHistory(migrated);
      } catch (e) {
        console.error('Failed to parse order history:', e);
      }
    }
  }, []);

  if (orderHistory.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mb-6"
        >
          <ShoppingBag className="w-10 h-10 text-brand-primary/40" />
        </motion.div>
        <h2 className="text-3xl font-bold text-white mb-4">No order history found</h2>
        <p className="text-brand-light/60 mb-8 max-w-md">
          You haven't placed any orders yet. Once you do, they'll appear here!
        </p>
        <button
          onClick={() => window.dispatchEvent(new CustomEvent('changePage', { detail: 'Chickens' }))}
          className="bg-brand-primary text-white font-bold py-4 px-8 rounded-2xl hover:shadow-[0px_0px_20px_rgba(255,69,0,0.4)] transition-all duration-300 flex items-center gap-2"
        >
          <ArrowLeft className="w-5 h-5" />
          Browse Chickens
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-20 sm:py-32">
      <div className="flex items-center justify-between mb-12">
        <div>
          <h1 className="text-4xl font-bold text-white tracking-tight mb-2">Order History</h1>
          <p className="text-brand-light/40">Your last {orderHistory.length} crispy experiences</p>
        </div>
        <div className="hidden sm:block">
          <ShoppingBag className="w-12 h-12 text-brand-primary/20" />
        </div>
      </div>

      <div className="space-y-8">
        {orderHistory.map((order, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white/5 border border-white/10 rounded-[2rem] overflow-hidden group hover:border-brand-primary/30 transition-all duration-500"
          >
            <div className="p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-brand-primary/10 rounded-2xl flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-brand-primary" />
                  </div>
                  <div>
                    <p className="text-brand-light/40 text-xs font-bold uppercase tracking-widest mb-1">Order Date</p>
                    <p className="text-white font-bold">{order.date}</p>
                    {order.id && <p className="text-brand-primary text-[10px] font-mono font-bold mt-1 uppercase tracking-widest">#{order.id}</p>}
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-500/10 rounded-2xl flex items-center justify-center">
                    <DollarSign className="w-6 h-6 text-green-500" />
                  </div>
                  <div>
                    <p className="text-brand-light/40 text-xs font-bold uppercase tracking-widest mb-1">Total Amount</p>
                    <p className="text-white font-bold text-xl">${order.total.toFixed(2)}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-2 text-brand-light/40 text-xs font-bold uppercase tracking-widest mb-4">
                  <Package className="w-4 h-4" />
                  Items Ordered
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {order.items.map((item, i) => (
                    <div key={i} className="flex items-center gap-4 bg-white/5 rounded-2xl p-3 border border-white/5 group-hover:border-white/10 transition-colors">
                      <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0">
                        <img 
                          src={item.chicken?.imageUrl} 
                          alt={item.chicken?.name || 'Unknown Item'} 
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-white font-bold text-sm truncate">{item.chicken?.name || 'Unknown Item'}</p>
                        <p className="text-brand-primary text-xs font-bold">{item.quantity}x • {item.chicken?.price || '$0'}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-16 text-center">
        <button
          onClick={() => window.dispatchEvent(new CustomEvent('changePage', { detail: 'Chickens' }))}
          className="inline-flex items-center gap-2 text-brand-light/40 hover:text-brand-primary transition-colors font-bold"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Menu
        </button>
      </div>
    </div>
  );
};

export default HistoryPage;
