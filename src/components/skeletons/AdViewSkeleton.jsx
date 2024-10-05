export default function AdViewSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-w-[1200px] m-auto gap-8 p-5">
      <div className="grid grid-cols-1 gap-2">
        <div className="skeleton w-full aspect-[16/9]"></div>
        <div className="flex justify-center gap-2">
          <div className="skeleton h-10 w-10"></div>
          <div className="skeleton h-10 w-10"></div>
          <div className="skeleton h-10 w-10"></div>
          <div className="skeleton h-10 w-10"></div>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-2">
        <div className="grid grid-cols-[1fr_40px] gap-2">
          <div className="skeleton h-8 w-[40%]"></div>
          <div className="skeleton h-12 w-12"></div>
        </div>
        <div className="skeleton h-5 w-[80%]"></div>
        <div className="skeleton h-5 w-full"></div>
        <div className="skeleton h-5 w-[50%]"></div>
        <div className="skeleton h-5 w-[70%]"></div>
        <div className="skeleton h-5 w-full"></div>
      </div>
    </div>
  );
}
