const {validationResult} = require("express-validator")
const httpStatusText = require("../utils/httpStatusText")
const validationMiddleWare = (req,res,next)=>{
const errors = validationResult(req); // مسكت الايرور من ال ريكويست
        if (!errors.isEmpty()) {
            return res.status(400).json({ status: httpStatusText.FAIL, data: errors.array() });
                }
                next() //middleware وديني علي ال اللي بعدك
            }

module.exports = validationMiddleWare