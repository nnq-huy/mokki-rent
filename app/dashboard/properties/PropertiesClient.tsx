'use client';

import Heading from "@/app/components/Heading";
import ListingCard from "@/app/components/listings/ListingCard";
import { Listing, User } from "@prisma/client";


interface PropertiesClientProps {
  listings: Listing[],
  currentUser?: User | null,
}

const PropertiesClient: React.FC<PropertiesClientProps> = ({
  listings,
  currentUser
}) => {
  return (
    <div className="
        w-full
        min-h-[80vh] 
        xl:px-8
        md:px-4
        sm:px-2
        px-2">
      <Heading
        title="Properties"
        subtitle="List of your properties"
      />
      <div
        className="
          grid 
          grid-cols-1 
          sm:grid-cols-2 
          md:grid-cols-3 
          lg:grid-cols-4
          xl:grid-cols-5
          2xl:grid-cols-6
          gap-4
        "
      >
        {listings.map((listing: any) => (
          <ListingCard
            key={listing.id}
            data={listing}
            currentUser={currentUser}
            isHost
          />
        ))}
      </div>
    </div>
  );
}

export default PropertiesClient;