'use client';

import Modal from "./Modal";
import useMessageModal from "@/app/hooks/useMessageModal";
import useCurrentReservation from "@/app/hooks/useCurrentReservation";
import Heading from "../Heading";
import useIsGuest from "@/app/hooks/useIsGuest";
import { MessageInput } from "../messages/MessageInput";
import Link from "next/link";


const MessageModal = () => {
  const messageModal = useMessageModal();
  const { isGuest } = useIsGuest();
  const { currentReservation } = useCurrentReservation();
  const bodyContent = (
    <div className="flex flex-col gap-1">
      <Heading
        title={isGuest ? "Ask your host" : "Send a message  to your guest"}
        subtitle={isGuest ? currentReservation.hostName : ''}
      />
      <div>
        <MessageInput />
      </div>
    </div>
  );
  const footerContent = (
    <div className="text-neutral-400 font-light text-sm text-center">
      You can view your past messages in the 
      <Link href={'/messages'}> <p className="text-mokki-green font-medium">messages page</p></Link>
    </div>
  )

  return (
    <Modal
      isOpen={messageModal.isOpen}
      title="Message"
      onClose={messageModal.onClose}
      onSubmit={() => { }}
      body={bodyContent}
      footer={footerContent}
    />
  );
}

export default MessageModal;