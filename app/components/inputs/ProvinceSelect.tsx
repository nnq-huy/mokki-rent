'use client';

import Select from 'react-select'

import useProvinces from '@/app/hooks/useProvinces';

export type ProvinceSelectValue = {
  label: string;
  latlng: number[],
  english: string;
  value: string
}

interface ProvinceSelectProps {
  value?: ProvinceSelectValue;
  onChange: (value: ProvinceSelectValue) => void;
}

const ProvinceSelect: React.FC<ProvinceSelectProps> = ({
  value,
  onChange
}) => {
  const { getAll } = useProvinces();

  return (
    <div className='z-50'>
      <Select
        placeholder="Anywhere"
        isClearable
        options={getAll()}
        value={value}
        onChange={(value) => onChange(value as ProvinceSelectValue)}
        formatOptionLabel={(option: any) => (
          <div className="
          flex flex-row items-center gap-3">
            <div>
              {option.label},
              <span className="text-neutral-500 ml-1">
                {option.english}
              </span>
            </div>
          </div>
        )}
        classNames={{
          control: () => 'p-3 border-2',
          input: () => 'text-lg',
          option: () => 'text-lg'
        }}
        theme={(theme) => ({
          ...theme,
          borderRadius: 6,
          colors: {
            ...theme.colors,
            primary: 'black',
            primary25: '#ffe4e6'
          }
        })}
      />
    </div>
  );
}

export default ProvinceSelect;