'use client';

import { useRouter } from "next/navigation";

import Button from "./Button";
import Heading from "./Heading";
import { BiLogIn, BiReset } from "react-icons/bi";
import useLoginModal from "../hooks/useLoginModal";

interface EmptyStateProps {
  title?: string;
  subtitle?: string;
  showReset?: boolean;
  showLogin?:boolean;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  title = "No exact matches",
  subtitle = "Try changing or removing some of your filters.",
  showReset,
  showLogin,
}) => {
  const router = useRouter();
  const loginModal = useLoginModal();

  return ( 
    <div 
      className="
        h-[60vh]
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
      </div>
    </div>
   );
}
 
export default EmptyState;