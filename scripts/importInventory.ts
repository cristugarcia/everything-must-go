import dotenv from "dotenv";
import axios from "axios";
import { parse } from "csv-parse/sync";
import fs from "fs-extra";
import { Product } from "../lib/types";

dotenv.config({
  path: ".env.local",
});

const SHEET_ID = process.env.GOOGLE_SHEET_ID;
const GID = process.env.GOOGLE_SHEET_GID;

if (!SHEET_ID || !GID) {
  throw new Error(
    "❌ Faltan GOOGLE_SHEET_ID o GOOGLE_SHEET_GID en .env.local"
  );
}

const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv&gid=${GID}`;

type SheetRow = Record<string, string>;

function parsePrice(
  value: string | undefined | null
): number {
  if (!value) {
    return 0;
  }

  let clean = String(value).trim();

  clean = clean.replace(/\$/g, "");
  clean = clean.replace(/\s/g, "");

  // Ejemplo: 900.000,00
  if (clean.includes(".") && clean.includes(",")) {
    clean = clean.replace(/\./g, "");
    clean = clean.replace(",", ".");
  } else if (clean.includes(",")) {
    // Ejemplo: 900000,00
    clean = clean.replace(",", ".");
  }

  const number = Number(clean);

  if (Number.isNaN(number)) {
    console.warn(
      "⚠️ No pude convertir el precio:",
      value
    );

    return 0;
  }

  return Math.round(number);
}

function parseOptionalNumber(
  value: string | undefined | null
): number | undefined {
  if (!value?.trim()) {
    return undefined;
  }

  const number = Number(value);

  return Number.isNaN(number)
    ? undefined
    : number;
}

function parseBoolean(
  value: string | undefined | null
): boolean {
  const normalizedValue = value
    ?.trim()
    .toLowerCase();

  return (
    normalizedValue === "sí" ||
    normalizedValue === "si" ||
    normalizedValue === "true" ||
    normalizedValue === "1"
  );
}

async function run() {
  console.log("📥 Descargando inventario...");
  console.log(url);

  const response = await axios.get<string>(url);
  const csv = response.data;

  console.log("========== CSV ==========");
  console.log(csv.substring(0, 800));
  console.log("=========================");

  const rows = parse<SheetRow>(csv, {
    columns: true,
    skip_empty_lines: true,
  });

  console.log(
    `✅ ${rows.length} productos encontrados`
  );

  console.log("----- PRECIOS -----");

  rows.forEach((row) => {
    console.log(
      row["Producto"],
      "=>",
      JSON.stringify(row["Precio publicado"])
    );
  });

  const catalog: Product[] = rows.map((row) => {
    const id = row["ID"];

    const images = [
      row["Foto 1"],
      row["Foto 2"],
      row["Foto 3"],
      row["Foto 4"],
      row["Foto 5"],
    ]
      .filter(
        (file): file is string =>
          Boolean(file?.trim())
      )
      .map(
        (file) =>
          `/products/${id}/${file.trim()}`
      );

    return {
      id,
      sku: row["SKU"],

      publish: parseBoolean(row["Publicar"]),
      status: row["Estado"],

      category: row["Categoría"],
      subcategory: row["Subcategoría"],

      name: row["Producto"],
      brand: row["Marca"],
      model: row["Modelo"],

      quantity: Number(row["Cantidad"] || 1),

      price: parsePrice(
        row["Precio publicado"]
      ),

      minimumPrice: parsePrice(
        row["Precio mínimo (privado)"]
      ),

      originalPrice: parsePrice(
        row["Costo original (privado)"]
      ),

      purchaseYear: parseOptionalNumber(
        row["Año compra"]
      ),

      condition: row["Estado físico"],

      location:
        row["Ubicación"] || undefined,

      publicDescription:
        row["Descripción pública"] ||
        undefined,

      privateNotes:
        row["Notas privadas"] || undefined,

      images,

      publishedAt:
        row["Fecha publicación"] ||
        undefined,

      soldAt:
        row["Fecha venta"] || undefined,
    };
  });

  await fs.ensureDir("data");

  await fs.writeJson(
    "data/catalog.json",
    catalog,
    {
      spaces: 2,
    }
  );

  console.log(
    "🎉 Catálogo generado correctamente"
  );
}

run().catch((error: unknown) => {
  console.error(
    "❌ Error al generar el catálogo:",
    error
  );

  process.exitCode = 1;
});