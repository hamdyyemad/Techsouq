import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useCreateOrderMutation } from "../slices/orderApiSlice";
import { clearCartItems } from "../slices/cartSlice";
import { toast } from "react-toastify";
import { useRedirect } from "../hooks/useRedirect";
import { useScreenWidth } from "../hooks/useScreenWidth";

import Summary from "../components/placeorder/Summary";
export default function PlaceOrder() {
  useRedirect();
  const cart = useSelector((store) => store.cart.cardItems);
  const subs = useSelector((store) => store.cart);
  const user = useSelector((store) => store.auth.userInfo);
  const isMobile = useScreenWidth();
  let token = user.token;
  // { isLoading, error }
  const [createOrder, { isLoading, error }] = useCreateOrderMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!subs.shippingAddress.address) {
      navigate("/shipping");
    } else if (!subs.paymentMethod) {
      navigate("/payment");
    }
  }, [subs.paymentMethod, subs.shippingAddress.address, navigate]);
  console.log(subs);
  const placeOrderHandler = async () => {
    const { address, postalCode, selectedCity, selectedCountry, phoneNumber } =
      subs.shippingAddress;
    const shipAdd = {
      address,
      postalCode,
      city: selectedCity?.label,
      country: selectedCountry?.label,
      phoneNumber,
    };

    try {
      const res = await createOrder(
        {
          orderItems: subs.cardItems,
          shippingAddress: shipAdd,
          paymentMethod: subs.paymentMethod,
          itemsPrice: subs.itemsPrice,
          shippingPrice: subs.shippingPrice,
          taxPrice: subs.taxPrice,
          totalPrice: subs.totalPrice,
          user: user,
        },
        token
      ).unwrap();
      dispatch(clearCartItems());
      // console.log(res.data.createdOrder._id);

      navigate(`/order/${res.data.createdOrder._id}`);
    } catch (err) {
      console.log(error);
      if (error?.data === "Invalid Token") {
        toast.error("Please Login again", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      } else {
        toast.error(err?.data?.msg);
      }
    }
  };

  return (
    <div className="bg-gray-100 dark:bg-[#1C1E2D] min-w-full min-h-full">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 p-5">
        Place Order
      </h1>

      {!isMobile && <ShippingSteps />}
      <Summary
        cart={cart}
        subs={subs}
        user={user}
        placeOrderHandler={placeOrderHandler}
        isLoading={isLoading}
      />
    </div>
  );
}
function ShippingSteps() {
  return (
    <div className="flex items-center justify-center mb-3">
      <Link
        to="/cart"
        className="flex text-sm text-blue-500 focus:outline-none"
      >
        <span className="flex items-center justify-center text-white bg-blue-500 rounded-full h-5 w-5 mr-2">
          1
        </span>{" "}
        Cart
      </Link>
      <Link
        // to="/shipping"
        className="flex text-sm text-blue-500 ml-8 focus:outline-none"
      >
        <span className="flex items-center justify-center text-white bg-blue-500 rounded-full h-5 w-5 mr-2">
          2
        </span>{" "}
        Shipping
      </Link>
      <Link
        to="/payment"
        className="flex text-sm text-blue-500 ml-8 focus:outline-none"
      >
        <span className="flex items-center justify-center text-white bg-blue-500 rounded-full h-5 w-5 mr-2">
          3
        </span>{" "}
        Payments
      </Link>

      <button
        className="flex text-sm text-gray-700 ml-8 focus:outline-none"
        disabled
      >
        <span className="flex items-center justify-center border-2 border-blue-500 rounded-full h-5 w-5 mr-2">
          4
        </span>{" "}
        Place Order
      </button>
    </div>
  );
}
