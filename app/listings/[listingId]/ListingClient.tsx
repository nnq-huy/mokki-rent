'use client';
// this page is for guest viewing the listing
import axios from "axios";
import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "react-hot-toast";
import { Range } from "react-date-range";
import { useRouter } from "next/navigation";
import { differenceInDays, differenceInHours, eachDayOfInterval } from 'date-fns';

import useLoginModal from "@/app/hooks/useLoginModal";
import Container from "@/app/components/Container";
import ListingHead from "@/app/components/listings/ListingHead";
import ListingInfo from "@/app/components/listings/ListingInfo";
import ListingReservation from "@/app/components/listings/ListingReservation";
import { Reservation, Listing, User } from "@prisma/client";
import { categories } from "@/app/constants";

const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: 'selection'
};

interface PropertyClientProps {
  reservations?: Reservation[];
  listing: Listing & {
    user: User;
  };
  currentUser?: User | null;
}

const ListingClient: React.FC<PropertyClientProps> = ({
  listing,
  reservations = [],
  currentUser
}) => {
  const loginModal = useLoginModal();
  const router = useRouter();

  const disabledDates = useMemo(() => {
    //reserved dates are disabled on the calendar
    // start date of a reservation is still available as checkout date
    // end date of of a reservation is still available as a check in date
    // host can cancel overlapping reservations
    let dates: Date[] = [];

    reservations.forEach((reservation: any) => {
      const startDate = new Date(reservation.startDate);// check in date
      const endDate = new Date(reservation.endDate);//check out date
      const duration = Math.ceil(differenceInHours(endDate, startDate) / 24);
      if (duration >= 2) {
        startDate.setDate(startDate.getDate() + 1);
        endDate.setDate(endDate.getDate() - 1);
        endDate.setHours(16);
        const range = eachDayOfInterval({
          start: startDate,
          end: endDate,
        })

        dates = [...dates, ...range];
      } 




    });

    return dates;
  }, [reservations]);

  const category = useMemo(() => {
    return categories.find((items) =>
      items.label === listing.category);
  }, [listing.category]);

  const [isLoading, setIsLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [dateRange, setDateRange] = useState<Range>(initialDateRange);
  //check if the listing user's own property and disable the reserve function
  const isOwnListing = currentUser ? (currentUser.id === listing.userId) : false;

  const onCreateReservation = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    }
    setIsLoading(true);

    axios.post('/api/reservations', {
      totalPrice,
      startDate: dateRange.startDate,
      endDate: dateRange.endDate,
      listingId: listing?.id,
      hostId: listing?.userId,
      hostName: listing?.user.name,
      hostPhoto: listing?.user.image
    })
      .then(() => {
        toast.success('Listing reserved!');
        setDateRange(initialDateRange);
        router.push('/trips');
      })
      .catch(() => {
        toast.error('Something went wrong.');
      })
      .finally(() => {
        setIsLoading(false);
      })
  },
    [currentUser,
      totalPrice,
      dateRange.startDate,
      dateRange.endDate,
      listing?.id,
      listing?.userId,
      listing?.user.name,
      listing?.user.image,
      loginModal,
      router]);

  useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) {
      const dayCount = Math.ceil(differenceInHours(
        dateRange.endDate,
        dateRange.startDate
      ) / 24);
      //price calculation
      if (dayCount && listing.price) {
        setTotalPrice(dayCount * listing.price);
      } else {
        setTotalPrice(0);
      }
    }
  }, [dateRange, listing.price]);

  return (
    <Container>
      <div
        className="
          max-w-screen-xl
          mx-auto
          xl:px-8
          md:px-4 
          sm:px-2 
          px-2 
        "
      >
        <div className="flex flex-col gap-6">
          <ListingHead
            title={listing.title}
            imageSrc={listing.imageSrc}
            locationValue={listing.locationValue}
          />
          <div
            className="
              grid 
              grid-cols-1 
              md:grid-cols-7 
              md:gap-10 
              mt-6
            "
          >
            <ListingInfo
              id={listing.id}
              hostName={listing.user.name!}
              hostPhoto={listing.user.image!}
              category={category}
              description={listing.description}
              roomCount={listing.roomCount}
              guestCount={listing.guestCount}
              bathroomCount={listing.bathroomCount}
              locationValue={listing.locationValue}
              hasSauna={listing.hasSauna}
              currentUser={currentUser}

            />
            <div
              className="
                order-first 
                mb-10
                md:order-last 
                md:col-span-3
              "
            >
              <ListingReservation
                price={listing.price}
                totalPrice={totalPrice}
                //set checkin time to 16 and check out time to 12
                onChangeDate={(value) => {
                  const start = value.startDate;
                  start?.setHours(16);
                  const end = value.endDate;
                  end?.setHours(12);
                  setDateRange({
                    startDate: start,
                    endDate: end,
                    key: 'selection'
                  })
                }}
                dateRange={dateRange}
                onSubmit={onCreateReservation}
                disabled={isLoading || isOwnListing}
                disabledDates={disabledDates}
                dayCount={Math.ceil(differenceInHours(
                  dateRange.endDate!,
                  dateRange.startDate!
                ) / 24)}
              />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default ListingClient;
