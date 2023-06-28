import { BsSnow } from "react-icons/bs";
import { FaBiking } from "react-icons/fa";
import { GiWheat, GiIsland, GiBoatFishing, GiForestCamp, GiBarn, GiForest } from "react-icons/gi";
import { IoDiamond } from "react-icons/io5";
import { MdOutlineVilla, MdCastle } from "react-icons/md";
import { TbBeach, TbPool } from "react-icons/tb";
import { SortOption } from "../types";
import { ArrowUpCircle, CheckCircle2, FileBarChart2, HelpCircle, Home, Mail, Settings, ShoppingBag, User, XCircle } from "lucide-react";

export const categories = [
  {
    label: 'Beach',
    icon: TbBeach,
    description: 'This property is close to the beach!',
  },
  {
    label: 'Modern',
    icon: MdOutlineVilla,
    description: 'This property is modern!'
  },
  {
    label: 'Countryside',
    icon: GiWheat,
    description: 'This property is in the countryside!'
  },
  {
    label: 'Pools',
    icon: TbPool,
    description: 'This is property has a beautiful pool!'
  },
  {
    label: 'Islands',
    icon: GiIsland,
    description: 'This property is on an island!'
  },
  {
    label: 'Lake',
    icon: GiBoatFishing,
    description: 'This property is near a lake!'
  },
  {
    label: 'Biking',
    icon: FaBiking,
    description: 'This property has biking activies!'
  },
  {
    label: 'History',
    icon: MdCastle,
    description: 'This property is an historical place!'
  },
  {
    label: 'Camping',
    icon: GiForestCamp,
    description: 'This property offers camping activities!'
  },
  {
    label: 'Arctic',
    icon: BsSnow,
    description: 'This property is in arctic environment!'
  },
  {
    label: 'Barns',
    icon: GiBarn,
    description: 'This property has a barn!'
  },
  {
    label: 'Lux',
    icon: IoDiamond,
    description: 'This property is brand new and luxurious!'
  },
  {
    label: 'Park',
    icon: GiForest,
    description: 'This property is near a national park'
  }
];

//listing view sort options
export const sortOptions: SortOption[] = [
  {
    value: 'price_high_to_low',
    label: 'Price. highest first'
  },
  {
    value: 'price_low_to_high',
    label: 'Price. lowest first'
  },
  {
    value: 'date_new_to_old',
    label: 'Date added. newest first'
  },
  {
    value: 'date_old_to_new',
    label: 'Date added. oldest first'
  },
  {
    value: 'room_high_to_low',
    label: 'Room count. highest first'
  },
  {
    value: 'room_low_to_high',
    label: 'Room count. lowest first'
  },
];
//colors seed for events in calendar views
export const eventColors = [
  '#228B22',//ForestGreen
  '#1E90FF',//DodgerBlue
  '#CD5C5C',//IndianRed
  '#778899',//LightSlateGray
  '#DB7093',//PaleVioletRed
  '#A0522D',//Sienna
  '#FFA500',//Orange
  '#000000',//Black
  '#DC143C',//Crimson
  '#FAEBD7',//AntiqueWhite
  '#00008B',//DarkBlue
  '#66CDAA',//MediumAquaMarine
  '#8FBC8F',//DarkSeaGreen
]
//reservation statuses
export const statuses = [
  {
    value: "unconfirmed",
    label: "Unconfirmed",
    icon: HelpCircle,
  },
  {
    value: "confirmed",
    label: "Confirmed",
    icon: ArrowUpCircle,
  },
  {
    value: "done",
    label: "Done",
    icon: CheckCircle2,
  },
  {
    value: "cancelled",
    label: "Cancelled",
    icon: XCircle,
  },
]

//admin dashboard side navigation bar items:
export const sidebarNavItems = [
  {
    title: "Reports",
    href: "/dashboard/reports",
    icon: FileBarChart2
  },
  {
    title: "Bookings",
    href: "/dashboard/bookings",
    icon: ShoppingBag
  },
  {
    title: "Mökki",
    href: "/dashboard/properties",
    icon: Home
  },
  {
    title: "Profile",
    href: "/dashboard/profile",
    icon: User
  },
  {
    title: "Messages",
    href: "/dashboard/messages",
    icon: Mail
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: Settings
  },
]
