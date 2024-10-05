export default function LabeledInput({
  label,
  value,
  handleChange,
  error,
  placeholder,
  name,
  type,
}) {
  return (
    <label className="grid grid-cols-1 gap-1">
      <div className="flex flex-row w-full justify-between items-center">
        {label}
        {error && <span className="badge badge-error">Error</span>}
      </div>
      <input
        name={name}
        className="input input-bordered"
        placeholder={placeholder}
        type={type}
        onChange={handleChange}
        value={value}
      />
    </label>
  );
}
