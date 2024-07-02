const userController = require("../controller/userController");
const { body } = require("express-validator");
const router = require("express").Router();
const verifyToken = require("../middleware/VerifyToken");
const userRoles = require("../utils/userRoles");
const allowedTo = require("../middleware/allowedTo");

router.post(
  "/users/checkExistence",

  userController.checkUserExistence
);

router.get("/users", verifyToken, userController.getUsers);
router.post(
  "/users/register",
  [
    body("firstname").notEmpty().withMessage("please fill the input name"),
    body("email").notEmpty().withMessage("please fill the input email"),
    body("password").notEmpty().withMessage("please fill the input password"),
  ],
  userController.register
);

router.post(
  "/users/login",
  [
    body("email").notEmpty().withMessage("please fill the input email"),
    body("password").notEmpty().withMessage("please fill the input password"),
  ],
  userController.login
);

router.post("/users/logout", userController.logoutUser);
router.get("/users/:id", userController.getUserByID);
router.post("/users/register", userController.register);

router.post("/users/profile", userController.getUserProfile);
router.put("/users/profile", userController.updateUserProfile);

router.put(
  "/users/:id",
  verifyToken,
  allowedTo(userRoles.ADMIN),
  userController.UpdateUser
);
router.delete(
  "/users/:id",
  verifyToken,
  allowedTo(userRoles.ADMIN),
  userController.deleteUser
);

router.get("/users/:id/verify/:token",userController.verifyUserAccountCtrl)


router.post("/users/reset-password-link",userController.sendResetPasswordLinkCtrl)

router.get("/users/reset-password/:id/:token",userController.getResetPasswordLinkCtrl)
router.post("/users/reset-password/:id/:token",userController.resetPasswordCtrl)


module.exports = router;
