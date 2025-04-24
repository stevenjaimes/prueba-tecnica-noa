import { query } from "./strapi";

const { STRAPI_HOST } = process.env;

export async function getProducts() {
  try {
    const res = await query(
      `perfumes?populate[imageUrl][fields][0]=url&populate[categories][fields][0]=name&populate[fragancia][populate][0]=notasfinal`
    );

    if (!res || !res.data) {
      console.warn("No se encontraron datos para los productos.");
      return [];
    }

    const perfumes = res.data.map((perfume: any) => {
      if (perfume.imageUrl?.url) {
        perfume.imageUrl.url = `${STRAPI_HOST}${perfume.imageUrl.url}`;
      }
      return perfume;
    });

    return perfumes;
  } catch (error) {
    console.error("Error al obtener los productos", error);
    throw new Error("Fallo al obtener los productos. Por favor, inténtalo más tarde.");
  }
}


export async function getPerfumeById(documentId: string) {
  try {
    const res = await query(
      `perfumes/${documentId}?populate[imageUrl][fields][0]=url&populate[categories][fields][0]=name&populate[fragancia][populate][0]=notasfinal`
    );
 

    if (!res || !res.data) {
      console.warn("No se encontraron datos para el perfume.");
      return null;
    }

    const perfume = res.data;
 
    if (perfume.imageUrl?.url) {
      perfume.imageUrl.url = `${STRAPI_HOST}${perfume.imageUrl.url}`;
    }

    return perfume;
  } catch (error) {
    console.error("Error al obtener el perfume", error);
    throw new Error("Fallo al obtener el perfume. Por favor, inténtalo más tarde.");
  }
}