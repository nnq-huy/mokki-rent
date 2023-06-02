'use client';

import { useState } from "react";
import Modal from "./Modal";
import useMessageModal from "@/app/hooks/useMessageModal";
import useCurrentReservation from "@/app/hooks/useCurrentReservation";
import Heading from "../Heading";
import { Textarea } from "@/app/components/inputs/Textarea"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/app/components/form/Form"
import { messageSchema } from "@/app/validations/message.validation";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Button from "../Button";
import useIsGuest from "@/app/hooks/useIsGuest";


const MessageModal =  () => {
  const [isLoading, setIsLoading] = useState(false);
  const messageModal = useMessageModal();
  const {isGuest} = useIsGuest();
  const {currentReservation} = useCurrentReservation();

  
  const {
    handleSubmit,
    setValue,
    formState: {
      errors,
    },
  } = useForm<FieldValues>({
    defaultValues: {
      isPicture: false,
      content:'',
      receiverId:'',
      reservationId:'',
    }
  });

  const form = useForm<Yup.InferType<typeof messageSchema>>({
    resolver: yupResolver(messageSchema),
    defaultValues: {
      message: "",
    },
  })

  const onSubmit: SubmitHandler<FieldValues> = (data) => {

    setValue('receiverId',isGuest?currentReservation.hostId:currentReservation.userId);
    setValue('reservationId', currentReservation.id);
    setTimeout(()=>setIsLoading(true),300);

    axios.post('/api/messages', data)
    .then(() => {
      toast.success('Message sent!');
      messageModal.onClose();
    })
    .catch((error) => {
      toast.error('Error: '+error);
    })
    .finally(() => {
      setIsLoading(false);
      form.reset();
    })
  }

  const bodyContent = (
    <div className="flex flex-col gap-1">
			<Heading 
				title={isGuest?"Ask your host":"Send a message  to your guest"}
				subtitle={isGuest?currentReservation.hostName:''}
		  />
      <div>
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      maxLength={500}
                      required
                      placeholder="enter your message (max 500 characters)"
                       {...field}
                       />
                      </FormControl>
                  <FormMessage />
                </FormItem>
              )} name={'message'} />
              <Button submit={true}
                label="Send"
                onClick={()=>setValue('content', form.getValues().message)}
              />
      </form>
    </Form>
      </div>
    </div>
  );
	const footerContent = (
		<div className="text-neutral-400 font-light text-sm text-center">You can view your past messages in the messages page</div>
	)

  return (
    <Modal
      disabled={isLoading}
      isOpen={messageModal.isOpen}
      title="Message"
      onClose={messageModal.onClose}
      onSubmit={()=>{}}
      body={bodyContent}
      footer={footerContent}
    />
  );
}

export default MessageModal;