export default function ComplexSkeleton() {
  return (
    <div className="card bg-base-100 w-full p-8 shadow-xl">
      <div className="flex flex-row items-center gap-3">
        <div className="skeleton h-5 w-auto flex-1"></div>
        <div className="skeleton h-10 w-10"></div>
        <div className="skeleton h-10 w-10"></div>
      </div>
      <hr className="my-5" />
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div className="skeleton h-5 w-full"></div>
        <div className="skeleton h-5 w-full"></div>
        <div className="skeleton h-5 w-full"></div>
        <div className="skeleton h-5 w-full"></div>
      </div>
    </div>
  );
}
