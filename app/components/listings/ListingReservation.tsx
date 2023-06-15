'use client';

import { Range } from "react-date-range";

import Button from "../Button";
import Calendar from "../inputs/Calendar";

interface ListingReservationProps {
  price: number;
  dateRange: Range,
  totalPrice: number;
  onChangeDate: (value: Range) => void;
  onSubmit: () => void;
  disabled?: boolean;
  disabledDates: Date[];
  dayCount?: number,
}

const ListingReservation: React.FC<
  ListingReservationProps
> = ({
  price,
  dateRange,
  totalPrice,
  onChangeDate,
  onSubmit,
  disabled,
  disabledDates,
  dayCount
}) => {
    return (
      <div
        className="
      bg-white 
        rounded-xl 
        border-[1px]
      border-neutral-200 
        overflow-hidden
      "
      >
        <div className="
      flex flex-row items-center gap-1 p-4">
          <div className="text-2xl font-semibold">
            {price}€
          </div>
          <div className="font-light text-neutral-600">
            night
          </div>
        </div>
        <hr />
        <Calendar
          value={dateRange}
          disabledDates={disabledDates}
          onChange={(value) =>
            onChangeDate(value.selection)}
        />
        <hr />
        <div className="p-4">
          <Button
            disabled={disabled}
            label="Reserve"
            onClick={onSubmit}
          />
        </div>
        <hr />
        {dayCount! > 0 && <div
          className="
          p-4 
          flex 
          flex-row 
          items-center 
          justify-between
          text-medium
        "
        >
          <div className="text-medium text-gray-500">
            Checkin: {dateRange.startDate?.toLocaleString('fi')} <br />
            Checkout: {dateRange.endDate?.toLocaleString('fi')} <br />
          </div>
          <div className="px-2 underline font-bold">

            {dayCount} {dayCount == 1 ? <>night</> : <>nights</>} x {price}€
          </div>
        </div>}
        <hr />
        <div
          className="
          p-4 
          flex 
          flex-row 
          items-center 
          justify-between
          font-semibold
          text-lg
        "
        >
          <div>
            Total
          </div>
          <div>
            {totalPrice}€
          </div>
        </div>
      </div>
    );
  }

export default ListingReservation;