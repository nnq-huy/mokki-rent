'use client'
import { Listing, Reservation, User } from "@prisma/client"
import Avatar from "../Avatar";
import useCurrentReservation from "@/app/hooks/useCurrentReservation";
import useIsGuest from "@/app/hooks/useIsGuest";
import Button from "../Button";
import { useEffect, useState } from "react";

interface LeftPanelProps {
  reservationsAsGuest: (Reservation & {
    user?: User;
    listing?: Listing;
})[];
  reservationsAsHost: (Reservation & {
    user?: User;
    listing?: Listing;
})[];
}

const LeftPanel : React.FC<LeftPanelProps> = ({reservationsAsGuest,reservationsAsHost})=>{
  const {setCurrentReservation, resetCurrentReservation} = useCurrentReservation();
  const {isGuest, switchToGuest, switchToHost} = useIsGuest();
  const [reservationsList, setReservationList] = useState(reservationsAsGuest);

  useEffect(()=>{
    if(isGuest){
      setReservationList(reservationsAsGuest);
    } else {
      setReservationList(reservationsAsHost);
    }

  },[isGuest, reservationsAsGuest, reservationsAsHost]);

  return (
		<div className="flex">
      <div className="
        overflow-y-auto 
        shadow-sm
        bg-gray-50
        w-16
        sm:w-16
        md:w-[17rem]
        border-r-2
        border-gray-200
        rounded-lg
      ">
        <div className="flex px-5 py-2 justify-between">
          <h2 className="
            text-center
            overflow-hidden 
            -z-10 
            sm:-z-10 
            md:z-0 
            sm:p-0 
            md:px-5 
            text-md 
            font-semibold
            text-gray-600 
          ">
            {isGuest?"Guest View":"Host View"}
          </h2>
        </div>
        <div className="md:px-12 pb-2">
          <Button
            label="Switch role"
            onClick={()=>{
              if (isGuest){
                (reservationsAsHost.length >0) ? setCurrentReservation(reservationsAsHost[0]) : resetCurrentReservation()
                switchToHost();
              } else {
                switchToGuest();
                (reservationsAsGuest.length >0) ? setCurrentReservation(reservationsAsGuest[0]) : resetCurrentReservation()
              }
            }}
            outline
          />
        </div>
        <div className="space-y-4">
          <hr/>
            <div className="px-2">Reservations</div>
            {reservationsList.length ?
             <ul>
              { reservationsList.map((reservation)=>(
              <li key={reservation.id}>
                <button
                  className="
                    flex 
                    items-center 
                    w-full 
                    px-3 
                    py-2 
                    gap-x-2 
                    hover:bg-gray-200 
                    focus:outline-none"
                  onClick={()=>{setCurrentReservation(reservation)}}
                >
                  <Avatar src={isGuest?reservation.hostPhoto:reservation.user!.image}/>
                  <div className=" hidden md:block md:w-2/3 text-left rtl:text-right">
                    <h1 className="truncate text-sm font-semibold text-gray-700 capitalize dark:text-white">
                      {reservation.listing!.locationValue}<br/>
                      {reservation.startDate.toLocaleDateString('fi')} - {reservation.endDate.toLocaleDateString('fi')}
                    </h1>
                    {isGuest
                    ? <div className=" hidden md:block md:w-2/3 text-left rtl:text-right truncate text-xs text-gray-500 dark:text-gray-400">
                      Host: {reservation.hostName}
                    </div>
                    : <div className=" hidden md:block md:w-2/3 text-left rtl:text-right truncate text-xs text-gray-500 dark:text-gray-400">
                    Guest: {reservation.user!.name}
                    </div>}
                  </div>

                </button>
              </li>
            ))}
						</ul>:
            <div className="text-neutral-400 text-center text-md align-self-center">
              no reservations found
            </div>}
            
        </div>
      </div>
    </div>
    );
}

export default LeftPanel;