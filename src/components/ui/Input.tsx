import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

export default function Input({ label, error, icon, iconPosition = 'left', className = '', ...props }: InputProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>
      )}
      <div className="relative">
        {icon && iconPosition === 'left' && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">{icon}</div>
        )}
        <input
          {...props}
          className={`
            w-full rounded-lg border px-4 py-3 text-sm text-gray-900 bg-white
            placeholder:text-gray-400 outline-none transition-all duration-200
            focus:ring-2 focus:ring-[#0F4C81]/30 focus:border-[#0F4C81]
            ${error ? 'border-red-400 focus:ring-red-200' : 'border-gray-200 hover:border-gray-300'}
            ${icon && iconPosition === 'left' ? 'pl-10' : ''}
            ${icon && iconPosition === 'right' ? 'pr-10' : ''}
            ${className}
          `}
        />
        {icon && iconPosition === 'right' && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">{icon}</div>
        )}
      </div>
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: { value: string; label: string }[];
}

export function Select({ label, error, options, className = '', ...props }: SelectProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>
      )}
      <select
        {...props}
        className={`
          w-full rounded-lg border px-4 py-3 text-sm text-gray-900 bg-white outline-none
          transition-all duration-200 focus:ring-2 focus:ring-[#0F4C81]/30 focus:border-[#0F4C81] cursor-pointer
          ${error ? 'border-red-400' : 'border-gray-200 hover:border-gray-300'}
          ${className}
        `}
      >
        {options.map(opt => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}
