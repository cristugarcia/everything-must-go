"use client";

import { useMemo, useState } from "react";
import ProductCard from "@/components/ProductCard";
import { Product } from "@/lib/types";

type ProductCatalogProps = {
  products: Product[];
};

export default function ProductCatalog({
  products,
}: ProductCatalogProps) {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] =
    useState("Todos");
  const [sortBy, setSortBy] = useState("default");

  const categories = useMemo(() => {
    const uniqueCategories = Array.from(
      new Set(
        products
          .map((product) => product.category)
          .filter(Boolean)
      )
    );

    return ["Todos", ...uniqueCategories];
  }, [products]);

  const filteredProducts = useMemo(() => {
    const normalizedSearch = search
      .trim()
      .toLowerCase();

    const filtered = products.filter((product) => {
      const matchesCategory =
        selectedCategory === "Todos" ||
        product.category === selectedCategory;

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

      return matchesCategory && matchesSearch;
    });

    switch (sortBy) {
      case "price-asc":
        return [...filtered].sort(
          (a, b) => a.price - b.price
        );

      case "price-desc":
        return [...filtered].sort(
          (a, b) => b.price - a.price
        );

      case "name":
        return [...filtered].sort((a, b) =>
          a.name.localeCompare(b.name, "es")
        );

      default:
        return filtered;
    }
  }, [products, search, selectedCategory, sortBy]);

  const clearFilters = () => {
    setSearch("");
    setSelectedCategory("Todos");
    setSortBy("default");
  };

  const hasActiveFilters =
    search !== "" ||
    selectedCategory !== "Todos" ||
    sortBy !== "default";

  return (
    <div>
      <div className="mb-10 rounded-3xl border border-zinc-200 bg-zinc-50 p-5 sm:p-6">
        <label
          htmlFor="product-search"
          className="text-sm font-medium text-zinc-700"
        >
          Buscar productos
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
            placeholder="Buscar sofá, televisión, moto..."
            className="w-full rounded-2xl border border-zinc-300 bg-white py-4 pl-12 pr-4 text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-black"
          />
        </div>

        <div className="mt-6">
          <label
            htmlFor="sort"
            className="text-sm font-medium text-zinc-700"
          >
            Ordenar por
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
              Recomendados
            </option>

            <option value="price-asc">
              Precio: menor a mayor
            </option>

            <option value="price-desc">
              Precio: mayor a menor
            </option>

            <option value="name">
              Nombre A-Z
            </option>
          </select>
        </div>

        <div className="mt-6">
          <p className="text-sm font-medium text-zinc-700">
            Categorías
          </p>

          <div className="mt-3 flex flex-wrap gap-2">
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
                  className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                    isSelected
                      ? "bg-black text-white"
                      : "border border-zinc-300 bg-white text-zinc-700 hover:border-black hover:text-black"
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <p className="text-sm text-zinc-500">
          {filteredProducts.length === 1
            ? "1 producto"
            : `${filteredProducts.length} productos`}
        </p>

        {hasActiveFilters && (
          <button
            type="button"
            onClick={clearFilters}
            className="text-sm font-medium text-zinc-600 underline underline-offset-4 transition hover:text-black"
          >
            Limpiar filtros
          </button>
        )}
      </div>

      {filteredProducts.length > 0 ? (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>
      ) : (
        <div className="rounded-3xl border border-dashed border-zinc-300 px-6 py-20 text-center">
          <div className="text-5xl">🔎</div>

          <h3 className="mt-5 text-2xl font-semibold text-zinc-900">
            No encontramos productos
          </h3>

          <p className="mt-2 text-zinc-500">
            Prueba con otra palabra o elimina los filtros.
          </p>

          <button
            type="button"
            onClick={clearFilters}
            className="mt-6 rounded-full bg-black px-6 py-3 text-sm font-medium text-white transition hover:bg-zinc-800"
          >
            Ver todos los productos
          </button>
        </div>
      )}
    </div>
  );
}