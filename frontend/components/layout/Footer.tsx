"use client";

import Link from "next/link";
import { Instagram, Facebook, Twitter } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();
  
  return (
    <footer className="bg-neutral-50 dark:bg-neutral-900 border-t border-neutral-200 dark:border-neutral-800">
      <div className="container px-4 py-12 mx-auto">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="space-y-4">
            <h3 className="text-lg font-cormorant font-semibold">Esencia</h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              Descubre nuestra exclusiva colección de perfumes de lujo creados para evocar emociones y recuerdos.
            </p>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider">Tienda</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/perfumes" className="text-sm text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100">
                  Todos los Perfumes
                </Link>
              </li>
              <li>
                <Link href="/brands" className="text-sm text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100">
                  Marcas
                </Link>
              </li>
              <li>
                <Link href="/collections" className="text-sm text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100">
                  Colecciones
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider">Empresa</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-sm text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100">
                  Sobre Nosotros
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100">
                  Contacto
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-sm text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100">
                  Blog
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider">Conéctate</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100">
                <span className="sr-only">Instagram</span>
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100">
                <span className="sr-only">Facebook</span>
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100">
                <span className="sr-only">Twitter</span>
                <Twitter className="h-5 w-5" />
              </a>
            </div>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              Suscríbete a nuestro boletín para recibir ofertas exclusivas y novedades.
            </p>
          </div>
        </div>
        
        <div className="pt-8 mt-8 border-t border-neutral-200 dark:border-neutral-800">
          <p className="text-sm text-center text-neutral-500">
            &copy; {year} Esencia Perfumes de Lujo. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
