'use client';
import "react-toggle/style.css"
import { useCallback } from "react";
import Toggle from "react-toggle"
import { IconType } from "react-icons";

interface SaunaToggleProps {
  title: string;
  subtitle: string;
  value: boolean;
  icon:IconType;
  onChange: (value: boolean) => void;
}

const SaunaToggle: React.FC<SaunaToggleProps> = ({
  title,
  subtitle,
  value,
  icon: Icon,
  onChange,
}) => {
    const onToggle = useCallback(() => {
        onChange(!value);
      }, [onChange, value]);

  return ( 
    <div className="flex flex-row items-center justify-between">
      <div className="flex flex-col">
        <div className="font-medium flex gap-2 items-center">{Icon && (
        <Icon
          size={24}
          className="mr-2"
        />
      )}{title}</div>
        <div className="font-light text-gray-600">
          {subtitle}
        </div>
      </div>
      <div className="flex text-4xl flex-row items-center gap-4">
        <Toggle
            aria-label='No label tag'
            defaultChecked={true}
            onChange={onToggle}
        />
        </div>
      </div>
   );
}
 
export default SaunaToggle;