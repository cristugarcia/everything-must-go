# Guía multi-vendedor — EMG-715

Cada producto puede dirigir su consulta de WhatsApp a un vendedor diferente. Los productos sin vendedor asignado continúan usando el contacto principal de Cristina.

## Columnas de Google Sheets

Agrega estas tres columnas al final de la hoja:

| Columna | Ejemplo | Regla |
|---|---|---|
| `Vendedor ID` | `amigo-juan` | Identificador estable, sin datos sensibles |
| `Nombre vendedor` | `Juan` | Nombre que verá el comprador |
| `WhatsApp vendedor` | Vacío | Columna heredada: no debe contener teléfonos |

Para un producto de Cristina, deja las tres celdas vacías. Para un producto de otra persona, completa `Vendedor ID` y `Nombre vendedor`, pero deja vacío `WhatsApp vendedor`.

El número se guarda fuera del Sheet y del repositorio mediante una variable privada derivada del ID. Para `amigo-migue`, la variable es:

```text
SELLER_WHATSAPP_AMIGO_MIGUE=country_code_and_number
```

Debe existir tanto en `.env.local` como en Vercel. El importador detiene el build si encuentra un teléfono en el Sheet, datos parciales o una variable privada inválida.

## Privacidad y consentimiento

- El vendedor debe autorizar que su nombre y WhatsApp se utilicen públicamente para recibir consultas.
- No agregues domicilio, documento, notas privadas ni costos internos.
- El número formará parte del enlace público de WhatsApp de la ficha, pero no del Sheet ni de GitHub.
- Usa un nombre público breve si el vendedor no desea mostrar su nombre completo.

## Flujo de prueba

1. Completa ID y nombre en un solo producto de prueba; deja vacío el WhatsApp.
2. Agrega la variable privada a `.env.local` y Vercel.
3. Ejecuta `npm run build`.
4. Abre la ficha en español y en inglés.
5. Confirma que debajo del CTA aparezca el vendedor correcto.
6. Abre el enlace sin enviar el mensaje y confirma destinatario, saludo, producto, precio y URL.
7. Repite una ficha de Cristina para verificar el fallback.

## Datos generados

Cuando existe un vendedor específico, `data/catalog.json` incluye:

```json
{
  "seller": {
    "id": "amigo-juan",
    "name": "Juan"
  }
}
```

La metadata estructurada de producto también identifica al vendedor correspondiente.
