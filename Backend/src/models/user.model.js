const mongoose = require("mongoose")
const { Schema } = mongoose
const userSchema = new Schema(
  {
  firstName: {
    type: String,
    required: true,
    minLength:[4, `Must be atleast of length 4`],
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
    min:[18, `Must be atleast 18, got ${this.age}`],
    max:[110, `Must be atmax 110, got ${this.age}`],
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
