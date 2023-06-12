'use client';

interface ContainerProps {
  children: React.ReactNode
};

const Container: React.FC<ContainerProps> = ({ children }) => {
  return (
    <div
      className="
        bg-gray-50
        max-w-[2520px]
        mx-auto
      "
    >
      {children}
    </div>
  );
}

export default Container;
