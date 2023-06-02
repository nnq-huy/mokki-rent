'use client';

import { IconType } from "react-icons";

interface ButtonProps {
  label: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  outline?: boolean;
  small?: boolean;
  icon?: IconType;
  submit?:boolean;
}

const Button: React.FC<ButtonProps> = ({ 
  label, 
  onClick, 
  disabled, 
  outline,
  small,
  submit,
  icon: Icon,
}) => {
  return ( 
    <button
      type={submit?'submit':'button'}
      disabled={disabled}
      onClick={onClick}
      className={`
        items-center
        flex
        justify-center
        disabled:opacity-70
        disabled:cursor-not-allowed
        rounded-lg
        hover:opacity-80
        transition
        w-full
        ${outline ? 'bg-white' : 'bg-mokki-green'}
        ${outline ? 'border-black' : 'border-mokki-green'}
        ${outline ? 'text-black' : 'text-white'}
        ${small ? 'text-sm' : 'text-md'}
        ${small ? 'py-1' : 'py-3'}
        ${small ? 'font-light' : 'font-semibold'}
        ${small ? 'border-[1px]' : 'border-2'}
      `}
    >
      {label}
      {Icon && (
        <Icon
          size={24}
          className="mx-2 justify-self-end"
        />
      )}
    </button>
   );
}
 
export default Button;