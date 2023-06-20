
import EmptyState from "@/app/components/EmptyState";
import ClientOnly from "@/app/components/ClientOnly";

import getCurrentUser from "@/app/actions/getCurrentUser";
import getReservations from "@/app/actions/getReservations";
import getListings from "@/app/actions/getListings";
import DashboardClient from "./DashboardClient";
import getMessages from "../actions/getMessages";


const HostDashboard = async () => {
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

  const reservations = await getReservations({ hostId: currentUser.id });
  const listings = await getListings({ userId: currentUser.id });
  const messagesReceived = await getMessages({ receiverId: currentUser!.id });
  const messagesSent = await getMessages({ senderId: currentUser!.id });
  return (
    <ClientOnly>
      <DashboardClient
        reservations={reservations}
        listings={listings}
        messsages={messagesReceived.concat(messagesSent)}
      />
    </ClientOnly>
  );
}

export default HostDashboard;
