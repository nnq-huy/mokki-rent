'use client';

import { useRouter } from "next/navigation";

import Button from "./Button";
import Heading from "./Heading";
import { BiLogIn, BiReset } from "react-icons/bi";
import useLoginModal from "../hooks/useLoginModal";
import useRentModal from "../hooks/useRentModal";
import { BsFillHouseAddFill } from "react-icons/bs";
import useSearchModal from "../hooks/useSearchModal";
import { FaSearchLocation } from "react-icons/fa";

interface EmptyStateProps {
  title?: string;
  subtitle?: string;
  showReset?: boolean;
  showLogin?: boolean;
  showRent?: boolean;
  showSearch?: boolean;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  title = "No exact matches",
  subtitle = "Try changing or removing some of your filters.",
  showReset,
  showLogin,
  showRent,
  showSearch
}) => {
  const router = useRouter();
  const loginModal = useLoginModal();
  const rentModal = useRentModal();
  const searchModal = useSearchModal();

  return (
    <div
      className="
        h-[75vh]
        flex
        flex-col
        gap-2
        justify-center
        items-center
      "
    >
      <Heading
        center
        title={title}
        subtitle={subtitle}
      />
      <div className="w-56 mt-4">
        {showLogin && (
          <Button
            icon={BiLogIn}
            outline
            label="Login"
            onClick={loginModal.onOpen}
          />
        )}
        {showReset && (
          <Button
            icon={BiReset}
            outline
            label="Remove all filters"
            onClick={() => router.push('/')}
          />
        )}
        {showRent && (
          <Button
            icon={BsFillHouseAddFill}
            outline
            label="Add a property"
            onClick={rentModal.onOpen}
          />
        )}
        {showSearch && (
          <Button
            icon={FaSearchLocation}
            outline
            label="Book a trip"
            onClick={searchModal.onOpen}
          />
        )}
      </div>
    </div>
  );
}

export default EmptyState;