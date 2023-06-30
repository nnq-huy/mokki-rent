import { Reservation } from "@prisma/client";
import { TbDoorEnter, TbDoorExit } from "react-icons/tb";
import { Separator } from "../ui/separator";
import { format } from "date-fns";
import { statuses } from "@/app/constants";

interface BookingDetailsProps {
  booking: Reservation,
  bookedNights: number,
}

const BookingDetails: React.FC<BookingDetailsProps> = ({ booking, bookedNights }) => {
  const start = new Date(booking.startDate);
  const end = new Date(booking.endDate);
  const checkinDate = `${format(start, 'PP')}`;
  const checkinTime = `${format(start, 'p')}`
  const checkoutDate = `${format(end, 'PP')}`;
  const checkoutTime = `${format(end, 'p')}`;
  const status = statuses.find((status) => status.value === booking.status);

  return (
    <div className="border-2 rounded-md mt-4">
      <div className="flex flex-row gap-4 pt-2 text-sm text-gray-500 justify-evenly items-center">
        <div className="flex items-center">
          <TbDoorEnter />
          <p className="px-2 text-center">
            {checkinDate}
          </p>
        </div>
        <Separator orientation="vertical" />
        <div className="flex items-center">
          <TbDoorExit />
          <p className="px-2 text-center">
            {checkoutDate}
          </p>
        </div>
      </div>
      <div className="flex flex-row gap-4 pb-2 text-sm text-gray-500 justify-evenly items-center">
        <p className="px-8 text-center">
          {checkinTime}
        </p>
        <Separator orientation="vertical" />
        <p className="px-8 text-center">
          {checkoutTime}
        </p>
      </div>
      <Separator />
      <div className="flex flex-row gap-4 p-2 text-sm text-gray-600 justify-evenly items-center">
        <p className="p-2 text-center">
          {bookedNights} {bookedNights > 1 ? 'nights' : 'night'}
        </p>
        <Separator orientation="vertical" />
        <p className="p-2 text-center">
          {booking.totalPrice}€
        </p>
      </div>
      <div className="font-bold text-white flex items-center gap-1 place-content-center p-2 bg-black/70">
        {status && (
          <status.icon className=" h-4 w-4 text-white" />
        )}{status?.label.toUpperCase()}
        {status?.value==='reviewed' && <p>- {booking.rating}&nbsp;stars</p> }
      </div>
    </div>
  )
}

export default BookingDetails;

