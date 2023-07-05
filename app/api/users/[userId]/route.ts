import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/lib/prismadb";

interface IParams {
  userId?: string;
}
export async function PUT(
  request: Request, 
  { params }: { params: IParams }
){
  const currentUser = await getCurrentUser();
  const body = await request.json();
  const {name,image} = body;

  if (!currentUser) {
    return NextResponse.error();
  }

  const { userId } = params;

  if (!userId || typeof userId !== 'string') {
    throw new Error('Invalid ID');
  }

  if(userId != currentUser.id){
    throw new Error('Unauthorized operation!');
  }

  const confirmation = await prisma.user.update({
    where: {
      id: userId,
    },
    data:{
      name:name,
      image:image
    }
  })
  return NextResponse.json(confirmation);
}
