const slugify = require('slugify');
const { check, body } = require('express-validator');
const validatorMiddleware = require('../middleware/validatorMiddleware');


createSubCategoryValidator = [
    check('name')
    .notEmpty().withMessage("Name of SubCategory required")
    .isLength({min:2}).withMessage("Too short Subcategory name")
    .isLength({max:32}).withMessage("Too long Subcategory name"),

    check("category")
    .notEmpty().withMessage("SubCategory must be belong to category")
    .isMongoId().withMessage("Invalid Category ID format"),

    validatorMiddleware
]

getSubCategoryValidator = [
    check('SubcategoryId')
    .isMongoId().withMessage('Invalid SubCategory ID format '),

    validatorMiddleware,
]

updateSubCategoryValidator = [
    check('SubcategoryId')
    .isMongoId().withMessage('Invalid SubCategory ID format '),
    check('category')
    .notEmpty().withMessage("category must be not empty"),
    validatorMiddleware
]

deleteSubCategoryValidator = [
    check('SubcategoryId')
    .isMongoId().withMessage('Invalid SubCategory ID format '),

    validatorMiddleware,
]

// dry =>don't repeat your self=>don't repeat your code

module.exports = {getSubCategoryValidator,createSubCategoryValidator,updateSubCategoryValidator,deleteSubCategoryValidator}