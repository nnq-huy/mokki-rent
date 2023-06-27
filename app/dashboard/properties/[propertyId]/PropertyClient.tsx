'use client';
// this page is for host managing the property
import axios from "axios";
import { useMemo, useState } from "react";
import { toast } from "react-hot-toast";
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import listPlugin from '@fullcalendar/list';


import { enGB } from 'date-fns/locale'

import { useRouter } from "next/navigation";

import Container from "@/app/components/Container";
import { Reservation, Listing, User } from "@prisma/client";
import PropertyTabs from "@/app/components/properties/PropertyTab";
import { categories, eventColors } from "@/app/constants";
import { Booking } from "@/app/types";
import PropertyReservationsTable from "@/app/components/properties/PropertyResTable";
import DetailsPage from "@/app/components/properties/PropertyDetails";




interface PropertyClientProps {
  reservations?: (Reservation & { user: User, listing: Listing })[];
  listing: Listing & {
    user: User;
  };
  currentUser?: User | null;
}

const PropertyClient: React.FC<PropertyClientProps> = ({
  listing,
  reservations = [],
  currentUser
}) => {
  const router = useRouter();

  const reservationsNoCancelled = reservations.filter((rerservation) => {
    return rerservation.status != 'cancelled';
  });

  function dateToISOString(date: Date) {
    const yearString = date.getFullYear().toString();
    const month = (date.getMonth() + 1);
    const monthString = month > 9 ? month.toString() : `0${month}`;
    const day = date.getDate();
    const dayString = day > 9 ? day.toString() : `0${day}`;

    return `${yearString}-${monthString}-${dayString}`;
  }
  //get bookings from reservations
  const events = useMemo(() => {

    let bookings: Booking[] = [];
    reservationsNoCancelled.forEach((reservation) => {
      //get random color for each event on the calendar
      const colorSeed = Math.floor(Math.random() * 13);
      const booking: Booking = {
        id: reservation.id,
        title: 'booked by ' + reservation.user!.name ?? '',
        start: dateToISOString(reservation.startDate) + 'T16:00:00',
        end: dateToISOString(reservation.endDate) + 'T12:00:00',
        color: eventColors[colorSeed]
      }
      bookings.push(booking);
    });

    return bookings;
  }, [reservationsNoCancelled]);

  const category = useMemo(() => {
    return categories.find((items) =>
      items.label === listing.category);
  }, [listing.category]);
  const [isLoading, setIsLoading] = useState(false);

  const detailsContent = (
   <DetailsPage listing={listing}/>
  );

  const calendarContent = (
    <div className="w-[80vw]">
      <h1 className="font-semibold text-xl">Bookings for {listing.title}</h1>

      <FullCalendar
        buttonText={{ today: 'today', dayGridMonth: 'Home', listWeek: 'Week'}}
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,listWeek'
        }}
        weekNumbers={true}
        firstDay={1}
        locale={'gb'}
        events={events}
        plugins={[dayGridPlugin, listPlugin]}
        initialView='dayGridMonth'
        eventColor='#028446'
      />
    </div>
  );
  const bookingsContent = (
    <div className="w-[80vw]">
      <h1 className="font-semibold text-xl">Bookings for {listing.title}</h1>
      <p className="text-neutral-500 ">Showing {reservations.length} bookings</p>
      <PropertyReservationsTable reservations={reservations} />
    </div>

  );
  const settingsContent = (
    <div className="w-[80vw]">
      settings contents
    </div>
  );

  return (
    <Container>
      <div className="bg-gray-50 pb-4 px-4">
        <PropertyTabs
          details={detailsContent}
          calendar={calendarContent}
          bookings={bookingsContent}
          settings={settingsContent}
        />
      </div>
    </Container>
  );
}

export default PropertyClient;
//todo: setting page