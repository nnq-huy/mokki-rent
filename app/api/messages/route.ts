import { NextResponse } from "next/server";

import prisma from "@/app/utils/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(
  request: Request, 
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const body = await request.json();
  const { 
    reservationId,
    senderId,
    senderName,
    senderPhoto,
    receiverId,
    content,
    isPicture,
   } = body;

   if (!reservationId  || !receiverId || !content || !isPicture) {
    return NextResponse.error();
  }

  const message = await prisma.reservation.update({
    where: {
      id: reservationId
    },
    data: {
      messages: {
        create: {
            receiverId,
            senderId,
            senderName,
            senderPhoto,
            content,
            isPicture
        }
      }
    }
  });

  return NextResponse.json(message);
}
