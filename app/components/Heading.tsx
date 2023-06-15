'use client';

interface HeadingProps {
  title: string;
  subtitle?: string;
  center?: boolean;
}

const Heading: React.FC<HeadingProps> = ({
  title,
  subtitle,
  center
}) => {
  return (
    <div className={center ? 'text-center' : 'text-start' + 'xl:px-8 md:px-4 sm:px-2 px-2'}>
      <div className="text-2xl font-bold">
        {title}
      </div>
      <div className="font-light text-neutral-500 mt-2">
        {subtitle}
      </div>
    </div>
  );
}

export default Heading;