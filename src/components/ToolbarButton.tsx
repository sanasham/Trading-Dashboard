import React from 'react';

interface ToolbarButtonProps {
  onClick?: () => void;
  icon: React.ReactNode;
  label?: string; // Optional: if provided, shows text. If not, it's "Icon Only"
  title?: string;
}

const ToolbarButton: React.FC<ToolbarButtonProps> = ({
  onClick,
  icon,
  label,
  title,
}) => {
  return (
    <button
      type='button'
      onClick={onClick}
      title={title}
      className={`
        flex items-center justify-center gap-[6px]
        border border-[#3d5068] bg-[#2a3f58] 
        text-[#c8d8ee] text-[12px] font-medium font-inherit
        hover:bg-[#344d66] active:bg-[#1e2e40]
        transition-colors duration-200 cursor-pointer rounded-[4px] whitespace-nowrap
        ${label ? 'px-[12px] py-[5px]' : 'px-[9px] py-[5px]'}
      `}
    >
      {icon}
      {label && <span>{label}</span>}
    </button>
  );
};
export default ToolbarButton;
