'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import CategoryBox from "../CategoryBox";
import Container from '../Container';
import { categories } from '@/app/constants';

const Categories = () => {
  const params = useSearchParams();
  const category = params?.get('category');
  const pathname = usePathname();
  const isMainPage = pathname === '/';

  if (!isMainPage) {
    return null;
  }

  return (
    <Container>
      <div
        className="
          pt-2
          flex-row 
          flex
          h-18
          items-center
          justify-between
          overflow-x-auto
          bg-white
          rounded-md
        "
      >
        {categories.map((item) => (
          <CategoryBox
            key={item.label}
            label={item.label}
            icon={item.icon}
            selected={category === item.label}
          />
        ))}
      </div>
    </Container>
  );
}

export default Categories;