
import getCurrentUser from "@/app/actions/getCurrentUser";
import getListingById from "@/app/actions/getListingById";
import getReservations from "@/app/actions/getReservations";

import ClientOnly from "@/app/components/ClientOnly";
import EmptyState from "@/app/components/EmptyState";

import PropertyClient from "./PropertyClient";

interface IParams {
  propertyId?: string;
}

const PropertyPage = async ({ params }: { params: IParams }) => {

  const listing = await getListingById({ listingId: params.propertyId });
  const reservations = await getReservations(params);
  const currentUser = await getCurrentUser();


  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState
          title="you are not authorized to see this page"
          subtitle="try logging in"
          showLogin
        />
      </ClientOnly>
    );
  }

  if (!listing || !currentUser) {
    return (
      <ClientOnly>
        <EmptyState />
      </ClientOnly>
    );
  }


  return (
    <ClientOnly>
      {currentUser!.id === listing.userId
        ?
        <PropertyClient
          listing={listing}
          reservations={reservations}
          currentUser={currentUser}
        />
        :
        <EmptyState
          title="you are not authorized to see this page"
          subtitle="try logging in with a different account"
          showLogin
        />}

    </ClientOnly>
  );
}

export default PropertyPage;
