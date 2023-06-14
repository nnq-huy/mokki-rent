import { Listing, Reservation, ReservationStatus, User } from '@prisma/client';
import {create} from 'zustand';

interface CurrentReservationStore {
  currentReservation : (Reservation & {
    user?: User;
    listing?: Listing;
})
  setCurrentReservation : (reservation : (Reservation & {
    user?: User;
    listing?: Listing;
})) => void;

  resetCurrentReservation:() => void; 
}

const useCurrentReservation = create<CurrentReservationStore>((set)=>({
  currentReservation :(
     {
      id:'',
      userId:'',
      listingId:'',
      hostId:'',
      hostName:'',
      hostPhoto:'',
      startDate:new Date(),
      endDate: new Date(),
      totalPrice: 0,
      status: ReservationStatus.unconfirmed,
      createdAt: new Date(),
      rating:0
    } 
    
  ) ,
  setCurrentReservation : (reservation) => set({currentReservation:reservation}),
  resetCurrentReservation : () => set({currentReservation:{
      id:'',
      userId:'',
      listingId:'',
      hostId:'',
      hostName:'',
      hostPhoto:'',
      startDate:new Date(),
      endDate: new Date(),
      totalPrice: 0,
      status: ReservationStatus.unconfirmed,
      createdAt: new Date(),
      rating:0
    } })
}));

export default useCurrentReservation;