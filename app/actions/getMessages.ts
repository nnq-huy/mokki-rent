import prisma from "@/app/utils/prismadb";

interface IParams {
  reservationId?: string;
  senderId?: string;
  receiverId?: string;
}

export default async function getMessages(
  params: IParams
) {
  try {
    const { reservationId, senderId, receiverId } = params;

    const query: any = {};

    if (reservationId) {
      query.reservationId = reservationId;
    };

    if (senderId) {
      query.senderId = senderId;
    }

    if (receiverId) {
      query.receiverId = receiverId ;
    }

    const messages = await prisma.message.findMany({
      where: query,
      include: {
        reservation: true,
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return messages;
  } catch (error: any) {
    throw new Error(error);
  }
}
