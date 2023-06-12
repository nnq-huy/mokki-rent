'use client';

import { toast } from "react-hot-toast";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";

import Heading from "@/app/components/Heading";
import Container from "@/app/components/Container";
import { Listing, Reservation, ReservationStatus, User } from "@prisma/client";
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
  const [openCancelDialog, setOpenCancelDialog] = useState(false);
  const [actionId, setActionId] = useState('');

  const onCancel = async () => {
    const data = {
      status: ReservationStatus.cancelled
    }
    await axios.put(`/api/reservations/${actionId}`, data)
      .then(() => {
        toast.success('Reservation cancelled');
        setOpenCancelDialog(false);
        router.refresh();
      })
      .catch(() => {
        toast.error('Something went wrong.')
      }).finally(() => {
        setActionId('');
      })
  };

  const onConfirm = async () => {
    const data = {
      status: ReservationStatus.confirmed
    }
    await axios.put(`/api/reservations/${actionId}`, data)
      .then(() => {
        toast.success('Reservation confirmed!');
        setOpenConfirmDialog(false);
        router.refresh();
      })
      .catch(() => {
        toast.error('Something went wrong.')
      }).finally(() => {
        setActionId('');
      })
  };

  const cancelReservationDialog = (
    <ConfirmDialog
      isOpen={openCancelDialog}
      title="Are you sure you want to cancel this reservation?"
      subtitle="This action cannot be undone!"
      onConfirm={onCancel}
      onDismiss={() => {
        setOpenCancelDialog(false);
        setActionId('');
      }}
      actionLabel="Confirm"
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
          gap-4
          xl:px-8
          md:px-4
          sm:px-2
          px-2
        "
      >
        <>
          {confirmReservationDialog}
          {cancelReservationDialog}
        </>
        {reservations.map((reservation: any) => (
          <ReservationCard
            key={reservation.id}
            reservation={reservation}
            actionId={reservation.id}
            onDelete={() => { setActionId(reservation.id); setOpenCancelDialog(true) }}
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