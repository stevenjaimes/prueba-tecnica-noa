import { Button } from '@/components/ui/button';
import FeaturedPerfumes from '@/components/perfumes/FeaturedPerfumes';
import BrandHighlights from '@/components/perfumes/BrandHighlights';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { getProducts } from '@/lib/get-products';
import ClientProductProvider from '@/components/perfumes/ClientProductProvider';


const products = await getProducts();


export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[600px] bg-hero bg-cover bg-center">
        <div className="absolute inset-0 bg-black/30" />
        <div className="container mx-auto px-4 h-full flex items-center justify-center relative z-10">
          <div className="text-center text-white max-w-3xl mx-auto">
            <h1 className="font-serif text-5xl md:text-7xl font-medium mb-4 tracking-tight">Descubre tu fragancia distintiva</h1>
            <p className="text-lg md:text-xl mb-8 max-w-xl mx-auto">
            Explora nuestra cuidada colección de fragancias de lujo de las casas perfumistas más prestigiosas del mundo.
            </p>
            <Link href="/perfumes">
              <Button className="bg-primary hover:bg-primary/90 text-white py-3 px-8 rounded-md text-lg">
                Comprar colección
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Perfumes */}
      <section className="py-20 bg-secondary/50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <h2 className="font-serif text-3xl md:text-4xl font-medium">Fragancias exclusivas</h2>
            <Link href="/perfumes" className="flex items-center text-primary hover:underline">
              Ver todos <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
          <FeaturedPerfumes  perfumes={products} />
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-white dark:bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-serif text-3xl md:text-4xl font-medium mb-6">El arte de la perfumeria</h2>
              <p className="text-muted-foreground mb-8">
              En Essence, creemos que una fragancia es mucho más que un aroma: es una expresión de individualidad, un recuerdo atrapado en una botella, una declaración de estilo personal.
              Nuestra cuidada colección reúne las mejores fragancias del mundo, cada una con una historia única que contar.
              </p>
              <p className="text-muted-foreground mb-8">
              Ya sea que estés buscando tu aroma distintivo o ampliar tu colección, nuestro equipo de expertos está dedicado a ayudarte a descubrir fragancias que resuenen con tu personalidad y estilo.
              </p>
              <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white">
                Nuestra historia
              </Button>
            </div>
            <div className="relative">
              <img 
                src="https://www.idfdesign.com/images/luxury-classic-accessories/perfume-bottles-living-rooms-3.jpg" 
                alt="Luxury perfume bottles" 
                className="rounded-lg shadow-xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-accent p-4 rounded-lg shadow-lg">
                <p className="font-serif text-2xl font-medium">Artesanía en cada botella</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Brand Highlights */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <h2 className="font-serif text-3xl md:text-4xl font-medium text-center mb-12">Prestigious Houses</h2>
          <BrandHighlights />
        </div>
      </section>

      {/* Sección de Newsletter */}
<section className="py-20 bg-primary text-white">
  <div className="container mx-auto px-4 text-center">
    <h2 className="font-serif text-3xl md:text-4xl font-medium mb-4">Únete a Nuestra Experiencia de Fragancias</h2>
    <p className="text-lg mb-8 max-w-xl mx-auto">
      Suscríbete para recibir actualizaciones sobre nuevos lanzamientos, ofertas exclusivas y consejos de fragancias.
    </p>
    <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
      <input 
        type="email" 
        placeholder="Tu dirección de correo electrónico" 
        className="flex-grow px-4 py-3 rounded-md text-black bg-white focus:outline-none focus:ring-2 focus:ring-accent"
      />
      <Button className="bg-accent text-black hover:bg-accent/90 whitespace-nowrap">
        Suscribirse
      </Button>
    </div>
  </div>
</section>
<ClientProductProvider products={products} />
    </div>
  );
}