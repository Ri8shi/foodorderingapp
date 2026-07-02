const mongoose = require("mongoose")
// const { trim } = require("validator")

const restaurantSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true,"please enter the name"],
        trim: true,
        maxlenth: [100,"enter your"]
    },
    isVeg:{
        type: Boolean,
        default: false
    },
    address:{
        type: String,
        required: [true,"please enter the address"]
    },
    rating:{
        type: Number,
        default: 0
    },
    numOfReviews:{
        type: Number,
        default: 0
    },
    location:{
        type:{
            type: String,
            enum: ["Point"],
            required: [true,""]
        },
        coordinates:{
            type:[Number],
            required:true
        }
    },
    reviews:[
        {
            name:{
                type:String,
                required:true
            },
            rating:{
                type: Number,
                required:true
            },
            comment:{
                type:String,
                required:true
            }
        }
    ],
    images:[
        {
            public_id:{
                type:String,
                required:true
            },
            url:{
                type:String,
                required:true
            }
        }
    ],
    createdAt:{
        type:Date,
        default: Date.now
    }
})

restaurantSchema.index({location:"2dsphere"});
restaurantSchema.index({address:"text"})

module.exports = mongoose.model("Restaurant",restaurantSchema)