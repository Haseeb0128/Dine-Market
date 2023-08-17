import BASE_PATH_FOR_API from "@/components/shared/BasePath";
import { oneProductType } from "@/components/utils/ProductsDataArrayAndType";
import { Card } from "@/components/views/Card";
import Link from "next/link";

async function fetchAllProductData() {
  let res = await fetch(`${BASE_PATH_FOR_API}/api/products?start=0&end=16`, {
    next: {
      revalidate: 120,
    },
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

const Products = async () => {
  const productData = await fetchAllProductData();
  // console.log(productData);

  return (
    <div className="grid lg:grid-cols-4 sm:grid-cols-2 gap-10 px-4 py-2 mt-20 mb-20">
      {productData.productArray.map((item: oneProductType, index: number) => {
        return (
          <Link href={`/product/${item.slug.current}`}>
            <Card key={index} singleProductData={item} />
          </Link>
        );
      })}
    </div>
  );
};

export default Products;
