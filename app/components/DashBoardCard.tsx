import { EuroIcon, LucideIcon } from "lucide-react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card"
import { IconType } from "react-icons"
interface DashboardCardProps {
  title: string,
  subtext: string,
  amount: string,
  icon: IconType
}

const DashboardCard: React.FC<DashboardCardProps> = ({ title, subtext, amount, icon: Icon, }) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          {title}
        </CardTitle>
        <Icon color={'#808080'} size={20} />

      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{amount}</div>
        <p className="text-xs text-muted-foreground">
          {subtext}
        </p>
      </CardContent>
    </Card>
  )
}

export default DashboardCard;
