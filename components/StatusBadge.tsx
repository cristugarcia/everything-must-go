type StatusBadgeProps = {
  status: string;
};

export default function StatusBadge({
  status,
}: StatusBadgeProps) {
  const normalizedStatus = status
    .trim()
    .toLowerCase();

  const styles =
    normalizedStatus === "vendido"
      ? "bg-red-100 text-red-700"
      : normalizedStatus === "reservado"
        ? "bg-amber-100 text-amber-700"
        : "bg-green-100 text-green-700";

  const dotStyles =
    normalizedStatus === "vendido"
      ? "bg-red-500"
      : normalizedStatus === "reservado"
        ? "bg-amber-500"
        : "bg-green-500";

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium ${styles}`}
    >
      <span
        className={`h-2 w-2 rounded-full ${dotStyles}`}
      />

      {status}
    </span>
  );
}