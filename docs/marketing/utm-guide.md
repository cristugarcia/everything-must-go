# Guía de enlaces de campaña

Los enlaces de marketing identifican el canal que originó cada visita sin guardar datos personales.

## Generar enlaces del catálogo

```bash
npm run campaign:links
```

Para el catálogo en inglés:

```bash
npm run campaign:links -- --locale en
```

## Generar enlaces de un producto

```bash
npm run campaign:links -- --product EMG-0002
```

También se puede elegir el idioma:

```bash
npm run campaign:links -- --locale en --product EMG-0002
```

El comando genera enlaces para WhatsApp personal, estados de WhatsApp, Instagram, TikTok, Facebook Marketplace, LinkedIn y referidos.

Usa el enlace del canal exacto donde publicarás. No reutilices un enlace de Instagram en WhatsApp porque la visita quedaría atribuida al canal incorrecto.

## Generar enlaces para experimentos

Los argumentos `--experiment` y `--variant` deben usarse juntos. El generador normaliza los nombres y los agrega a `utm_content` sin perder la identificación del catálogo o producto.

Variante A, catálogo completo:

```bash
npm run campaign:links -- --experiment destination --variant catalog
```

Variante B, producto individual:

```bash
npm run campaign:links -- --product EMG-0002 --experiment destination --variant product
```

No reutilices el enlace de una variante para la otra. Registra las visitas y consultas de cada enlace por separado.

## Convención

- Campaña comercial: `emg_launch`.
- Campaña profesional de LinkedIn: `emg_portfolio`.
- Catálogo completo: `utm_content=catalog`.
- Producto individual: `utm_content=product_emg-XXXX`.
- Experimento: `utm_content=catalog__experiment_destination__variant_catalog`.
