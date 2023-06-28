import { BoookingEvent, Message, Reservation, User } from "@prisma/client";

interface ReservationClientProps {
  reservation: Reservation & {
    user: User;
    events: BoookingEvent[];
    messages: Message[];
  },
}

const ReservationClient: React.FC<ReservationClientProps> =({reservation})=>{
  const events= reservation.events
  return (<>
  {events.length && events[0].event}
  </>)
}

export default ReservationClient;