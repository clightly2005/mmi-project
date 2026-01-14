"use client";
type Opt = string | number;
//for modals currently but should mae more of these so that the modals are not as large 
export default function SelectField({ id, label, value, onChange, options, placeholder = "Select…", }: {
  id: string;
  label: string;
  value: Opt | "";
  onChange: (v: Opt) => void;
  options: readonly Opt[];
  placeholder?: string;
}) {
  return (
    <div className="my-1">
      <label htmlFor={id} className="block text-sm font-medium text-neutral-100">
        {label}
      </label>
      <select id={id} value={value} onChange={(e) => onChange(isNaN(+e.target.value) ? e.target.value : +e.target.value)} required className="mt-2 w-full rounded border bg-white px-3 py-2 text-neutral-900">
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((o) => (
          <option key={String(o)} value={String(o)}>
            {String(o)}
          </option>
        ))}
      </select>
    </div>
  );
}
