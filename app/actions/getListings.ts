import prisma from "@/app/utils/prismadb";

export interface IListingsParams {
  userId?: string;
  guestCount?: number;
  roomCount?: number;
  bathroomCount?: number;
  startDate?: string;
  endDate?: string;
  locationValue?: string;
  category?: string;
  needSauna?:boolean;
  startPrice?:number;
  stopPrice?:number;
  sort?:string;
}

export default async function getListings(
  params: IListingsParams
) {
  try {
    const {
      userId,
      roomCount, 
      guestCount, 
      bathroomCount, 
      locationValue,
      startDate,
      endDate,
      category,
      needSauna,
      startPrice,
      stopPrice,
      sort
    } = params;

    let sortOption :any =  {};

    if (sort) {
      switch (sort){
        case 'price_high_to_low' :
          sortOption.price =  "desc";
          break;
        case 'price_low_to_high' :
          sortOption.price = "asc";
          break;
        case 'date_new_to_old' :
          sortOption.createdAt = "asc";
          break;
        case 'date_old_to_new' :
          sortOption.createdAt = "desc";
          break;
        case 'room_high_to_low' :
          sortOption.roomCount = "desc";
          break;
        case 'room_low_to_high' :
          sortOption.roomCount = "asc";
          break;
        default:
          sortOption.createdAt = "asc";
      }
    }
    let query: any = {};

    if (userId) {
      query.userId = userId;
    }
    if (category) {
      query.category = category;
    }

    if(needSauna) {
      query.hasSauna = true;
    }

    if (roomCount) {
      query.roomCount = {
        gte: +roomCount
      }
    }

    if (guestCount) {
      query.guestCount = {
        gte: +guestCount
      }
    }

    if (bathroomCount) {
      query.bathroomCount = {
        gte: +bathroomCount
      }
    }

    if (locationValue) {
      query.locationValue = locationValue;
    }

    if (startPrice && stopPrice) {
      query.price = {
        gte: + startPrice,
        lte: + stopPrice
      }
    }

    if (startDate && endDate) {
      query.NOT = {
        reservations: {
          some: {
            OR: [
              {
                endDate: { gte: startDate },
                startDate: { lte: startDate }
              },
              {
                startDate: { lte: endDate },
                endDate: { gte: endDate }
              }
            ]
          }
        }
      }
    }
    const listings = await prisma.listing.findMany({
      where: query,
      orderBy: sortOption
    });

    return listings;
  } catch (error: any) {
    throw new Error(error);
  }
}
