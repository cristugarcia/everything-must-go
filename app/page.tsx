import ProductCard from "../components/ProductCard";

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
          pero que todavía tienen mucho por ofrecer. Todos están en muy buen
          estado y fueron cuidadosamente seleccionados.
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

      {/* 👇 ESTA PARTE VA DENTRO DEL MAIN */}
     <section
  id="productos"
  className="mx-auto max-w-6xl px-8 pb-24"
>
  <h2 className="mb-10 text-4xl font-bold text-zinc-900">
    Productos destacados
  </h2>

  <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
    <ProductCard
      emoji="🤖"
      name="Robot Aspirador"
      price="$280.000"
      status="Excelente estado"
    />

    <ProductCard
      emoji="🍟"
      name="Freidora de Aire"
      price="$120.000"
      status="Como nueva"
    />

    <ProductCard
      emoji="🛏️"
      name="Mesas de Luz"
      price="$80.000"
      status="Impecables"
    />

    <ProductCard
      emoji="🖥️"
      name='Monitor Dell 24"'
      price="$60.000"
      status="Muy buen estado"
    />
  </div>
</section>
    </main>
  );
}