const slugify = require('slugify');
const { check, body } = require('express-validator');
const validatorMiddleware = require('../middleware/validatorMiddleware');
const CategoryModel = require("../models/CategoryModel")
CreateproductValidator = [
  check('name').isLength({min:3}).withMessage('product name must be at least 3').notEmpty().withMessage('product name required'),
  check('image').notEmpty().withMessage('Product image required'),
  check('brand').isLength({min:2}).withMessage('brand must be at least 2').notEmpty().withMessage('brand required').isMongoId().withMessage('Invalid ID formate'),
  check('category')
  .isLength({min:3})
  .withMessage('category must be at least 3')
  .notEmpty().withMessage('category required')
  .isMongoId().withMessage('Invalid ID formate')
  .custom((categoryId) =>
  CategoryModel.findById(categoryId).then((category) => {
    if (!category) {
      return Promise.reject(
        new Error(`No category for this id: ${categoryId}`)
      );
    }
  }))
,
  check('description').isLength({max:2000}).withMessage('description must be at most 2000').notEmpty().withMessage('description required'),
  check('countInStock').notEmpty().withMessage('quantity required').isNumeric().withMessage('quantity must be a number'),
  check('price').notEmpty().withMessage('price required').isNumeric().withMessage('price must be a number').isLength({max:32}).withMessage("Too long price"),

  validatorMiddleware,
];
// check('sold')
// .optional()
// .isNumeric()
// .withMessage('Product quantity must be a number'),

updateProductValidator = [
    check('id"')
    .isMongoId().withMessage('Invalid product ID format '),

    validatorMiddleware,
]

deleteProductValidator = [
    check('id')
    .isMongoId().withMessage('Invalid product ID format '),

    validatorMiddleware,
]

getProductValidator = [
    check('id')
    .isMongoId().withMessage('Invalid product ID format '),
    
    validatorMiddleware,
  ];


module.exports = {CreateproductValidator,deleteProductValidator,updateProductValidator,getProductValidator}