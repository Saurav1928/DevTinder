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
      // minLength: [4, `Must be atleast of length 4`],
      // maxLength: [30, `Must be atmost of length 30`],
      validate(value) {
        if (!validator.isAlpha(value))
          throw new Error("First Name should only contain alphabets : " + value)
        if (!validator.isLength(value, { min: 4, max: 20 }))
          throw new Error("should be between 4 to 20 characters")
      }

      // index: true,
    },
    lastName: {
      type: String,
    },
    emailId: {
      type: String,
      unique: [true, "User with this email already exists"],
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
        values: ["Male", "Female", "Other"],
        message: `{VALUE}, is not supported...`,
      },
    },
    photoUrl: {
      type: String,
      default:
        "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?t=st=1743953982~exp=1743957582~hmac=66b68b2fbe8feb98364016022ef7e3e92e3179e300524f5b4a191f36c86d3df7&w=826",
      validate(value) {
        if (!validator.isURL(value))
          throw new Error("Photo URL is INVALID: " + value)
      },
    },
    isPremium: {
      type: Boolean,
      default: false,
    },
    membershipType: {
      type: String,
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
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
)

userSchema.index({ firstName: 1, lastName: 1 })

// DONT USE ARROW FUNCTION OVER HERE
userSchema.methods.getJWT = async function () {
  const user = this
  const token = await jwt.sign({ _id: user._id }, process.env.MY_SECRET, {
    expiresIn: "7d",
  })
 
  return token
}

userSchema.methods.validatePassword = async function (passwordInputByUser) {
  const user = this
  
  const isPasswordCorrect = await bcrypt.compare(passwordInputByUser, user.password)
  return isPasswordCorrect
}

module.exports = mongoose.model("User", userSchema)