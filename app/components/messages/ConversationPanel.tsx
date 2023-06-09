'use client'
import { Message, User } from "@prisma/client"
import MyAvatar from "../MyAvatar";
import useCurrentReservation from "@/app/hooks/useCurrentReservation";
import { useEffect, useRef, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MessageBubble } from "./MessageBubble";
import useIsGuest from "@/app/hooks/useIsGuest";
import { MessageInput } from "./MessageInput";
import ReservationDetailSmall from "./ReservationDetailSmall";

interface ConversationPanelProps {
  messages: Message[],
  currentUser: User
}
const ConversationPanel: React.FC<ConversationPanelProps> = ({ messages,currentUser }) => {
  const { currentReservation } = useCurrentReservation();
  const [currentMessages, setCurrentMessages] = useState<Message[]>([]);
  const { isGuest } = useIsGuest();
  const scroll = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let filteredMessages: Message[] = [];
    messages.forEach((message) => {
      if (message.reservationId === currentReservation.id) {
        filteredMessages.push(message);
      }
    })
    setCurrentMessages(filteredMessages);
  }, [currentReservation, messages]);

  return (
    <div className="flex w-full flex-col bg-gray-50 justify-between p-2 rounded-lg shadow-sm">
      <div className="flex flex-col items-center">
        <div className="flex justify-between items-center w-full h-[40px] bg-gray-100 rounded-xl shadow-lg">
        {isGuest
          ? <div className="p-2 flex items-center">
            <MyAvatar src={currentReservation.hostPhoto!} />
            <div>
              <p className="font-semibold text-gray-800 px-2">{currentReservation.hostName}</p>
            </div>
          </div>
          : <div className="p-2 flex items-center">
            {(currentReservation.user) ? <MyAvatar src={currentReservation.user!.image!} /> : <></>}
            <div>
              <p className="font-semibold text-gray-800 px-2">{currentReservation.user?.name}</p>
            </div>
          </div>
        }
        <button className="px-2 text-xl text-gray-700">
          {<BsThreeDotsVertical />}
        </button>
        </div>
        <div className="inline">
          <ReservationDetailSmall reservation={currentReservation} currentUser={currentUser}/>
        </div>
      </div>
      <div className="flex flex-col p-4 overflow-auto">
        {currentMessages.length
          ? <ul>
            {currentMessages.map((message) => (
              <li key={message.id} className="">
                {
                  message.senderId === currentReservation.hostId
                    ? <MessageBubble message={message} isLeft={isGuest} />
                    : <MessageBubble message={message} isLeft={!isGuest} />
                }
              </li>
            ))}
          </ul>
          : <div className="text-center text-gray-400">
            no messages found...
          </div>
        }
        <span ref={scroll}></span>
      </div>
      <MessageInput scroll={scroll} />
    </div>
  );
}

export default ConversationPanel;