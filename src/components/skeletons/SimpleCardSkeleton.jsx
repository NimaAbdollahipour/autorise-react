export default function SimpleCardSkeleton() {
  return (
    <div className="card bg-base-100 w-full p-8 shadow-xl">
      <div className="flex flex-row items-center gap-3">
        <div className="skeleton h-5 w-auto flex-1"></div>
        <div className="skeleton h-10 w-10"></div>
        <div className="skeleton h-10 w-10"></div>
      </div>
    </div>
  );
}
