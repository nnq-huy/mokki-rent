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
import Button from "../components/Button";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import ReservationsTable from "../components/reservations/ReservationsTable";
import { BsFillGridFill, BsListUl } from "react-icons/bs";

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
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openMarkDoneDialog, setOpenMarkDoneDialog] = useState(false);


  const [actionId, setActionId] = useState('');
  const [showCancelled, setShowCancelled] = useState(false);
  const [listView, setListView] = useState(true);

  const onMarkDone = async () => {
    const data = {
      status: ReservationStatus.done
    }
    await axios.put(`/api/reservations/${actionId}`, data)
      .then(() => {
        toast.success('Reservation marked as done');
        setOpenMarkDoneDialog(false);
        router.refresh();
      })
      .catch(() => {
        toast.error('Something went wrong.')
      }).finally(() => {
        setActionId('');
      })
  }

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
  const markDoneReservationDialog = (
    <ConfirmDialog
      isOpen={openMarkDoneDialog}
      title="Are you sure you want to mark this reservation as completed?"
      subtitle="This cannot be undone."
      onConfirm={onMarkDone}
      onDismiss={() => {
        setOpenMarkDoneDialog(false);
        setActionId('');
      }}
      actionLabel="Continue"
    />
  );
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

  const filteredReservations = reservations.filter((rerservation) => {
    if (!showCancelled) { return rerservation.status != 'cancelled'; }
    else return rerservation.status
  });
  return (
    <div className="min-h-[80vh]">
      <Heading
        title="Reservations"
        subtitle="Bookings on your properties"
      />
      <>
        {markDoneReservationDialog}
        {deleteReservationDialog}
        {confirmReservationDialog}
        {cancelReservationDialog}
      </>
      <div className="flex flex-row justify-between gap-4 px-4 w-full">
        <Button
          small
          outline
          icon={showCancelled ? AiFillEye : AiFillEyeInvisible}
          label={showCancelled ? 'Cancelled is shown' : 'Cancelled is hidden'}
          onClick={() => setShowCancelled(!showCancelled)}
        />
        <Button
          small
          outline
          icon={listView ? BsListUl : BsFillGridFill}
          label={listView ? 'List View' : 'Grid View'}
          onClick={() => setListView(!listView)}
        />
      </div>
      <div className="px-4 pt-4 text-slate-500">
        Showing {filteredReservations.length} reservations
      </div>
      {listView
        ? <ReservationsTable reservations={filteredReservations} />
        : <div
          className="
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
          {filteredReservations.map((reservation) => (
            <ReservationCard
              key={reservation.id}
              reservation={reservation}
              actionId={reservation.id}
              onMarkDone={() => { setActionId(reservation.id); setOpenMarkDoneDialog(true) }}
              onDelete={() => { setActionId(reservation.id); setOpenDeleteDialog(true) }}
              onCancel={() => { setActionId(reservation.id); setOpenCancelDialog(true) }}
              onConfirm={() => { setActionId(reservation.id); setOpenConfirmDialog(true) }}
              disabled={actionId === reservation.id}
              actionLabel={(reservation.status != 'cancelled' && reservation.status !='done') ? "Cancel reservation" : ""}
              showMessage
            />
          ))}
        </div>}

    </div>
  );
}

export default ReservationsClient;
//todo: handle actions on listview