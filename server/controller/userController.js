const { validationResult } = require("express-validator");
const httpStatusText = require("../utils/httpStatusText");
const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const JWTGenerateToken = require("../utils//JWTGenerateToken");
const userRoles = require("../utils/userRoles");
const allowedTo = require("../middleware/allowedTo");
const sendEmail = require("../utils/sendEmail");
// const asyncHandler = require("../middleware/asyncHandler");
const checkUserExistence = async (req, res) => {
  try {
    // Get user ID from the request body
    const { userId } = req.body;

    // Check if the user exists in the database
    const user = await userModel.findById(userId);

    if (user) {
      // User exists
      return res
        .status(200)
        .json({ status: httpStatusText.SUCCESS, data: { exists: true } });
    } else {
      // User doesn't exist
      return res
        .status(404)
        .json({ status: httpStatusText.FAIL, data: { exists: false } });
    }
  } catch (err) {
    return res
      .status(500)
      .json({ status: httpStatusText.ERROR, message: err.message });
  }
};

const register = async (req, res) => {
  try {
    const { firstname, lastname, email, password, role } = req.body;
    if (role === "ADMIN") {
      return res
        .status(400)
        .json({ status: httpStatusText.FAIL, message: "Invalid role" });
    }
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ status: httpStatusText.FAIL, data: errors.array() });
    }

    const olduser = await userModel.findOne({ email });
    if (olduser) {
      return res.status(400).json("user is already exist");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newuser = new userModel({
      firstname,
      lastname,
      email,
      password: hashedPassword,
      role,
    });

    const token = await JWTGenerateToken({
      email: newuser.email,
      id: newuser._id,
      role: newuser.role,
    });
    newuser.token = token;
    await newuser.save();
    const link = `http://localhost:3001/users/${newuser._id}/verify/${newuser.token}`;

    const htmlTemplate = `
    <div>
    <p>click on the link below to verufy your email</p>
    <a href = "${link}">Verify</a>
    </div>
    `;

    await sendEmail(newuser.email, "verify Your Email", htmlTemplate);

    return res.status(200).json({
      status: httpStatusText.SUCCESS,
      message: "we send to you an email please verify your email address",
      data: { newuser },
    });

    // return res
    //   .status(200)
    //   .json({ status: httpStatusText.SUCCESS, data: { newuser } });
  } catch (err) {
    console.log(err);
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json({ status: httpStatusText.FAIL, data: errors.array() });
  }
  const oldUser = await userModel.findOne({ email: email });
  if (!oldUser) {
    return res.status(400).json({
      status: httpStatusText.FAIL,
      message: "User not found Please Register first",
    });
  }
  const matchedPassword = await bcrypt.compare(password, oldUser.password);
  //
  if (!oldUser.isAccountVerified) {
    return res.status(400).json({
      message: "we sent to you an email,please verify your email address",
    });
  }
  if (oldUser && matchedPassword) {
    const token = await JWTGenerateToken({
      email: oldUser.email,
      id: oldUser._id,
      role: oldUser.role,
    });

    const { firstname, lastname, email, id, role } = oldUser;

    return res.status(200).json({
      status: httpStatusText.SUCCESS,
      data: { token, firstname, lastname, email, id, role },
    });
  }
  if (!matchedPassword) {
    return res.status(400).json({
      status: httpStatusText.FAIL,
      message: "Please enter correct password",
    });
  }
};

// @des Verify user account
// @route GET/api/users/:usedId/verify/:token
// @access public

const verifyUserAccountCtrl = async (req, res) => {
  try {
    const user = await userModel.findById(req.params.id);
    console.log("user ", user);
    if (!user) {
      console.log("!user");

      return res
        .status(400)
        .json({ status: httpStatusText.FAIL, message: "Invalid link" });
    }
    let verificationToken = await userModel.findOne({
      _id: user._id,
      token: req.params.token,
    });
    console.log("verificationToken ", verificationToken);
    console.log("id ", verificationToken._id);
    console.log("token ", verificationToken.token);

    if (!verificationToken) {
      console.log("!verificationToken");
      return res
        .status(400)
        .json({ status: httpStatusText.FAIL, message: "Invalid link" });
    }
    user.isAccountVerified = true;
    await user.save();
    verificationToken = {};
    return res.status(200).json({
      status: httpStatusText.SUCCESS,
      message: "your account verified",
    });
  } catch (err) {
    return res
      .status(404)
      .json({ status: httpStatusText.FAIL, msg: err.message });
  }
};
// @des send reset password link
// @route POST/users/reset-password
// @access public

const sendResetPasswordLinkCtrl = async (req, res) => {
  //1.validation skip
  //2.get the user from DB by email
  try {
    const user = await userModel.findOne({ email: req.body.email });
    if (!user) {
      res.status(404).json({
        status: httpStatusText.FAIL,
        message: "this Email does not exist",
      });
    }
    //3.creating verificationtoken
    let verificationToken = await userModel.findOne({
      _id: user._id,
    });
    if (!verificationToken) {
      let token = await JWTGenerateToken({
        email: newuser.email,
        id: newuser._id,
        role: newuser.role,
      });
      user.token = token;
    }
    //4.create link
    const link = `http://localhost:3001/users/reset-password/${user._id}/${user.token}`;

    //5.creating html template
    const htmlTemplate = `<a href = "${link}">click here the to reset your password</a>`;

    //6.send email
    await sendEmail(user.email, "Reset password", htmlTemplate);

    //7.response to the client
    res.status(200).json({
      message:
        "password reset link sent to your email, please check your email",
    });
  } catch (error) {
    res.status(400).json({ error });
  }
};

// @des get reset password link
// @route GET/users/reset-password
// @access public

const getResetPasswordLinkCtrl = async (req, res) => {
  try {
    const user = await userModel.findById(req.params.id);
    if (!user) {
      return res
        .status(404)
        .json({ status: httpStatusText.FAIL, message: "Invalid link" });
    }

    // Set userId and token as cookies
    res.cookie("resetUserId", String(user._id));
    res.cookie("resetToken", req.params.token);
    console.log(req.params);

    // Redirect to the generic reset password route
    res.redirect("http://localhost:5173/reset-password");
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @des reset password
// @route POST/users/reset-password
// @access public

const resetPasswordCtrl = async (req, res) => {
  try {
    const user = await userModel.findById(req.params.id);
    console.log(user);
    if (!user) {
      return res
        .status(400)
        .json({ status: httpStatusText.FAIL, message: "Invalid link" });
    }
    let verificationToken = await userModel.findOne({
      _id: user._id,
      token: req.params.token,
    });
    if (!verificationToken) {
      return res
        .status(400)
        .json({ status: httpStatusText.FAIL, message: "Invalid link" });
    }
    if (!user.isAccountVerified) {
      user.isAccountVerified = true;
    }
    const salt = await bcrypt.genSalt(10);
    let hashedPassword = await bcrypt.hash(req.body.password, salt);
    user.password = hashedPassword;
    await user.save();
    verificationToken = {};
    res
      .status(200)
      .json({ message: "password reset successfully, please log in" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @des logout/clear cookie
// @route Post/api/users
// @private public

const logoutUser = async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "Logged out successfully" });
};

// @des get user profile
// @route Get/api/users/profile
// @private public

const getUserProfile = async (req, res) => {
  res.send("user profile");
};

// @des update user profile
// @route Put/api/users/profile
// @private private

const updateUserProfile = async (req, res) => {
  const user = await userModel.findById(req.body.id);

  if (user) {
    user.firstname = req.body.firstname || user.firstname;
    user.lastname = req.body.lastname || user.lastname;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      user.password = hashedPassword;
    }

    // not check
    const updatedUser = await user.save();

    res.json({
      id: updatedUser._id,
      firstname: updatedUser.firstname,
      lastname: updatedUser.lastname,
      email: updatedUser.email,
      role: updatedUser.role,
      token: updatedUser.token,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
};
// @des get users
// @route Get/api/users
// @private/Admin

const getUsers = async (req, res) => {
  try {
    const users = await userModel.find();
    res.status(200).json({ status: httpStatusText.SUCCESS, data: { users } });
  } catch (err) {
    res.status(404).json({ status: httpStatusText.FAIL, msg: err.message });
  }
};

// @des get user by ID
// @route Get/api/users/:id
// @private/Admin

// not check
const getUserByID = async (req, res) => {
  try {
    const user = await userModel.findById(req.params.id).select("-password");
    if (user) {
      return res
        .status(200)
        .json({ status: httpStatusText.SUCCESS, data: { user } });
    } else {
      return res.status(404).json({
        status: httpStatusText.FAIL,
        data: null,
        msg: "User not found",
      });
    }
  } catch (err) {
    return res
      .status(404)
      .json({ status: httpStatusText.FAIL, msg: err.message });
  }
};

// @des delete users
// @route Delete/api/users/:id
// @private/Admin

//not check
const deleteUser = async (req, res) => {
  try {
    const user = await userModel.findById(req.params.id);

    if (user) {
      if (user.role == userRoles.ADMIN) {
        return res.status(400).json({
          status: httpStatusText.FAIL,
          msg: "Can not delete admin user",
        });
      }
      await userModel.deleteOne({ _id: user._id });
      res.status(200).json({ message: "User deleted successfully" });
    } else {
      return res.status(404).json({
        status: httpStatusText.FAIL,
        data: null,
        msg: "User not found",
      });
    }
  } catch (err) {
    return res
      .status(404)
      .json({ status: httpStatusText.FAIL, msg: err.message });
  }
};

// @des Update user
// @route PUT/api/users/:id
// @private/Admin

const UpdateUser = async (req, res) => {
  const user = await userModel.findById(req.params.id);
  if (user) {
    user.firstname = req.body.firstname || user.firstname;
    user.lastname = req.body.lastname || user.lastname;
    user.email = req.body.email || user.email;
    user.role = req.body.role || user.role;
    console.log(user);
    const updatedUser = await user.save();
    res.status(200).json({
      _id: updatedUser._id,
      firstname: updatedUser.firstname,
      lastname: updatedUser.lastname,
      role: updatedUser.role,
    });
  }
};

module.exports = {
  register,
  login,
  getUsers,
  getUserByID,
  getUserProfile,
  deleteUser,
  updateUserProfile,
  UpdateUser,
  logoutUser,
  checkUserExistence,
  verifyUserAccountCtrl,
  resetPasswordCtrl,
  getResetPasswordLinkCtrl,
  sendResetPasswordLinkCtrl,
};
