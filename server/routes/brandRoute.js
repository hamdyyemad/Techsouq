const BrandController = require("../controller/brandController");
const router = require("express").Router();
const userRole = require("../utils/userRoles");
const allowdTo = require("../middleware/allowedTo");
const verifyToken = require("../middleware/VerifyToken");
// const BrandValidator = require("../Validator/brandValidator")
router.post(
  "/brands",
  verifyToken,
  allowdTo(userRole.ADMIN),
  BrandController.createBrand
);
router.get("/brands", BrandController.getAllBrands);
router.get("/brands/:BrandId", BrandController.getSingleBrand);
router.put(
  "/brands/:BrandId",
  verifyToken,
  allowdTo(userRole.ADMIN),
  BrandController.updateBrand
);
router.delete(
  "/brands/:BrandId",
  verifyToken,
  allowdTo(userRole.ADMIN),
  BrandController.deleteBrand
);

module.exports = router;
