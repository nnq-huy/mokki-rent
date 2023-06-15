'use client';

import Image from "next/image";

import useProvinces from "@/app/hooks/useProvinces";
import Heading from "../Heading";

interface ListingHeadProps {
  title: string;
  locationValue: string;
  imageSrc: string;
}

const ListingHead: React.FC<ListingHeadProps> = ({
  title,
  locationValue,
  imageSrc,
}) => {
  const { getByValue } = useProvinces();

  const location = getByValue(locationValue);

  return (
    <>
      <div className="flex items-center gap-4 mt-4">
        <Heading
          title={title}
          subtitle={`${location?.label}, ${location?.english}`}
        />

      </div>

      <div className="
          w-full
          h-[60vh]
          overflow-hidden 
          rounded-xl
          relative
        "
      >
        <Image
          src={imageSrc}
          fill
          className="object-cover	w-full"
          alt="Image"
        />
        <div
          className="
            absolute
            top-5
            right-5
          "
        >
        </div>
      </div>
    </>
  );
}

export default ListingHead;