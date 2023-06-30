'use client';

import Container from "@/app/components/Container";
import { User, Message, Reservation, Listing, BoookingEvent } from "@prisma/client";
import MessageLeftPanel from "../components/messages/MessageLeftPanel";
import ConversationPanel from "../components/messages/ConversationPanel";

interface MessagesClientProps {
  reservationsAsGuest: (Reservation & {
    user: User;
    listing: Listing;
    events:BoookingEvent[];
  })[];
  reservationsAsHost: (Reservation & {
    user: User;
    listing: Listing;
    events:BoookingEvent[];
  })[];
  messsages: Message[]
  currentUser: User
}

const MessagesClient: React.FC<MessagesClientProps> = ({
  reservationsAsGuest,
  reservationsAsHost,
  messsages,
  currentUser
}) => {
  const messagesSortedByTime = messsages.sort((a, b) => (a.createdAt.getTime() - b.createdAt.getTime()));

  return (
    <Container>
        <div
          className="max-w-full flex flex-row h-[90vh]"
        >
          <MessageLeftPanel reservationsAsGuest={reservationsAsGuest} reservationsAsHost={reservationsAsHost} />
          <ConversationPanel messages={messagesSortedByTime} currentUser={currentUser} />
        </div>
    </Container>
  );
}

export default MessagesClient;
