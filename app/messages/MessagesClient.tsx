'use client';

import axios from "axios";
import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "react-hot-toast";
import { Range } from "react-date-range";
import { useRouter } from "next/navigation";
import { differenceInDays, eachDayOfInterval } from 'date-fns';

import useLoginModal from "@/app/hooks/useLoginModal";
import Container from "@/app/components/Container";
import { Listing, User, Message } from "@prisma/client";

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
  const loginModal = useLoginModal();
  const router = useRouter();
  
  const [isLoading, setIsLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [dateRange, setDateRange] = useState<Range>(initialDateRange);

  const onCreateReservation = useCallback(() => {
      if (!currentUser) {
        return loginModal.onOpen();
      }
      setIsLoading(true);

      axios.post('/api/reservations', {
        totalPrice,
        startDate: dateRange.startDate,
        endDate: dateRange.endDate,
      })
      .then(() => {
        toast.success('Listing reserved!');
        setDateRange(initialDateRange);
        router.push('/trips');
      })
      .catch(() => {
        toast.error('Something went wrong.');
      })
      .finally(() => {
        setIsLoading(false);
      })
  },
  [
    totalPrice, 
    dateRange, 
    router,
    currentUser,
    loginModal
  ]);



  return ( 
    <Container>
      <div 
        className="
          max-w-screen-lg 
          mx-auto
        "
      >
        Messages
      </div>
    </Container>
   );
}
 
export default MessagingClient;
