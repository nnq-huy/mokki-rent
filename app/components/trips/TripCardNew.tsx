'use client';

import Image from "next/image";
import { useRouter } from "next/navigation";
import { differenceInHours, format } from 'date-fns';

import useProvinces from "@/app/hooks/useProvinces";

import { Listing, Reservation, User } from "@prisma/client";
import useMessageModal from "@/app/hooks/useMessageModal";
import useCurrentReservation from "@/app/hooks/useCurrentReservation";
import useIsGuest from "@/app/hooks/useIsGuest";
import { MdInfoOutline, MdOutlineMessage, MdOutlinePlace, MdOutlineRateReview } from "react-icons/md";
import { BsStar } from "react-icons/bs";
import { statuses } from "@/app/constants";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";

interface TripCardProps {
  reservation: Reservation & { user?: User, listing?: Listing };
  onAction?: (id: string) => void;
  disabled?: boolean;
  actionLabel?: string;
  actionId?: string;
  currentUser?: User | null;
  showMessage?: Boolean;
};

const TripCardNew: React.FC<TripCardProps> = ({
  showMessage,
  reservation,
  currentUser,
}) => {
  const router = useRouter();
  const messageModal = useMessageModal();
  const IsGuest = useIsGuest();
  const { setCurrentReservation } = useCurrentReservation();

  const { getByValue } = useProvinces();

  const location = getByValue(reservation.listing!.locationValue);

  const handleOpenMessage = () => {
    IsGuest.switchToGuest();
    setCurrentReservation(reservation);
    messageModal.onOpen();
  }

  const start = new Date(reservation.startDate);
  const end = new Date(reservation.endDate);
  const checkinDate = `${format(start, 'PP')}`;
  const checkoutDate = `${format(end, 'PP')}`;
  const bookedNights = Math.ceil(differenceInHours(end, start) / 24);
  const status = statuses.find((status) => status.value === reservation.status);

  return (
    <div className="col-span-2 bg-white flex flex-row gap-2 w-full shadow-lg rounded-xl max-w-screen-lg">
      <div className="md:basis-1/3 basis-1/2 p-4 col-span-1">
        <div className="font-semibold text-lg flex flex-row justify-between">
          <div>{reservation.listing?.title}</div>
          <div className="flex flex-row gap-1 items-center text-sm text-gray-500">
            {<BsStar />}
            {reservation.listing!.rating > 1 ? reservation.listing!.rating.toFixed(1) : ''}
          </div>
        </div>
        <div className="flex flex-row items-center  justify-between gap-1 text-gray-500">
          <div className="flex items-center gap-1 text-sm"><MdOutlinePlace />{location?.label} </div>
        </div>
        <Separator />
        <div className="text-gray-500 text-sm py-2">
          {checkinDate}	&nbsp;-	&nbsp;{checkoutDate}
        </div>
        <div className="font-semibold ">
          {bookedNights} {bookedNights > 1 ? 'nights' : 'night'} | {reservation.totalPrice}€
        </div>
        <div className="flex flex-row items-start">
          {showMessage &&
            <Button
              size={'icon'}
              variant={'ghost'}
              onClick={() => router.push(`/trips/${reservation.id}`)}
            >
              <MdInfoOutline size={20} color="gray" />
            </Button>
          }
          {showMessage &&
            <Button
              size={'icon'}
              variant={'ghost'}
              onClick={handleOpenMessage}
            >
              <MdOutlineMessage size={20} color="gray" />
            </Button>
          }
          {reservation.status === 'done' &&
            <Button
              size={'icon'}
              variant={'ghost'}
              onClick={handleOpenMessage}
            >
              <MdOutlineRateReview size={20} color="gray" />
            </Button>
          }
        </div>
      </div>
      <div
        className="
            aspect-[square] 
            w-full 
            relative 
            overflow-hidden
            rounded-r-xl
            md:basis-2/3
            basis-1/2
          "
      >
        <Image
          onClick={() => router.push(`/trips/${reservation.id}`)}
          fill
          className="
              cursor-pointer
              object-cover 
              hover:scale-110 
              transition
            "
          src={reservation.listing!.imageSrc}
          alt="Listing"
        />
        <div className="
            absolute
            top-3
            left-3
          ">
          <div className="font-bold bg-black/70 rounded text-gray-100 flex items-center gap-1">
            {status && (
              <status.icon className=" h-4 w-4" />
            )}{status?.label.toUpperCase()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TripCardNew;