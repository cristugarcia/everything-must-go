# Lanzamiento profesional — EMG-711

## Enlaces

- Demo: https://everything-must-go-cyan.vercel.app/es
- Caso de estudio: https://everything-must-go-cyan.vercel.app/es/proyecto?utm_source=linkedin&utm_medium=social&utm_campaign=emg_portfolio&utm_content=case_study
- Case study in English: https://everything-must-go-cyan.vercel.app/en/proyecto?utm_source=linkedin&utm_medium=social&utm_campaign=emg_portfolio&utm_content=case_study
- GitHub: https://github.com/cristugarcia/everything-must-go

## Post principal para LinkedIn

Convertí una mudanza en un producto digital real: diseñé y desarrollé Everything Must Go, un catálogo bilingüe para gestionar y vender inventario sin depender de publicaciones aisladas o mensajes desordenados.

El problema era concreto: mantener sincronizados productos, precios, fotos y estados de disponibilidad mientras las consultas llegaban por distintos canales.

La solución combina:

- Google Sheets como fuente de inventario;
- Next.js, React y TypeScript para la aplicación;
- búsqueda, filtros y fichas individuales;
- estados disponible, reservado y vendido;
- contacto contextual por WhatsApp;
- internacionalización ES/EN;
- SEO técnico, datos estructurados y previews sociales;
- Vercel Analytics, Speed Insights y enlaces UTM;
- una estrategia comercial medible hasta la fecha real de la mudanza.

Además de desarrollar la interfaz, trabajé el proyecto como producto: privacidad, accesibilidad, rendimiento, conversión, QA y lanzamiento.

Durante la validación de Sprint 7, el sitio alcanzó 100 en accesibilidad y SEO en Lighthouse, con rendimiento registrado de 95 en móvil y 99 en desktop.

El inventario se administra desde una hoja de cálculo y se transforma automáticamente en datos públicos para el catálogo, evitando editar código con cada venta.

Este proyecto me permitió unir desarrollo full stack, organización operativa, experiencia de usuario y pensamiento de producto para resolver una necesidad propia que ya está siendo utilizada con inventario real.

Caso de estudio: [ENLACE LINKEDIN AL CASO]
GitHub: https://github.com/cristugarcia/everything-must-go

#Nextjs #TypeScript #ProductDevelopment #UX #WebDevelopment

## Versión corta para repost o comentario

Everything Must Go nació de una necesidad real: organizar una venta por mudanza con inventario, disponibilidad y consultas en un solo lugar. Lo construí con Next.js, TypeScript, Google Sheets y Vercel, trabajando no solo el código sino también SEO, accesibilidad, analytics, conversión y lanzamiento. Caso de estudio: [ENLACE LINKEDIN AL CASO]

## English version

I turned a moving sale into a real digital product: Everything Must Go, a bilingual catalog designed to keep inventory, prices, photos, availability, and buyer conversations consistent.

I built it with Next.js, React, TypeScript, Google Sheets, and Vercel. It includes search and filters, localized product pages, product-specific WhatsApp inquiries, technical SEO, structured data, privacy-conscious analytics, campaign tracking, accessibility, and a measurable launch strategy.

During Sprint 7 QA, Lighthouse validation reached 100 for accessibility and SEO, with recorded performance scores of 95 on mobile and 99 on desktop.

The project reflects how I like to work: starting with a real problem, making deliberate product and technical decisions, and carrying the solution through implementation, quality assurance, and launch.

Case study: [ENGLISH LINKEDIN CASE-STUDY LINK]
GitHub: https://github.com/cristugarcia/everything-must-go

#Nextjs #TypeScript #ProductDevelopment #UX #WebDevelopment

## Descripción para CV

### Español

Diseñé y desarrollé Everything Must Go, un catálogo web bilingüe conectado a Google Sheets para administrar inventario real, estados de venta y consultas por WhatsApp. Implementé Next.js, TypeScript, SEO técnico, datos estructurados, analytics respetuoso de la privacidad, UTMs, accesibilidad, QA y despliegue continuo en Vercel.

### English

Designed and developed Everything Must Go, a bilingual web catalog connected to Google Sheets for managing real inventory, sales status, and product-specific WhatsApp inquiries. Implemented Next.js, TypeScript, technical SEO, structured data, privacy-conscious analytics, campaign tracking, accessibility, QA, and continuous deployment on Vercel.

## Pitch de entrevista — 60 a 90 segundos

Everything Must Go es un producto que construí para resolver una necesidad real durante una mudanza. Tenía que publicar muchos artículos y mantener consistentes sus precios, fotos y estados mientras recibía consultas. En lugar de administrar publicaciones aisladas, diseñé un catálogo bilingüe con Next.js y TypeScript, usando Google Sheets como fuente de inventario para poder actualizarlo sin tocar código.

Cada producto tiene su propia ficha, galería, estado y contacto contextual por WhatsApp. También implementé búsqueda, filtros, SEO técnico, datos estructurados, analytics, UTMs, accesibilidad y un proceso de QA y lanzamiento. Una decisión importante fue mantener visibles los productos vendidos y dirigir a alternativas disponibles, porque eso comunica el estado real sin cortar la navegación. El resultado es un producto publicado y usado con inventario real, y una base que podría evolucionar hacia un servicio de catálogos para otros vendedores.

## Pitch técnico ampliado

La arquitectura usa Google Sheets como fuente operativa de verdad. Durante la sincronización, un script en TypeScript descarga el CSV, normaliza precios, estados, imágenes y campos públicos, y genera un JSON consumido por Next.js. La aplicación usa App Router, rutas localizadas ES/EN y páginas de producto dinámicas.

Centralicé configuración, formato de precios, diccionarios, datos estructurados y UTMs para evitar inconsistencias. El SEO incluye canonical, `hreflang`, sitemap, robots, metadata localizada, Open Graph y esquemas `Product`, `BreadcrumbList` y `Person`. Para calidad trabajé navegación por teclado, foco, contraste, reducción de movimiento, optimización de dependencias y validación con Lighthouse, ESLint, TypeScript y build de producción.

La conversión principal es el contacto por WhatsApp con producto y enlace precargados. Como Vercel Hobby no ofrece todos los eventos personalizados, combiné analytics de páginas, UTMs por canal y registro manual de consultas y ventas.

## Preguntas de entrevista

### ¿Por qué Google Sheets y no una base de datos?

Porque la necesidad inicial requería actualización rápida por parte de la dueña, no relaciones complejas ni escritura desde el sitio. Sheets redujo tiempo de implementación y funcionó como panel operativo conocido. La migración a una base de datos solo tendría sentido cuando existan múltiples vendedores, permisos o reservas automáticas.

### ¿Cuál fue la decisión más importante de producto?

Tratar WhatsApp como la conversión principal y no intentar construir un checkout. La compra requiere conversación sobre condición y coordinación, así que un carrito habría añadido complejidad sin resolver el problema real.

### ¿Qué mejorarías con más tiempo?

Añadiría vendedores por producto con routing de WhatsApp, un dashboard que conecte visitas con consultas y una capa de administración preparada para reutilizar el sistema como servicio para terceros.

### ¿Cómo mediste calidad?

Validé flujos críticos en móvil y desktop, navegación por teclado, estados del inventario, enlaces, previews sociales, lint, TypeScript y build. También utilicé Lighthouse y datos reales de Vercel Speed Insights, manteniendo separados los resultados de laboratorio y los datos de campo.

## Material visual para LinkedIn

Orden recomendado del carrusel:

1. Portada de Everything Must Go.
2. Catálogo en desktop.
3. Catálogo en móvil.
4. Ficha de producto.
5. Flujo Google Sheets → importación → catálogo → Vercel.
6. Resultados de calidad y aprendizajes.

Activos existentes:

- `public/images/project/catalog-desktop.png`
- `public/images/project/catalog-mobile.png`
- `public/images/project/product-detail-desktop.png`
- `public/brand/emg-share-es.png`
- `public/brand/emg-share-en.png`

## Checklist antes de publicar en LinkedIn

- Sustituir los marcadores de enlace por la URL UTM correspondiente.
- Confirmar que la preview del caso de estudio carga correctamente.
- Elegir español o inglés según la red profesional objetivo; no publicar ambas versiones completas juntas.
- Verificar que las métricas de Lighthouse siguen documentadas como una medición puntual.
- Revisar el carrusel final.
- Publicar solo después de aprobación explícita.
