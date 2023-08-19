import Stripe from "stripe";
import { NextRequest, NextResponse } from "next/server";
import { oneProductType } from "@/components/utils/ProductsDataArrayAndType";

interface typeOfData {
  price: string;
  name: string;
  quantity: number;
}

let orignalData: Array<typeOfData> = [
  {
    price: "price_1NgnDBC8VMvMHlf3JK83gsn0",
    name: "Hangree Polo Shirt",
    quantity: 1,
  },
  {
    price: "price_1NgnCbC8VMvMHlf3QeNs4M2h",
    name: "Natural Black Sweatpants",
    quantity: 1,
  },
  {
    price: "price_1NgnBvC8VMvMHlf3K0MiEYW1",
    name: "Cameryn Sash Tie Dress",
    quantity: 1,
  },
  {
    price: "price_1NgnB2C8VMvMHlf3YBxSjyHA",
    name: "Cozy Sweatpants",
    quantity: 1,
  },
  {
    price: "price_1NgnAJC8VMvMHlf3URlLU1K5",
    name: "Muscle Tank",
    quantity: 1,
  },
  {
    price: "price_1Ngn9dC8VMvMHlf3cVgNA9Qb",
    name: "Overhead Hoodie",
    quantity: 1,
  },
  {
    price: "price_1Ngn8cC8VMvMHlf3pbVkSk1B",
    name: "Flex Sweatpants",
    quantity: 1,
  },
  {
    price: "price_1Ngn7rC8VMvMHlf33Pp1Oeuj",
    name: "Lite Sweatpants",
    quantity: 1,
  },
  {
    price: "price_1Ngn73C8VMvMHlf3DLLGl4ZW",
    name: "Pink Fleece Sweatpants",
    quantity: 1,
  },
  {
    price: "price_1Ngn6IC8VMvMHlf3Hex2OQKP",
    name: "DIOR Hoodie",
    quantity: 1,
  },
  {
    price: "price_1Ngn5KC8VMvMHlf3Ci7bTecT",
    name: "Brushed Bomber",
    quantity: 1,
  },
  {
    price: "price_1Ngn4GC8VMvMHlf33SOsSlpi",
    name: "Flex Sweatshirt",
    quantity: 1,
  },
  {
    price: "price_1Ngn3LC8VMvMHlf3JZlMWV6G",
    name: "Flex Push Button Bomber",
    quantity: 1,
  },
  {
    price: "price_1Ngn1xC8VMvMHlf35Vs01QK3",
    name: "Brushed Raglan Sweatshirt",
    quantity: 1,
  },
  {
    price: "price_1Ngn0yC8VMvMHlf3Jc6QzKxD",
    name: "Imperial Alpaca Hoodie",
    quantity: 1,
  },
  {
    price: "price_1NgmzkC8VMvMHlf39vDgRlja",
    name: "Fleece Sweatshirt",
    quantity: 1,
  },
];

// @ts-ignore
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req: NextRequest) {
  let cartItemsArray = await req.json();

  try {
    let line_item = orignalData.filter((item: typeOfData) => {
      for (let index = 0; index < cartItemsArray.length; index++) {
        const element: oneProductType = cartItemsArray[index];
        if (element.productname === item.name) {
          return true;
        }
      }
    });
    let line_itemToSend: any = line_item.map((item: typeOfData) => {
      for (let index = 0; index < cartItemsArray.length; index++) {
        const element: oneProductType = cartItemsArray[index];
        if (element.productname === item.name) {
          return {
            price: item.price,
            quantity: element.quantity,
          };
        }
      }
    });

    let session = await stripe.checkout.sessions.create({
      line_items: line_itemToSend,
      mode: "payment",
      success_url: `${req.nextUrl.origin}/?success=true`,
      cancel_url: `${req.nextUrl.origin}/?success=false`,
    });
    return NextResponse.json({ link: session.url });
  } catch (error) {
    console.log((error as { message: string }).message);
    return NextResponse.json({ error });
  }
}
