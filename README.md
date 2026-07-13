# Everything Must Go

Catálogo web para gestionar y publicar una venta por mudanza en Buenos Aires.

El proyecto permite mostrar productos, precios, fotografías, estados de venta y páginas individuales. El inventario se administra desde Google Sheets y se transforma en un catálogo compatible con Next.js mediante un script de importación.

## Estado del proyecto

### Sprint 1 — Base del proyecto

- Next.js con App Router
- TypeScript
- Tailwind CSS
- Deploy en Vercel
- Integración con Google Sheets
- Importador CSV
- Generación de catálogo JSON
- Catálogo dinámico
- Imágenes locales por producto

### Sprint 2 — Experiencia de catálogo

- Tarjetas de producto
- Página individual por producto
- Galería de imágenes
- Contacto por WhatsApp
- Buscador en tiempo real
- Filtros por categoría
- Ordenamiento por precio y nombre
- Estados Disponible, Reservado y Vendido
- Productos relacionados
- Hero principal
- Footer
- Configuración global
- Utilidades reutilizables

### Próximo sprint

- SEO dinámico
- Vista previa al compartir productos
- Lightbox de imágenes
- Favoritos
- Botón para compartir
- Mejoras responsive
- Automatización de la sincronización con Google Sheets

## Tecnologías

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- Google Sheets
- Axios
- csv-parse
- tsx
- Vercel

## Estructura principal

```text
app/
├── item/
│   └── [id]/
│       └── page.tsx
├── globals.css
├── layout.tsx
└── page.tsx

components/
├── ProductCard.tsx
├── ProductCatalog.tsx
├── ProductGallery.tsx
├── RelatedProducts.tsx
└── StatusBadge.tsx

data/
├── catalog.json
└── products.json

lib/
├── config.ts
├── types.ts
└── utils.ts

public/
└── products/
    ├── EMG-0001/
    ├── EMG-0002/
    └── ...

scripts/
└── importInventory.ts