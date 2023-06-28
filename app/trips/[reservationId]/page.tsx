import getCurrentUser from "@/app/actions/getCurrentUser";

import ClientOnly from "@/app/components/ClientOnly";
import EmptyState from "@/app/components/EmptyState";

import getReservationById from "@/app/actions/getReservationById";
import ReservationClient from "./ReservationClient";

interface IParams {
  reservationId?: string;
}

const ReservationPage = async ({ params }: { params: IParams }) => {
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
  const reservation = await getReservationById(params);

  if (!reservation) {
    return (
      <ClientOnly>
        <EmptyState />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <ReservationClient
        reservation={reservation}
      />
    </ClientOnly>
  );
}

export default ReservationPage;