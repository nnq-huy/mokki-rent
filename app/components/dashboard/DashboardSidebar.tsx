'use client';

import {
  FileBarChart2,
  Home,
  LogOut,
  Mail,
  Settings,
  ShoppingBag,
  User
} from "lucide-react";
import { Button } from "../ui/button";

const DashboardSidebar = () => {
  return (
    <div className="pb-12 bg-white w-12 md:w-40 border-r shadow rounded-sm">
      <div className="space-y-4 py-4">
        <div className="space-y-1 text-gray-500">
          <Button variant="ghost" size="sm" className="w-full justify-start">
            <User className="md:mr-2 h-4 w-4" />
            <p className="hidden md:block">Profile</p>
          </Button>
          <Button variant="ghost" size="sm" className="w-full justify-start">
            <ShoppingBag className="mr-2 h-4 w-4" />
            <p className="hidden md:block">Bookings</p>
          </Button>
          <Button variant="ghost" size="sm" className="w-full justify-start">
            <Home className="mr-2 h-4 w-4" />
            <p className="hidden md:block">Mökki</p>
          </Button>
          <Button variant="ghost" size="sm" className="w-full justify-start">
            <FileBarChart2 className="mr-2 h-4 w-4" />
            <p className="hidden md:block">Reports</p>
          </Button>
          <Button variant="ghost" size="sm" className="w-full justify-start">
            <Mail className="mr-2 h-4 w-4" />
            <p className="hidden md:block">Messages</p>
          </Button>
          <Button variant="ghost" size="sm" className="w-full justify-start">
            <Settings className="mr-2 h-4 w-4" />
            <p className="hidden md:block">Settings</p>
          </Button>
          <Button variant="ghost" size="sm" className="w-full justify-start">
            <LogOut className="mr-2 h-4 w-4" />
            <p className="hidden md:block">Logout</p>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default DashboardSidebar;