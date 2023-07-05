import prisma from "@/lib/prismadb";

interface IParams {
  reservationId?: string;
}

export default async function getReservationById(
  params: IParams
) {
  try {
    const { reservationId } = params;

    const reservation = await prisma.reservation.findUnique({
      where: {
        id: reservationId,
      },
      include: {
        user: true,
        events:true,
        messages:true,
        listing:true,
      }
    });

    if (!reservation) {
      return null;
    }
    return reservation;
  } catch (error: any) {
    throw new Error(error);
  }
}
