const BrandModel = require("../models/brandModel");
const httpStatusText = require("../utils/httpStatusText");
const slugify = require("slugify");

// @desc    Get list of brands
// @route   GET /brands
// @access  Public
const getAllBrands = async (req, res) => {
  const listOfBrands = await BrandModel.find({});
  return res.status(200).json({
    status: httpStatusText.SUCCESS,

    data: { listOfBrands },
  });
};

// @desc    Get specific brand by id
// @route   GET /brands/:id
// @access  Public
const getSingleBrand = async (req, res) => {
  try {
    const getBrand = await BrandModel.findById(req.params.BrandId);
    if (!getBrand) {
      return res.status(404).json({
        status: httpStatusText.FAIL,
        data: null,
        msg: `NO Brand for this ${req.params.BrandId}`,
      });
    }
    return res
      .status(200)
      .json({ status: httpStatusText.SUCCESS, data: getBrand });
  } catch (err) {
    return res
      .status(400)
      .json({ status: httpStatusText.ERROR, data: null, msg: err.message });
  }
};

// @desc    Create brand
// @route   POST  /brands
// @access  Private
const createBrand = async (req, res) => {
  try {
    const { name } = req.body;

    // Check if a brand with the same name already exists

    // Generate a random suffix (e.g., a random number)
    const randomSuffix = Math.floor(Math.random() * 1000);

    // Create a unique name using the base name and random suffix
    const uniqueName = `${name}_${randomSuffix}`;

    const newBrand = new BrandModel({
      name: uniqueName,
      slug: slugify(uniqueName),
    });

    await newBrand.save();

    // Send the success response with the newly created brand
    res
      .status(201)
      .json({ status: httpStatusText.SUCCESS, data: { Brand: newBrand } });
  } catch (err) {
    // Handle other errors (e.g., database connection issues)
    res.status(500).json({ status: httpStatusText.ERROR, msg: err.message });
  }
};

// @desc    Update specific brand
// @route   PUT brands/:id
// @access  Private
const updateBrand = async (req, res) => {
  try {
    const name = req.body.name;
    const Brand = await BrandModel.updateOne(
      { _id: req.params.BrandId },
      { $set: { slug: slugify(name), ...req.body } }
    );

    if (Brand.matchedCount == 0) {
      return res.status(404).json({
        status: httpStatusText.FAIL,
        data: null,
        msg: `NO Brand for this ${req.params.BrandId}`,
      });
    }

    return res
      .status(200)
      .json({ status: httpStatusText.SUCCESS, data: { Brand: Brand } });
  } catch (err) {
    res.status(400).json({ status: httpStatusText.ERROR, msg: err.message });
  }
};

// @desc    Delete specific brand
// @route   DELETE brands/:id
// @access  Private
const deleteBrand = async (req, res) => {
  try {
    const deleteBrand = await BrandModel.deleteOne({ _id: req.params.BrandId });
    if (deleteBrand.deletedCount == 0) {
      return res.status(404).json({
        status: httpStatusText.FAIL,
        data: null,
        msg: `NO Brand for this ${req.params.BrandId}`,
      });
    }
    return res
      .status(200)
      .json({ status: httpStatusText.SUCCESS, data: deleteBrand });
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
};

module.exports = {
  createBrand,
  getAllBrands,
  getSingleBrand,
  updateBrand,
  deleteBrand,
};
