import { useSelector } from "react-redux";

// import { useNavigate } from "react-router-dom";
// import CustomSpinner from "../../components/CustomSpinner";
import EcommerceCard from "../../components/EcommerceCard";
import {
  useGetSellerAcceptedProductsQuery,
  useGetSellerPendingProductsQuery,
} from "../../slices/productsApiSlice";
export default function SellerProductsGallery() {
  const user = useSelector((store) => store.auth.userInfo);
  const id = user.id;
  const {
    data: products,
    // isLoading,
    // error,
    // refetch,
  } = useGetSellerAcceptedProductsQuery(id);
  const { data } = useGetSellerPendingProductsQuery(id);
  const pendingProduct = data?.data
    ? data?.data?.products.map((item) => ({
        ...item,
        status: "pending",
      }))
    : [];
  const acceptedProduct = products?.data
    ? products?.data?.products.map((item) => ({
        ...item,
        status: "accepted",
      }))
    : [];

  const product = [...pendingProduct, ...acceptedProduct];
  console.log(product);

  return (
    <div className="xs:min-w-max bg-gray-100 min-w-max h-screen	dark:bg-[#151725] ">
      <div className="min-w-fit container mx-auto  px-5 h-screen dark:bg-[#151725]">
        <div className="md:flex no-wrap md:-mx-2 dark:bg-[#151725]">
          {/* <!-- Right Side --> */}
          <div className="px-3 mx-2 h-screen dark:bg-[#151725]">
            <SellerProducts product={product} />
          </div>
        </div>
      </div>
    </div>
  );
}

function SellerProducts({ product }) {
  const disableCart = false;
  return (
    <>
      <div className="w-fit mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-8 gap-x-4 mt-10 mb-5 dark:bg-[#151725]">
        {product?.map((p) => {
          return (
            <EcommerceCard
              key={p._id}
              product={p}
              id={p._id}
              disableCart={disableCart}
              status={p.status}
            />
          );
        })}
      </div>
    </>
  );
}
