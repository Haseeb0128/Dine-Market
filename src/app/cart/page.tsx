import CartComp from "@/components/views/CartParent/CartChild";
import ContextWrapper from "@/global/context";

async function fetchAllProductsData() {
  let res = await fetch(
    `https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2021-06-07/data/query/production?query=*[_type == "products"]`,
    {
      next: {
        revalidate: 60,
      },
    }
  );
  return res.json();
}

const Cart = async () => {
  let allProductsOfStore = await fetchAllProductsData();
  return (
    <ContextWrapper>
      <CartComp allProductsOfStore={allProductsOfStore.result} />
    </ContextWrapper>
  );
};

export default Cart;
