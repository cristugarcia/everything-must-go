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

## Convención

- Campaña comercial: `emg_launch`.
- Campaña profesional de LinkedIn: `emg_portfolio`.
- Catálogo completo: `utm_content=catalog`.
- Producto individual: `utm_content=product_emg-XXXX`.
