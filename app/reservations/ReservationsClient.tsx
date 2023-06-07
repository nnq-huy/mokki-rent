'use client';

import { toast } from "react-hot-toast";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";

import Heading from "@/app/components/Heading";
import Container from "@/app/components/Container";
import { Listing, Reservation, User } from "@prisma/client";
import ReservationCard from '../components/reservations/ReservationCard';
import ConfirmDialog from "../components/ConfirmDialog";

interface ReservationsClientProps {
  reservations: (Reservation & {
    user: User,
    listing: Listing
  })[],
}

const ReservationsClient: React.FC<ReservationsClientProps> = ({
  reservations,
}) => {
  const router = useRouter();
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [actionId, setActionId] = useState('');

  const onCancel = async () => {
    await axios.delete(`/api/reservations/${actionId}`)
      .then(() => {
        toast.success('Reservation cancelled');
        setOpenDeleteDialog(false);
        router.refresh();
      })
      .catch(() => {
        toast.error('Something went wrong.')
      }).finally(() => {
        setActionId('');
      })
  };

  const onConfirm = async () => {
    await axios.put(`/api/reservations/${actionId}`)
      .then(() => {
        toast.success('Reservation confirmed!');
        setOpenConfirmDialog(false);
        router.refresh();
      })
      .catch(() => {
        toast.error('Something went wrong.')
      })
  };

  const deleteReservationDialog = (
    <ConfirmDialog
      isOpen={openDeleteDialog}
      title="Are you sure you want to delete this reservation?"
      subtitle="This action cannot be undone!"
      onConfirm={onCancel}
      onDismiss={() => {
        setOpenDeleteDialog(false);
        setActionId('');
      }}
      actionLabel="Delete"
    />
  );

  const confirmReservationDialog = (
    <ConfirmDialog
      isOpen={openConfirmDialog}
      title="Are you sure you want to confirm this reservation?"
      subtitle="You can still cancel this reservation 10 days before arrival."
      onConfirm={onConfirm}
      onDismiss={() => {
        setOpenConfirmDialog(false);
        setActionId('');
      }}
      actionLabel="Confirm"
    />
  );

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
        <>
          {confirmReservationDialog}
          {deleteReservationDialog}
        </>
        {reservations.map((reservation: any) => (
          <ReservationCard
            key={reservation.id}
            reservation={reservation}
            actionId={reservation.id}
            onDelete={() => { setActionId(reservation.id); setOpenDeleteDialog(true) }}
            onConfirm={() => { setActionId(reservation.id); setOpenConfirmDialog(true) }}
            disabled={actionId === reservation.id}
            actionLabel="Cancel reservation"
            showMessage
          />
        ))}
      </div>
    </Container>
  );
}

export default ReservationsClient;