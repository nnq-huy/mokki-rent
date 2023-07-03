'use client';

import { BoookingEvent, Listing, Reservation, User } from "@prisma/client";
import MyActionAlert from "../MyActionAlert";
import { MdOutlineCancelPresentation, MdOutlineCheckCircleOutline, MdOutlineLibraryAddCheck, MdOutlineMessage, MdOutlineRateReview } from "react-icons/md";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/components/ui/dialog"
import useCurrentReservation from "@/app/hooks/useCurrentReservation";
import { Rating } from "flowbite-react";
import { useMemo, useState } from "react";
import useBooking from "@/app/hooks/useBooking";

interface BookingActionsProps {
  booking?: Reservation & { user?: User, listing?: Listing, events: BoookingEvent[] },
  showMessage: boolean,
  currentUserId: string
}
const BookingActions: React.FC<BookingActionsProps> = ({ booking, showMessage, currentUserId }) => {
  const isCancellable = (booking!.status == 'unconfirmed' || booking!.status == 'confirmed')
  const today= new Date();
  const router = useRouter();
  const { setCurrentReservation } = useCurrentReservation();
  const currentRating = booking?.rating ?? 0;
  const [rating, setRating] = useState(currentRating);
  const { cancelBooking,rateBooking, confirmBooking, markDoneBooking } = useBooking({ reservationId: booking!.id, currentUserId: currentUserId,rating:rating })
  const isConfirmable = (booking!.status == 'unconfirmed' && currentUserId===booking!.hostId);
  const canMarkDone = (booking!.status == 'confirmed' && currentUserId===booking!.hostId && booking!.endDate < today);

  const ratingStars = useMemo(() => {
    let ratings: React.ReactElement[] = [];
    let i = 0;
    while (i < 5) {
      if (i < rating) {
        ratings.push(<Rating.Star key={i} />)
      } else ratings.push(<Rating.Star key={i} filled={false} />)
      i++;
    }
    return ratings;
  }, [rating]);

  return (<div className="w-full my-4 items-center flex flex-wrap gap-4">
    {showMessage && booking && <Button
      size={'lg'}
      variant={'outline'}
      onClick={() => {
        setCurrentReservation(booking)
        router.push('/messages')
      }}
    >
      <MdOutlineMessage size={20} color="gray" />&nbsp;
      messages
    </Button>}

    {booking && booking.status === 'done' && currentUserId === booking.userId &&
      <Dialog>
        <DialogTrigger> <Button
          size={'lg'}
          variant={'outline'} >
          <MdOutlineRateReview size={20} color="gray" />&nbsp;
          Leave review
        </Button></DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>How satisfied you are after the stay?</DialogTitle>
            <DialogDescription>
              Please give a feedback on your experience at the mokki
            </DialogDescription>
          </DialogHeader>
          <Rating size="md">
            {ratingStars.map((e) => {
              return (<div key={e.key} onMouseEnter={() => { setRating(parseInt(e.key!.toString()) + 1) }} onClick={() => { setRating(parseInt(e.key!.toString()) + 1) }}>{e}</div>);
            })}
          </Rating>
          {rating}
          <DialogFooter>
            <Button type="submit"
              className=" border-2 border-mokki-light font-bold text-mokki-green"
              variant={'outline'}
              onClick={()=>rateBooking}
            > Submit</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    }
    {
      booking && isCancellable && !canMarkDone &&
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
      booking && isConfirmable &&
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
      booking && canMarkDone &&
      <MyActionAlert
        action={markDoneBooking}
        title="Mark booking as done"
        actionText="Do you want to mar this reservation as finished?"
        actionButtonLabel="Confirm"
        outline
        icon={MdOutlineLibraryAddCheck}
      />
    }
  </div >)
}

export default BookingActions;