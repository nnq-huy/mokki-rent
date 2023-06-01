'use client';


import useLoginModal from "@/app/hooks/useLoginModal";
import Container from "@/app/components/Container";
import {  User, Message } from "@prisma/client";

const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: 'selection'
};

interface MessagesClientProps {
  messsages: Message[]
  currentUser?: User | null;
}

const MessagingClient: React.FC<MessagesClientProps> = ({
  messsages,
  currentUser
}) => {




  return ( 
    <Container>
      <div 
        className="max-w-full flex justify-between max-h-screen
        min-h-full
        "
      >
        <div className="w-80 bg-neutral-700 text-white">contact panel</div>
        <div className="w-full bg-mokki-green">conversation panel</div>
        <div className="w-96 bg-rose-500">Reservation detail panel</div>
      </div>
    </Container>
   );
}
 
export default MessagingClient;
