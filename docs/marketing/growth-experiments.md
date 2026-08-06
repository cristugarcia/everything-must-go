# Experimentos de crecimiento — EMG-714

## Objetivo

Aprender qué mensajes y destinos generan consultas comerciales calificadas sin cambiar varias variables simultáneamente ni recopilar datos personales.

Vercel Hobby permite analizar páginas y UTMs, pero no registra los clics personalizados de WhatsApp. Por eso cada experimento combina visitas observadas en Analytics con consultas, reservas y ventas anotadas manualmente.

## Reglas

1. Ejecutar un solo experimento comercial a la vez.
2. Definir hipótesis, variantes, métrica y fecha antes de publicar.
3. Mantener iguales el canal, formato, producto, audiencia y franja horaria siempre que sea posible.
4. No cambiar precios durante una prueba de contenido o destino.
5. Detener una variante si promociona un producto vendido o muestra información incorrecta.
6. No declarar un ganador con menos de 30 visitas por variante. Con menor volumen, registrar el resultado solo como señal direccional.
7. No guardar nombres, teléfonos ni contenido de conversaciones en el registro.

## EMG-EXP-01 — Catálogo completo vs. producto directo

**Estado:** listo para ejecutar.

**Hipótesis:** una pieza centrada en un producto disponible y enlazada directamente a su ficha generará una mayor proporción de consultas que una pieza equivalente enlazada al catálogo completo.

**Canal recomendado:** Instagram Stories. No mezclar resultados con TikTok o Estados de WhatsApp.

**Producto recomendado:** EMG-0002 — TV Noblex 50 pulgadas, modelo DK50X6500, siempre que continúe disponible al comenzar la prueba.

### Variantes

| Variante | Creatividad | Destino | Identificador |
|---|---|---|---|
| A — Catálogo | La misma foto y texto, con CTA “Ver catálogo” | Catálogo ES | `catalog__experiment_destination__variant_catalog` |
| B — Producto | La misma foto y texto, con CTA “Ver producto” | Ficha EMG-0002 | `product_emg-0002__experiment_destination__variant_product` |

La diferencia debe limitarse al CTA y al destino. Si cambian también la foto, el precio destacado o el horario, no podremos atribuir el resultado al tipo de enlace.

### Enlaces

```bash
npm run campaign:links -- --experiment destination --variant catalog
npm run campaign:links -- --product EMG-0002 --experiment destination --variant product
```

Usar únicamente el enlace `instagram` generado por cada comando.

### Medición

**Métrica primaria:** consultas calificadas / visitas de la variante.

Una consulta es calificada cuando pregunta por disponibilidad, condición, retiro o compra del producto. No se registra la identidad de la persona.

**Métricas secundarias:**

- visitas por variante;
- reservas;
- ventas;
- abandonos observables, solo si Analytics ofrece el dato.

**Ventana:** 24 horas por variante, en días y horarios comparables. Si ninguna alcanza 30 visitas, extender una segunda ronda antes de concluir.

### Registro

| Variante | Fecha | Visitas | Consultas | Reservas | Ventas | Tasa de consulta | Observaciones |
|---|---|---:|---:|---:|---:|---:|---|
| A — Catálogo | | | | | | | |
| B — Producto | | | | | | | |

Tasa de consulta = consultas / visitas × 100.

### Decisión

- Gana una variante si tiene al menos 30 visitas y mejora la tasa de consulta de forma clara sin aumentar mensajes irrelevantes.
- Si la diferencia es menor a 10% relativo o el volumen es insuficiente, el resultado es inconcluso.
- Si gana producto directo, las siguientes Stories de producto usarán enlaces a fichas individuales.
- Si gana catálogo, las campañas generales conservarán el catálogo como destino y se revisará la selección de producto por separado.

## Backlog posterior

| ID | Hipótesis | Condición para ejecutarlo |
|---|---|---|
| EMG-EXP-02 | “Quiero este producto” genera más intención que “Consultar por WhatsApp” | Requiere eventos de clic confiables |
| EMG-EXP-03 | Ordenar por destacados mejora las visitas a productos prioritarios | Requiere una línea base de vistas por producto |
| EMG-EXP-04 | Una colección temática genera más consultas que un producto aislado | Ejecutar después de EMG-EXP-01 |
| EMG-EXP-05 | Destacar productos gratuitos aumenta navegación hacia otros disponibles | Requiere medir navegación posterior y controlar tráfico de baja intención |

## Definition of Done

- Hipótesis y métrica principal definidas.
- Enlaces de variantes generables y distinguibles mediante UTM.
- Registro sin datos personales preparado.
- Umbral mínimo y regla de decisión documentados.
- Un solo experimento marcado como activo.
- Backlog posterior condicionado por capacidad real de medición.
