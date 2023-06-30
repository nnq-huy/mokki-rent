'use client';

import { BoookingEvent, Listing, Reservation, User } from "@prisma/client";
import MyActionAlert from "../MyActionAlert";
import axios from "axios";
import toast from "react-hot-toast";
import { MdOutlineCancelPresentation, MdOutlineMessage, MdOutlineRateReview } from "react-icons/md";
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

interface BookingActionsProps {
  booking?: Reservation & { user?: User, listing?: Listing, events: BoookingEvent[] },
  showMessage: boolean,
  currentUser: User
}
const BookingActions: React.FC<BookingActionsProps> = ({ booking, showMessage, currentUser }) => {
  const isCancellable = (booking!.status == 'unconfirmed' || booking!.status == 'confirmed')
  const router = useRouter();
  const { setCurrentReservation } = useCurrentReservation();
  const currentRating = booking?.rating ?? 0;
  const [rating, setRating] = useState(currentRating);

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

  const onRate = (id: string) => {
    const data = {
      rating: rating,
      status: "reviewed"
    }
    const eventData = {
      reservationId: id,
      userId: currentUser?.id,
      event: "reviewed"
    }
    axios.put(`/api/reservations/${id}`, data)
      .then(() => {
        axios.post(`/api/reservations/${id}`, eventData).then(() => {
          toast.success('Review submitted!');
          router.refresh();
        })
      })
      .catch(() => {
        toast.error('Error')
      })
  }
  const onCancel = (id: string) => {
    const data = {
      status: "cancelled"
    }
    const eventData = {
      reservationId: id,
      userId: currentUser?.id,
      event: "cancelled"
    }
    axios.put(`/api/reservations/${id}`, data)
      .then(() => {
        axios.post(`/api/reservations/${id}`, eventData).then(() => {
          toast.success('Reservation cancelled');
          router.refresh();
        })
      })
      .catch(() => {
        toast.error('Error')
      })
  };


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

    {booking && booking.status === 'done' && currentUser.id === booking.userId &&
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
              onClick={() => {
                onRate(booking.id)
              }}
            > Submit</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    }
    {
      booking && isCancellable &&
      <MyActionAlert
        action={() => onCancel(booking.id)}
        title="Cancel booking"
        actionText="Do you want to cancel this reservation?"
        actionButtonLabel="Confirm"
        outline
        icon={MdOutlineCancelPresentation}
      />
    }
  </div >)
}

export default BookingActions;