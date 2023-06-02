'use client'
import {Reservation } from "@prisma/client"

interface ReservationPanelProps {
  reservation: Reservation
}
const ReservationPanel : React.FC<ReservationPanelProps> = ({reservation})=>{
  return (
		<div className="bg-mokki-green w-80 flex">
            {reservation.hostName}<br/>
            {reservation.totalPrice}
      </div>
    );
}

export default ReservationPanel;