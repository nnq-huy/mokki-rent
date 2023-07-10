'use client';

import { useRouter, useSearchParams } from "next/navigation"
import { useCallback, useState } from "react";
import qs from 'query-string';
import { Button } from "../ui/button";

interface ListingPaginationProps {
  count: number
}
const ListingPagination: React.FC<ListingPaginationProps> = ({ count }) => {
  const params = useSearchParams();
  const router = useRouter();

  const [currentPage, setCurentPage] = useState(1);
  const listingsPerPage = 10;
  const numberOfPages = count % listingsPerPage === 0 ? count / listingsPerPage : (Math.floor(count / listingsPerPage) + 1);

  const handlePageChange = useCallback((page: number) => {
    setCurentPage(page)
    let currentQuery = {};
    if (params) {
      currentQuery = qs.parse(params.toString());
    }
    const updatedQuery: any = {
      ...currentQuery,
      page: page,
    }

    const url = qs.stringifyUrl({
      url: '/',
      query: updatedQuery
    }, { skipNull: true });

    router.push(url);
  }, [params, router]);

  let pageButtons = [];
  let i = 1;
  for (let i = 1; i <= numberOfPages; i++) {
    const button = (
      <Button
        variant={'ghost'}
        onClick={() => handlePageChange(i)}
      >
        {i===currentPage?<p className="text-black">{i}</p>:<p className="text-gray-400">{i}</p>}
      </Button>
    )
    pageButtons.push(button)
  }

  return (
    <div className="w-full items-center flex flex-row pt-8">
      Pages
      {pageButtons}
    </div>
  )

}
export default ListingPagination;