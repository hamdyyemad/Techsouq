import axios from "axios";
import { Link, useParams, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useGetOrderDetailsQuery } from "../../../slices/orderApiSlice";
import { BASE_URL } from "../../../constants";
import { useTranslation } from "react-i18next";
import CustomSpinner from "../../../components/CustomSpinner";
import ErrorComponent from "../../../components/ErrorComponent";
import Summary from "../../../components/admin/orders/Summary";

export default function AdminOrderView() {
  const { t } = useTranslation();
  let cart = [];
  let subs = [];
  let user = {};
  // const token = user.token;
  const currentUser = useSelector((store) => store.auth.userInfo);
  // const dispatch = useDispatch();
  let token = currentUser.token;

  const { id } = useParams();
  const { data, refetch, isLoading, error } = useGetOrderDetailsQuery(
    id,
    token
  );

  const location = useLocation();

  const order = data?.data?.order || location?.state?.order;

  if (currentUser.role === "ADMIN") {
    const {
      orderItems,
      shippingAddress,
      paymentMethod,
      totalPrice,
      taxPrice,
      shippingPrice,
      itemsPrice,
    } = order;
    subs = {
      orderItems,
      shippingAddress,
      paymentMethod,
      totalPrice,
      taxPrice,
      shippingPrice,
      itemsPrice,
    };
    user = order?.user;
    cart = orderItems;
  }

  const deliverHandler = async () => {
    const headers = {
      Authorization: `Bearer ${currentUser.token}`,
      authorization: `Bearer ${currentUser.token}`,
    };
    try {
      const res = await axios.put(`${BASE_URL}/orders/${id}/deliver`, null, {
        headers: headers,
      });
    } catch (err) {
      console.log(err);
    }
    refetch();
  };

  return isLoading ? (
    <CustomSpinner />
  ) : error ? (
    <ErrorComponent />
  ) : (
    <>
      <div className="bg-gray-100 dark:bg-[#1C1E2D] min-w-full min-h-full xs:grid ">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 p-5 xs:p-0 xs:text-xl xs:px-3 px-9">
          {t("order_history.order_ID")}: {id}
        </h1>
        {currentUser.role !== "ADMIN" && <ShippingSteps />}
        <Summary
          // onApproveTest={onApproveTest}
          deliverHandler={deliverHandler}
          // loadingDeliver={loadingDeliver}
          currentUser={currentUser}
          cart={cart}
          subs={subs}
          user={user}
          order={order}
        />
      </div>
    </>
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
        to="/shipping"
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

      <Link
        to="/placeorder"
        className="flex text-sm text-blue-500 ml-8 focus:outline-none"
      >
        <span className="flex items-center justify-center text-white bg-blue-500 rounded-full h-5 w-5 mr-2">
          4
        </span>{" "}
        Place Order
      </Link>
    </div>
  );
}
