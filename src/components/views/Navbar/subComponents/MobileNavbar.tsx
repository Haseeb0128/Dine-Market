"use client";
import {
  NavbarArray,
  NavbarItemType,
} from "@/components/utils/NavbarArrayandTypes";
import { Expand } from "./Expand";

export const MobileNavbar = () => {
  return (
    <div>
      <ul className="w-full px-6 py-4 bg-gray-300">
        {NavbarArray.map((item: NavbarItemType, index: number) => {
          return <Expand key={index} item={item} />;
        })}
      </ul>
    </div>
  );
};
