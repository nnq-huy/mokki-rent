'use client';

import { Listing, Reservation, ReservationStatus, User } from "@prisma/client"
import TripCard from "../trips/TripCard";
import useIsGuest from "@/app/hooks/useIsGuest";
import ReservationCard from "../reservations/ReservationCard";

import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import ConfirmDialog from "../ConfirmDialog";

interface ReservationPanelProps {
  reservation: Reservation & {
    user?: User;
    listing?: Listing;
  }
}
const ReservationPanel: React.FC<ReservationPanelProps> = ({ reservation }) => {
  const { isGuest } = useIsGuest();
  const router = useRouter();
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [openCancelDialog, setOpenCancelDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const [actionId, setActionId] = useState('');

  const onDelete = async () => {
    await axios.delete(`/api/reservations/${actionId}`)
      .then(() => {
        toast.success('Reservation deleted');
        setOpenDeleteDialog(false);
        router.refresh();
      })
      .catch(() => {
        toast.error('Something went wrong.')
      }).finally(() => {
        setActionId('');
      })
  };


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


  const deleteReservationDialog = (
    <ConfirmDialog
      isOpen={openDeleteDialog}
      title="Are you sure you want to permanently delete this reservation?"
      subtitle="This cannot be undone."
      onConfirm={onDelete}
      onDismiss={() => {
        setOpenDeleteDialog(false);
        setActionId('');
      }}
      actionLabel="Delete"
    />
  );

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
    />
  );

  const isCancellable = (reservation.status == ReservationStatus.unconfirmed || reservation.status == ReservationStatus.confirmed)

  return (
    <div className="bg-white rounded-lg shadow-sm w-0 sm:w-0 md:w-[24rem] lg:w-[24rem]">
      {reservation.listing
        && <div>
          <>
            {deleteReservationDialog}
            {confirmReservationDialog}
            {cancelReservationDialog}
          </>
          {<div className="p-2">Reservation details</div>}
          {isGuest
            ? <TripCard
              disabled={actionId === reservation.id}
              onAction={isCancellable ? () => { setActionId(reservation.id); setOpenCancelDialog(true) } : undefined}
              actionLabel={isCancellable ? "Cancel reservation" : ""}
              reservation={reservation} />
            : <ReservationCard
              disabled={actionId === reservation.id}
              key={reservation.id}
              reservation={reservation}
              onDelete={() => { setActionId(reservation.id); setOpenDeleteDialog(true) }}
              onCancel={isCancellable ? () => { setActionId(reservation.id); setOpenCancelDialog(true) } : undefined}
              onConfirm={() => { setActionId(reservation.id); setOpenConfirmDialog(true) }}
              actionLabel={isCancellable ? "Cancel reservation" : ""}
            />}
        </div>}
    </div>
  );
}

export default ReservationPanel;