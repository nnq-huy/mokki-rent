import prisma from "@/app/utils/prismadb";

interface IParams {
  listingId?: string;
  userId?: string;
  hostId?: string;
  propertyId?:string;
}

export default async function getReservations(
  params: IParams
) {
  const today = new Date();
  try {
    const { listingId, userId, hostId, propertyId } = params;

    let query: any = {};
    //get all reservation - for host
    if (propertyId) {
      query.listingId = propertyId;
    }

    //only get reservations that end after today - for guest
    if (listingId) {
      query ={
        listingId : listingId,
        endDate: {
          gte: today
        }
      }
    };

    if (userId) {
      query.userId = userId;
    }

    if (hostId) {
      query.listing = { userId: hostId };
    }

    const reservations = await prisma.reservation.findMany({
      where: query,
      include: {
        user: true,
        listing: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return reservations;
  } catch (error: any) {
    throw new Error(error);
  }
}
