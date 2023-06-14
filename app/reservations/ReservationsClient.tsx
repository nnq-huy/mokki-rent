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
  const [actionId, setActionId] = useState('');
  const [showCancelled, setShowCancelled] = useState(false);
  const [listView, setListView] = useState(true);

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

  const filteredReservations = reservations.filter((rerservation) => {
    if (!showCancelled) { return rerservation.status != 'cancelled'; }
    else return rerservation.status
  });
  return (
    <Container>
      <Heading
        title="Reservations"
        subtitle="Bookings on your properties"
      />
      <>
        {confirmReservationDialog}
        {cancelReservationDialog}
      </>
      <div className="flex flex-row justify-between gap-4 px-4 w-[100vw]">
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
          label={listView? 'List View' : 'Grid View'}
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
              onDelete={() => { setActionId(reservation.id); setOpenCancelDialog(true) }}
              onConfirm={() => { setActionId(reservation.id); setOpenConfirmDialog(true) }}
              disabled={actionId === reservation.id}
              actionLabel={reservation.status != ReservationStatus.cancelled ? "Cancel reservation" : ""}
              showMessage
            />
          ))}
        </div>}

    </Container>
  );
}

export default ReservationsClient;
//todo: handle actions on listview