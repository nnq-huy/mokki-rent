'use client'
import {Listing, Reservation, User } from "@prisma/client"
import TripCard from "../trips/TripCard";
import useIsGuest from "@/app/hooks/useIsGuest";
import ReservationCard from "../reservations/ReservationCard";
import { confirmAlert } from "react-confirm-alert";
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

import { useCallback } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface ReservationPanelProps {
  reservation: Reservation & {
    user?: User;
    listing?: Listing;
}
}
const ReservationPanel : React.FC<ReservationPanelProps> = ({reservation})=>{
  const {isGuest} = useIsGuest();
  const router = useRouter();

  const confirmDelete = useCallback((id:string) => {
    const onCancel = () => {
      axios.delete(`/api/reservations/${id}`)
      .then(() => {
        toast.success('Reservation cancelled');
        router.refresh();
      })
      .catch(() => {
        toast.error('Something went wrong.')
      })
    };

    confirmAlert({
      title: 'Are you sure?',
      message: 'you want to delete this reservation?',
      buttons: [
        {
          label: 'Yes',
          onClick: onCancel
        },
        {
          label: 'No',
        }
      ],
    });
  },[router]);

  const confirmReservation = useCallback((id:string) => {
    const onConfirm = () => {
      axios.put(`/api/reservations/${id}`)
      .then(() => {
        toast.success('Reservation confirmed!');
        router.refresh();
      })
      .catch(()=>{
        toast.error('Something went wrong.')
      })
    };

   confirmAlert({
      title: 'Are you sure?',
      message: 'you want to confirm this reservation?',
      buttons: [
        {
          label: 'Yes',
          onClick: onConfirm
        },
        {
          label: 'No',
        }
      ],
    });
  },[router]);

  return (

		<div className="bg-gray-50 rounded-lg shadow-sm w-0 sm:w-0 md:w-[24rem] lg:w-[24rem]">
      {reservation.listing
        &&<div>
          {<div className="p-2">Reservation details</div>}
            {isGuest
            ?<TripCard 
            actionId={reservation.id}
            disabled={false}
            onAction={confirmDelete}
            actionLabel="Cancel reservation"
            reservation={reservation}/>
            : <ReservationCard 
            disabled={false}
            key={reservation.id}
            reservation={reservation}
            actionId={reservation.id}
            onDelete={confirmDelete}
            onConfirm={confirmReservation}
            actionLabel="Cancel reservation"
            />}
        </div>}
      </div>
    );
}

export default ReservationPanel;