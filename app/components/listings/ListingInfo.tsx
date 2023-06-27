'use client';

import dynamic from "next/dynamic";
import { IconType } from "react-icons";

import useProvinces from "@/app/hooks/useProvinces";

import MyAvatar from "../MyAvatar";
import ListingCategory from "./ListingCategory";
import { User } from "@prisma/client";
import HeartButton from "../HeartButton";

const Map = dynamic(() => import('../Map'), {
  ssr: false
});

interface ListingInfoProps {
  user: User,
  currentUser?: User | null;
  id: string,
  description: string;
  guestCount: number;
  roomCount: number;
  bathroomCount: number;
  category: {
    icon: IconType,
    label: string;
    description: string;
  } | undefined
  locationValue: string;
  hasSauna: boolean;
}

const ListingInfo: React.FC<ListingInfoProps> = ({
  user,
  currentUser,
  id,
  description,
  guestCount,
  roomCount,
  bathroomCount,
  category,
  locationValue,
  hasSauna,
}) => {
  const { getByValue } = useProvinces();

  const coordinates = getByValue(locationValue)?.latlng

  return (
    <div className="col-span-4 flex flex-col gap-8 pb-8">
      <div className="flex flex-col gap-2">
        <div
          className="
            text-xl 
            font-semibold 
            flex 
            flex-row 
            items-center
            gap-2
          "
        >
          <div>Hosted by {user?.name}</div>
          <MyAvatar src={user?.image} />
        </div>
        <div className="
            flex 
            flex-row 
            items-center 
            gap-3
            font-light
            text-neutral-500
          "
        >
          <div>
            {guestCount} guests
          </div>
          <div>
            {roomCount} rooms
          </div>
          <div>
            {bathroomCount} bathrooms
          </div>
          <div>
            {hasSauna ? "has sauna" : ""}
          </div>
          <HeartButton
            listingId={id}
            currentUser={currentUser}
          />
        </div>
      </div>
      <hr />
      {category && (
        <ListingCategory
          icon={category.icon}
          label={category?.label}
          description={category?.description}
        />
      )}
      <hr />
      <div className="
      text-lg font-light text-neutral-500">
        {description}
      </div>
      <hr />
      <Map center={coordinates} />
    </div>
  );
}

export default ListingInfo;