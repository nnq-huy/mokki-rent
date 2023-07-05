/* eslint-disable react-hooks/rules-of-hooks */
'use client';

import { BoookingEvent, Listing, Reservation, User } from "@prisma/client"
import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"

import { Button } from "@/app/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu"
import { useRouter } from "next/navigation";
import MyActionAlert from "../MyActionAlert";
import useMessageModal from "@/app/hooks/useMessageModal";
import useCurrentReservation from "@/app/hooks/useCurrentReservation";
import useIsGuest from "@/app/hooks/useIsGuest";
import { DataTableColumnHeader } from "../ui/data-table-column-header";
import { statuses } from "@/app/constants";
import useBooking from "@/app/hooks/useBooking";
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import BookingActions from "../bookings/BookingActions";
import BookingDetails from "../bookings/BookingDetails";
import BookingListingDetails from "../bookings/BookingListingDetails";
import BookingTimeline from "../bookings/BookingTimeline";
import { differenceInHours } from "date-fns";

export const columns: ColumnDef<Reservation & { user?: User, listing?: Listing, events: BoookingEvent[] }>[] = [
  {
    id: 'guest',
    accessorKey: "user.name",
    header: ({ column }) => (<DataTableColumnHeader column={column} title="Guest" />),
  },
  {
    accessorKey: "startDate",
    header: ({ column }) => (<DataTableColumnHeader column={column} title="Checkin" />),
    cell: ({ row }) => {
      const checkinDate = new Date(row.getValue("startDate"))
      const formatted = checkinDate.toLocaleString('fi')
      return (
        <div className="font-medium text-gray-500">
          {formatted}
        </div>
      )
    },
    enableHiding: false,
  },
  {
    accessorKey: "endDate",
    header: ({ column }) => (<DataTableColumnHeader column={column} title="Checkout" />),
    cell: ({ row }) => {
      const checkoutDate = new Date(row.getValue("endDate"))
      const formatted = checkoutDate.toLocaleString('fi')
      return (
        <div className="font-medium text-gray-500">
          {formatted}
        </div>
      )
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => (<DataTableColumnHeader column={column} title="Status" />),
    cell: ({ row }) => {
      const status = statuses.find(
        (status) => status.value === row.getValue("status")
      )
      if (!status) {
        return null
      }

      return (
        <div className="flex w-[110px] items-center">
          {status.icon && (
            <status.icon className="mr-2 h-4 w-4 text-muted-foreground" />
          )}
          <span>{status.label}</span>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: "totalPrice",
    header: ({ column }) => (<DataTableColumnHeader column={column} title="Amount" />),
    cell: ({ row }) => {
      const total = parseFloat(row.getValue("totalPrice"))
      const formatted = new Intl.NumberFormat("fi", {
        style: "currency",
        currency: "EUR",
      }).format(total)
      return (
        <div className="font-medium">
          {formatted}
        </div>
      )
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const reservation = row.original
      const today = new Date();
      const canMarkDone = reservation.endDate < today;
      const IsGuest = useIsGuest();
      const { setCurrentReservation } = useCurrentReservation();
      const messageModal = useMessageModal();
      const { cancelBooking, confirmBooking, deleteBooking, markDoneBooking } = useBooking({ reservationId: reservation.id, currentUserId: reservation.hostId })
      const start = new Date(reservation.startDate);
      const end = new Date(reservation.endDate);
      const bookedNights = Math.ceil(differenceInHours(end, start) / 24);

      const handleOpenMessage = () => {
        IsGuest.switchToHost();
        setCurrentReservation(reservation);
        messageModal.onOpen();
      }

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <Sheet>
              <SheetTrigger>
                <Button className="ml-[-8px]" variant={'ghost'}>
                  More details
                </Button>
              </SheetTrigger>
              <SheetContent className="md:w-[50vw] w-full">
                <SheetHeader>
                  <SheetTitle>Booking details</SheetTitle>
                </SheetHeader>
                <ScrollArea className="h-full">
                  <BookingListingDetails booking={reservation} />
                  <BookingDetails booking={reservation} bookedNights={bookedNights} />
                  <BookingTimeline booking={reservation} />
                  <BookingActions booking={reservation} currentUserId={reservation.hostId} showMessage
                  />
                  <SheetClose className='mb-4'>
                    <Button variant={'outline'} size={'lg'}> Close
                    </Button>
                  </SheetClose>
                </ScrollArea>
              </SheetContent>
            </Sheet>
            <DropdownMenuItem onClick={handleOpenMessage}>
              Message guest
            </DropdownMenuItem>
            {(reservation.status === 'confirmed' && canMarkDone) &&
              <MyActionAlert
                action={markDoneBooking}
                title="Mark as done"
                actionText="Mark reservation as done confirmation"
                actionButtonLabel="Continue"
              />
            }
            <DropdownMenuSeparator />
            {reservation.status === 'unconfirmed' &&
              <><MyActionAlert
                action={confirmBooking}
                title="Confirm reservation"
                actionText="Do you want to confirm this reservation?"
                actionSubText="You can still cancel this reservation 10 days prior to arrival."
                actionButtonLabel="Confirm"
              /> <DropdownMenuSeparator />
              </>}
            {(reservation.status != 'cancelled' && reservation.status != 'done') &&
              <MyActionAlert
                action={cancelBooking}
                title="Cancel reservation"
                actionText="Do you want to cancel this reservation?"
                actionButtonLabel="Confirm"
              />}
            {reservation.status === 'cancelled' &&
              <MyActionAlert
                action={deleteBooking}
                title="Delete reservation"
                actionText="Do you want to permanently delete this reservation?"
                actionButtonLabel="Delete"
              />}
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]