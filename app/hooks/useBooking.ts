import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";



interface IUseBooking {
  reservationId: string;
  currentUserId: string;
  rating?:number
}

const useBooking = ({ reservationId, currentUserId,rating }: IUseBooking) => {
  const router = useRouter();

  const rateBooking = (id: string) => {
    const data = {
      rating: rating,
      status: "reviewed"
    }
    const eventData = {
      reservationId: id,
      userId: currentUserId,
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

  const deleteBooking = async () => {

    await axios.delete(`/api/reservations/${reservationId}`).then(() => {
      toast.success('Reservation deleted');
      router.refresh();
    })
    .catch(() => {
      toast.error('Something went wrong.')
    });
  }

  const markDoneBooking = async () => {

    const data = {
      status: 'done'
    }
    const eventData = {
      reservationId: reservationId,
      userId: currentUserId,
      event: 'done'
    }
    await axios.put(`/api/reservations/${reservationId}`, data)
      .then(() => {
        axios.post(`/api/reservations/${reservationId}`, eventData)
          .then(() => {
            toast.success('Reservation marked as done');
            router.refresh();
          });
      })
      .catch(() => {
        toast.error('Something went wrong.')
      });
  }

  const confirmBooking  = async () => {
    const data = {
      status: 'confirmed'
    }
    const eventData = {
      reservationId: reservationId,
      userId: currentUserId,
      event: 'confirmed'
    }
    await axios.put(`/api/reservations/${reservationId}`, data)
      .then(() => {
        axios.post(`/api/reservations/${reservationId}`, eventData)
          .then(() => {
            toast.success('Reservation confirmed!');
            router.refresh();
          });
      })
      .catch(() => {
        toast.error('Something went wrong.')
      });
  }

  const cancelBooking = async () => {
    const data = {
      status: 'cancelled'
    }
    const eventData = {
      reservationId: reservationId,
      userId: currentUserId,
      event: 'cancelled'
    }
    await axios.put(`/api/reservations/${reservationId}`, data)
      .then(() => {
        axios.post(`/api/reservations/${reservationId}`, eventData)
        .then(() => {
            toast.success('Reservation cancelled');
            router.refresh();
        });
      })
      .catch(() => {
        toast.error('Something went wrong.')
    });
  }



  return {
    deleteBooking,
    markDoneBooking,
    confirmBooking,
    cancelBooking,
    rateBooking
  }
}

export default useBooking;
