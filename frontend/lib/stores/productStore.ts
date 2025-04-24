import { create } from 'zustand';
import { Perfume } from '@/types/perfumes';

interface ProductStore {
  products: Perfume[];
  setProducts: (products: Perfume[]) => void;
}

export const useProductStore = create<ProductStore>((set) => ({
  products: [],
  setProducts: (products) => set({ products }),
}));
