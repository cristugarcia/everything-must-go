import dotenv from "dotenv";

dotenv.config({
  path: ".env.local",
});

import axios from "axios";
import { parse } from "csv-parse/sync";
import fs from "fs-extra";

const SHEET_ID = process.env.GOOGLE_SHEET_ID;
const GID = process.env.GOOGLE_SHEET_GID;

console.log(SHEET_ID);
console.log(GID);

if (!SHEET_ID || !GID) {
  throw new Error("❌ Faltan GOOGLE_SHEET_ID o GOOGLE_SHEET_GID en .env.local");
}

const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv&gid=${GID}`;

function parsePrice(value: string | undefined | null): number | null {
  if (!value) return null;

  let clean = String(value).trim();

  // elimina $
  clean = clean.replace(/\$/g, "");

  // elimina espacios
  clean = clean.replace(/\s/g, "");

  // Caso 1: 900.000,00
  if (clean.includes(".") && clean.includes(",")) {
    clean = clean.replace(/\./g, "");
    clean = clean.replace(",", ".");
  }

  // Caso 2: 900000,00
  else if (clean.includes(",")) {
    clean = clean.replace(",", ".");
  }

  // Caso 3: 900000.00
  // No hacemos nada

  const number = Number(clean);

  if (Number.isNaN(number)) {
    console.warn("⚠️ No pude convertir el precio:", value);
    return null;
  }

  return Math.round(number);
}

async function run() {
  console.log("📥 Descargando inventario...");
  console.log(url);

  const { data: csv } = await axios.get(url);

console.log("========== CSV ==========");
console.log(csv.substring(0, 800));
console.log("=========================");

const rows = parse(csv, {
  columns: true,
  skip_empty_lines: true,
});

  console.log(`✅ ${rows.length} productos encontrados`);

  console.log(`✅ ${rows.length} productos encontrados`);

console.log("----- PRECIOS -----");

rows.forEach((row: any) => {
  console.log(row["Producto"], "=>", JSON.stringify(row["Precio publicado"]));
});


  const catalog = rows.map((row: any) => {

    const price = parsePrice(row["Precio publicado"]);

    return {
      id: row["ID"],
      sku: row["SKU"],

      name: row["Producto"],

      brand: row["Marca"],

      model: row["Modelo"],

      category: row["Categoría"],

      subcategory: row["Subcategoría"],

      price,

      quantity: Number(row["Cantidad"] || 1),

      condition: row["Estado físico"],

      status: row["Estado"],

      description: row["Descripción pública"] || "",

      images: [
        row["Foto 1"],
        row["Foto 2"],
        row["Foto 3"],
        row["Foto 4"],
        row["Foto 5"],
      ]
        .filter(Boolean)
        .map((file: string) => `/products/${row["ID"]}/${file}`),
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

  console.log("🎉 Catálogo generado correctamente");
}

run().catch(console.error);