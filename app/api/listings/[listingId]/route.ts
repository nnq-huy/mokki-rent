import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/utils/prismadb";

interface IParams {
  listingId?: string;
}

export async function DELETE(
  request: Request, 
  { params }: { params: IParams }
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { listingId } = params;

  if (!listingId || typeof listingId !== 'string') {
    throw new Error('Invalid ID');
  }

  const listing = await prisma.listing.deleteMany({
    where: {
      id: listingId,
      userId: currentUser.id
    }
  });

  return NextResponse.json(listing);
}

export async function PUT(
  request: Request, 
  { params }: { params: IParams }
){
  const currentUser = await getCurrentUser();
  const body = await request.json();
  const {
          title,
          category,
          imageSrc,
          guestCount,
          roomCount,
          bathroomCount,
          locationValue,
          hasSauna,
          price,
          description,
          status,
          userId
        } = body;

  if (!currentUser) {
    return NextResponse.error();
  }

  const { listingId } = params;

  if (!listingId || typeof listingId !== 'string') {
    throw new Error('Invalid ID');
  }

  if(userId != currentUser.id){
    throw new Error('Unauthorized operation!');
  }

  const confirmation = await prisma.listing.update({
    where: {
      id: listingId,
    },
    data:{
      title:title,
      description:description,
      category:category,
      locationValue:locationValue,
      imageSrc:imageSrc,
      guestCount:guestCount,
      roomCount:roomCount,
      bathroomCount:bathroomCount,
      hasSauna:hasSauna,
      status:status,
      price:price,
    }
  })
  return NextResponse.json(confirmation);
}

