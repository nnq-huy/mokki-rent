import prisma from "@/app/utils/prismadb";
interface IParams {
  listingId?:string;
}

export default async function getConfirmedReservations(
  params: IParams
) {
  const today = new Date();
  try {
    const { listingId } = params;

    let query: any = {};
  

    //only get reservations that end after today - for guest
    if (listingId) {
      query ={
        status: "confirmed",
        listingId : listingId,
        endDate: {
          gte: today
        }
      }
    };

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
