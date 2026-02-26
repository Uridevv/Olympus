import { Link } from "react-router-dom";
import { House, Menu, Shirt, User, Landmark } from "lucide-react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function ResponsiveNavItems() {
  return (
    <Popover>
      <PopoverTrigger>
        <Menu />
      </PopoverTrigger>
      <PopoverContent>
        <Link to={"/"} className="hover:bg-neutral-800 rounded-lg p-2 flex justify-between ">
          Home
          <House />{" "}
        </Link>
        <Link
          to={"/ropa-page"}
          className="hover:bg-neutral-800 rounded-lg p-2 flex justify-between"
        >
          Clothing
          <Shirt/>
        </Link>
        <Link
          to={"/profile"}
          className="hover:bg-neutral-800 rounded-lg p-2 flex justify-between"
        >
          Profile
          <User/>
        </Link>
        <Link
          to={"/about-us"}
          className="hover:bg-neutral-800 rounded-lg p-1 flex justify-between"
        >
          About Us
          <Landmark/>
        </Link>
      </PopoverContent>
    </Popover>
  );
}
