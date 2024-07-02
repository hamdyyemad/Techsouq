const asyncHandler = require("../middleware/asyncHandler.js");
const orderModel = require("../models/orderModel");
const productModel = require("../models/productModel");
const httpStatusText = require("../utils/httpStatusText");
// const PayPalUtils = require("../utils/paypal");
// const { getPayPalAccessToken, checkIfNewTransaction, verifyPayPalPayment } =
//   PayPalUtils;
// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const addOrderItems = async (req, res) => {
  try {
    const {
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      user,
    } = req.body;

    if (orderItems && orderItems.length === 0) {
      return res.status(400).json({
        status: httpStatusText.FAIL,
        data: null,
        msg: "No order items",
      });
    } else {
      const order = new orderModel({
        orderItems: orderItems.map((x) => ({
          ...x,
          product: x._id,
          _id: undefined,
        })),
        user,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
      });

      const createdOrder = await order.save();

      return res
        .status(201)
        .json({ status: httpStatusText.SUCCESS, data: { createdOrder } });
    }
  } catch (err) {
    return res
      .status(400)
      .json({ status: httpStatusText.ERROR, msg: err.message });
  }
};

// @desc   get logged in users orders
// @route   GET /api/myorders
// @access  Private

const getMyOrders = async (req, res) => {
  try {
    // const id = req.currentUser.id;
    const orders = await orderModel.find({ "user.id": req.currentUser.id });
    return res
      .status(200)
      .json({ status: httpStatusText.SUCCESS, data: { orders } });
  } catch (err) {
    return res
      .status(400)
      .json({ status: httpStatusText.ERROR, msg: err.message });
  }
};
const getMyData = async (req, res) => {
  try {
    // const id = req.currentUser.id;
    const orders = await orderModel.find({ "user.id": req.currentUser.id });
    let shippingAddress;
    if (
      orders.length > 0 &&
      (orders[orders.length - 1]?.shippingAddress || orders[0]?.shippingAddress)
    ) {
      shippingAddress =
        orders[orders.length - 1]?.shippingAddress ||
        orders[0]?.shippingAddress;
    }
    console.log(shippingAddress);
    return res
      .status(200)
      .json({ status: httpStatusText.SUCCESS, data: { shippingAddress } });
  } catch (err) {
    return res
      .status(400)
      .json({ status: httpStatusText.ERROR, msg: err.message });
  }
};

const getOrderById = async (req, res) => {
  const userId = req.headers["user-id"];
  const userRole = req.headers["user-role"];
  console.log(userRole + " " + typeof userRole);
  console.log(userId);
  try {
    const order = await orderModel
      .findById(req.params.id)
      .populate("user.id", "name email");

    if (!order || userRole === "SELLER") {
      return res.status(404).json({
        status: httpStatusText.FAIL,
        data: null,
        msg: "Order not found",
      });
    }
    console.log(userRole == "ADMIN");
    // Check if the user is an ADMIN
    if (userRole == "ADMIN") {
      return res.status(200).json({
        status: httpStatusText.SUCCESS,
        data: { order },
      });
    }

    // Check if the user is the one who made the order
    if (userId === order.user.id._id.toString()) {
      return res.status(200).json({
        status: httpStatusText.SUCCESS,
        data: { order },
      });
    } else {
      return res.status(403).json({
        status: httpStatusText.FAIL,
        data: null,
        msg: "You are not authorized to view this order",
      });
    }
  } catch (err) {
    return res
      .status(400)
      .json({ status: httpStatusText.ERROR, msg: err.message });
  }
};

const updateOrderToPaid = asyncHandler(async (req, res) => {
  // NOTE: here we need to verify the payment was made to PayPal before marking
  // the order as paid
  // const { verified, value } = await verifyPayPalPayment(req.body.id);
  // if (!verified) throw new Error("Payment not verified");

  // // check if this transaction has been used before
  // const isNewTransaction = await checkIfNewTransaction(Order, req.body.id);
  // if (!isNewTransaction) throw new Error("Transaction has been used before");

  const order = await orderModel.findById(req.params.id);

  if (order) {
    // check the correct amount was paid

    // const paidCorrectAmount = order.totalPrice.toString() === value;
    // if (!paidCorrectAmount) throw new Error("Incorrect amount paid");

    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    };

    const updatedOrder = await order.save();

    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});
// not check
const updateOrderToDeliverd = async (req, res) => {
  try {
    const order = await orderModel.findById(req.params.id);

    for (const item of order.orderItems) {
      const product = await productModel.findById(item.product);

      if (product) {
        const requestedQty = item.qty;
        const availableQty = product.countInStock;

        if (requestedQty > availableQty) {
          // Handle insufficient stock (throw an error, etc.)
          throw new Error(`Insufficient stock for product: ${product.name}`);
        }

        // Update product quantity
        product.countInStock -= requestedQty;
        await product.save();
      }
    }
    if (order) {
      order.isDelivered = true;
      order.deliveredAt = Date.now();
      const updatedOrder = await order.save();
      return res
        .status(200)
        .json({ status: httpStatusText.SUCCESS, data: { updatedOrder } });
    } else {
      return res.status(404).json({
        status: httpStatusText.FAIL,
        data: null,
        msg: "order not found",
      });
    }
  } catch (err) {
    return res
      .status(401)
      .json({ status: httpStatusText.ERROR, data: null, msg: err.message });
  }
};
// not check

const getOrders = async (req, res) => {
  try {
    const Orders = await orderModel.find({}).populate("user.id", "id name");

    // Calculate total sales and weekly sales
    let totalSales = 0;
    let weeklySales = 0;
    const today = new Date();
    const oneWeekAgo = new Date(today);
    oneWeekAgo.setDate(today.getDate() - 7);

    const dailySales = Array(7).fill(0);

    Orders.forEach((order) => {
      if (order.isPaid) {
        totalSales += order.totalPrice;

        // Check if the order is within the last week
        const orderDate = new Date(order.createdAt);
        if (orderDate >= oneWeekAgo) {
          weeklySales += order.totalPrice;
          // Calculate the day index within the last 7 days
          const dayIndex =
            6 - Math.floor((today - orderDate) / (24 * 60 * 60 * 1000));

          // Increment the daily sales for the corresponding day
          dailySales[dayIndex] += order.totalPrice;
        }
      }
    });
    totalSales = totalSales.toFixed(2);
    weeklySales = weeklySales.toFixed(2);

    // Calculate sales percentage
    let salesPercentage = 0;

    if (totalSales > 0) {
      salesPercentage = ((weeklySales / totalSales) * 100).toFixed(2);
    }

    res.status(200).json({
      status: httpStatusText.SUCCESS,
      data: { Orders, totalSales, weeklySales, dailySales, salesPercentage },
    });
  } catch (err) {
    res
      .status(401)
      .json({ status: httpStatusText.ERROR, data: null, msg: err.message });
  }
};
const sellerProfits = async (req, res) => {
  try {
    const { id } = req.params;
    // Fetch all orders
    const orders = await orderModel.find();

    // Filter paid orders
    const paidOrders = orders.filter((order) => order.isPaid);
    const unpaidOrders = orders.filter((order) => !order.isPaid);

    // Get seller's products
    const sellerProducts = await productModel.find({ user: id });

    // Initialize total seller profits
    let totalSellerProfits = 0;
    let weeklySellerSales = 0;
    const today = new Date();
    const oneWeekAgo = new Date(today);
    oneWeekAgo.setDate(today.getDate() - 7);
    const dailySellerSales = Array(7).fill(0);
    let totalPaidOrders = 0;
    let totalUnpaidOrders = 0;

    unpaidOrders.forEach((order) => {
      order.orderItems.forEach((orderItem) => {
        // Check if the product belongs to the seller
        const sellerProduct = sellerProducts.find(
          (product) => product._id.toString() === orderItem.product.toString()
        );
        if (sellerProduct) {
          totalUnpaidOrders++;
        }
      });
    });
    // Iterate through paid orders
    paidOrders.forEach((order) => {
      // Iterate through order items

      order.orderItems.forEach((orderItem) => {
        // Check if the product belongs to the seller
        const sellerProduct = sellerProducts.find(
          (product) => product._id.toString() === orderItem.product.toString()
        );

        if (sellerProduct) {
          // Calculate total profit for the seller's product in this order
          totalPaidOrders++;
          const productProfit = sellerProduct.price * orderItem.qty;
          totalSellerProfits += productProfit;
          if (order.createdAt >= oneWeekAgo) {
            weeklySellerSales += sellerProduct.price * orderItem.qty;
          }
          // Calculate the day index within the last 7 days
          const dayIndex =
            6 - Math.floor((today - order.createdAt) / (24 * 60 * 60 * 1000));

          // Increment the daily sales for the corresponding day
          if (dayIndex >= 0 && dayIndex < 7) {
            dailySellerSales[dayIndex] += Number(productProfit.toFixed(2));
          }
        }
      });
    });
    totalSellerProfits = Number(totalSellerProfits.toFixed(2));
    weeklySellerSales = Number(weeklySellerSales.toFixed(2));

    res.status(200).json({
      status: httpStatusText.SUCCESS,
      data: {
        totalPaidOrders,
        totalSellerProfits,
        weeklySellerSales,
        dailySellerSales,
        totalUnpaidOrders,
      },
    });
  } catch (err) {
    res
      .status(401)
      .json({ status: httpStatusText.ERROR, data: null, msg: err.message });
  }
};

module.exports = {
  addOrderItems,
  getMyOrders,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDeliverd,
  getOrders,
  getMyData,
  sellerProfits,
};
