import { oneProductType } from "@/components/utils/ProductsDataArrayAndType";
import { client } from "../../../../sanity/lib/client";
import { Card } from "@/components/views/Card";
import Link from "next/link";

async function getAllProductsForSearch() {
  let response = await client.fetch(`*[_type == "products"]`);
  return response;
}

const Search = async ({ params }: { params: { query: string } }) => {
  let slug = params.query.toLowerCase();
  let data = await getAllProductsForSearch();
  let dataToMap = await data.filter((item: oneProductType) => {
    if (item.productname.toLowerCase().indexOf(slug) >= 0) {
      return true;
    }
    return false;
  });
  return (
    <div className="grid lg:grid-cols-4 sm:grid-cols-2 gap-10 px-4 py-2 mt-20 mb-20 min-h-screen">
      {dataToMap &&
        dataToMap.map((items: oneProductType, index: number) => (
          <Link href={`/product/${items.slug.current}`}>
            <Card key={index} singleProductData={items} />
          </Link>
        ))}
    </div>
  );
};

export default Search;
