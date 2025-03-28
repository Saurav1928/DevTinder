const mongoose= require("mongoose")

const paymentSchema= new mongoose.Schema({
    userId:{
        type: mongoose.Types.ObjectId,
        ref:"User",
        required:true
    },
    orderId:{
        type:String,
        required:true,
    },
    paymentId:{
        type:String,
    },
    amount:{
        type:Number,
        required:true,
    },
    currency:{
        type:String,
        required:true
    },
    receipt:{
        type:String,
        required:true
    },
    notes:{
        firstName:{type:String},
        lastName:{type:String},
        memebershipType:{type:String},
    },
    status:{
        type:String, required:true
    }

}, {timestamps:true})

const paymentModel = mongoose.model("Payment", paymentSchema)
module.exports= paymentModel