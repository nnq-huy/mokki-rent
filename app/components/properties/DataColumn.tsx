/* eslint-disable react-hooks/rules-of-hooks */
'use client';

import { Listing, Reservation, User } from "@prisma/client"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"

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
import axios from "axios";
import toast from "react-hot-toast";
import ColumnActionAlert from "../ColumnActionAlert";
import useMessageModal from "@/app/hooks/useMessageModal";
import useCurrentReservation from "@/app/hooks/useCurrentReservation";
import useIsGuest from "@/app/hooks/useIsGuest";

export const columns: ColumnDef<Reservation & { user?: User, listing?: Listing }>[] = [
  {
    id: 'guest',
    accessorKey: "user.name",
    header: () => {
      return (
        <div className="text-gray-700">
          Guest
        </div>
      )
    },
  },
  {
    accessorKey: "startDate",
    header: ({ column }) => {
      return (
        <div className="text-gray-700 text-center">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Checkin
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      )
    },
    cell: ({ row }) => {
      const checkinDate = new Date(row.getValue("startDate"))
      const formatted = checkinDate.toLocaleDateString('fi')
      return (
        <div className="font-medium text-center text-gray-500">
          {formatted}
        </div>
      )
    },
  },
  {
    accessorKey: "endDate",
    header: ({ column }) => {
      return (
        <div className="text-gray-700 text-left flex ml-[-14px]">

          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Checkout
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>

      )
    },
    cell: ({ row }) => {
      const checkoutDate = new Date(row.getValue("endDate"))
      const formatted = checkoutDate.toLocaleDateString('fi')
      return (
        <div className="text-left font-medium text-gray-500">
          {formatted}
        </div>
      )
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <div className="text-gray-700 flex ml-[-12px]">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >

            Status
            <ArrowUpDown className="ml-2 h-4 w-4" />

          </Button>
        </div>
      )
    },
    cell: ({ row }) => {
      return (
        <div className="text-justify">
          {row.getValue("status")}
        </div>
      )
    }
  },

  {
    accessorKey: "totalPrice",
    header: ({ column }) => {
      return (
        <div className="text-right mr-[-10px]">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Amount
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      )
    },
    cell: ({ row }) => {
      const total = parseFloat(row.getValue("totalPrice"))
      const formatted = new Intl.NumberFormat("fi", {
        style: "currency",
        currency: "EUR",
      }).format(total)

      return (
        <div className="text-right font-medium">
          {formatted}
        </div>
      )
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const reservation = row.original
      const router = useRouter();

      const today = new Date();
      const canMarkDone = reservation.endDate < today;
      const IsGuest = useIsGuest();
      const { setCurrentReservation } = useCurrentReservation();
      const messageModal = useMessageModal();

      const handleOpenMessage = () => {
        IsGuest.switchToHost();
        setCurrentReservation(reservation);
        messageModal.onOpen();
      }

      const onMarkDone = async () => {
        const data = {
          status: 'done'
        }
        await axios.put(`/api/reservations/${reservation.id}`, data)
          .then(() => {
            toast.success('Reservation marked as done');
            router.refresh();
          })
          .catch(() => {
            toast.error('Something went wrong.')
          });
      };

      const onDelete = async () => {
        await axios.delete(`/api/reservations/${reservation.id}`).then(() => {
          toast.success('Reservation deleted');
          router.refresh();
        })
          .catch(() => {
            toast.error('Something went wrong.')
          });
      };

      const onCancel = async () => {
        const data = {
          status: 'cancelled'
        }
        await axios.put(`/api/reservations/${reservation.id}`, data)
          .then(() => {
            toast.success('Reservation cancelled');
            router.refresh();
          })
          .catch(() => {
            toast.error('Something went wrong.')
          });
      };

      const onConfirm = async () => {
        const data = {
          status: 'confirmed'
        }
        await axios.put(`/api/reservations/${reservation.id}`, data)
          .then(() => {
            toast.success('Reservation confirmed!');
            router.refresh();
          })
          .catch(() => {
            toast.error('Something went wrong.')
          });
      };

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
            <DropdownMenuItem onClick={handleOpenMessage}>
              Message guest
            </DropdownMenuItem>
            {(reservation.status === 'confirmed' && canMarkDone) &&
              <ColumnActionAlert
                action={onMarkDone}
                title="Mark as done"
                actionText="Mark reservation as done confirmation"
                actionButtonLabel="Continue"
              />
            }
            <DropdownMenuSeparator />
            {reservation.status === 'unconfirmed' &&
              <><ColumnActionAlert
                action={onConfirm}
                title="Confirm reservation"
                actionText="Do you want to confirm this reservation?"
                actionSubText="You can still cancel this reservation 10 days prior to arrival."
                actionButtonLabel="Confirm"
              /> <DropdownMenuSeparator />
              </>}
            {(reservation.status != 'cancelled' && reservation.status != 'done') &&
              <ColumnActionAlert
                action={onCancel}
                title="Cancel reservation"
                actionText="Do you want to cancel this reservation?"
                actionButtonLabel="Confirm"
              />}
            {reservation.status === 'cancelled' &&
              <ColumnActionAlert
                action={onDelete}
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