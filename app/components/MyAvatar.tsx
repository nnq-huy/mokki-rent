'use client';

import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

interface AvatarProps {
  src: string | undefined;
  size?: number
}

const MyAvatar: React.FC<AvatarProps> = ({ src, size }) => {
  return (
   <Avatar>
    <AvatarImage src={src}/>
    <AvatarFallback><AvatarImage src="/images/placeholder.jpg"/></AvatarFallback>
   </Avatar>
  );
}

export default MyAvatar;