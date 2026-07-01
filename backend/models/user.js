const mongoose = require("mongoose")

const validator = require("validator")

const bcrypt = require("bcryptjs")

const jwt = require("jsonwebtoken")

const crypto = require("crypto")

// const { kMaxLength } = require("buffer")
// const { type } = require("os")
// const { url } = require("inspector")
// const { stringify } = require("querystring")
// const { timeStamp } = require("console")

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required:[true,"please enter your name"],
        maxlength:[10,"name cannot execeed the limit"],
    },
    email:{
        type: String,
        required:[true,"enter email id"],
        unique:true,
        lowercase:true,
        validator:[validator.isEmail,"Enter valid mail"]
    },
    password:{
        type: String,
        required:[true,"enter password"],
        minlength: 8,
        select:false
    },
    passwordConfirm:{
        type: String,
        required:[true,"conform password"],
        validator:{
            // validator: function(el){
            //     retrun el === this.password;
            // },
            message:["passwords are not same"]
        }
    },
    phoneNumber:{
        type: String,
        required:true,
        match: [/^[0-9]{10}$/,"enter vaild phone number"]
    },
    role:{
        type: String,
        enum: ["user","admin"],
        default:"user"
    },
    avatar:{
        public_id: String,
        url: String
    },
    passwordChangeAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date
    
},
{timeStamp: true}
)

userSchema.pre("save", async function (){
    if(!this.isModified("password")) return;

    this.password = await bcrypt.hash(this.password, 12)
    this.passwordConfirm = undefined
})

userSchema.method.correctpassword = async function (
    candidatePassword, userPassword
) {
    return await bcrypt.compare(candidatePassword, userPassword)

}

userSchema.method.changePasswordAfter = function(JWTTimestamp){
    if(this.passwordChangeAt){
        const changeTimestamp = parseInt(
            this.passwordChangeAt.getTime()/1000, 10
        )
        return JWTTimestamp < changeTimestamp
    }
    return false;
}
userSchema.method.getJWTToken = function(){
    return jwt.sign(
        {id: this.id},
        process.env.JWT_SECRET,
        {expiresIn: process.env.JWT_EXPIRES}
    )
}


module.exports = mongoose.model("User", userSchema)