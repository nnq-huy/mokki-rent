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
    receiverId,
    content,
    isPicture,
   } = body;

  const senderId = currentUser.id;
  const senderName = currentUser.name??'';
  const senderPhoto = currentUser.image??'';

    if (!reservationId  || !receiverId || !content) {
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
