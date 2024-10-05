export default function LabeledSelect({
  label,
  value,
  handleChange,
  error,
  name,
  children,
}) {
  return (
    <label className="grid grid-cols-1 gap-1">
      <div className="flex flex-row w-full justify-between items-center">
        {label}
        {error && <span className="badge badge-error">Error</span>}
      </div>
      <select
        name={name}
        className="select select-bordered w-full"
        value={value}
        onChange={handleChange}
      >
        {children}
      </select>
    </label>
  );
}
