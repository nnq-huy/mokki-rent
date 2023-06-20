'use client';

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import qs from 'query-string';

import { Badge } from "@/app/components/ui/badge"
import { Button } from "../ui/button";

const ListingFilterChips = () => {
  const params = useSearchParams();
  const router = useRouter();
  const category = params?.get('category');
  const hasSauna = params?.get('needSauna');
  const location = params?.get('locationValue');
  const guestCount = params?.get('guestCount');
  const roomCount = params?.get('roomCount');
  const startPrice = params?.get('startPrice');
  const stopPrice = params?.get('stopPrice');

  const pathname = usePathname();
  const isMainPage = pathname === '/';
  const anyFilter = (!category && !hasSauna && !location && !guestCount && !roomCount && !startPrice && !stopPrice);
  const handleParamsChange = useCallback((a: string) => {
    let currentQuery = {};
    let updatedQuery = {};

    if (params) {
      currentQuery = qs.parse(params.toString())
    }
    switch (a) {
      case 'category':
        updatedQuery = {
          ...currentQuery,
          category: undefined
        };
        break;
      case 'needSauna':
        updatedQuery = {
          ...currentQuery,
          needSauna: undefined
        };
        break;
      case 'location':
        updatedQuery = {
          ...currentQuery,
          locationValue: undefined
        };
        break;
      case 'guestCount':
        updatedQuery = {
          ...currentQuery,
          guestCount: undefined
        };
        break;
      case 'roomCount':
        updatedQuery = {
          ...currentQuery,
          roomCount: undefined
        };
        break;
      case 'price':
        updatedQuery = {
          ...currentQuery,
          startPrice: undefined,
          stopPrice: undefined
        };
        break;
      case 'all':
        updatedQuery = {};
        break;
    }


    const url = qs.stringifyUrl({
      url: '/',
      query: updatedQuery
    }, { skipNull: true });

    router.push(url);
  }, [params, router]);

  if (!isMainPage) {
    return null;
  }

  return (
    <div
      className="
          max-w-[2520px]
          mx-auto
          py-2
          flex
          flex-wrap
          items-center
          overflow-x-auto
          rounded-md
          gap-2
        "
    >
      {category &&
        <Badge className="flex items-center">
          {category}
          <Button
            variant={'badge'}
            size={'xs'}
            onClick={() => handleParamsChange('category')}
          >
            x
          </Button>
        </Badge>}
      {hasSauna &&
        <Badge>
          Has Sauna
          <Button
            variant={'badge'}
            size={'xs'}
            onClick={() => handleParamsChange('needSauna')}
          >
            x
          </Button>
        </Badge>
      }
      {
        location &&
        <Badge>{location}<Button
          variant={'badge'}
          size={'xs'}
          onClick={() => handleParamsChange('location')}
        >
          x
        </Button></Badge>
      }
      {
        (guestCount && parseInt(guestCount) > 1) && <Badge>{guestCount}{' '}guests<Button
          variant={'badge'}
          size={'xs'}
          onClick={() => handleParamsChange('guestCount')}
        >
          x
        </Button></Badge>
      }
      {
        (roomCount && parseInt(roomCount) > 1) && <Badge>{roomCount}{' '}rooms<Button
          variant={'badge'}
          size={'xs'}
          onClick={() => handleParamsChange('roomCount')}
        >
          x
        </Button></Badge>
      }
      {
        startPrice && <Badge>from{' '}{startPrice}{'€ '}to{' '}{stopPrice}€<Button
          variant={'badge'}
          size={'xs'}
          onClick={() => handleParamsChange('price')}
        >
          x
        </Button></Badge>
      }
      {!anyFilter && <Badge>Clear all filters<Button
        variant={'badge'}
        size={'xs'}
        onClick={() => handleParamsChange('all')}
      >
        x
      </Button></Badge>}
    </div>
  )
}

export default ListingFilterChips;