'use client';
import { useCallback } from "react";
import { IconType } from "react-icons";
import { Switch } from "../ui/switch";

interface SaunaToggleProps {
  title: string;
  subtitle: string;
  value: boolean;
  defaultChecked?: boolean;
  icon?: IconType;
  onChange: (value: boolean) => void;
}

const SaunaToggle: React.FC<SaunaToggleProps> = ({
  title,
  subtitle,
  value,
  defaultChecked,
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
        <Switch
          checked={value}
          onCheckedChange={onToggle} />
      </div>
    </div>
  );
}

export default SaunaToggle;