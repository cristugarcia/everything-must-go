# Guía multi-vendedor — EMG-715

Cada producto puede dirigir su consulta de WhatsApp a un vendedor diferente. Los productos sin vendedor asignado continúan usando el contacto principal de Cristina.

## Columnas de Google Sheets

Agrega estas tres columnas al final de la hoja:

| Columna | Ejemplo | Regla |
|---|---|---|
| `Vendedor ID` | `amigo-juan` | Identificador estable, sin datos sensibles |
| `Nombre vendedor` | `Juan` | Nombre que verá el comprador |
| `WhatsApp vendedor` | `5491112345678` | Código de país y número, solo dígitos |

Para un producto de Cristina, deja las tres celdas vacías. Para un producto de otra persona, completa las tres.

El importador detiene el build si encuentra datos parciales o un WhatsApp con una longitud inválida. Esto evita publicar un botón que contacte a la persona equivocada.

## Privacidad y consentimiento

- El vendedor debe autorizar que su nombre y WhatsApp se utilicen públicamente para recibir consultas.
- No agregues domicilio, documento, notas privadas ni costos internos.
- El número formará parte del enlace público de WhatsApp de la ficha.
- Usa un nombre público breve si el vendedor no desea mostrar su nombre completo.

## Flujo de prueba

1. Completa las tres columnas en un solo producto de prueba.
2. Ejecuta `npm run build`.
3. Abre la ficha en español y en inglés.
4. Confirma que debajo del CTA aparezca el vendedor correcto.
5. Abre el enlace sin enviar el mensaje y confirma destinatario, saludo, producto, precio y URL.
6. Repite una ficha de Cristina para verificar el fallback.

## Datos generados

Cuando existe un vendedor específico, `data/catalog.json` incluye:

```json
{
  "seller": {
    "id": "amigo-juan",
    "name": "Juan",
    "whatsapp": "5491112345678"
  }
}
```

La metadata estructurada de producto también identifica al vendedor correspondiente.
