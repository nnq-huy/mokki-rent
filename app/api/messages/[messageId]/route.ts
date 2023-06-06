import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/utils/prismadb";

interface IParams {
    messageId?: string;
  }

  export async function DELETE(
    request: Request, 
    { params }: { params: IParams }
  ) {
    const currentUser = await getCurrentUser();
  
    if (!currentUser) {
      return NextResponse.error();
    }

    const { messageId } = params;
  
    if (!messageId || typeof messageId !== 'string') {
      throw new Error('Invalid ID');
    }
  
    const reservation = await prisma.message.delete({
      where: {
        id: messageId,
      }
    });

    return NextResponse.json(reservation);
  }
