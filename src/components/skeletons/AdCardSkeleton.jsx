export default function AdCardSkeleton() {
  return (
    <div className="card bg-base-100 w-full p-8 shadow-xl">
      <div className="skeleton w-full aspect-[16/9]"></div>
      <hr className="my-5" />
      <div className="grid grid-cols-1 gap-3">
        <div className="skeleton h-5 w-full"></div>
        <div className="skeleton h-5 w-full"></div>
        <div className="skeleton h-5 w-full"></div>
        <div className="skeleton h-5 w-full"></div>
        <div className="skeleton h-5 w-full"></div>
      </div>
      <div className="flex flex-row justify-end gap-3 mt-3">
        <div className="skeleton h-10 w-40"></div>
      </div>
    </div>
  );
}
