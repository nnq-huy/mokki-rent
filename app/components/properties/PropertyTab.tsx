import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs"
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
    <Tabs defaultValue="details" className="flex flex-col w-full justify-center px-2 md:px-4">
      <TabsList className=" place-content-center bg-gray-50 text-white">
        <TabsTrigger value="details" className="hover:opacity-70 rounded-t rounded-b-none bg-mokki-green shadow-md">
          Details
        </TabsTrigger>
        <TabsTrigger value="calendar" className="hover:opacity-70 rounded-t rounded-b-none bg-mokki-green shadow-md">
          Calendar
        </TabsTrigger>
        <TabsTrigger value="bookings" className="hover:opacity-70 rounded-t rounded-b-none bg-mokki-green shadow-md">
          Bookings
        </TabsTrigger>
        <TabsTrigger value="settings" className="hover:opacity-70 rounded-t rounded-b-none bg-mokki-green shadow-md">
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