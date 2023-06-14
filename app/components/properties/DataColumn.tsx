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
            <DropdownMenuItem>
                Message guest
              </DropdownMenuItem>
            {reservation.status === 'confirmed' &&
              <DropdownMenuItem>
                Mark as Done
              </DropdownMenuItem>}
            <DropdownMenuSeparator />
            {reservation.status === 'unconfirmed' &&
              <DropdownMenuItem>
                Confirm Reservation
              </DropdownMenuItem>}
            {(reservation.status != 'cancelled' && reservation.status != 'done') &&
              <DropdownMenuItem>
                Cancel Reservation
              </DropdownMenuItem>}
            <DropdownMenuItem>
              Delete Reservation
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]