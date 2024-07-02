const orderController = require("../controller/orderController");
const router = require("express").Router();
const userRole = require("../utils/userRoles");
const allowdTo = require("../middleware/allowedTo");
const verifyToken = require("../middleware/VerifyToken");

router.get(
  "/orders",
  verifyToken,
  allowdTo(userRole.ADMIN),
  orderController.getOrders
);

router.get("/orders/myorders", verifyToken, orderController.getMyOrders);
router.get("/orders/mydata", verifyToken, orderController.getMyData);
router.post("/orders", verifyToken, orderController.addOrderItems);
router.get("/orders/:id", verifyToken, orderController.getOrderById);
router.post("/orders/:id/pay", verifyToken, orderController.updateOrderToPaid);
router.put(
  "/orders/:id/deliver",
  verifyToken,
  allowdTo(userRole.ADMIN),
  orderController.updateOrderToDeliverd
);
router.get(
  "/seller-profits/:id",
  // verifyToken,
  orderController.sellerProfits
);

module.exports = router;
