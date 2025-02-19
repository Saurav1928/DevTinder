const mongoose = require("mongoose")
const validator= require("validator")
const { Schema } = mongoose
const userSchema = new Schema(
  {
  firstName: {
    type: String,
    required: true,
    minLength:[4, `Must be atleast of length 4`],
    maxLength:[30, `Must be atmost of length 30`],
  },
  lastName: {
    type: String,
  },
  emailId: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    lowercase: true,
    validate(value){
      if(!validator.isEmail(value)) throw new Error("Invalid Email Address : "+ value)
    }
  },
  password: {
    type: String,
    required: true,
    validate(value){
      if(!validator.isStrongPassword(value)) throw new Error("Password is not string : "+ value)
    }
  },
  age: {
    type: Number,
    // this is also one of the validation method
    min:[18, `Must be atleast 18`],
    max:[110, `Must be atmax 110`],
  },
  gender: {
    type: String,
    validate(value){
      if(!(["male", "female", "other"].includes(value))) throw new Error("Gender is invalid!!")
    }
  },
  photoUrl: {
    type: String,
    validate(value){
      if(!validator.isURL(value)) throw new Error("Photo URL is INVALID: "+value)
    }
  },
  skills: {
    type: [String],
    // we can have db level validations also and also API level as well
    // validate(value){
    //   if(value.length>10) throw new Error("Skills cannot be more than 10")
    // }
  },
  about: {
    type: String,
    default: "This is default about!!",
  },
},{timestamps:true})

module.exports = mongoose.model("User", userSchema)
