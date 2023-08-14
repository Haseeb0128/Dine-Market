// import BASE_PATH_FOR_API from "@/components/shared/BasePath";
import { responseType } from "@/components/utils/ProductsDataArrayAndType";
import { Hero } from "@/components/views/Hero";
import { Jewellery } from "@/components/views/Jewellery";
import { ProductCarousel } from "@/components/views/ProductCarousel";
import { Promotions } from "@/components/views/Promotions";

async function fetchAllProductsData() {
  let res = await fetch(
    `https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2021-06-07/data/query/production?query=*[_type == "products"]`,
    {
      next: {
        revalidate: 60,
      },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch");
  }

  return res.json();
}

export default async function Home() {
  let { result }: responseType = await fetchAllProductsData();
  return (
    <>
      <Hero />
      <Promotions />
      <ProductCarousel ProductData={result} />
      <Jewellery />
    </>
  );
}
