import React from 'react';

type BadgeVariant = 'primary' | 'secondary' | 'success' | 'warning' | 'gold' | 'gray' | 'white';

const variants: Record<BadgeVariant, string> = {
  primary: 'bg-blue-100 text-[#0F4C81]',
  secondary: 'bg-red-100 text-[#C8102E]',
  success: 'bg-emerald-100 text-emerald-700',
  warning: 'bg-amber-100 text-amber-700',
  gold: 'bg-[#D4AF37]/20 text-[#b8962d]',
  gray: 'bg-gray-100 text-gray-600',
  white: 'bg-white/20 text-white backdrop-blur-sm',
};

interface BadgeProps {
  variant?: BadgeVariant;
  children: React.ReactNode;
  className?: string;
}

export default function Badge({ variant = 'primary', children, className = '' }: BadgeProps) {
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold tracking-wide ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
}
