const mongoose = require("mongoose")
const { Schema } = mongoose
const userSchema = new Schema(
  {
  firstName: {
    type: String,
    required: true,
    minLength:4,
    maxLength:50
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
  },
  password: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    min:18,
    max:110
  },
  gender: {
    type: String,
    validate(value){
      if(!(["male", "female", "other"].includes(value))) throw new Error("Gender is invalid!!")
    }
  },
  photoUrl: {
    type: String,
  },
  skills: {
    type: [String],
  },
  about: {
    type: String,
    default: "This is default about!!",
  },
},{timestamps:true})

module.exports = mongoose.model("User", userSchema)
