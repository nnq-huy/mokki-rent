'use client'
import { Message } from "@prisma/client"
import Avatar from "../Avatar";
import useCurrentReservation from "@/app/hooks/useCurrentReservation";
import { useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MessageBubble } from "./MessageBubble";

interface ConversationPanelProps {
  messages: Message[]
}
const ConversationPanel : React.FC<ConversationPanelProps> = ({messages})=>{
  const {currentReservation} = useCurrentReservation();
  const [currentMessages, setCurrentMessages] = useState<Message[]>([]);
  

  useEffect(()=>{
    let filteredMessages:Message[] = [];
    
  messages.forEach((message)=>{
    if(message.reservationId ===currentReservation.id){
      filteredMessages.push(message);
    }
  })
  setCurrentMessages(filteredMessages);

  },[currentReservation, messages])
  return (
		<div className="flex w-full flex-col bg-gray-50 justify-between p-2">
      <div className="flex justify-between items-center w-full h-16 bg-gray-100 rounded-xl shadow-lg">
        <div className="p-2 flex items-center">
          <Avatar src={currentReservation.hostPhoto}/>
          <div>
          <p className="font-semibold text-gray-800 px-2">{currentReservation.hostName}</p>

          </div>
        </div>
          <button className="px-2 text-xl text-gray-700">
            {<BsThreeDotsVertical/>}
          </button>
        </div>

        <div className="flex flex-col p-4 overflow-auto">
          <ul>
            {currentMessages.map((message)=>(
              <li key={message.id}>
                {
                  message.senderId==currentReservation.hostId
                  ? <MessageBubble message={message} isLeft={true}/>
                  : <MessageBubble message={message} isLeft={false}/>
                }
              </li>
            ))}
          </ul>
      </div>
    </div>
    );
}

export default ConversationPanel;