'use client';

interface MenuItemProps {
  onClick: () => void;
  label: string;
}

const MenuItem: React.FC<MenuItemProps> = ({
  onClick,
  label
}) => {
  return (
    <div
      onClick={onClick}
      className="
        px-2
        py-2
        hover:text-mokki-green
        transition
        font-semibold
      "
    >
      {label}
    </div>
  );
}

export default MenuItem;