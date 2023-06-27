
import Heading from "@/app/components/Heading";
import Container from "@/app/components/Container";
import ListingCard from "@/app/components/listings/ListingCard";
import { Listing, User } from "@prisma/client";

interface FavoritesClientProps {
  listings: Listing[],
  currentUser?: User | null,
}

const FavoritesClient: React.FC<FavoritesClientProps> = ({
  listings,
  currentUser
}) => {
  return (
    <div className="min-h-[80vh] w-full px-2 md:px-4 xl:px-8 pt-4">
      <Heading
        title="Favorites"
        subtitle="List of places you put on wishlist!"
      />
      <div
        className="
          mt-10
          grid 
          grid-cols-1 
          sm:grid-cols-2 
          md:grid-cols-3 
          lg:grid-cols-4
          xl:grid-cols-5
          2xl:grid-cols-6
          gap-8
        "
      >
        {listings.map((listing: any) => (
          <ListingCard
            currentUser={currentUser}
            key={listing.id}
            data={listing}
            isHost={false} />
        ))}
      </div>
    </div>
  );
}

export default FavoritesClient;