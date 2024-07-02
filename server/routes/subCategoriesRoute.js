const SubCategoryController = require("../controller/SubCategoriesController")
const SubCategoryValidator = require("../Validator/subCategoryValidator")

const router = require("express").Router()

router.post("/subcategories",SubCategoryValidator.createSubCategoryValidator,SubCategoryController.createSubCategory)
router.get("/subcategories",SubCategoryController.getAllSubCategories)
router.get("/subcategories/:SubcategoryId",SubCategoryValidator.getSubCategoryValidator,SubCategoryController.getSingleSubCategory)
router.put("/subcategories/:SubcategoryId",SubCategoryValidator.updateSubCategoryValidator,SubCategoryController.updateSubCategory)
router.delete("/subcategories/:SubcategoryId",SubCategoryValidator.deleteSubCategoryValidator,SubCategoryController.deleteSubCategory)



module.exports = router