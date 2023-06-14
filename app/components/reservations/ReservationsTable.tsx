import { Listing, Reservation, ReservationStatus, User } from "@prisma/client";
import { DataTable } from "../ui/data-table";
import { columns } from "./DataColumn";

interface ReservationsTableProps {
  reservations: (Reservation & {
    user: User,
    listing: Listing
  })[],
}

const ReservationsTable : React.FC<ReservationsTableProps> = ({reservations})=>{
  return (
<div className="container mx-auto py-2">
      <DataTable columns={columns} data={reservations} />
    </div>  )
}

export default ReservationsTable;