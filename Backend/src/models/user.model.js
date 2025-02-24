const mongoose = require("mongoose")
const validator = require("validator")
const { Schema } = mongoose
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: [4, `Must be atleast of length 4`],
      maxLength: [30, `Must be atmost of length 30`],
      // index: true,
    },
    lastName: {
      type: String,
    },
    emailId: {
      type: String,
      unique: true, // as this field is unique, it automatically creates an index
      required: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value))
          throw new Error("Invalid Email Address : " + value)
      },
    },
    password: {
      type: String,
      required: true,
      validate(value) {
        if (!validator.isStrongPassword(value))
          throw new Error("Password is not string : " + value)
      },
    },
    age: {
      type: Number,
      // this is also one of the validation method
      min: [18, `Must be atleast 18`],
      max: [110, `Must be atmax 110`],
    },
    gender: {
      type: String,
      enum: {
        values: ["male", "female", "other"],
        message: `{VALUE}, is not supported...`,
      },
    },
    photoUrl: {
      type: String,
      validate(value) {
        if (!validator.isURL(value))
          throw new Error("Photo URL is INVALID: " + value)
      },
    },
    skills: {
      type: [String],
      // we can have db level validations also and also API level as well
      validate(value) {
        if (value.length > 10) throw new Error("Skills cannot be more than 10")
      },
    },
    about: {
      type: String,
      default: "This is default about!!",
    },
  },
  { timestamps: true }
)

userSchema.index({ firstName: 1, lastName: 1 })

// DONT USE ARROW FUNCTION OVER HERE
userSchema.methods.getJWT = async function () {
  const user = this
  const token = await jwt.sign({ _id: user._id }, "mySecret1234", {
    expiresIn: "7d",
  })
  // console.log("NEW TOKEN : ", token)
  return token
}

userSchema.methods.validatePassword = async function (passwordInputByUser) {
  const user = this
  // console.log("Hii i am called!")
  const isPasswordCorrect = await bcrypt.compare(passwordInputByUser, user.password)
  return isPasswordCorrect
}

module.exports = mongoose.model("User", userSchema)
