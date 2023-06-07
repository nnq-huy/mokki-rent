'use client';

interface ContainerProps {
  children: React.ReactNode
};

const Container: React.FC<ContainerProps> = ({ children }) => {
  return (
    <div
      className="
        max-w-[2520px]
        mx-auto
        xl:px-8
        md:px-4
        sm:px-0
        px-0
      "
    >
      {children}
    </div>
  );
}

export default Container;
