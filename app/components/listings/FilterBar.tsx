'use client';

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";
import qs from 'query-string';


import { LucideSettings2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select"
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

const ListingFilterBar = () => {
  const params = useSearchParams();
  const [startPrice, setStartPrice] = useState(0);
  const [stopPrice, setStopPrice] = useState(999);
  const router = useRouter();

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
              setStartPrice(value[0]);
              setStopPrice(value[1]);
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


          <Button
            onClick={handlePriceChange}
            className="bg-mokki-green hover:bg-mokki-green hover:opacity-70"
          >Apply
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );

  const sortSelect = (<Select>
    <SelectTrigger className="w-[200px] bg-white shadow">
      <SelectValue placeholder="Sort by" />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="PriceAsc">Price. low to high</SelectItem>
      <SelectItem value="PriceDesc">Price. high to low</SelectItem>
      <SelectItem value="DateDesc">Date added. newest first</SelectItem>
      <SelectItem value="DateAsc">Date added. oldest first</SelectItem>
      <SelectItem value="RoomsAsc">Rooms. low to high</SelectItem>
      <SelectItem value="RoomsDesc">Rooms. high to low</SelectItem>
    </SelectContent>
  </Select>);

  return (
    <div
      className="pt-28 flex-row flex h-12 items-center justify-between gap-8"
    >
      <div className="w-[240px] px-4">
        {filterButton}
      </div>
      <div className="w-[240px]">
        <Input placeholder="Search" className="bg-white shadow" />
      </div>
      <div className="pr-4">
        {sortSelect}
      </div>
    </div>
  );
}

export default ListingFilterBar;