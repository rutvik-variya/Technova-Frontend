import type { FieldValues, Path, UseFormRegister } from "react-hook-form";

interface FormTextareaProps<T extends FieldValues> {
  name: Path<T>;
  label: string;
  register: UseFormRegister<T>;
  error?: string;
  placeholder?: string;
  rows?: number;
  required?: boolean;
  disabled?: boolean;
}

export default function FormTextarea<T extends FieldValues>({
  name,
  label,
  register,
  error,
  placeholder,
  rows = 4,
  required = false,
  disabled = false,
}: FormTextareaProps<T>) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={name} className="block text-xs font-bold text-slate-700">
        {label}
        {required && <span className="ml-1 text-rose-500">*</span>}
      </label>

      <textarea
        id={name}
        rows={rows}
        placeholder={placeholder}
        disabled={disabled}
        aria-invalid={Boolean(error)}
        className={`w-full resize-y rounded-2xl border bg-white px-3.5 py-2.5 text-xs text-slate-900 outline-none transition duration-150 placeholder:text-slate-400 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:opacity-60 ${
          error
            ? "border-rose-300 focus:border-rose-500 focus:ring-1 focus:ring-rose-500"
            : "border-slate-200 focus:border-slate-900 focus:ring-1 focus:ring-slate-900"
        }`}
        {...register(name)}
      />

      {error && (
        <p className="text-xs font-semibold text-rose-600" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
