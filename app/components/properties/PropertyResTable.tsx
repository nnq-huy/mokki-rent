import { Listing, Reservation, User } from "@prisma/client";
import { DataTable } from "../ui/data-table";
import { columns } from "./DataColumn";

interface PropertyReservationsTableProps {
  reservations: (Reservation & {
    user: User,
    listing: Listing
  })[],
}

const PropertyReservationsTable : React.FC<PropertyReservationsTableProps> = ({reservations})=>{
  return (
<div className="container mx-auto">
      <DataTable columns={columns} data={reservations} />
    </div>  )
}

export default PropertyReservationsTable;