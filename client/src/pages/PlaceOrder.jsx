import { useEffect } from "react";
// import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useCreateOrderMutation } from "../slices/orderApiSlice";
import { clearCartItems } from "../slices/cartSlice";
import { toast } from "react-toastify";
import { useRedirect } from "../hooks/useRedirect";
// import { useScreenWidth } from "../hooks/useScreenWidth";

import Summary from "../components/placeorder/Summary";
import ShippingSteps from "../components/ShippingSteps";
import { useTranslation } from "react-i18next";
export default function PlaceOrder() {
  useRedirect();
  const { t } = useTranslation();
  const cart = useSelector((store) => store.cart.cardItems);
  const subs = useSelector((store) => store.cart);
  const user = useSelector((store) => store.auth.userInfo);
  // const isMobile = useScreenWidth();
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

  const placeOrderHandler = async () => {
    const { address, postalCode, selectedCity, selectedCountry, phoneNumber } =
      subs.shippingAddress;
    const shipAdd = {
      address,
      postalCode,
      city:
        typeof selectedCity === "string" ? selectedCity : selectedCity?.label,
      country:
        typeof selectedCountry === "string"
          ? selectedCountry
          : selectedCountry?.label,
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
      //

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
    <div className="bg-gray-100 dark:bg-[#1C1E2D] min-w-full min-h-full xs:flex xs:flex-col xs:w-full">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 p-5">
        {t("homepage.placeOrder")}
      </h1>
      <div className="xs:mx-5 xs:min-w-full xs:px-5">
        <ShippingSteps currentStep={4} />
      </div>
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
