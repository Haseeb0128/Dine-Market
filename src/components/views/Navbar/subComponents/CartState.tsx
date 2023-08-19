"use client";
import { cartContext } from "@/global/context";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";

import { BsCart2 } from "react-icons/bs";

const CartState = () => {
  let { cartArray } = useContext(cartContext);
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    if (cartArray.length !== 0) {
      setQuantity(cartArray.length);
    }
  }, [cartArray]);

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
