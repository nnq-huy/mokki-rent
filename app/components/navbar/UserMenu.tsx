'use client';

import { useCallback } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

import useLoginModal from "@/app/hooks/useLoginModal";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import MenuItem from "./MenuItem";
import Avatar from "../Avatar";
import { User } from "@prisma/client";
import useRentModal from "@/app/hooks/useRentModal";
import { Popover, PopoverTrigger, PopoverContent } from "../ui/popover";

interface UserMenuProps {
  currentUser?: User | null;
}

const UserMenu: React.FC<UserMenuProps> = ({
  currentUser
}) => {
  const router = useRouter();
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  const rentModal = useRentModal();

  const onRent = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    }
    rentModal.onOpen();
  }, [loginModal, rentModal, currentUser]);

  const menuPopover = (
    <Popover>
      <PopoverTrigger>
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
            <Avatar src={currentUser?.image} />
          </div>
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-full">
        <div className="flex flex-col cursor-pointer text-sm w-48">
          {currentUser ? (
            <>
              <MenuItem
                label="My trips"
                onClick={() => router.push('/trips')}
              />
              <MenuItem
                label="My favorites"
                onClick={() => router.push('/favorites')}
              />
              <hr />
              <MenuItem
                label="Rent your mökki out"
                onClick={() => rentModal.onOpen()}
              />
              <MenuItem
                label="Dashboard"
                onClick={() => router.push('/dashboard')}
              />
              <hr />
              <MenuItem
                label="Home"
                onClick={() => router.push('/')}
              />
              <MenuItem
                label="Messages"
                onClick={() => router.push('/messages')}
              />
              <MenuItem
                label="Logout"
                onClick={() => signOut()}
              />
            </>
          ) : (
            <>
              <MenuItem
                label="Home"
                onClick={() => router.push('/')}
              />
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
      </PopoverContent>
    </Popover>
  )

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
        {menuPopover}
      </div>
    </div>
  );
}

export default UserMenu;