import { BoookingEvent, Reservation, User } from "@prisma/client";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";
import { Timeline } from 'flowbite-react';
import { MdCalendarToday } from "react-icons/md";

interface BookingTimelineProps {
  booking: Reservation & {
    events: BoookingEvent[]
  },
}
const BookingTimeline: React.FC<BookingTimelineProps> = ({ booking }) => {
  return (<Accordion type="single" collapsible>
    <AccordionItem value="item-1">
      <AccordionTrigger>Booking timeline</AccordionTrigger>
      <AccordionContent className='p-4'>
        <Timeline>
          <Timeline.Item>
            <Timeline.Point icon={MdCalendarToday} />
            <Timeline.Content>
              <Timeline.Time className='text-xs'>
                {booking.createdAt.toLocaleString('fi')}
              </Timeline.Time>
              <Timeline.Title className='text-sm'>
                booking created
              </Timeline.Title>
            </Timeline.Content>
          </Timeline.Item>
          {booking.events.map((event) => {
            return (<>
              <Timeline.Item>
                <Timeline.Point />
                <Timeline.Content>
                  <Timeline.Time className='text-xs'>
                    {event.createdAt.toLocaleString('fi')}
                  </Timeline.Time>
                  <Timeline.Title className='text-sm'>
                    booking {event.event} by {event.userId === booking.userId ? 'guest' : 'host'}
                  </Timeline.Title>
                </Timeline.Content>
              </Timeline.Item>
            </>)
          })}
        </Timeline>
      </AccordionContent>
    </AccordionItem>
  </Accordion>)
}

export default BookingTimeline;