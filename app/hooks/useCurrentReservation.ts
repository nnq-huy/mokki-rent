import { Listing, Reservation, User } from '@prisma/client';
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
      confirmed: false,
      createdAt: new Date(),
    } 
    
  ) ,
  setCurrentReservation : (reservation) => set({currentReservation:reservation})
}));

export default useCurrentReservation;