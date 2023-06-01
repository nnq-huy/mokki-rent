import { useState } from "react";
import Modal from "./Modal";
import useMessageModal from "@/app/hooks/useMessageModal";
import useCurrentReservation from "@/app/hooks/useCurrentReservation";
import Heading from "../Heading";
import TextInput from "../inputs/TextInput";

const MessageModal = () => {
  const [isLoading, setIsLoading] = useState(false);
  const messageModal = useMessageModal();

  const onSubmit = async ()=>{}

  const {currentReservation, setCurrentReservation} = useCurrentReservation();

  const bodyContent = (
    <div className="flex flex-col">
			<Heading 
				title="Message to your host:"
				subtitle={currentReservation.hostName}
			/>
        <TextInput
          id="message"
          label=" "
          disabled={isLoading}
          required
        />
    </div>
  );
	const footerContent = (
		<></>
	)

  return (
    <Modal
      disabled={isLoading}
      isOpen={messageModal.isOpen}
      title="Message"
      onClose={messageModal.onClose}
      onSubmit={onSubmit}
      body={bodyContent}
      footer={footerContent}
			actionLabel="Send"
    />
  );
}

export default MessageModal;