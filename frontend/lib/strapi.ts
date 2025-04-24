const { STRAPI_HOST, STRAPI_TOKEN } = process.env;

export async function query(url: string) {
  try {
  
    const res = await fetch(`${STRAPI_HOST}/api/${url}`, {
      headers: {
        Authorization: `Bearer ${STRAPI_TOKEN}`,          
      },
      next: { revalidate: 20 }
     
    });

    if (!res.ok) {
      throw new Error("Fallo la consulta a la API");
    }

    return await res.json();
  } catch (error) {
    console.error("Error en query:", error);
    throw new Error("Fallo la consulta a la API");
  }
}