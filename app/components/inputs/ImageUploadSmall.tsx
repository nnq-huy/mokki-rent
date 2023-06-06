'use client';

import { CldUploadWidget } from "next-cloudinary";
import { useCallback } from "react";
import { TbPhotoPlus } from 'react-icons/tb'

declare global {
  var cloudinary: any
}

const uploadPreset = "qsw1je22";

interface ImageUploadButtonProps {
  onChange: (value: string) => void;
}

const ImageUploadSmall: React.FC<ImageUploadButtonProps> = ({
  onChange,
}) => {
  const handleUpload = useCallback((result: any) => {
    onChange(result.info.secure_url);
  }, [onChange]);

  return (
    <CldUploadWidget 
      onUpload={handleUpload} 
      uploadPreset={uploadPreset}
      options={{
        maxFiles: 1
      }}
    >
      {({ open }) => {
        return (
          <div
            onClick={() => open?.()}
            className="
              cursor-pointer
              hover:text-mokki-green
              transition
              flex
              justify-center
              items-center
              text-neutral-500
            "
          >
            <TbPhotoPlus
              size={24}
            />
          </div>
        ) 
    }}
    </CldUploadWidget>
  );
}

export default ImageUploadSmall;
