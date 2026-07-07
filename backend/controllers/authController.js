const User = require("../models/user")
const errorHandler = require("../utils/errorHandler")
const catchAsyncErrors = require("../middlewares/catchAsyncErrors")
const sendToken = require("../utils/sendToken")
const cloudinary = require("../config/cloudinary")

exports.singup = catchAsyncErrors(async(req,res,next)=>{
    const {name,email,password,passwordConfirm,phoneNumber} = req.body;

    let avatar=[]
    if(!req.body.avatar || req.body.avatar === "/images/images.png"){
        avatar = {
            public_id: "default",
            url: "/images/images.png",
        }
    }
    else{
        const result = await cloudinary.UploadStream(req.body.avatar,{
            folder: "avatar",
            width: 150,
            crop: "scale",
        })
        avatar = {
            public_id: result.public_id,
            url: result.url
        }
    }
    const user = await User.create({
        name,
        email,
        password,
        passwordConfirm,
        phoneNumber,
        avatar
    })
    sendToken(user, 200, res)
})

exports.login = catchAsyncErrors(async(req,res,next)=>{

    const {email,password} = req.body;
    if(!email || !password){
        return next(new errorHandler("Please enter email and password", 400))
    }
    
    const user = await User.findOne({email}).select(+password)

    if(!User){
        return next(new errorHandler("Invalid email or password", 401))
    }
    const isPasswordMatched = await user.correctPassword(password, user.password)
    if(!isPasswordMatched){
        return next(new errorHandler("Invalid password", 401))
    }
    sendToken(user,200,res)
})