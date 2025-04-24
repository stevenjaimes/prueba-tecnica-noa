import { query } from "./strapi";

interface CATEGORY {
  id: number;
  documentId: string;
  name: string;
  slug: string;
  description: string;
  image: {
    formats:{
      medium: {
        url: string;
      } 
    },
    url: string;
  };
}

export function getCategories() {
  return query(
    "product-categories?fields[0]=name&fields[1]=slug&fields[2]=description&populate=*"
  )
    .then((res) => {
      return res.data.map((category: CATEGORY) => {
        const { id, documentId, name, slug, description, image: rawImage } = category;
        const image = rawImage.url
        return { id, documentId, name, slug, description, image };
      });
    })
    .catch((error) => {
      console.error("Error fetching categories:", error);
      throw error("Failed to fetch categories");
    });
}
