'use client';

import { IconType } from "react-icons";

interface CategoryViewProps {
  icon: IconType,
  label: string,
  description: string,
  small?: boolean
}

const CategoryView: React.FC<CategoryViewProps> = ({
  icon: Icon,
  label,
  description,
  small
}) => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-row items-center gap-4">
        {small ? <> <Icon size={32} className="text-neutral-600" />
          <div className="flex flex-col">
            <div className="text-sm font-semibold">
              {label}
            </div>
            <div className="text-neutral-500 font-light text-xs">
              {description}
            </div>
          </div>
        </> : <>  <Icon size={40} className="text-neutral-600" />
          <div className="flex flex-col">
            <div className="text-lg font-semibold">
              {label}
            </div>
            <div className="text-neutral-500">
              {description}
            </div>
          </div> </>}
      </div>
    </div>
  );
}

export default CategoryView;