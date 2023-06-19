/* eslint-disable react-hooks/rules-of-hooks */
"use client"

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
import ColumnActionAlert from "../ColumnActionAlert"
import { useRouter } from "next/navigation"
import axios from "axios"
import toast from "react-hot-toast"
import useIsGuest from "@/app/hooks/useIsGuest"
import useCurrentReservation from "@/app/hooks/useCurrentReservation"
import useMessageModal from "@/app/hooks/useMessageModal"
import { statuses } from "@/app/constants"
import { DataTableColumnHeader } from "../ui/data-table-column-header"

export const columns: ColumnDef<Reservation & { user?: User, listing?: Listing }>[] = [
  {
    id: 'place',
    accessorKey: "listing.title",
    header: ({ column }) => (<DataTableColumnHeader column={column} title="Place" />),
  },
  {
    id: 'guest',
    accessorKey: "user.name",
    header: ({ column }) => (<DataTableColumnHeader column={column} title="Guest" />),
    enableSorting: false
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