import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/utils/prismadb";
import { ReservationStatus } from "@prisma/client";

interface IParams {
  reservationId?: string;
}
export async function PUT(
  request: Request, 
  { params }: { params: IParams }
){
  const currentUser = await getCurrentUser();
  const body = await request.json();
  const {status} = body;

  if (!currentUser) {
    return NextResponse.error();
  }

  const { reservationId } = params;

  if (!reservationId || typeof reservationId !== 'string') {
    throw new Error('Invalid ID');
  }

  const confirmation = await prisma.reservation.update({
    where: {
      id: reservationId,
    },
    data:{
      status:status
    }
  })
  return NextResponse.json(confirmation);
}

export async function DELETE(
  request: Request, 
  { params }: { params: IParams }
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { reservationId } = params;

  if (!reservationId || typeof reservationId !== 'string') {
    throw new Error('Invalid ID');
  }

  const reservation = await prisma.reservation.deleteMany({
    where: {
      id: reservationId,
      OR: [
        { userId: currentUser.id },
        { listing: { userId: currentUser.id } }
      ]
    }
  });

  return NextResponse.json(reservation);
}
