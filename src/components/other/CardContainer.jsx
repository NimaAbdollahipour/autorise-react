export default function CardContianer({ children }) {
  return (
    <div className="grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {children}
    </div>
  );
}
