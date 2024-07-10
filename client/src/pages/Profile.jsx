import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { useProfileMutation } from "../slices/userApiSlice";
import { useGetMyOrdersQuery } from "../slices/orderApiSlice";

// import { useNavigate } from "react-router-dom";

import About from "../components/profile/About";
import OrderHistory from "../components/profile/OrderHistory";
export default function Profile() {
  const [isEdit, setIsEdit] = useState(false);
  const user = useSelector((store) => store.auth.userInfo);
  const cart = useSelector((state) => state.cart);
  let { shippingAddress } = cart;
  const { userInfo } = useSelector((state) => state.auth);
  const [updateProfile, { isLoading: loadingUpdateProfile }] =
    useProfileMutation();
  const { data: orders, isLoading, error } = useGetMyOrdersQuery();
  const order = orders?.data?.orders;
  //
  // const orders = data.data.orders;

  function isObjEmpty(obj) {
    return Object.keys(obj).length === 0;
  }

  if (!isObjEmpty(shippingAddress)) {
    // Use the existing shippingAddress from the cart
  } else if (
    Array.isArray(order) &&
    order.length > 0 &&
    order[0]?.shippingAddress
  ) {
    // Use the shippingAddress from the first order if available
    shippingAddress = order[order.length - 1]?.shippingAddress;
  }

  const dispatch = useDispatch();

  return (
    <div className="xs:min-w-max bg-gray-100 w-full h-screen	dark:bg-[#151725] xs:bg-white">
      <div className="min-w-fit container mx-auto  p-5 xs:p-0">
        <div className="md:flex no-wrap md:-mx-2 xs:h-screen">
          {/* <!-- Left Side --> */}
          {/* <div className="w-full md:w-3/12 md:mx-2"> */}
          {/* <ProfileCard user={user} /> */}
          {/* <div className="my-4"></div> */}
          {/* </div> */}
          {/* <!-- Right Side --> */}
          <div className="w-full h-96 xs:w-screen xs:m-auto p-4 m-auto xs:flex xs:flex-col xs:h-screen">
            <About
              user={user}
              shippingAddress={shippingAddress}
              updateProfile={updateProfile}
              dispatch={dispatch}
              userInfo={userInfo}
              loadingUpdateProfile={loadingUpdateProfile}
              isEdit={isEdit}
              setIsEdit={setIsEdit}
            />
            {!isEdit && userInfo?.role === "USER" && (
              <OrderHistory order={order} isLoading={isLoading} error={error} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
