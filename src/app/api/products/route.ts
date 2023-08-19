import { NextRequest, NextResponse } from "next/server";
import { oneProductType } from "@/components/utils/ProductsDataArrayAndType";

export async function GET(request: NextRequest) {
  const orignalData: Array<oneProductType> = [];
  const url = request.nextUrl.searchParams;

  let res = await fetch(
    `https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2023-08-08/data/query/production?query=*%5B_type+%3D%3D+%22products%22%5D`
  );
  let dataFrom_APi = await res.json();
  orignalData.push(...dataFrom_APi.result);

  if (url.has("start") || url.has("end")) {
    if (orignalData[Number(url.get("start"))]) {
      let productArray = orignalData.slice(
        Number(url.get("start")),
        Number(url.get("end"))
      );
      return NextResponse.json({ productArray });
    }
    return NextResponse.json({ productArray: "Not found" });
  }

  return NextResponse.json({ orignalData });
}
