import EmptyState from "@/app/components/EmptyState";
import ClientOnly from "@/app/components/ClientOnly";

import getCurrentUser from "@/app/actions/getCurrentUser";
import getReservations from "@/app/actions/getReservations";
import ReportsClient from "./reports/ReportsClient";


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
      <ReportsClient
        reservations={reservations}
      />
    </ClientOnly>
  );
}

export default HostDashboard;