'use client';

import { Avatar, AvatarImage } from "./ui/avatar";

interface AvatarProps {
  src: string | undefined;
  size?: number
}

const MyAvatar: React.FC<AvatarProps> = ({ src, size }) => {
  return (
    <Avatar>
      <AvatarImage src={src ?? "/images/placeholder.jpg"} />
    </Avatar>
  );
}

export default MyAvatar;