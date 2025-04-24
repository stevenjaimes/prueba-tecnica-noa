interface TextNode {
    type: 'text';
    text: string;
  }
  
  interface ParagraphNode {
    type: 'paragraph';
    children: TextNode[];
  }
  
  type DescriptionNode = ParagraphNode;
  
  interface ImageUrl {
    id: number;
    documentId: string;
    url: string;
  }
  
  interface Category {
    id: number;
    documentId: string;
    name: string;
  }
  
 export interface NotaFinal {
    id: number;
    notasFinal: string;
  }
  
  interface FraganciaNote {
    id: number;
    type: 'topNotes' | 'middleNotes' | 'baseNotes';
    notasfinal: NotaFinal[];
  }
  
  export interface Perfume {
    id: number;
    documentId: string;
    name: string;
    price: number;
    brand: string;
    description: DescriptionNode[];
    size: string;
    inStock: boolean;
    featured: boolean;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    imageUrl: ImageUrl;
    categories: Category[];
    fragancia: FraganciaNote[];
  }
  
  interface Pagination {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
  }
  
  interface Meta {
    pagination: Pagination;
  }
  
  export interface PerfumeApiResponse {
    data: Perfume[];
    meta: Meta;
  }
  
  