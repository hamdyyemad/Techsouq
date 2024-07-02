const subCategoryModel = require("../models/subCategoryModel")

const httpStatusText = require("../utils/httpStatusText")
const slugify = require("slugify")


const createSubCategory = async(req,res)=>{
    try{
const {name,category} = req.body
const newSubCategory = new subCategoryModel({name,slug:slugify(name),category})
await newSubCategory.save();
res.status(201).json({status:httpStatusText.SUCCESS,data:{SubCategory:newSubCategory}})
    }catch(err){
        res.status(400).json({status:httpStatusText.ERROR,msg:err.message})
    }
}

const getAllSubCategories = async(req,res)=>{
    const page = req.query.page*1||1
    const limit = req.query.limit*1||1
  const skip = (page-1)*limit
    const listOfSubCategories = await subCategoryModel.find({}).skip(skip).limit(limit).populate({path:"category",select:"name -_id"})
  return  res.status(200).json({status:httpStatusText.SUCCESS,numOfSubCategories:listOfSubCategories.length,data:{listOfSubCategories}})


}

const getSingleSubCategory = async(req,res)=>{
    try{

const getSubCategory = await subCategoryModel.findById(req.params.SubcategoryId).populate({path:"category",select:"name -_id"})
if(!getSubCategory){
   return res.status(404).json({status:httpStatusText.FAIL,data:null,msg:`NO category for this ${req.params.SubcategoryId}`})
}
    return res.status(200).json({status:httpStatusText.SUCCESS,data:{SubCategory:getSubCategory}})
}   catch(err){
    return res.status(400).json({status:httpStatusText.ERROR,data:null,msg:err.message})

}
}

const updateSubCategory =async(req,res)=>{
    try{
    const name = req.body.name

     const SubCategory = await subCategoryModel.updateOne({_id:req.params.SubcategoryId},{$set:{slug:slugify(name),...req.body}})
       
     if(SubCategory.matchedCount==0){
        return res.status(404).json({status:httpStatusText.FAIL,data:null,msg:`NO category for this ${req.params.SubcategoryId}`})
     }

     return res.status(200).json({status:httpStatusText.SUCCESS,data:{SubCategory:SubCategory}})
    }catch(err){
 res.status(400).json({status:httpStatusText.ERROR,msg:err.message})
    }
     }
 
 
 const deleteSubCategory = async (req,res)=>{
     try{
   const deleteSubCategory = await subCategoryModel.deleteOne({_id:req.params.SubcategoryId})
    if(deleteSubCategory.deletedCount==0){
        return res.status(404).json({status:httpStatusText.FAIL,data:null,msg:`NO category for this ${req.params.SubcategoryId}`})
     }
     return res.status(200).json({status:httpStatusText.SUCCESS,data:deleteSubCategory})
     }
     catch(err){
 res.status(400).json({msg:err.message})
 
     }
     }
module.exports = {createSubCategory,deleteSubCategory,updateSubCategory,getSingleSubCategory,getAllSubCategories}