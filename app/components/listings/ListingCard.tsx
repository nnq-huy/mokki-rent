'use client';

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

import useProvinces from "@/app/hooks/useProvinces";

import Button from "../Button";
import { Listing, User } from "@prisma/client";
import { AiOutlineDelete } from "react-icons/ai";
import { Edit } from "lucide-react";
import { BsPersonFill, BsStar } from "react-icons/bs";
import { MdBathroom, MdBedroomParent, MdOutlineMeetingRoom, MdOutlinePlace } from "react-icons/md";
import HeartButton from "../HeartButton";
import { BiCategory } from "react-icons/bi";

interface ListingCardProps {
  data: Listing;
  onAction?: (id: string) => void;
  disabled?: boolean;
  actionLabel?: string;
  actionId?: string;
  currentUser?: User | null
  isHost: boolean
};

const ListingCard: React.FC<ListingCardProps> = ({
  data,
  onAction,
  disabled,
  actionLabel,
  actionId = '',
  isHost,
  currentUser
}) => {
  const router = useRouter();
  const { getByValue } = useProvinces();

  const location = getByValue(data.locationValue);

  const path = isHost ? 'dashboard/properties' : 'listings';

  const handleDelete = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();

      if (disabled) {
        return;
      }
      onAction?.(actionId)
    }, [disabled, onAction, actionId]);

  return (
    <div className="flex flex-col gap-2 w-full cursor-pointer group shadow-md rounded-md bg-white">
      <div
        onClick={() => router.push(`/${path}/${data.id}`)}
        className="
          aspect-square 
          w-full 
          relative 
          overflow-hidden 
          rounded-t-xl
        "
      >
        <Image
          fill
          className="
            object-cover 
            group-hover:scale-110 
            transition
          "
          src={data.imageSrc ?? '/images/logo.png'}
          alt={data.title}
        />
        <div className="
          absolute
          top-3
          right-3
        ">
          <HeartButton
            listingId={data.id}
            currentUser={currentUser!}
          />
        </div>
      </div>
      <div className="px-4 pb-4">
        <div className="font-semibold text-lg flex flex-row justify-between">
          <div>{data.title}</div>
          <div className="flex flex-row gap-1 items-center text-sm text-neutral-500">
            {<BsStar />}{data.rating > 1 ? data.rating.toFixed(1) : ''}
          </div>
        </div>
        <div className="font-light text-neutral-500 flex flex-col">
          <div className="flex items-center gap-1">
            <MdOutlinePlace />{location?.value}
          </div>
          <div className="flex items-center gap-1">
            <BiCategory />{data.category}
          </div>
        </div>
        <div className="flex flex-row items-center gap-2 text-neutral-500">
          <MdBedroomParent />
          {data.roomCount}
          <BsPersonFill />
          {data.guestCount}
          <MdBathroom />
          {data.bathroomCount}
        </div>
        <div className="flex flex-row items-center gap-1">
          <div className="font-semibold flex gap-1">
            {data.price}€ <p className="text-gray-500 font-normal">night</p>
          </div>
        </div>
        {isHost &&
          <Button
            label="Edit info"
            onClick={() => { }}
            icon={Edit}
            small
          />
        }
        {onAction && actionLabel && (
          <Button
            icon={AiOutlineDelete}
            disabled={disabled}
            small
            label={actionLabel}
            onClick={handleDelete}
          />
        )}
      </div>
    </div>
  );
}

export default ListingCard;
//todo: handle review