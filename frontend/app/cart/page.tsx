'use client';

import { useCartStore } from '@/lib/stores/cartStore';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

export default function CartPage() {
  const [mounted, setMounted] = useState(false);
  const { items, removeItem, updateQuantity, subtotal, clearCart } = useCartStore();

  // Prevenir desajustes de hidratación
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="font-serif text-3xl md:text-4xl font-medium mb-4 text-center">Tu Carrito de Compras</h1>
      <p className="text-muted-foreground text-center mb-12">
        Revisa tus artículos y procede al pago
      </p>

      {items.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <div className="bg-card border rounded-lg overflow-hidden">
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="font-serif text-xl font-medium">Artículos en el carrito ({items.length})</h2>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-muted-foreground hover:text-destructive"
                    onClick={() => clearCart()}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Limpiar todo
                  </Button>
                </div>

                <Separator className="mb-6" />

                <AnimatePresence initial={false}>
                  {items.map((item) => (
                    <motion.div 
                      key={item.perfume.id}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="flex items-center gap-4 py-4 border-b last:border-0">
                        <div className="h-24 w-24 rounded-md overflow-hidden flex-shrink-0">
                          <img 
                            src={item.perfume.imageUrl.url} 
                            alt={item.perfume.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        
                        <div className="flex-grow">
                          <div className="flex justify-between">
                            <div>
                              <h3 className="font-medium">{item.perfume.name}</h3>
                              <p className="text-sm text-muted-foreground">{item.perfume.brand}</p>
                              <p className="text-sm text-muted-foreground">{item.perfume.size}</p>
                            </div>
                            <p className="font-medium">${item.perfume.price}</p>
                          </div>
                          
                          <div className="flex items-center justify-between mt-2">
                            <div className="flex items-center border rounded-md">
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                onClick={() => updateQuantity(item.perfume.id, item.quantity - 1)}
                                disabled={item.quantity <= 1}
                                className="h-8 w-8"
                              >
                                <Minus className="h-3 w-3" />
                              </Button>
                              <span className="w-8 text-center text-sm">{item.quantity}</span>
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                onClick={() => updateQuantity(item.perfume.id, item.quantity + 1)}
                                className="h-8 w-8"
                              >
                                <Plus className="h-3 w-3" />
                              </Button>
                            </div>
                            
                            <Button 
                              variant="ghost"
                              size="sm" 
                              className="text-muted-foreground hover:text-destructive"
                              onClick={() => removeItem(item.perfume.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </div>
          
          <div>
            <div className="bg-card border rounded-lg overflow-hidden sticky top-20">
              <div className="p-6">
                <h2 className="font-serif text-xl font-medium mb-4">Resumen del Pedido</h2>
                
                <Separator className="mb-6" />
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Envío</span>
                    <span>Gratis</span>
                  </div>
                </div>
                
                <Separator className="mb-6" />
                
                <div className="flex justify-between mb-8">
                  <span className="font-medium">Total</span>
                  <span className="font-medium">${subtotal.toFixed(2)}</span>
                </div>
                
                <Button className="w-full mb-2">
                  Proceder al pago
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                
                <Link href="/perfumes">
                  <Button variant="outline" className="w-full">
                    Seguir comprando
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-16">
          <div className="flex justify-center mb-6">
            <div className="h-24 w-24 rounded-full bg-muted flex items-center justify-center">
              <ShoppingBag className="h-12 w-12 text-muted-foreground" />
            </div>
          </div>
          <h2 className="font-serif text-xl font-medium mb-4">Tu carrito está vacío</h2>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            Parece que aún no has añadido ningún perfume a tu carrito. Explora nuestra colección para encontrar tu fragancia perfecta.
          </p>
          <Link href="/perfumes">
            <Button>
              Ver Colección
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}
