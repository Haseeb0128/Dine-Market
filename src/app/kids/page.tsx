import { oneProductType } from "@/components/utils/ProductsDataArrayAndType";
import { Card } from "@/components/views/Card";
import Link from "next/link";

async function fetchKidsProductData() {
  let res = await fetch(
    `https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2023-08-08/data/query/production?query=*%5B_type+%3D%3D+%22products%22+%26%26+productTypes%5B1%5D+%3D%3D+%22Kids%22%5D`,
    {
      next: {
        revalidate: 60,
      },
    }
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

const Kids = async () => {
  const productData = await fetchKidsProductData();
  // console.log("All kids products", productData.result);
  return (
    <div className="grid lg:grid-cols-4 sm:grid-cols-2 gap-10 px-4 py-2 mt-20 mb-20 min-h-screen">
      {productData.result.map((item: oneProductType, index: number) => {
        return (
          <Link href={`/product/${item.slug.current}`}>
            <Card key={index} singleProductData={item} />
          </Link>
        );
      })}
    </div>
  );
};

export default Kids;
