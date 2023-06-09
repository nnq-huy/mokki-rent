
import getCurrentUser from "@/app/actions/getCurrentUser";
import ClientOnly from "@/app/components/ClientOnly";
import EmptyState from "@/app/components/EmptyState";
import MessagesClient from "./MessagesClient";
import getMessages from "../actions/getMessages";
import getReservations from "@/app/actions/getReservations";

const MessagesPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState
          title="Unauthorized"
          subtitle="Please login to access this page"
          showLogin
        />
      </ClientOnly>
    )
  }
  const messagesReceived = await getMessages({ receiverId: currentUser!.id });
  const messagesSent = await getMessages({ senderId: currentUser!.id });
  const reservationsAsGuest = await getReservations({ userId: currentUser.id });
  const reservationsAsHost = await getReservations({ hostId: currentUser.id });

  return (
    <ClientOnly>
      <MessagesClient
        reservationsAsGuest={reservationsAsGuest}
        reservationsAsHost={reservationsAsHost}
        messsages={messagesReceived.concat(messagesSent)}
        currentUser={currentUser}
      />
    </ClientOnly>
  );
}

export default MessagesPage;
