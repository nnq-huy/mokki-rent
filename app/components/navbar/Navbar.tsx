import Categories from "./Categories";
import Logo from "./Logo";
import Search from "./Search";
import UserMenu from "./UserMenu";
import { User } from "@prisma/client"

interface NavbarProps {
  currentUser?: User | null;
}

const Navbar: React.FC<NavbarProps> = ({
  currentUser
}) => {
  return (
    <div className="
        fixed
        w-[100vw]
        bg-white
        shadow-sm
        z-10
        px-4">
      <div
        className="
          py-4
          border-b-[1px]
        "
      >
        <div
          className="
            w-full
            flex
            flex-row
            items-center
            justify-between
            gap-3
            md:gap-0
            bg-white
          "
        >
          <Logo />
          <Search />
          <UserMenu currentUser={currentUser} />
        </div>
      </div>
      <Categories />
    </div>
  );
}


export default Navbar;