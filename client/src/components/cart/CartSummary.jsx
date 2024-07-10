import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart, removeFromCart } from "../../slices/cartSlice";
import { BASE_URL } from "../../constants";
export default function CartSummary({ c: product, ind, setCurrent }) {
  const [qt, setQt] = useState(product.qty || 1);
  const image = product.image;
  console.log(image.includes("/uploads") ? `${BASE_URL}${image}` : image);
  const dispatch = useDispatch();
  useEffect(() => {
    setCurrent(ind);
  }, [ind, setCurrent]);

  function handleInc() {
    if (qt >= product.countInStock) return;
    const qty = qt + 1;
    product = { ...product, qty };
    dispatch(addToCart({ product, qty }));
    setQt((qt) => qt + 1);
  }

  function handleDec() {
    if (qt <= 1) return;
    const qty = qt - 1;
    product = { ...product, qty };
    dispatch(addToCart({ product, qty }));
    setQt((qt) => qt - 1);
  }

  const addToCartHandler = async (inp) => {
    if (qt < 1 || qt > product.countInStock) return;

    // let num = +inp > qt ? 1 : -1;
    // const newValue = qt + num;

    // Ensure newValue is within the valid range
    const value = Math.max(1, Math.min(product.countInStock, inp));

    const qty = value;
    product = { ...product, qty };

    dispatch(addToCart({ product, qty }));
    setQt(() => value);
  };

  const removeFromCartHandler = async (id) => {
    product = { ...product, qt };
    dispatch(removeFromCart({ product, qty: qt, id }));
  };

  return (
    <div>
      <div className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start dark:bg-[#151725]">
        <img
          src={image.includes("/uploads") ? `${BASE_URL}${image}` : image}
          alt="product-image"
          className="w-full rounded-lg sm:w-40"
        />
        <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
          <div className="mt-5 sm:mt-0">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">
              {product.name}
            </h2>
            <p className="mt-1 text-xs text-gray-700">
              {product.category} - {product.brand}
            </p>
          </div>
          <div className="mt-4 flex justify-between im sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
            <div className="flex items-center border-gray-100">
              <button
                onClick={handleDec}
                className="cursor-pointer rounded-l bg-gray-100 py-1 px-2.5 duration-100 hover:bg-blue-500 hover:text-blue-50 dark:bg-[#151729] dark:text-white"
              >
                -
              </button>
              <input
                className="h-8 w-10 p-2 text-sm dark:bg-[#151725] dark:text-white"
                type="text"
                placeholder={qt}
                value={qt}
                onChange={(e) => {
                  if (e.target.value > product.countInStock) return;
                  setQt(e.target.value);
                  addToCartHandler(e.target.value);
                }}
              />
              <button
                onClick={handleInc}
                className="cursor-pointer rounded-l bg-gray-100 py-1 px-2.5 duration-100 hover:bg-blue-500 hover:text-blue-50 dark:bg-[#151729] dark:text-white"
              >
                +
              </button>
            </div>
            <div className="flex items-center space-x-3">
              <p className="text-base dark:text-white">${product.price}</p>

              <img
                src="/assets/removeCart.png"
                className="w-[21px] h-[21px] object-contain cursor-pointer mr-1 dark:bg-[#151729] "
                alt="remove-cart"
                onClick={() => removeFromCartHandler(product._id)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
