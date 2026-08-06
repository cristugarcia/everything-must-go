import dotenv from "dotenv";
import axios from "axios";
import { parse } from "csv-parse/sync";
import fs from "fs-extra";
import { Product, Seller } from "../lib/types";
import { getSellerWhatsApp } from "../lib/sellers";

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

type ProductOverride = Partial<Product>;

const PRODUCT_OVERRIDES_PATH =
  "data/catalog-overrides.json";

function parsePrice(
  value: string | undefined | null
): number | null {
  if (!value) {
    return null;
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

    return null;
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

function parseSeller(
  row: SheetRow,
  productId: string
): Seller | undefined {
  const id = row["Vendedor ID"]?.trim();
  const name = row["Nombre vendedor"]?.trim();
  const publicWhatsapp =
    row["WhatsApp vendedor"]?.trim();

  const hasSellerData = Boolean(
    id || name || publicWhatsapp
  );

  if (!hasSellerData) {
    return undefined;
  }

  if (!id || !name) {
    throw new Error(
      `El producto ${productId} tiene datos incompletos de vendedor.`
    );
  }

  if (publicWhatsapp) {
    throw new Error(
      `El producto ${productId} expone un WhatsApp en Google Sheets. Vacía esa celda y usa la variable privada del vendedor.`
    );
  }

  getSellerWhatsApp(id);

  return {
    id,
    name,
  };
}

async function run() {
  console.log("📥 Descargando inventario...");
  
  const response = await axios.get<string>(url);
  const csv = response.data;

  const rows = parse<SheetRow>(csv, {
    columns: true,
    skip_empty_lines: true,
  });

  console.log(
  `✅ ${rows.length} productos encontrados`
);

  const overrides: Record<string, ProductOverride> =
    (await fs.pathExists(PRODUCT_OVERRIDES_PATH))
      ? await fs.readJson(PRODUCT_OVERRIDES_PATH)
      : {};

const sheetCatalog: Product[] = rows.map((row) => {
    const id = row["ID"];
    const seller = parseSeller(row, id);

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

    const product: Product = {
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

      purchaseYear: parseOptionalNumber(
        row["Año compra"]
      ),

      condition: row["Estado físico"],

      location:
        row["Ubicación"] || undefined,

      publicDescription:
        row["Descripción pública"] ||
        undefined,

      images,

      seller,

      publishedAt:
        row["Fecha publicación"] ||
        undefined,

      soldAt:
        row["Fecha venta"] || undefined,
    };

    const mergedProduct = {
      ...product,
      ...overrides[id],
    };

    if (mergedProduct.seller) {
      getSellerWhatsApp(mergedProduct.seller.id);
    }

    return mergedProduct;
  });

  const sheetIds = new Set(
    sheetCatalog.map((product) => product.id)
  );

  const additionalProducts = Object.entries(overrides)
    .filter(([id]) => !sheetIds.has(id))
    .map(([id, override]) => {
      const product = {
        id,
        sku: "",
        publish: false,
        status: "",
        category: "",
        subcategory: "",
        name: "",
        brand: "",
        model: "",
        quantity: 1,
        price: null,
        condition: "",
        images: [],
        ...override,
      } satisfies Product;

      if (product.seller) {
        getSellerWhatsApp(product.seller.id);
      }

      return product;
    });

  const catalog = [
    ...sheetCatalog,
    ...additionalProducts,
  ];

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
