"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

import { BsCart2 } from "react-icons/bs";

const CartState = () => {
  const [quantity, setQuantity] = useState(0);
  const isBrowser = () => typeof window !== undefined;

  useEffect(() => {
    if (isBrowser()) {
      let data = localStorage.getItem("cart") as string;
      setQuantity(JSON.parse(data).length);
    }
  }, []);

  return (
    <div className="rounded-full ml-5 relative w-11 h-11 flex items-center justify-center">
      <p className="absolute top-1 right-[-4px] bg-slate-900 text-white w-[18px] h-[18px] text-[15px] rounded-full flex items-center justify-center">
        {quantity}
      </p>
      <Link href={"/cart"}>
        <BsCart2 size={24} />
      </Link>
    </div>
  );
};

export default CartState;
