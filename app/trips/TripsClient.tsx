'use client';

import { toast } from "react-hot-toast";
import axios from "axios";
import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";


import Heading from "@/app/components/Heading";
import Container from "@/app/components/Container";
import ListingCard from "@/app/components/listings/ListingCard";
import { Reservation, User } from "@prisma/client";
import { confirmAlert } from "react-confirm-alert";
import 'react-confirm-alert/src/react-confirm-alert.css';
import TripCard from "../components/trips/TripCard";


interface TripsClientProps {
  reservations: Reservation[],
  currentUser?: User | null,
}

const TripsClient: React.FC<TripsClientProps> = ({
  reservations,
  currentUser
}) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState('');

  const confirmDelete = (id:string) => {
    confirmAlert({
      title: 'Are you sure?',
      message: 'you want to delete this trip?',
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

  const onCancel = useCallback((id: string) => {
    setDeletingId(id);

    axios.delete(`/api/reservations/${id}`)
    .then(() => {
      toast.success('Reservation cancelled');
      router.refresh();
    })
    .catch((error) => {
      toast.error(error?.response?.data?.error)
    })
    .finally(() => {
      setDeletingId('');
    })
  }, [router]);

  return (
    <Container>
      <Heading
        title="Trips"
        subtitle="Where you've been and where you're going"
      />
      <div 
        className="
          mt-10
          grid 
          grid-cols-1 
          sm:grid-cols-2 
          md:grid-cols-3
          lg:grid-cols-4
          xl:grid-cols-4
          2xl:grid-cols-5
          gap-8
        "
      >
        {reservations.map((reservation: any) => (
          <TripCard
            key={reservation.id}
            reservation={reservation}
            actionId={reservation.id}
            onAction={confirmDelete}
            disabled={deletingId === reservation.id}
            actionLabel="Cancel reservation"
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
   );
}
 
export default TripsClient;