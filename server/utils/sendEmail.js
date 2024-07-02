const nodemailer = require("nodemailer")
module.exports = async(userEmail,subject,htmlTemplate)=>{
try {
    const transporter = nodemailer.createTransport({
service:"gmail" , // gmail is email service 
auth:{
    user:process.env.APP_EMAIL_ADDRESS, //sender //email address
    pass:process.env.APP_EMAIL_PASSWORD
} 
    })
// 6E3E3-X7C7U-C7MCQ-BX8RG-4RG2R
const mailOptions = {
from:process.env.APP_EMAIL_ADDRESS, //sender
to :userEmail,
subject:subject,
html:htmlTemplate

}    
    
const info = await transporter.sendMail(mailOptions)
console.log("Email sent "+ info.response)

} catch (error) {
    console.log(error)
    throw new Error(error)
}


}