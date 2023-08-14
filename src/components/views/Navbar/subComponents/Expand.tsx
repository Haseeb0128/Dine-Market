import { NavbarItemType } from "@/components/utils/NavbarArrayandTypes";
import Link from "next/link";
import React, { FC, useState } from "react";
import { HiOutlineChevronDown } from "react-icons/hi";

export const Expand: FC<{
  item: NavbarItemType;
}> = ({ item }) => {
  const [isExpanded, setExpanded] = useState(false);
  return (
    <li className="my-6">
      <div
        onClick={() => {
          setExpanded(!isExpanded);
        }}
        className="flex justify-between items-center"
      >
        <Link href={item.href}>{item.label}</Link>
        {item.isDropDown ? (
          <HiOutlineChevronDown
            className="mt-1 -rotate-180 group-hover:rotate-0 duration-300"
            size={15}
          />
        ) : (
          ""
        )}
      </div>
      <ul className="px-2 bg-slate-400 rounded-lg">
        {isExpanded &&
          item.dropDownData?.map((subItem: NavbarItemType, index: number) => {
            return (
              <li className="my-3" key={index}>
                <Link href={subItem.href}>{subItem.label}</Link>
              </li>
            );
          })}
      </ul>
    </li>
  );
};
