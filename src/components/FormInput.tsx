"use client";

import { type LucideIcon } from "lucide-react";

interface FormInputProps {
  id: string;
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
  value?: string | number;
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => void;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  icon?: LucideIcon;
  rows?: number;
  options?: { value: string; label: string }[];
  min?: number;
  max?: number;
}

export default function FormInput({
  id,
  name,
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  error,
  required = false,
  disabled = false,
  icon: Icon,
  rows = 4,
  options,
  min,
  max,
}: FormInputProps) {
  const inputBase =
    "w-full px-4 py-2.5 rounded-md border text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1F6F3D]/30 focus:border-[#1F6F3D] transition-all duration-200 disabled:bg-gray-50 disabled:text-gray-400";

  const inputClass = `${inputBase} ${
    error ? "border-red-400 bg-red-50/30" : "border-gray-200 bg-white"
  } ${Icon ? "pl-10" : ""}`;

  return (
    <div className="flex flex-col gap-1">
      <label
        htmlFor={id}
        className="text-sm font-medium text-gray-700"
      >
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>

      <div className="relative">
        {Icon && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
            <Icon size={16} />
          </span>
        )}

        {type === "textarea" ? (
          <textarea
            id={id}
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={onChange as React.ChangeEventHandler<HTMLTextAreaElement>}
            required={required}
            disabled={disabled}
            rows={rows}
            className={`${inputBase} resize-none ${
              error ? "border-red-400 bg-red-50/30" : "border-gray-200 bg-white"
            }`}
          />
        ) : type === "select" && options ? (
          <select
            id={id}
            name={name}
            value={value}
            onChange={onChange as React.ChangeEventHandler<HTMLSelectElement>}
            required={required}
            disabled={disabled}
            className={inputClass}
          >
            <option value="">-- Select --</option>
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        ) : (
          <input
            id={id}
            name={name}
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange as React.ChangeEventHandler<HTMLInputElement>}
            required={required}
            disabled={disabled}
            min={min}
            max={max}
            className={inputClass}
          />
        )}
      </div>

      {error && (
        <p className="text-xs text-red-500 flex items-center gap-1" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
