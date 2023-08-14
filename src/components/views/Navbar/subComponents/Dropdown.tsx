import { NavbarItemType } from "@/components/utils/NavbarArrayandTypes";
import Link from "next/link";
import { FC } from "react";

export const Dropdown: FC<{ item: NavbarItemType }> = ({ item }) => {
  return (
    <ul>
      {item.dropDownData?.map((item: NavbarItemType, index: number) => {
        return (
          <li
            key={index}
            className="my-2 mx-auto group-hover:duration-300 -translate-y-7 group-hover:translate-y-0"
          >
            <Link href={item.href}>{item.label}</Link>
          </li>
        );
      })}
    </ul>
  );
};
