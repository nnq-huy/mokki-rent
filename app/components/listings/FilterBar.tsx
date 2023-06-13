'use client';

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";
import qs from 'query-string';

import { LucideSettings2 } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/app/components/ui/popover"
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { Label } from "../ui/Label";
import { BiSort } from "react-icons/bi";
import { sortOptions } from "@/app/constants";
import { SortOption } from "@/app/types";

const ListingFilterBar = () => {
  const params = useSearchParams();
  const [startPrice, setStartPrice] = useState(0);
  const [stopPrice, setStopPrice] = useState(999);
  const [sortOption, setSortOption] = useState<SortOption>(
    {
      value: 'date_new_to_old',
      label: 'Date added. newest first'
    }
  );
  const router = useRouter();

  const handleSortOptionChange = useCallback((option:SortOption) => {
    setSortOption(option);
    let currentQuery = {};
    if (params) {
      currentQuery = qs.parse(params.toString())
    }

    const updatedQuery: any = {
      ...currentQuery,
      sort: option.value,
    }
    const url = qs.stringifyUrl({
      url: '/',
      query: updatedQuery
    }, { skipNull: true });

    router.push(url);
  }, [params, router]);

  const handlePriceChange = useCallback(() => {
    let currentQuery = {};

    if (params) {
      currentQuery = qs.parse(params.toString())
    }

    const updatedQuery: any = {
      ...currentQuery,
      startPrice: startPrice,
      stopPrice: stopPrice
    }

    const url = qs.stringifyUrl({
      url: '/',
      query: updatedQuery
    }, { skipNull: true });

    router.push(url);
  }, [params, startPrice, stopPrice, router]);

  const filterButton = (
    <Popover>
      <PopoverTrigger>
        <Button
          className="bg-white shadow"
          title="Filter"
          variant="secondary"
          size={'sm'}
          onClick={() => { }}
        >
          {'Filter  '} {<LucideSettings2 className=" text-mokki-green h-4 w-6" />}
        </Button>
      </PopoverTrigger>
      <PopoverContent >
        <div className="gap 4 flex flex-col gap-4">
          Price
          <Slider
            trackStyle={[{
              backgroundColor: '#028446',
              height: 8
            }]}
            railStyle={
              {
                backgroundColor: '#D3D3D3',
                height: 8
              }
            }
            handleStyle={
              {
                opacity: 100,
                borderColor: '#028446',
                height: 16,
                width: 16,
                marginLeft: -3,
                backgroundColor: '#028446',
              }
            }
            dotStyle={
              {
                backgroundColor: '#ffffff00',
                borderColor: '#ffffff00'
              }
            }
            activeDotStyle={
              {
                backgroundColor: '#ffffff00',
                borderColor: '#ffffff00',
              }
            }
            allowCross={false}
            value={[startPrice, stopPrice]}
            onChange={(value) => {
              if (Array.isArray(value)) {
                setStartPrice(value[0]);
                setStopPrice(value[1]);
              } else return;
            }}
            marks={{ 0: '0€', 100: '100€', 500: '500€', 999: '999€' }}
            startPoint={0}
            className="py-10"
            min={0}
            max={999}
            range
          />
          <div className="pt-4 flex flex-row gap-4">
            <Input onChange={(e) => setStartPrice(parseInt(e.currentTarget.value))} type="number" value={startPrice} id="minPrice" />
            <Input onChange={(e) => setStopPrice(parseInt(e.currentTarget.value))} type="number" value={stopPrice} id="maxPrice" />
          </div>
          <div className="flex flex-row justify-between">
            <Label htmlFor="minPrice">Min price</Label>
            <Label htmlFor="maxPrice">Max price</Label>
          </div>

          <div className="flex flex-row gap-4 justify-between">
            <Button
              variant="outline"
              onClick={() => { setStartPrice(0); setStopPrice(999) }}
            >Reset
            </Button>
            <Button
              onClick={handlePriceChange}
              className="bg-mokki-green hover:bg-mokki-green hover:opacity-70"
            >Apply
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );

  const sortButton = (
    <Popover>
      <PopoverTrigger>
        <Button
          className="bg-white shadow"
          title="Filter"
          variant="secondary"
          size={'sm'}
          onClick={() => { }}
        >
          {'Sort by ' + sortOption.label} {<BiSort className=" text-mokki-green h-4 w-6" />}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="pr-8">
        Sort by
        <ul className="text-neutral-500 pl-4">
          {sortOptions.map((option) => (
            <li
              key={option.value}
              className="hover:text-mokki-green hover:font-semibold cursor-pointer py-1"
              onClick={() => { handleSortOptionChange(option) }}
            >
              {option.label}
            </li>
          ))}
        </ul>
      </PopoverContent>
    </Popover>
  );

  return (
    <div
      className="w-full pt-28 flex-row flex h-12 items-center justify-between gap-8"
    >
      <div className="w-[240px] px-4">
        {filterButton}
      </div>
      <div className="w-[240px]">
        <Input placeholder="Search" className="bg-white shadow" />
      </div>
      <div className="pr-4">
        {sortButton}
      </div>
    </div>
  );
}

export default ListingFilterBar;