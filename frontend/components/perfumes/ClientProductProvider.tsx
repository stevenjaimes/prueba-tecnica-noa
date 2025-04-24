'use client';

import { useEffect } from 'react';
import { useProductStore } from '@/lib/stores/productStore';
import { Perfume } from '@/types/perfumes';

export default function ClientProductProvider({ products }: { products: Perfume[] }) {
  const setProducts = useProductStore((state) => state.setProducts);

    
  useEffect(() => {
    setProducts(products);
  }, [products, setProducts]);

  return null; 
}
