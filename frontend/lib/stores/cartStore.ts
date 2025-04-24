'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem, Perfume } from '@/types/perfumes';

interface CartState {
  items: CartItem[];
  addItem: (perfume: Perfume, quantity?: number) => void;
  removeItem: (perfumeId: string) => void;
  updateQuantity: (perfumeId: string, quantity: number) => void;
  clearCart: () => void;
  subtotal: number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      subtotal: 0,
      
      addItem: (perfume: Perfume, quantity = 1) => {
        const currentItems = get().items;
        const existingItem = currentItems.find(item => item.perfume.id === perfume.id);
        
        if (existingItem) {
          set({
            items: currentItems.map(item => 
              item.perfume.id === perfume.id 
                ? { ...item, quantity: item.quantity + quantity } 
                : item
            ),
          });
        } else {
          set({ items: [...currentItems, { perfume, quantity }] });
        }
        
        // Recalculate subtotal
        set(state => ({
          subtotal: state.items.reduce(
            (total, item) => total + item.perfume.price * item.quantity, 
            0
          )
        }));
      },
      
      removeItem: (perfumeId: string) => {
        set(state => ({
          items: state.items.filter(item => item.perfume.id !== perfumeId),
        }));

        set(state => ({
          subtotal: state.items.reduce(
            (total, item) => total + item.perfume.price * item.quantity, 
            0
          )
        }));
      },
      
      updateQuantity: (perfumeId: string, quantity: number) => {
        if (quantity <= 0) {
          get().removeItem(perfumeId);
          return;
        }
        
        set(state => ({
          items: state.items.map(item => 
            item.perfume.id === perfumeId 
              ? { ...item, quantity } 
              : item
          ),
        }));
        
     
        set(state => ({
          subtotal: state.items.reduce(
            (total, item) => total + item.perfume.price * item.quantity, 
            0
          )
        }));
      },
      
      clearCart: () => {
        set({ items: [], subtotal: 0 });
      },
    }),
    {
      name: 'cart-storage',
    }
  )
);