import React from 'react';

type Variant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'gold';
type Size = 'sm' | 'md' | 'lg' | 'xl';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
}

const variants: Record<Variant, string> = {
  primary: 'bg-[#0F4C81] hover:bg-[#0a3d6b] text-white shadow-lg hover:shadow-xl border border-transparent',
  secondary: 'bg-[#C8102E] hover:bg-[#a50d24] text-white shadow-lg hover:shadow-xl border border-transparent',
  outline: 'bg-transparent border-2 border-[#0F4C81] text-[#0F4C81] hover:bg-[#0F4C81] hover:text-white',
  ghost: 'bg-transparent text-[#0F4C81] hover:bg-blue-50 border border-transparent',
  danger: 'bg-red-600 hover:bg-red-700 text-white shadow-lg border border-transparent',
  gold: 'bg-[#D4AF37] hover:bg-[#b8962d] text-white shadow-lg hover:shadow-xl border border-transparent',
};

const sizes: Record<Size, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-sm',
  lg: 'px-8 py-3.5 text-base',
  xl: 'px-10 py-4 text-lg',
};

export default function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  icon,
  iconPosition = 'left',
  fullWidth = false,
  children,
  className = '',
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      disabled={disabled || loading}
      className={`
        inline-flex items-center justify-center gap-2 font-semibold rounded-lg
        transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0F4C81]
        disabled:opacity-60 disabled:cursor-not-allowed
        ${variants[variant]} ${sizes[size]}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
    >
      {loading && (
        <svg className="animate-spin -ml-1 mr-1 h-4 w-4" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      )}
      {icon && iconPosition === 'left' && !loading && <span>{icon}</span>}
      {children}
      {icon && iconPosition === 'right' && <span>{icon}</span>}
    </button>
  );
}
