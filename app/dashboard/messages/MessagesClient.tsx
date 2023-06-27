'use client';

import { User, Message, Reservation, Listing } from "@prisma/client";
import ConversationPanel from "@/app/components/messages/ConversationPanel";
import ReservationPanel from "@/app/components/messages/ReservationDetailsPanel";
import useCurrentReservation from "@/app/hooks/useCurrentReservation";
import MyAvatar from "../../components/MyAvatar";
import Heading from "../../components/Heading";
import useIsGuest from "@/app/hooks/useIsGuest";
import { Separator } from "../../components/ui/separator";

interface MessagesClientProps {
  reservationsAsHost: (Reservation & {
    user: User;
    listing: Listing;
  })[];
  messsages: Message[]
}

const MessagesClient: React.FC<MessagesClientProps> = ({
  reservationsAsHost,
  messsages,
}) => {
  const { currentReservation } = useCurrentReservation();
  const messagesSortedByTime = messsages.sort((a, b) => (a.createdAt.getTime() - b.createdAt.getTime()));
  const { setCurrentReservation } = useCurrentReservation();
  const { isGuest, switchToHost } = useIsGuest();
  const leftPanel = (
    <div className="
        shrink-0
        overflow-y-auto
        shadow-sm
        bg-white
        w-12
        md:w-[220px]
        rounded-lg
      ">
      <div className="space-y-4">
        {reservationsAsHost.length ?
          <ul>
            {reservationsAsHost.map((reservation) => (
              <li key={reservation.id}>
                <button
                  className="
                    p-2
                    w-full
                    flex 
                    justify-start
                    items-center 
                    gap-x-2
                    hover:bg-gray-100 
                    focus:outline-none"
                  onClick={() => {
                    if (isGuest) { switchToHost() };
                    setCurrentReservation(reservation)
                  }}
                >
                  <MyAvatar src={reservation.user.image!} />
                  <div className=" hidden md:block text-left rtl:text-right">
                    <p className="text-sm font-semibold text-gray-700 capitalize dark:text-white">
                      {reservation.user!.name}
                    </p>
                    <div className=" hidden md:block text-left rtl:text-right truncate text-xs text-gray-500 dark:text-gray-400">
                      {reservation.listing.title}
                    </div>
                  </div>
                </button>
                <Separator />
              </li>
            ))}
          </ul> :
          <div className="text-neutral-400 text-center text-md align-self-center">
            no reservations found
          </div>}
      </div>
    </div>)
  return (
    <div className="flex flex-col text-gray-500 w-full">
      <Heading title="Messages center" />
      <hr />
      <div
        className="flex flex-row h-[85vh]"
      >
        {leftPanel}
        <ConversationPanel messages={messagesSortedByTime} />
        <ReservationPanel reservation={currentReservation} />
      </div>
    </div>
  );
}

export default MessagesClient;
