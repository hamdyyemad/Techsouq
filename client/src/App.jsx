import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import React from "react";

import { store } from "./store";
import { Provider } from "react-redux";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

// Layouts
import Layout from "./components/Layout";
import RedirectComponent from "./components/RedirectComponent";
// Pages
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cart from "./pages/Cart";
import Favorites from "./pages/Favorites";
//
import Protected from "./components/Protected";
import Shipping from "./pages/Shipping";
import Payment from "./pages/Payment";
import PlaceOrder from "./pages/PlaceOrder";
import Order from "./pages/Order";
import Profile from "./pages/Profile";
import Error from "./pages/Error";
import NotFound from "./pages/NotFound";
import ProductDetails from "./pages/products/ProductDetails";
// admin
import AdminRoute from "./components/admin/AdminRoute";
import AdminDashboard from "./pages/admin/AdminDashboard";
import OrderList from "./pages/admin/OrderList";
import ProductList from "./pages/admin/ProductList";
import PendingProduct from "./pages/admin/PendingProduct";
import ProductEdit from "./pages/admin/ProductEdit";
import UserList from "./pages/admin/UserList";
import UserEdit from "./pages/admin/UserEdit";
import AdminOrderView from "./pages/admin/view/AdminOrderView";
// seller
import SellerRoute from "./components/seller/SellerRoute";
import SellerProductsGallery from "./pages/seller/SellerProductsGallery";
import ProductPost from "./pages/seller/ProductPost";
import SellerProduct from "./pages/seller/SellerProduct";
import SellerDashboard from "./pages/seller/SellerDashboard";

// loaders
import productsLoader from "./loaders/productsLoader";
import productDetailsLoader from "./loaders/productDetailsLoader";
import BrandList from "./pages/admin/BrandList";
import BrandEdit from "./pages/admin/BrandEdit";
import CategoryList from "./pages/admin/CategoryList";
import CategoryEdit from "./pages/admin/CategoryEdit";
import ForgetPassword from "./pages/ForgetPassword";
import ResetPassword from "./pages/ResetPassword";
// actions
// import registerAction from "./actions/registerAction";
// import loginAction from "./actions/loginAction";

const Products = React.lazy(() => import("./pages/products/Products"));
// loading spinner
// import CustomSpinner from "./components/CustomSpinner";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />} errorElement={<Error />}>
      <Route index element={<HomePage />} loader={async () => null} />
      <Route
        path="login"
        element={<Login />}
        loader={async () => null}
        // action={loginAction}
      />
      <Route path="register" element={<Register />} loader={async () => null} />
      <Route
        path="forget-password"
        element={<ForgetPassword />}
        loader={async () => null}
      />
      <Route
        path="reset-password/:userId/:token"
        element={<ResetPassword />}
        loader={async () => null}
      />
      {/* Redirect to /product/page/:pageNumber */}
      <Route
        path="/product"
        element={<RedirectComponent to={`/products/page/`} />}
      />
      <Route
        path="/product/page"
        element={<RedirectComponent to={`/products/page/`} />}
      />
      <Route
        path="/product/:pageNumber"
        element={<RedirectComponent to={`/products/page/`} />}
      />
      <Route
        path="/products"
        element={<RedirectComponent to={`/products/page/`} />}
      />
      <Route
        path="/products/page"
        element={<RedirectComponent to={`/products/page/`} />}
      />
      {/* <Route
        path="/products/:pageNumber"
        element={<RedirectComponent to={`/products/page/`} />}
      /> */}
      <Route
        path="products/page/:pageNumber"
        element={<Products />}
        loader={productsLoader}
      />
      <Route
        path="products/search/:keyword/page/:pageNumber"
        element={<Products />}
        loader={productsLoader}
      />
      <Route
        path="products/:id"
        element={<ProductDetails />}
        loader={productDetailsLoader}
      />
      <Route path="cart" element={<Cart />} loader={async () => null} />
      <Route
        path="favorites"
        element={<Favorites />}
        loader={async () => null}
      />
      <Route element={<Protected />} loader={async () => null}>
        <Route
          path="shipping"
          element={<Shipping />}
          loader={async () => null}
        />
        <Route path="payment" element={<Payment />} loader={async () => null} />
        <Route
          path="placeorder"
          element={<PlaceOrder />}
          loader={async () => null}
        />
        <Route path="order/:id" element={<Order />} loader={async () => null} />
        <Route path="profile" element={<Profile />} loader={async () => null} />
      </Route>
      <Route path="admin" element={<AdminRoute />} loader={async () => null}>
        <Route index element={<AdminDashboard />} loader={async () => null} />
        <Route
          path="orderlist"
          element={<OrderList />}
          loader={async () => null}
        />
        {/* AdminOrderView */}
        <Route
          path="order/view/:id"
          element={<AdminOrderView />}
          loader={async () => null}
        />
        <Route
          path="productlist"
          element={<ProductList />}
          loader={async () => null}
        />
        <Route
          path="pendingproduct"
          element={<PendingProduct />}
          loader={async () => null}
        />
        <Route
          path="userlist"
          element={<UserList />}
          loader={async () => null}
        />
        <Route
          path="brandlist"
          element={<BrandList />}
          loader={async () => null}
        />
        <Route
          path="categorylist"
          element={<CategoryList />}
          loader={async () => null}
        />
        <Route path="user/:id/edit" element={<UserEdit />} />
        <Route path="product/:id/edit" element={<ProductEdit />} />
        <Route path="brand/:id/edit" element={<BrandEdit />} />
        <Route path="category/:id/edit" element={<CategoryEdit />} />
      </Route>
      <Route path="seller" element={<SellerRoute />} loader={async () => null}>
        <Route index element={<SellerDashboard />} loader={async () => null} />
        <Route
          path="productlist"
          element={<SellerProduct />}
          loader={async () => null}
        />
        <Route
          path="items"
          element={<SellerProductsGallery />}
          loader={async () => null}
        />
        <Route
          path="productpost"
          element={<ProductPost />}
          loader={async () => null}
        />
      </Route>
      <Route path="*" element={<NotFound />} loader={async () => null} />
    </Route>
  )
);
function App() {
  const initialOptions = {
    "client-id": `${import.meta.env.VITE_CLIENT_ID}`,
    "enable-funding": "paylater",
    "disable-funding": "venmo,card",
    "data-sdk-integration-source": "integrationbuilder_sc",
    currency: "USD",
    intent: "capture",
  };
  return (
    <Provider store={store}>
      <PayPalScriptProvider deferLoading={true} options={initialOptions}>
        <RouterProvider router={router} />
      </PayPalScriptProvider>
    </Provider>
  );
}

export default App;
