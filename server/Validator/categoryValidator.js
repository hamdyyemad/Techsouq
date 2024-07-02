const slugify = require('slugify');
const { check, body } = require('express-validator');
const validatorMiddleware = require('../middleware/validatorMiddleware');
 getCategoryValidator = [
  check('categoryId')
  .isMongoId().withMessage('Invalid category ID format '),
  
  validatorMiddleware,
];

 createCategoryValidator = [
    check('name')
    .notEmpty().withMessage("Name of Category required")
    .isLength({min:3}).withMessage("Too short category name")
    .isLength({max:32}).withMessage("Too long category name"),

    validatorMiddleware
]

 updateCategoryValidator = [
    check('categoryId')
    .isMongoId().withMessage('Invalid category ID format '),

    validatorMiddleware,
]

deleteCategoryValidator = [
    check('categoryId')
    .isMongoId().withMessage('Invalid category ID format '),

    validatorMiddleware,
]

// dry =>don't repeat your self=>don't repeat your code

module.exports = {getCategoryValidator,createCategoryValidator,updateCategoryValidator,deleteCategoryValidator}