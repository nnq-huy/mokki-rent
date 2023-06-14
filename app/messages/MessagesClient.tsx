'use client';

import Container from "@/app/components/Container";
import { User, Message, Reservation, Listing } from "@prisma/client";
import LeftPanel from "../components/messages/LeftPanel";
import ConversationPanel from "../components/messages/ConversationPanel";
import ReservationPanel from "../components/messages/ReservationDetailsPanel";
import useCurrentReservation from "../hooks/useCurrentReservation";
import { createContext } from "react";

interface MessagesClientProps {
  reservationsAsGuest: (Reservation & {
    user: User;
    listing: Listing;
  })[];
  reservationsAsHost: (Reservation & {
    user: User;
    listing: Listing;
  })[];
  messsages: Message[]
  currentUser: User | null;
}
export const UserContext = createContext<User>({
  id: "",
  name: null,
  email: null,
  emailVerified: null,
  image: null,
  hashedPassword: null,
  createdAt: new Date(),
  updatedAt: new Date(),
  favoriteIds: [],
  role: 'USER'
})

const MessagingClient: React.FC<MessagesClientProps> = ({
  reservationsAsGuest,
  reservationsAsHost,
  messsages,
  currentUser
}) => {
  const { currentReservation } = useCurrentReservation();
  const messagesSortedByTime = messsages.sort((a, b) => (a.createdAt.getTime() - b.createdAt.getTime()));

  return (
    <Container>
      <UserContext.Provider value={currentUser!}>
        <div
          className="max-w-full flex flex-row h-[90vh]"
        >
          <LeftPanel reservationsAsGuest={reservationsAsGuest} reservationsAsHost={reservationsAsHost} />
          <ConversationPanel messages={messagesSortedByTime} />
          <ReservationPanel reservation={currentReservation} />
        </div>
      </UserContext.Provider>
    </Container>
  );
}

export default MessagingClient;
