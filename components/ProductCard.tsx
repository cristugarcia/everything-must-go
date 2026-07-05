type ProductCardProps = {
  name: string;
  price: string;
  status: string;
  emoji: string;
};

export default function ProductCard({
  name,
  price,
  status,
  emoji,
}: ProductCardProps) {
  return (
    <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
      <div className="flex aspect-square items-center justify-center rounded-2xl bg-zinc-100 text-7xl">
        {emoji}
      </div>

      <h3 className="mt-5 text-xl font-semibold">{name}</h3>

      <p className="mt-2 text-2xl font-bold">{price}</p>

      <span className="mt-4 inline-block rounded-full bg-green-100 px-4 py-2 text-sm font-medium text-green-700">
        {status}
      </span>
    </div>
  );
}