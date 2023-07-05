'use client';

import { useCallback } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

import useLoginModal from "@/app/hooks/useLoginModal";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import MenuItem from "./MenuItem";
import MyAvatar from "../MyAvatar";
import { User } from "@prisma/client";
import useRentModal from "@/app/hooks/useRentModal";
import { Popover, PopoverTrigger, PopoverContent } from "../ui/popover";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "../ui/dropdown-menu";

interface UserMenuProps {
  currentUser?: User | null;
}

const UserMenu: React.FC<UserMenuProps> = ({
  currentUser
}) => {
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  const rentModal = useRentModal();

  const onRent = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    }
    rentModal.onOpen();
  }, [loginModal, rentModal, currentUser]);
  const menuDropdown = (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div
          className="
          p-4
          md:py-1
          md:px-2
          border-[1px] 
          border-neutral-200 
          flex 
          flex-row 
          items-center 
          gap-3 
          rounded-full 
          cursor-pointer 
          hover:shadow-md 
          transition
          "
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            <MyAvatar src={currentUser?.image!} />
          </div>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <div className="flex flex-col text-sm w-48">
          {currentUser ? (
            <>
              <DropdownMenuItem asChild>
                <Link className="p-2 font-semibold hover:text-mokki-green" href={'/trips'}>My trips</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link className="p-2 font-semibold hover:text-mokki-green" href={'/favorites'}>My favorites</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => rentModal.onOpen()} >
                <p className="font-semibold">Rent your mökki out</p>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link className="p-2 font-semibold hover:text-mokki-green" href={'/dashboard'}>Dashboard</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link className="p-2 font-semibold hover:text-mokki-green" href={'/'}>Home</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link className="p-2 font-semibold hover:text-mokki-green" href={'/dashboard/profile'}>Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link className="p-2 font-semibold hover:text-mokki-green" href={'/messages'}>Messages</Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => signOut()}>
                <p className="font-semibold">Logout</p>
              </DropdownMenuItem>
            </>
          ) : (
            <>
              <Link className="p-2 font-semibold hover:text-mokki-green" href={'/'}>Home</Link>
              <MenuItem
                label="Login"
                onClick={loginModal.onOpen}
              />
              <MenuItem
                label="Sign up"
                onClick={registerModal.onOpen}
              />
            </>
          )}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div
          onClick={onRent}
          className="
            hidden
            md:block
            text-mokki-green
            text-sm 
            font-semibold 
            py-3 
            px-4 
            rounded-full 
            hover:bg-neutral-100 
            transition 
            cursor-pointer
          "
        >
          Rent your mökki
        </div>
        {menuDropdown}
      </div>
    </div>
  );
}

export default UserMenu;