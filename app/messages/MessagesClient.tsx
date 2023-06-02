'use client';


import Container from "@/app/components/Container";
import {  User, Message, Reservation } from "@prisma/client";
import LeftPanel from "../components/messages/LeftPanel";
import ConversationPanel from "../components/messages/ConversationPanel";
import ReservationPanel from "../components/messages/ReservationDetailsPanel";
import useCurrentReservation from "../hooks/useCurrentReservation";

interface MessagesClientProps {
  reservationsAsGuest : Reservation[];
  messsages: Message[]
  //currentUser?: User | null;
}

const MessagingClient: React.FC<MessagesClientProps> = ({
  reservationsAsGuest,
  messsages,
  //currentUser
}) => {
  const {currentReservation} = useCurrentReservation();



  return ( 
    <Container>
      <div 
        className="max-w-full flex justify-between max-h-screen
        min-h-full
        "
      >
       <LeftPanel reservations={reservationsAsGuest}/>
        <ConversationPanel messages={messsages}/>
        <ReservationPanel reservation={currentReservation}/>
      </div>
    </Container>
   );
}
 
export default MessagingClient;
