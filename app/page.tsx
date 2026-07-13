import products from "../data/catalog.json";
import ProductCard from "../components/ProductCard";
import { Product } from "@/lib/types";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <section className="mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center px-8 text-center">
        <h1 className="text-6xl font-bold tracking-tight text-zinc-900">
          Everything Must Go
        </h1>

        <p className="mt-6 max-w-2xl text-xl text-zinc-600">
          Objetos en excelente estado buscando un nuevo hogar.
        </p>

        <p className="mt-4 max-w-3xl text-lg leading-8 text-zinc-500">
          Estoy renovando mi hogar y vendiendo artículos que ya no utilizo,
          pero que todavía tienen mucho por ofrecer.
        </p>

        <div className="mt-12">
          <a
            href="#productos"
            className="rounded-full bg-black px-8 py-4 text-white transition hover:bg-zinc-800"
          >
            Explorar productos
          </a>
        </div>

        <p className="mt-16 text-sm uppercase tracking-[0.3em] text-zinc-400">
          Disponible hasta el 31 de julio de 2026
        </p>
      </section>

      <section
        id="productos"
        className="mx-auto max-w-6xl px-8 pb-24"
      >
        <h2 className="mb-10 text-4xl font-bold text-zinc-900">
          Productos destacados
        </h2>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product: Product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>
      </section>
    </main>
  );
}