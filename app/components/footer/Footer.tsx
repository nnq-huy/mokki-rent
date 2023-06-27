import Logo from "../navbar/Logo";
import Link from "next/link";

interface FooterProps {
}

const Footer: React.FC<FooterProps> = ({
}) => {
  return (
    <footer className="pt-4 bg-gray-50 w-full z-10">
      <hr className=" border-gray-200 sm:mx-auto dark:border-gray-700" />
      <div
        className="
            py-4
            w-full
            flex
            flex-row
            justify-center
            gap-4
            md:gap-2
            items-center
            grayscale
          "
      >
        <Logo />
        <Link title="Github" href={'https://github.com/nnq-huy'}>
          <p className="text-neutral-600">© 2023 Huy Nguyen </p>
        </Link>
      </div>
    </footer>
  );
}


export default Footer;