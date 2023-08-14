import ProductDetail from "@/components/views/ProductDetail";
import ContextWrapper from "@/global/context";

async function fetchProductData(params: any) {
  const param = `${params}`;
  let res = await fetch(
    `https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2023-08-08/data/query/production?query=*%5B_type+%3D%3D+%22products%22+%26%26+slug.current+%3D%3D+%22${param}%22%5D`,
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

const Product = async ({ params }: { params: { slug: string } }) => {
  const productData = await fetchProductData(params.slug);
  // console.log("Data: ", productData.result[0]);
  return (
    <ContextWrapper>
      <ProductDetail item={productData.result[0]} />
    </ContextWrapper>
  );
};
export default Product;
