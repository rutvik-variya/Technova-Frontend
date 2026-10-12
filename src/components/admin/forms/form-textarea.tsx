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
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
        {required && <span className="ml-1 text-red-500">*</span>}
      </label>

      <textarea
        id={name}
        rows={rows}
        placeholder={placeholder}
        disabled={disabled}
        aria-invalid={Boolean(error)}
        className={`w-full resize-y rounded-lg border bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition focus:ring-2 disabled:cursor-not-allowed disabled:bg-gray-100 ${
          error
            ? "border-red-500 focus:ring-red-100"
            : "border-gray-300 focus:border-blue-500 focus:ring-blue-100"
        }`}
        {...register(name)}
      />

      {error && (
        <p className="text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
