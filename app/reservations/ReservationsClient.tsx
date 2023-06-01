'use client';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { toast } from "react-hot-toast";
import axios from "axios";
import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";

import Heading from "@/app/components/Heading";
import Container from "@/app/components/Container";
import { Listing, Reservation, User } from "@prisma/client";
import ReservationCard from '../components/reservations/ReservationCard';

interface ReservationsClientProps {
  reservations: (Reservation & {user: User, 
  listing: Listing})[],
  currentUser?: User | null,
}

const ReservationsClient: React.FC<ReservationsClientProps> = ({
  reservations,
  currentUser
}) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState('');

  const confirmDelete = (id:string) => {
    confirmAlert({
      title: 'Are you sure?',
      message: 'you want to delete this guest reservation?',
      buttons: [
        {
          label: 'Yes',
          onClick: ()=> onCancel(id)
        },
        {
          label: 'No',
        }
      ],
    });
  };

  const confirmRevervation = (id:string) => {
    confirmAlert({
      title: 'Are you sure?',
      message: 'you want to confirm this guest reservation?',
      buttons: [
        {
          label: 'Yes',
          onClick: ()=> onConfirm(id)
        },
        {
          label: 'No',
        }
      ],
    });
  };

  const onConfirm = useCallback((id:string) => {
    axios.put(`/api/reservations/${id}`)
    .then(() => {
      toast.success('Reservation confirmed!');
      router.refresh();
    })
    .catch(()=>{
      toast.error('Something went wrong.')
    })
  },[router]);

  const onCancel = useCallback((id: string) => {
    setDeletingId(id);

    axios.delete(`/api/reservations/${id}`)
    .then(() => {
      toast.success('Reservation cancelled');
      router.refresh();
    })
    .catch(() => {
      toast.error('Something went wrong.')
    })
    .finally(() => {
      setDeletingId('');
    })
  }, [router]);

  return (
    <Container>
      <Heading
        title="Reservations"
        subtitle="Bookings on your properties"
      />
      <div 
        className="
          mt-10
          grid 
          grid-cols-1 
          sm:grid-cols-2 
          md:grid-cols-3 
          lg:grid-cols-4
          xl:grid-cols-5
          2xl:grid-cols-6
          gap-8
        "
      >
        {reservations.map((reservation: any) => (
          <ReservationCard
            key={reservation.id}
            data={reservation.listing}
            reservation={reservation}
            actionId={reservation.id}
            onDelete={confirmDelete}
            onConfirm={confirmRevervation}
            disabled={deletingId === reservation.id}
            actionLabel="Cancel guest reservation"
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
   );
}
 
export default ReservationsClient;