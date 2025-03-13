import { ColorTypes } from '@/types';
import React from 'react';

export type ActionButtonProps = {
  text?: string;
  textShortcut?: React.ReactNode;
  icon?: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
  size?: 'xxs' | 'xs' | 'sm' | 'md' | 'lg';
  color?: ColorTypes;
  className?: string;
  textClassName?: string;
  iconClassName?: string;
  children?: React.ReactNode;
};

export default function ActionButton({
  text,
  textShortcut,
  icon,
  onClick,
  disabled = false,
  size = 'sm',
  color = 'grayDefault',
  className = 'rounded-md',
  textClassName,
  iconClassName,
}: ActionButtonProps) {
  const baseStyles =
    'flex items-center justify-center gap-2 font-semibold transition px-4 text-white';

  const sizeStyles = {
    xxs: 'h-4 text-xs',
    xs: 'h-6 text-xs',
    sm: 'h-8 text-sm',
    md: 'h-10 text-base',
    lg: 'h-12 text-lg',
  }[size];

  const colorClasses: Record<ColorTypes, string> = {
    gray: 'bg-gray-500 hover:bg-gray-600',
    grayDefault: 'bg-gray-200 hover:bg-gray-300 border border-slate-400',
    graySoft: 'bg-gray-200 hover:bg-gray-200/90',
    grayStrong: 'bg-slate-600/90 hover:bg-slate-600/80',
    grayDeshab: 'bg-gray-100 cursor-default',
    green: 'bg-green-600 hover:bg-green-700',
    greenSoft: 'bg-green-700/95 hover:bg-green-700/80',
    blue: 'bg-blue-600 hover:bg-blue-700',
    blueSoft: 'bg-blue-700/90 hover:bg-blue-700/80',
    red: 'bg-red-600/90 hover:bg-red-600/80',
    redSoft: 'bg-red-500/90 hover:bg-red-500/80',
  };

  const disabledStyles = 'bg-gray-400 cursor-not-allowed';

  const colorStyles = disabled
    ? disabledStyles
    : `${colorClasses[(color ?? 'gray') as ColorTypes]}`;

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${sizeStyles}  ${colorStyles} ${className}`}
    >
      {text && <span className={textClassName}>{text}</span>}
      {textShortcut && <span className={textClassName}>{textShortcut}</span>}
      {icon && <span className={iconClassName}>{icon}</span>}
    </button>
  );
}
