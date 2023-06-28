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
import TripCardNew from "../components/trips/TripCardNew";

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
  const confirmDelete = (id: string) => {
    setDeletingId(id);
    setOpenDialog(true);
  };

  const onCancel = useCallback((id: string) => {
    const data = {
      status: "cancelled"
    }
    const eventData = {
      reservationId:id,
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
      .catch((error) => {
        toast.error(error?.response?.data?.error)
      })
      .finally(() => {
        setDeletingId('');
        setOpenDialog(false);
      })
  }, [currentUser?.id, router]);

  return (
    <Container>
      <div className="xl:px-8 md:px-4 px-2 pt-4" >
        <Heading
          title="Trips"
          subtitle="Where you've been and where you're going"
        />
        <div className="flex flex-col gap-16 items-center pt-4">
          <>
            <ConfirmDialog
              isOpen={openDialog}
              title="Are you sure you want to cancel this reservation?"
              subtitle="This action cannot be undone"
              onConfirm={() => onCancel(deletingId)}
              onDismiss={() => {
                setOpenDialog(false);
                setDeletingId('');
              }}
            />
          </>
          {reservations.map((reservation: any) => (
            <TripCardNew
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
      </div>


    </Container>
  );
}

export default TripsClient;