type CategoryMetric = {
  name: string;
  count: number;
};

type DashboardCopy = {
  eyebrow: string;
  title: string;
  description: string;
  metrics: {
    published: string;
    available: string;
    sold: string;
    sellThrough: string;
  };
  statusTitle: string;
  categoryTitle: string;
  statuses: {
    available: string;
    reserved: string;
    sold: string;
  };
  dataTitle: string;
  inventorySource: string;
  inventoryDescription: string;
  analyticsSource: string;
  analyticsDescription: string;
  note: string;
};

type ProjectResultsDashboardProps = {
  copy: DashboardCopy;
  published: number;
  available: number;
  reserved: number;
  sold: number;
  categories: CategoryMetric[];
};

export default function ProjectResultsDashboard({
  copy,
  published,
  available,
  reserved,
  sold,
  categories,
}: ProjectResultsDashboardProps) {
  const sellThrough =
    published > 0
      ? Math.round((sold / published) * 100)
      : 0;

  const statusMetrics = [
    {
      label: copy.statuses.available,
      value: available,
      color: "bg-emerald-500",
    },
    {
      label: copy.statuses.reserved,
      value: reserved,
      color: "bg-amber-400",
    },
    {
      label: copy.statuses.sold,
      value: sold,
      color: "bg-zinc-900",
    },
  ];

  const maximumCategoryCount = Math.max(
    ...categories.map((category) => category.count),
    1
  );

  return (
    <section className="border-y border-zinc-200 bg-zinc-50">
      <div className="mx-auto max-w-6xl px-6 py-24 sm:px-8">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-zinc-400">
          {copy.eyebrow}
        </p>

        <h2 className="mt-3 max-w-4xl text-4xl font-bold tracking-tight sm:text-5xl">
          {copy.title}
        </h2>

        <p className="mt-5 max-w-3xl text-lg leading-8 text-zinc-600">
          {copy.description}
        </p>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            [copy.metrics.published, published, ""],
            [copy.metrics.available, available, ""],
            [copy.metrics.sold, sold, ""],
            [copy.metrics.sellThrough, `${sellThrough}%`, ""],
          ].map(([label, value]) => (
            <article
              key={label}
              className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm"
            >
              <p className="text-4xl font-bold tracking-tight">
                {value}
              </p>
              <p className="mt-2 text-sm font-medium text-zinc-500">
                {label}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <article className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8">
            <h3 className="text-xl font-bold">
              {copy.statusTitle}
            </h3>

            <div className="mt-8 space-y-6">
              {statusMetrics.map((status) => {
                const percentage =
                  published > 0
                    ? (status.value / published) * 100
                    : 0;

                return (
                  <div key={status.label}>
                    <div className="flex items-center justify-between gap-4 text-sm">
                      <span className="font-medium text-zinc-600">
                        {status.label}
                      </span>
                      <span className="font-bold">
                        {status.value}
                      </span>
                    </div>
                    <div className="mt-2 h-3 overflow-hidden rounded-full bg-zinc-100">
                      <div
                        className={`h-full rounded-full ${status.color}`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </article>

          <article className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8">
            <h3 className="text-xl font-bold">
              {copy.categoryTitle}
            </h3>

            <div className="mt-8 space-y-4">
              {categories.map((category) => (
                <div
                  key={category.name}
                  className="grid grid-cols-[minmax(0,1fr)_2rem] items-center gap-3"
                >
                  <div>
                    <div className="flex justify-between gap-3 text-sm">
                      <span className="truncate font-medium text-zinc-600">
                        {category.name}
                      </span>
                    </div>
                    <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-zinc-100">
                      <div
                        className="h-full rounded-full bg-zinc-700"
                        style={{
                          width: `${
                            (category.count /
                              maximumCategoryCount) *
                            100
                          }%`,
                        }}
                      />
                    </div>
                  </div>
                  <span className="text-right text-sm font-bold">
                    {category.count}
                  </span>
                </div>
              ))}
            </div>
          </article>
        </div>

        <div className="mt-6 rounded-3xl bg-zinc-950 p-6 text-white sm:p-8">
          <h3 className="text-xl font-bold">
            {copy.dataTitle}
          </h3>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-zinc-800 p-5">
              <p className="font-bold">
                {copy.inventorySource}
              </p>
              <p className="mt-2 leading-7 text-zinc-400">
                {copy.inventoryDescription}
              </p>
            </div>

            <div className="rounded-2xl border border-zinc-800 p-5">
              <p className="font-bold">
                {copy.analyticsSource}
              </p>
              <p className="mt-2 leading-7 text-zinc-400">
                {copy.analyticsDescription}
              </p>
            </div>
          </div>

          <p className="mt-6 text-sm leading-6 text-zinc-500">
            {copy.note}
          </p>
        </div>
      </div>
    </section>
  );
}
