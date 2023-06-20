'use client';
import { Listing, Message, Reservation, User } from "@prisma/client";
import DashboardSidebar from "../components/dashboard/DashboardSidebar";
import DashboardContent from "../components/dashboard/DashboardContent";
import ReservationsClient from "../reservations/ReservationsClient";
import PropertiesClient from "../properties/PropertiesClient";
import DashboardMessages from "../components/dashboard/DashboardMessages";

interface DashboardClientProps {
  reservations: (Reservation & {
    user: User,
    listing: Listing
  })[],
  listings: Listing[],
  currentUser?: User | null,
    messsages: Message[]

}

const DashboardClient: React.FC<DashboardClientProps> = ({
  reservations,
  listings,
  messsages,
  currentUser
}) => {
  const bookingsPage = (<ReservationsClient reservations={reservations} />);
  const mokkiPage = (<PropertiesClient listings={listings} />);
  const messagesPage = (<DashboardMessages reservationsAsHost={reservations} messsages={messsages}/>)
  return (
    <div className="flex flex-row mx-auto">
      <DashboardSidebar />
      {messagesPage}
    </div>
  )
}

export default DashboardClient;