"use client";

import { useMemo, useState } from "react";

import Stagger from "@/components/animations/Stagger";
import ProductCard from "@/components/ProductCard";

import type { Locale } from "@/lib/i18n/config";
import type { Product } from "@/lib/types";

type CatalogDictionary = {
  searchLabel: string;
  searchPlaceholder: string;
  sortLabel: string;
  sortRecommended: string;
  sortPriceAsc: string;
  sortPriceDesc: string;
  sortName: string;

  statusLabel: string;
  all: string;
  available: string;
  reserved: string;
  sold: string;

  categoriesLabel: string;

  productSingular: string;
  productPlural: string;
  clearFilters: string;

  emptyTitle: string;
  emptyDescription: string;
  showAll: string;

  categories: Record<string, string>;
};

type ProductCatalogProps = {
  products: Product[];
  locale: Locale;
  dictionary: {
    productCatalog: CatalogDictionary;

    productCard: {
      viewProduct: string;
      soldOverlay: string;
      reservedOverlay: string;
      soldMessage: string;
      reservedMessage: string;
    };

    product: {
    priceOnRequest: string;
    free: string;
  };

    status: {
      available: string;
      reserved: string;
      sold: string;
    };
  };
};
const statusPriority: Record<string, number> = {
  disponible: 0,
  reservado: 1,
  vendido: 2,
};

const statusOptions = [
  {
    value: "all",
    dictionaryKey: "all",
  },
  {
    value: "disponible",
    dictionaryKey: "available",
  },
  {
    value: "reservado",
    dictionaryKey: "reserved",
  },
  {
    value: "vendido",
    dictionaryKey: "sold",
  },
] as const;

export default function ProductCatalog({
  products,
  locale,
  dictionary,
}: ProductCatalogProps) {
  const catalog = dictionary.productCatalog;

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] =
    useState("all");
  const [selectedStatus, setSelectedStatus] =
    useState("all");
  const [sortBy, setSortBy] = useState("default");

  const categories = useMemo(() => {
    return Array.from(
      new Set(
        products
          .map((product) => product.category)
          .filter(Boolean)
      )
    );
  }, [products]);

  const filteredProducts = useMemo(() => {
    const normalizedSearch = search
      .trim()
      .toLowerCase();

    const filtered = products.filter((product) => {
      const matchesCategory =
        selectedCategory === "all" ||
        product.category === selectedCategory;

      const normalizedStatus = product.status
        .trim()
        .toLowerCase();

      const matchesStatus =
        selectedStatus === "all" ||
        normalizedStatus === selectedStatus;

      const searchableText = [
        product.name,
        product.brand,
        product.model,
        product.category,
        product.subcategory,
        product.condition,
        product.status,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      const matchesSearch =
        normalizedSearch === "" ||
        searchableText.includes(normalizedSearch);

      return (
        matchesCategory &&
        matchesStatus &&
        matchesSearch
      );
    });

    switch (sortBy) {
      case "price-asc":
        return [...filtered].sort(
          (a, b) =>
            (a.price ?? Number.POSITIVE_INFINITY) -
            (b.price ?? Number.POSITIVE_INFINITY)
        );

      case "price-desc":
        return [...filtered].sort(
          (a, b) =>
            (b.price ?? Number.NEGATIVE_INFINITY) -
            (a.price ?? Number.NEGATIVE_INFINITY)
        );

      case "name":
        return [...filtered].sort((a, b) =>
          a.name.localeCompare(
            b.name,
            locale === "es" ? "es-AR" : "en-US"
          )
        );

      default:
        return [...filtered].sort((a, b) => {
          const aStatus = a.status
            .trim()
            .toLowerCase();

          const bStatus = b.status
            .trim()
            .toLowerCase();

          return (
            (statusPriority[aStatus] ?? 3) -
            (statusPriority[bStatus] ?? 3)
          );
        });
    }
  }, [
    products,
    search,
    selectedCategory,
    selectedStatus,
    sortBy,
    locale,
  ]);

  const clearFilters = () => {
    setSearch("");
    setSelectedCategory("all");
    setSelectedStatus("all");
    setSortBy("default");
  };

  const hasActiveFilters =
    search.trim() !== "" ||
    selectedCategory !== "all" ||
    selectedStatus !== "all" ||
    sortBy !== "default";

  const staggerKey = filteredProducts
    .map((product) => product.id)
    .join("-");

  return (
    <div>
      <div className="mb-10 rounded-3xl border border-zinc-200 bg-zinc-50 p-5 sm:p-6">
        <label
          htmlFor="product-search"
          className="text-sm font-medium text-zinc-700"
        >
          {catalog.searchLabel}
        </label>

        <div className="relative mt-3">
          <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-xl">
            🔍
          </span>

          <input
            id="product-search"
            type="search"
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
            placeholder={catalog.searchPlaceholder}
            className="w-full rounded-2xl border border-zinc-300 bg-white py-4 pl-12 pr-4 text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-black"
          />
        </div>

        <div className="mt-6">
          <label
            htmlFor="sort"
            className="text-sm font-medium text-zinc-700"
          >
            {catalog.sortLabel}
          </label>

          <select
            id="sort"
            value={sortBy}
            onChange={(event) =>
              setSortBy(event.target.value)
            }
            className="mt-2 w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-zinc-900 outline-none transition focus:border-black"
          >
            <option value="default">
              {catalog.sortRecommended}
            </option>

            <option value="price-asc">
              {catalog.sortPriceAsc}
            </option>

            <option value="price-desc">
              {catalog.sortPriceDesc}
            </option>

            <option value="name">
              {catalog.sortName}
            </option>
          </select>
        </div>

        <div className="mt-6">
          <p className="text-sm font-medium text-zinc-700">
            {catalog.statusLabel}
          </p>

          <div className="mt-3 flex flex-wrap gap-2">
            {statusOptions.map((status) => {
              const isSelected =
                selectedStatus === status.value;

              return (
                <button
                  key={status.value}
                  type="button"
                  onClick={() =>
                    setSelectedStatus(status.value)
                  }
                  className={`min-h-11 rounded-full px-4 py-2 text-sm font-medium transition ${
                    isSelected
                      ? "bg-black text-white"
                      : "border border-zinc-300 bg-white text-zinc-700 hover:border-black hover:text-black"
                  }`}
                >
                  {catalog[status.dictionaryKey]}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-6">
          <p className="text-sm font-medium text-zinc-700">
            {catalog.categoriesLabel}
          </p>

          <div className="mt-3 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() =>
                setSelectedCategory("all")
              }
              className={`min-h-11 rounded-full px-4 py-2 text-sm font-medium transition ${
                selectedCategory === "all"
                  ? "bg-black text-white"
                  : "border border-zinc-300 bg-white text-zinc-700 hover:border-black hover:text-black"
              }`}
            >
              {catalog.all}
            </button>

            {categories.map((category) => {
              const isSelected =
                selectedCategory === category;

              return (
                <button
                  key={category}
                  type="button"
                  onClick={() =>
                    setSelectedCategory(category)
                  }
                  className={`min-h-11 rounded-full px-4 py-2 text-sm font-medium transition ${
                    isSelected
                      ? "bg-black text-white"
                      : "border border-zinc-300 bg-white text-zinc-700 hover:border-black hover:text-black"
                  }`}
                >
                  {catalog.categories[category] ??
                    category}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <p className="text-sm text-zinc-500">
          {filteredProducts.length}{" "}
          {filteredProducts.length === 1
            ? catalog.productSingular
            : catalog.productPlural}
        </p>

        {hasActiveFilters && (
          <button
            type="button"
            onClick={clearFilters}
            className="text-sm font-medium text-zinc-600 underline underline-offset-4 transition hover:text-black"
          >
            {catalog.clearFilters}
          </button>
        )}
      </div>

      {filteredProducts.length > 0 ? (
        <Stagger
          key={staggerKey}
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
          staggerDelay={0.04}
        >
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              locale={locale}
              dictionary={{
                ...dictionary.productCard,
                priceOnRequest:
              dictionary.product.priceOnRequest,
              free: dictionary.product.free,
              status: dictionary.status,
             }}
             categories={catalog.categories}
            />
          ))}
        </Stagger>
      ) : (
        <div className="rounded-3xl border border-dashed border-zinc-300 px-6 py-20 text-center">
          <div className="text-5xl">🔎</div>

          <h3 className="mt-5 text-2xl font-semibold text-zinc-900">
            {catalog.emptyTitle}
          </h3>

          <p className="mt-2 text-zinc-500">
            {catalog.emptyDescription}
          </p>

          <button
            type="button"
            onClick={clearFilters}
            className="mt-6 rounded-full bg-black px-6 py-3 text-sm font-medium text-white transition hover:bg-zinc-800"
          >
            {catalog.showAll}
          </button>
        </div>
      )}
    </div>
  );
}
