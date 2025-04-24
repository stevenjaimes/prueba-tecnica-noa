
# Prueba Técnica - NOA Experience

¡Hola! Este es el repositorio para la prueba técnica realizada para NOA Experience. Agradezco mucho la oportunidad y comparto a continuación algunos detalles importantes sobre el desarrollo.

## Tecnologías utilizadas

### Frontend
- **Next.js**
- **Tailwind CSS v4**
- **React 19**
- **shadcn/ui**
- **Zustand**
- **Framer Motion**

El ícono de favoritos se conecta con un **microservicio en NestJS**, por lo que debe estar iniciado para que la funcionalidad esté disponible.

Los productos se renderizan desde las colecciones de **Strapi**.

Adicionalmente, se implementó:
- Página de detalle del producto
- Carrito de compras usando únicamente **Zustand**

### Backend
- **Strapi** v5 (ya que la v4 no funcionó correctamente con Node 18, 20 ni 22)
- **NestJS** (Microservicio de favoritos)

## Variables de entorno

En el frontend se usan variables de entorno para el **token** y el **host** de Strapi. Por simplicidad, se incluyeron en el repositorio (aunque soy consciente de que no es una buena práctica).

## Consideraciones y recomendaciones

- Me gustó mucho el proyecto, ¡gracias por esta gran experiencia!
- Sé que hay muchas cosas por mejorar: refactorización, mejores prácticas de programación, manejo de errores y testing.
- No se usó la API de Next.js, ya que las peticiones se hicieron directamente desde los Server Components al backend de Strapi.
  - Sin embargo, desde el lado del cliente lo ideal sería usar la API de Next para mejorar la seguridad.

## Instrucciones para ejecutar el proyecto

1. Iniciar **Strapi**:
   ```bash
   cd strapi
   npm install
   npm run develop
   ```

2. Iniciar el **microservicio de favoritos** (NestJS):
   ```bash
   cd favorites-service
   npm install
   npm run start:dev
   ```

3. Iniciar el **frontend** (Next.js):
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

> Reitero que el manejo de errores en el frontend es algo que queda pendiente de mejorar, así como implementar pruebas en ambos lados del proyecto.

Gracias nuevamente a **NOA Experience** por esta oportunidad. ¡Fue una experiencia muy enriquecedora!

---

**Steven Jaimes**
