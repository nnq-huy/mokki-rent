'use client';

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { format } from 'date-fns';

import useProvinces from "@/app/hooks/useProvinces";

import Button from "../Button";
import { Listing, Reservation, User } from "@prisma/client";
import { AiOutlineDelete } from "react-icons/ai";
import { Edit, Star, StarIcon, } from "lucide-react";
import { BsPersonFill, BsStar } from "react-icons/bs";
import { MdOutlineMeetingRoom } from "react-icons/md";

interface ListingCardProps {
  data: Listing;
  reservation?: Reservation;
  onAction?: (id: string) => void;
  disabled?: boolean;
  actionLabel?: string;
  actionId?: string;
  currentUser?: User | null
  isHost: boolean
};

const ListingCard: React.FC<ListingCardProps> = ({
  data,
  reservation,
  onAction,
  disabled,
  actionLabel,
  actionId = '',
  isHost
}) => {
  const router = useRouter();
  const { getByValue } = useProvinces();

  const location = getByValue(data.locationValue);

  const path = isHost ? 'properties' : 'listings';

  const handleCancel = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();

      if (disabled) {
        return;
      }

      onAction?.(actionId)
    }, [disabled, onAction, actionId]);

  const price = useMemo(() => {
    if (reservation) {
      return reservation.totalPrice;
    }

    return data.price;
  }, [reservation, data.price]);

  const reservationDate = useMemo(() => {
    if (!reservation) {
      return null;
    }

    const start = new Date(reservation.startDate);
    const end = new Date(reservation.endDate);

    return `${format(start, 'PP')} - ${format(end, 'PP')}`;
  }, [reservation]);

  return (
    <div
      className="col-span-1 cursor-pointer group shadow-md p-3 rounded-md bg-white"
    >
      <div className="flex flex-col gap-2 w-full">
        <div
          onClick={() => router.push(`/${path}/${data.id}`)}
          className="
            aspect-square 
            w-full 
            relative 
            overflow-hidden 
            rounded-xl
          "
        >
          <Image
            fill
            className="
              object-cover 
              h-full 
              w-full 
              group-hover:scale-110 
              transition
            "
            src={data.imageSrc}
            alt="Listing"
          />

        </div>
        <div className="font-semibold text-lg flex flex-row justify-between">
          <div>{location?.label} </div>
          <div className="flex flex-row gap-1 items-center text-sm text-neutral-500">
            {<BsStar />}{data.rating>1 ? data.rating.toFixed(1) : 'no rating'}
          </div>
        </div>
        <div className="font-light text-neutral-500">
          {reservationDate || data.category}
        </div>
        <div className="flex flex-row items-center gap-1 text-neutral-500">
          {<MdOutlineMeetingRoom />} {data.roomCount} {<BsPersonFill />} {data.guestCount}
        </div>
        <div className="flex flex-row items-center gap-1">
          <div className="font-semibold">
            {price}€
          </div>
          {!reservation && (
            <div className="font-light">night</div>
          )}
        </div>
        {isHost && <Button
          label="Edit info"
          onClick={() => { }}
          icon={Edit}
          small
        />}
        {onAction && actionLabel && (
          <Button
            icon={AiOutlineDelete}
            disabled={disabled}
            small
            label={actionLabel}
            onClick={handleCancel}
          />
        )}
      </div>
    </div>
  );
}

export default ListingCard;