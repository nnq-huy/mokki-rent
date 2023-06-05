'use client';

import { useContext, useRef, useState } from "react";
import { BsEmojiSmile, BsImage, BsSend } from "react-icons/bs";
import { toast } from "react-hot-toast";
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import axios from "axios";
import { UserContext } from "@/app/messages/MessagesClient";
import useCurrentReservation from "@/app/hooks/useCurrentReservation";
import useIsGuest from "@/app/hooks/useIsGuest";
import { useRouter } from "next/navigation";


interface ChatInputProps {
	
  scroll?:React.RefObject<HTMLDivElement>
}
export const MessageInput : React.FC<ChatInputProps> = ({scroll})=>{
	const {currentReservation} = useCurrentReservation();
  const {isGuest} = useIsGuest();
	const router = useRouter();

  const [message, setMessage] = useState("");
  const [showEmojis, setShowEmojis] = useState(false);
  const inputFile = useRef(null);
	const [isLoading,setIsLoading] = useState(false);

  const addEmoji = (e:any) => {
    let sym = e.unified.split("-");
    let codesArray: any[] = [];
    sym.forEach((el: string) => codesArray.push("0x" + el));
    let emoji = String.fromCodePoint(...codesArray);
    setMessage(message + emoji);
    setShowEmojis(!showEmojis);
  };

  const sendMessage = async () =>{

    if (message.trim()===""){
      toast.error('please enter an message...')
      return
    }else {
			const messageData ={
			isPicture: false,
      content:message,
      receiverId:isGuest?currentReservation.hostId:currentReservation.userId,
      reservationId:currentReservation.id,
			}
			setIsLoading(true);
      try {
				axios.post('/api/messages', messageData)
				.then(() => {
					toast.success('Message sent!');
					setMessage("");
					router.refresh();
				})
				.catch((error) => {
					toast.error('Error: '+error);
				})
				.finally(() => {
					setIsLoading(false);
				});
      } catch(e) {toast.error('Cannot send message: '+e)}
    }
  }

return (
  <div>
		<div 
			className="
				flex-grow
				flex
				flex-row 
				items-center 
				rounded-xl 
				shadow-xl 
				max-h-36
				bg-white 
				dark:bg-gray-600 
				w-full 
				px-2
			">
      <div>
				<input 
					title="file select" 
					type="file" accept="image/*" 
					id='file' 
					ref={inputFile} 
					onChange={()=>{}} 
					className="hidden"/>
        <button
          onClick={()=>{}}
          className="flex items-center justify-center text-gray-400 hover:text-gray-600"
        >
          { <BsImage/>}
        </button>
      </div>
      <div className="flex-grow ml-1">
        <div className="relative w-full p-2">
					
					<input
						maxLength={500}
            title="message"
            type="text"
            value={message}
            onChange={(e)=>setMessage(e.target.value)}
            className="
							bg-gray-50
							dark:bg-gray-300 
							flex 
							w-full 
							border 
							rounded-xl 
							focus:outline-none 
							focus:border-mokki-green 
							pl-4 
							h-10"
          />
					
        
          <button
            onClick={() => setShowEmojis(!showEmojis)}
            className="
							absolute 
							flex 
							items-center 
							justify-center 
							h-full 
							w-12 
							right-0 
							top-0 
							text-gray-400 
							hover:text-gray-600"
          >
            {<BsEmojiSmile/>}
          </button>
        </div>
      </div>
      <div className="ml-4">
        <button
					disabled={isLoading}
        	onClick={sendMessage}
          className="
						flex 
						items-center 
						justify-center 
						bg-mokki-green 
						hover:bg-green-500 
						rounded-md 
						text-white 
						px-4 
						py-1 
						flex-shrink-0"
        >
          <span>Send</span>
          <span className="ml-2">
          {<BsSend/>}
          </span>
        </button>
      </div>
    </div>
    {showEmojis && (
      <div>
    		<Picker 
					data={data} 
					onEmojiSelect={addEmoji} 
				/>
      </div>
    )}
  </div>
)}