'use client';

import { toast } from "react-hot-toast";
import axios from "axios";
import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";

import Heading from "@/app/components/Heading";
import Container from "@/app/components/Container";
import { Reservation, User } from "@prisma/client";
import TripCard from "../components/trips/TripCard";
import ConfirmDialog from "../components/ConfirmDialog";

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
  const [openDialog, setOpenDialog] = useState(false);
  const confirmDelete = (id:string) => {
    setDeletingId(id);
    setOpenDialog(true);
  };

  const onCancel = useCallback((id: string) => {
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
      setOpenDialog(false);
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
      <>
        <ConfirmDialog
          isOpen={openDialog}
          title="Are you sure you want to delete this?" 
          subtitle="This action cannot be undone"
          onConfirm={()=>onCancel(deletingId)}
          onDismiss={()=>{
            setOpenDialog(false);
            setDeletingId('');
          }}
        />
      </>
        {reservations.map((reservation: any) => (
          <TripCard
            key={reservation.id}
            reservation={reservation}
            actionId={reservation.id}
            onAction={confirmDelete}
            disabled={deletingId === reservation.id}
            actionLabel="Cancel reservation"
            currentUser={currentUser}
            showMessage
          />
        ))}
      </div>
    </Container>
   );
}

export default TripsClient;