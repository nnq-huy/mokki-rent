export const dynamic = 'force-dynamic'

import ListingCard from "@/app/components/listings/ListingCard";
import EmptyState from "@/app/components/EmptyState";

import getListings, {
  IListingsParams
} from "@/app/actions/getListings";
import getCurrentUser from "@/app/actions/getCurrentUser";
import ClientOnly from "./components/ClientOnly";
import ListingFilterBar from "./components/listings/ListingFilterBar";
import ListingFilterChips from "./components/listings/ListingFilterChips";
import ListingPagination from "./components/listings/ListingPagination";

interface HomeProps {
  searchParams: IListingsParams
};

const Home = async ({ searchParams }: HomeProps) => {
  const {count, listings} = await getListings(searchParams);
  const currentUser = await getCurrentUser();

  if (listings.length === 0) {
    return (
      <ClientOnly>
        <EmptyState showReset />
      </ClientOnly>
    );
  }
  return (
    <ClientOnly>
      <div className="min-h-[80vh] xl:px-8 md:px-4 sm:px-2 px-2">
        <ListingFilterBar />
        <h1 className="pt-6 text-gray-500">Showing {listings.length} of {count} listings</h1>
        <ListingFilterChips/>
        <div
          className="
            pt-2
            grid
            grid-cols-1
            sm:grid-cols-2
            md:grid-cols-3
            lg:grid-cols-4
            xl:grid-cols-5
            2xl:grid-cols-6
            gap-4
        ">
          {listings.map((listing: any) => (
            <ListingCard
              currentUser={currentUser}
              key={listing.id}
              data={listing}
              isHost={false}
            />
          ))}
        </div>
      <ListingPagination count={count}/>
      </div>
    </ClientOnly>
  )
}

export default Home;
