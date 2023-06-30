import { Listing, Reservation } from "@prisma/client"
import Image from "next/image";
import { useRouter } from "next/navigation";
import { BsStar } from "react-icons/bs";
import MyAvatar from "../MyAvatar";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";
import ListingCategory from "../listings/ListingCategory";
import { useMemo } from "react";
import { categories } from "@/app/constants";

interface BookingListingDetailsProps {
  booking: Reservation & {
    listing?: Listing
  },
}
const BookingListingDetails: React.FC<BookingListingDetailsProps> = ({ booking }) => {
  const listing = booking.listing;
  const router = useRouter();
  const category = useMemo(() => {
    return categories.find((items) =>
      items.label === listing!.category);
  }, [listing]);

  return (<div className="flex flex-col w-full">
      <div>
        <h1 className="font-bold text-xl">{listing!.title}</h1>
        <p className="text-sm">{listing!.locationValue}</p>
        <div className="aspect-[square] relative">
          <Image
            onClick={() => router.push(`/trips/${booking.id}`)}
            width={500}
            height={500}
            className="shadow object-cover"
            src={listing!.imageSrc}
            alt="Listing"
          />
          <div className="rounded p-2 bg-black/70 absolute bottom-4 left-4 font-bold text-white z-20">
            <MyAvatar src={booking.hostPhoto!} />
            {booking.hostName}
            <div className="flex flex-row gap-1 items-center text-xs font-light">
              {<BsStar />}
              {listing!.rating > 1 ? listing!.rating.toFixed(1) : 'no rating'}
            </div>
          </div>
        </div>
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger><ListingCategory
              small
              icon={category!.icon}
              label={category!.label}
              description={category!.description}
            /></AccordionTrigger>
            <AccordionContent>
              {listing!.description}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <div className="flex flex-row gap-2 mt-4 p-2 border-2 rounded-md text-sm text-gray-500 justify-evenly">
          <p className="border-r p-2">{listing!.guestCount}&nbsp;guests</p>
          <p className="border-r p-2">{listing!.roomCount}&nbsp;rooms</p>
          <p className="p-2">{listing!.bathroomCount}&nbsp;baths</p>
          {listing!.hasSauna && <p className="p-2 border-l">sauna</p>}
        </div>
      </div>
    </div>)
}

export default BookingListingDetails;