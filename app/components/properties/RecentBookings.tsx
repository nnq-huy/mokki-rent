import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/app/components/ui/avatar"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../ui/card"
import { Listing, Reservation, User } from "@prisma/client"

interface RecentBookingsProps {
  reservations: (Reservation & {
    user: User,
    listing: Listing
  })[],
  name: string,
}

const RecentBookings: React.FC<RecentBookingsProps> = ({ reservations, name }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Bookings</CardTitle>
        <CardDescription>
          {name} has {reservations.length} bookings recently
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-8">
          {reservations.map((booking) => {
            return (
              <li key={booking.id}>
                <div className="flex items-center">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src={booking.user!.image!} alt="Avatar" />
                    <AvatarFallback>{booking.user.name}</AvatarFallback>
                  </Avatar>
                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">{booking.user.name}</p>
                    <p className="text-sm text-muted-foreground">
                      Check out: {booking.endDate.toLocaleDateString()}
                    </p>
                  </div>
                  <div className="ml-auto font-medium">+{booking.totalPrice}€</div>
                </div>
              </li>
            )
          })}
        </ul>
      </CardContent>
    </Card>

  )
}

export default RecentBookings;