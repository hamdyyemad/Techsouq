const addDecimals = (num) => {
  return (Math.round(num * 100) / 100).toFixed(2);
};

export const updateCart = (state, item, qty) => {
  let price;
  if (item) {
    const existItem = state.cardItems.find((i) => i._id === item._id);
    const index = state.cardItems.indexOf(existItem);
    state.cardItems[index] = { ...item, qty };
    // state.qty = qty;
    // item["qty"] = state.qty;
    // console.log(item);
    // calc item price
    price = addDecimals(
      state.cardItems.reduce((acc, item) => {
        return acc + item.price * qty;
      }, 0)
    );
    state.itemsPrice = price;
    // calc item shipping price (if order is over 100$ then free, else 10$ shipping)
    const shipping = price > 100 ? 0 : 10;
    state.shippingPrice = shipping;

    // calc item tax price (50% Tax)
    state.taxPrice = addDecimals(Number((0.15 * state.itemsPrice).toFixed(2)));
    // calc item total price

    state.totalPrice = (
      Number(price) +
      Number(shipping) +
      Number(state.taxPrice)
    ).toFixed(2);
  }

  localStorage.setItem("cart", JSON.stringify(state));
};
