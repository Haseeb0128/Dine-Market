// import BASE_PATH_FOR_API from "@/components/shared/BasePath";
import { responseType } from "@/components/utils/ProductsDataArrayAndType";
import { AllProductsCompo } from "@/components/views/AllProducts";
// import { Card } from "@/components/views/Card";
// import Link from "next/link";

async function fetchAllProductData() {
  let res = await fetch(
    `https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2023-08-08/data/query/production?query=*%5B_type+%3D%3D+%22products%22%5D`,
    {
      next: {
        revalidate: 120,
      },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

const Products = async () => {
  let { result }: responseType = await fetchAllProductData();
  // console.log(productData);

  return <AllProductsCompo ProductData={result} />;
};

export default Products;
