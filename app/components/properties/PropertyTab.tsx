import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs"
import { Separator } from "../ui/separator";
interface PropertyTabsProps {
  details: React.ReactElement;
  calendar: React.ReactElement;
  bookings: React.ReactElement;
  settings: React.ReactElement;
}
const PropertyTabs: React.FC<PropertyTabsProps> = ({
  details, calendar, bookings, settings
}) => {
  return (
    <Tabs defaultValue="details" className="flex flex-col w-full px-2 md:px-4">
      <TabsList className="shadow bg-gray-100 w-full">
        <TabsTrigger value="details">
          Details
        </TabsTrigger>
        <Separator orientation="vertical" decorative />
        <TabsTrigger value="calendar">
          Calendar
        </TabsTrigger>
        <Separator orientation="vertical" decorative />
        <TabsTrigger value="bookings">
          Bookings
        </TabsTrigger>
        <Separator orientation="vertical" decorative />
        <TabsTrigger value="settings">
          Settings
        </TabsTrigger>
      </TabsList>
      <TabsContent value="details">{details}</TabsContent>
      <TabsContent value="calendar">{calendar}</TabsContent>
      <TabsContent value="bookings">{bookings}</TabsContent>
      <TabsContent value="settings">{settings}</TabsContent>
    </Tabs>
  );
}
export default PropertyTabs;