import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/lib/prismadb";

interface IParams {
  reservationId?: string;
}
//route to update reservation status
export async function PUT(
  request: Request, 
  { params }: { params: IParams }
){
  const currentUser = await getCurrentUser();
  const body = await request.json();
  const {status, rating} = body;

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
      status:status,
      rating:rating
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
//route to create booking events
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
    event,
    userId,
  } = body;

  if (!reservationId || !event || !userId) {
    return NextResponse.error();
  }

  const bookingEvent = await prisma.reservation.update({
    where: {
      id: reservationId
    },
    data: {
      events: {
        create: {
          userId: currentUser.id,
          event,
        }
      }
    }
  });

  return NextResponse.json(bookingEvent);
}
