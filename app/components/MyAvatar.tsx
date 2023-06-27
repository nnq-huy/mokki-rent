'use client';

import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

interface AvatarProps {
  src: string | undefined;
  size?: number
}

const MyAvatar: React.FC<AvatarProps> = ({ src, size }) => {
  return (
   <Avatar>
    <AvatarImage src={src}/>
    <AvatarFallback><AvatarImage src="/images/placeholer.jpg"/></AvatarFallback>
   </Avatar>
  );
}

export default MyAvatar;