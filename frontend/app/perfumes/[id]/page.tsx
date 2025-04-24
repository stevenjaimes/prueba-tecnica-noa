import { getProducts, getPerfumeById } from "@/lib/get-products";
import { Perfume } from "@/types/perfumes";
import Link from "next/link";
import { ShoppingCart, ChevronRight } from "lucide-react";
import { NotaFinal } from "@/types/perfumes";


export const dynamicParams = true;

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((product: Perfume) => ({
    id: product.documentId
  }));
}

function getDescriptionText(description: any[]): string {
  if (!description || !description.length) return '';
  const firstParagraph = description.find(item => item.type === 'paragraph');
  if (!firstParagraph) return '';
  return firstParagraph.children
    .filter((child: any) => child.type === 'text')
    .map((child: any) => child.text)
    .join(' ');
}

function extractNotes(fragancia: any[]) {
  return {
    topNotes: fragancia.find(f => f.type === 'topNotes')?.notasfinal.map((n: NotaFinal) => n.notasFinal) || [],
    middleNotes: fragancia.find(f => f.type === 'middleNotes')?.notasfinal.map((n: NotaFinal) => n.notasFinal) || [],
    baseNotes: fragancia.find(f => f.type === 'baseNotes')?.notasfinal.map((n: NotaFinal) => n.notasFinal) || []
  };
}

export default async function ProductPage({ params }: { params: { id: string } }) {
  const product = await getPerfumeById(params.id);
  const allProducts = await getProducts();

  if (!product) {
    return (
      <div className="text-center py-20">
        <h1 className="text-2xl font-serif mb-4">Producto no encontrado</h1>
        <Link href="/" className="text-primary hover:underline">
          Volver a la tienda
        </Link>
      </div>
    );
  }

  const descriptionText = getDescriptionText(product.description);
  const { topNotes, middleNotes, baseNotes } = extractNotes(product.fragancia);



  return (
    <div className="bg-background text-foreground min-h-screen">
      {/* Migas de pan */}
      <div className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-3">
          <nav className="flex items-center text-sm">
            <Link href="/" className="text-primary hover:underline">Inicio</Link>
            <ChevronRight className="mx-2 h-4 w-4 text-muted-foreground" />
            <Link href="/perfumes" className="text-primary hover:underline">Perfumes</Link>
            <ChevronRight className="mx-2 h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">{product.name}</span>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Gallery */}
          <div className="sticky top-4">
            <div className="bg-card rounded-xl shadow-lg overflow-hidden">
              <img
                src={product.imageUrl.url}
                alt={product.name}
                className="w-full h-auto object-cover aspect-square"
              />
            </div>
          </div>

          {/* Product Info */}
          <div>
            <div className="mb-6">
              <h1 className="font-serif text-4xl font-medium mb-2">{product.name}</h1>
              <p className="text-xl text-muted-foreground">{product.brand}</p>
            </div>

            {/* Price and Size - Mejor separados */}
            <div className="mb-8 space-y-2">
              <div className="flex items-baseline">
                <span className="font-serif text-3xl font-medium">${product.price}</span>
              </div>
              {product.size && (
                <div className="text-muted-foreground">
                  <span className="font-medium">Tamaño:</span> {product.size}
                </div>
              )}
            </div>

            {/* Description */}
            <div className="mb-8">
              <h2 className="font-serif text-xl font-medium mb-4">Descripción</h2>
              <p className="text-muted-foreground leading-relaxed">{descriptionText}</p>
            </div>

            {/* Fragrance Notes */}
            <div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="border border-border rounded-lg p-4">
                <h3 className="font-serif font-medium mb-2">Notas Superiores</h3>
                <ul className="text-muted-foreground">
                  {topNotes.map((note: string, i: number) => (
                    <li key={i} className="mb-1">• {note}</li>
                  ))}
                </ul>
              </div>
              <div className="border border-border rounded-lg p-4">
                <h3 className="font-serif font-medium mb-2">Notas Medias</h3>
                <ul className="text-muted-foreground">
                  {middleNotes.map((note: string, i: number) => (
                    <li key={i} className="mb-1">• {note}</li>
                  ))}
                </ul>
              </div>
              <div className="border border-border rounded-lg p-4">
                <h3 className="font-serif font-medium mb-2">Notas Base</h3>
                <ul className="text-muted-foreground">
                  {baseNotes.map((note: string, i: number) => (
                    <li key={i} className="mb-1">• {note}</li>
                  ))}
                </ul>
              </div>
            </div>

        
            <div className="pt-6 border-t border-border">
              <AddToCartButton product={product} />
            </div>
          </div>
        </div>

      </main>
    </div>
  );
}


function AddToCartButton({ product }: { product: Perfume }) {
  return (
    <button
      className="w-full bg-primary hover:bg-primary/90 text-white py-3 px-6 rounded-md flex items-center justify-center gap-2 transition-colors duration-200"
    >
      <ShoppingCart className="h-4 w-4" />
      <span className="font-medium">Añadir al carrito</span>
    </button>
  );
}