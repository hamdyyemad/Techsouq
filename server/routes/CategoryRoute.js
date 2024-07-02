const CategoryController = require("../controller/categoryController");
const router = require("express").Router();
// const CategoryValidator = require("../Validator/categoryValidator");
const userRole = require("../utils/userRoles");
const allowdTo = require("../middleware/allowedTo");
const verifyToken = require("../middleware/VerifyToken");
router.post(
  "/categories",
  verifyToken,
  allowdTo(userRole.ADMIN),
  CategoryController.createCategory
);
router.get("/categories", CategoryController.getAllCategories);
router.get("/categories/:categoryId", CategoryController.getSingleCategory);
router.put(
  "/categories/:categoryId",
  verifyToken,
  allowdTo(userRole.ADMIN),
  CategoryController.updateCategory
);
router.delete(
  "/categories/:categoryId",
  verifyToken,
  allowdTo(userRole.ADMIN),
  CategoryController.deleteCategory
);

module.exports = router;
