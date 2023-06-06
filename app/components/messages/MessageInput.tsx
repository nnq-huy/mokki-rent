'use client';

import {  useRef, useState } from "react";
import { BsEmojiSmile, BsImage, BsSend } from "react-icons/bs";
import { toast } from "react-hot-toast";
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import axios from "axios";
import useCurrentReservation from "@/app/hooks/useCurrentReservation";
import useIsGuest from "@/app/hooks/useIsGuest";
import { useRouter } from "next/navigation";
import Button from "../Button";
import useAutosizeTextArea from "@/app/hooks/useAutosizeTextArea";
import { Textarea } from "../inputs/Textarea";
import ImageUploadSmall from "../inputs/ImageUploadSmall";

interface ChatInputProps {
  scroll:React.RefObject<HTMLDivElement>
}
export const MessageInput : React.FC<ChatInputProps> = ({scroll})=>{
	const {currentReservation} = useCurrentReservation();
  const {isGuest} = useIsGuest();
	const router = useRouter();

  const [message, setMessage] = useState("");
  const [showEmojis, setShowEmojis] = useState(false);
	const [isLoading,setIsLoading] = useState(false);
	const textAreaRef = useRef<HTMLTextAreaElement>(null);
	useAutosizeTextArea(textAreaRef.current, message);
	const handleChange = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
  	const val = evt.target?.value;

    setMessage(val);
  };

  const addEmoji = (e:any) => {
    let sym = e.unified.split("-");
    let codesArray: any[] = [];
    sym.forEach((el: string) => codesArray.push("0x" + el));
    let emoji = String.fromCodePoint(...codesArray);
    setMessage(message + emoji);
    setShowEmojis(!showEmojis);
  };

  const sendMessage = async (isPicture:Boolean, imgUrl?:string) =>{
		if (message.trim()===""&& !isPicture){
      toast.error('please enter an message...')
      return
    } else {
		const messageData ={
			isPicture: isPicture,
    	content:imgUrl??message,
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
			scroll.current?.scrollIntoView({behavior:"smooth"});

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
					w-full 
					px-2
				">
			<ImageUploadSmall
				onChange={(value)=>sendMessage(true,value)}
			/>
	      <div className="flex-grow ml-1">
	        <div className="relative w-full p-2">
	      		<Textarea
							maxLength={500}
							id="message"
	      		  onChange={handleChange}
	      		  placeholder="enter your message..."
	      		  ref={textAreaRef}
	      		  rows={1}
	      		  value={message}
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
								hover:text-mokki-green"
	          	>
	            {<BsEmojiSmile/>}
	          </button>
	        </div>

	      </div>
			<div className="flex">
				<Button
				 	label=""
			 		disabled={isLoading}
					onClick={()=>sendMessage(false)}
					icon={BsSend}
					small
					outline
				/>
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
	)
}