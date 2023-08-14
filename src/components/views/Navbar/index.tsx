"use client";
import {
  NavbarArray,
  NavbarItemType,
} from "@/components/utils/NavbarArrayandTypes";
import Image from "next/image";
import Link from "next/link";
import { BiSearch } from "react-icons/bi";
import { BsCart2 } from "react-icons/bs";
import { Dropdown } from "./subComponents/Dropdown";
import { HiOutlineChevronDown } from "react-icons/hi";
import { MobileNavbar } from "./subComponents/MobileNavbar";
import React, { useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { GrClose } from "react-icons/gr";
import { useRouter } from "next/navigation";
import ContextWrapper from "@/global/context";
import CartState from "./subComponents/CartState";

export const Navbar = () => {
  const [isNavbarOpen, setNavbarOpen] = useState<boolean>(false);
  const [cartItemNumber, setcartItemNumber] = useState(0);
  const [searchQuery, setsearchQuery] = useState("");
  const router = useRouter();

  function handleSearchCalledFunc(e: any) {
    if (e.key === "Enter" && e.keyCode === 13) {
      router.push(`/search/${searchQuery}`);
    }
  }
  return (
    <ContextWrapper>
      <div className="sticky top-0 bg-white z-10">
        <div className="py-2 px-4 flex justify-between items-center shadow-lg">
          <div className="w-32 flex-shrink-0 mr-8">
            <Link href={"/"}>
              <Image src="/Logo.png" alt="Logo" width={500} height={500} />
            </Link>
          </div>
          <div className="hidden lg:flex justify-between items-center w-full">
            <ul className="flex items-center">
              {NavbarArray.map((item: NavbarItemType, index: number) => {
                return (
                  <li
                    key={index}
                    className="flex items-center relative rounded-sm mx-[20px] px-2 py-2 hover:bg-gray-100 cursor-pointer group"
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
                    {item.isDropDown && (
                      <div
                        className={`invisible group-hover:visible absolute top-8 left-0 py-2 px-6 bg-gray-100 font-light min-w-[7.8rem]`}
                      >
                        <Dropdown item={item} />
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
            <div className="flex items-center border-2 rounded-lg px-2">
              <Link href={`/search/${searchQuery}`}>
                <BiSearch />
              </Link>
              <input
                type="text"
                value={searchQuery}
                onKeyDown={handleSearchCalledFunc}
                onChange={(e) => {
                  setsearchQuery(e.target.value);
                }}
                placeholder="Search"
                className="p-1 w-72 focus:outline-none"
              />
            </div>
            {/* <div className="bg-gray-300 rounded-full relative w-11 h-11 flex items-center justify-center">
            <p className="absolute top-1 right-[-4px] bg-slate-900 text-white w-[18px] h-[18px] rounded-full flex items-center justify-center">
              {cartItemNumber}
            </p>
            <BsCart2 size={24} />
          </div> */}
          </div>
          <div className="flex items-center gap-2">
            {/* <div className="rounded-full ml-5 relative w-11 h-11 flex items-center justify-center">
            <p className="absolute top-1 right-[-4px] bg-slate-900 text-white w-[18px] h-[18px] rounded-full flex items-center justify-center">
              {cartItemNumber}
            </p>
            <Link href={"/cart"}>
              <BsCart2 size={24} />
            </Link>
          </div> */}
            <CartState />
            <div
              onClick={() => {
                setNavbarOpen(!isNavbarOpen);
              }}
            >
              {isNavbarOpen ? (
                <div className="m-2 flex lg:hidden">
                  <GrClose size={25} />
                </div>
              ) : (
                <div className="m-2 flex lg:hidden">
                  <AiOutlineMenu size={25} />
                </div>
              )}
            </div>
          </div>
        </div>
        {isNavbarOpen && <MobileNavbar />}
      </div>
    </ContextWrapper>
  );
};
