
import EmptyState from "@/app/components/EmptyState";
import ClientOnly from "@/app/components/ClientOnly";

import getCurrentUser from "@/app/actions/getCurrentUser";
import getReservations from "@/app/actions/getReservations";
import BookingsClient from "./BookingsClient";


const BookingsPage = async () => {
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

  if (reservations.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title="No reservations found"
          subtitle="Looks like you have no reservations on your properties."
          showRent
        />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <BookingsClient
        reservations={reservations}
        currentUser ={currentUser}
      />
    </ClientOnly>
  );
}

export default BookingsPage;
