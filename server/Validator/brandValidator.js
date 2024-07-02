const slugify = require('slugify');
const { check, body } = require('express-validator');
const validatorMiddleware = require('../middleware/validatorMiddleware');

const getBrandValidator = [
  check('BrandId').isMongoId().withMessage('Invalid Brand id format'),
  validatorMiddleware,
];

const  createBrandValidator = [
  check('name')
    .notEmpty()
    .withMessage('Brand required')
    .isLength({ min: 3 })
    .withMessage('Too short Brand name')
    .isLength({ max: 32 })
    .withMessage('Too long Brand name'),
  validatorMiddleware,
];

const updateBrandValidator = [
  check('BrandId').isMongoId().withMessage('Invalid Brand id format'),
  body('name')
    .optional(),
  validatorMiddleware,
];

const deleteBrandValidator = [
  check('BrandId').isMongoId().withMessage('Invalid Brand id format'),
  validatorMiddleware,
];
module.exports = {updateBrandValidator,deleteBrandValidator,createBrandValidator,getBrandValidator}