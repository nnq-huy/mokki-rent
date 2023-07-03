'use client';

import { useRouter } from "next/navigation";
import { differenceInHours, format } from 'date-fns';

import useProvinces from "@/app/hooks/useProvinces";
import { statuses } from "@/app/constants"


import { Button } from "../ui/button";
import { BoookingEvent, Listing, Reservation, ReservationStatus, User } from "@prisma/client";
import MyAvatar from "../MyAvatar";
import useCurrentReservation from "@/app/hooks/useCurrentReservation";
import { Separator } from "../ui/separator";
import useBooking from "@/app/hooks/useBooking";
import MyActionAlert from "../MyActionAlert";
import { MdOutlineCancelPresentation, MdOutlineCheckCircleOutline, MdOutlineLibraryAddCheck, MdOutlineMessage } from "react-icons/md";

interface ReservationCardProps {

  reservation: Reservation & { user?: User, listing?: Listing, events: BoookingEvent[] };
  currentUserId: string,
  showMessage?: Boolean;
};

const ReservationCardNew: React.FC<ReservationCardProps> = ({
  showMessage,
  reservation,
  currentUserId,
}) => {
  const { getByValue } = useProvinces();
  const guest = reservation.user;
  const { setCurrentReservation } = useCurrentReservation();
  const { cancelBooking, deleteBooking, confirmBooking, markDoneBooking } = useBooking({ reservationId: reservation.id, currentUserId: currentUserId })
  const router = useRouter();
  const today = new Date();
  const canMarkDone = (reservation.endDate < today && reservation.status === 'confirmed');
  const location = getByValue(reservation.listing!.locationValue);

  const start = new Date(reservation.startDate);
  const end = new Date(reservation.endDate);
  const checkinDate = `${format(start, 'PP')}`;
  const checkoutDate = `${format(end, 'PP')}`;
  const bookedNights = Math.ceil(differenceInHours(end, start) / 24);
  const status = statuses.find((status) => status.value === reservation.status);
  const isCancellable = (reservation.status === 'unconfirmed' || reservation.status === 'confirmed');
  const isConfirmable = (reservation.status === 'unconfirmed');
  const canDelete = (reservation.status === 'cancelled');

  return (
    <div className="bg-white flex flex-row gap-4 max-w-screen-sm w-[85vw] shadow-lg p-0 rounded-xl">
      <div className="p-4 basis-1/2 md:basis-2/3 flex flex-col gap-2">
        <div>
          <h1 className="font-semibold text-lg">
            {reservation.listing?.title}
          </h1>
          <p className="text-neutral-500 text-sm">
            {location?.label}
          </p>
        </div>
        <Separator />
        <div className="font-light text-neutral-500 text-sm">
          Check-in: {checkinDate} <br />
          Check-out: {checkoutDate}
        </div>
        <div className="flex flex-row items-center gap-1">
          <div className="font-semibold">
            {bookedNights} {bookedNights > 1 ? 'nights' : 'night'}, {reservation.totalPrice}€
          </div>
        </div>
        <div className="flex items-center">
          <p className="truncate pr-1 text-xs text-neutral-500">
            Booked by
            <br />
            {guest?.name}</p>
          <MyAvatar src={guest?.image!} />
        </div>
        <div className="bg-gray-50 font-bold flex items-center justify-center gap-1 border p-1 rounded-xl">
          {status && (
            <status.icon className=" h-4 w-4 text-muted-foreground" />
          )}{status?.label.toUpperCase()}
        </div>
      </div>

      <div className="basis-1/2 md:basis-1/3 items-end flex flex-col gap-2 justify-center p-2 border-l">
        {showMessage && <Button
          size={'lg'}
          variant={'outline'}
          onClick={() => {
            setCurrentReservation(reservation)
            router.push('/messages')
          }}
        >
          <MdOutlineMessage size={20} color="gray" />&nbsp;
          messages
        </Button>}
        {
          isCancellable && !canMarkDone &&
          <MyActionAlert
            action={cancelBooking}
            title="Cancel booking"
            actionText="Do you want to cancel this reservation?"
            actionButtonLabel="Confirm"
            outline
            icon={MdOutlineCancelPresentation}
          />
        }
        {
          isConfirmable &&
          <MyActionAlert
            action={confirmBooking}
            title="Confirm booking"
            actionText="Do you want to confirm this reservation?"
            actionButtonLabel="Confirm"
            outline
            icon={MdOutlineCheckCircleOutline}
          />
        }
        {
          canMarkDone &&
          <MyActionAlert
            action={markDoneBooking}
            title="Mark as done"
            actionText="Do you want to mark this reservation as finished?"
            actionButtonLabel="Confirm"
            outline
            icon={MdOutlineLibraryAddCheck}
          />
        }
        {
          canDelete &&
          <MyActionAlert
            action={deleteBooking}
            title="Delete booking"
            actionText="Do you want to permanently delete this reservation?"
            actionButtonLabel="Confirm"
            outline
            icon={MdOutlineLibraryAddCheck}
          />
        }
      </div>
    </div>
  );
}

export default ReservationCardNew;
//TODO: show details
