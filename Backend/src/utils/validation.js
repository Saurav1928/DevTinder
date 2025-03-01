const validator= require("validator")
const bcrypt = require("bcrypt")
const validateSignUpData = (req) => {
  const { firstName, lastName, emailId, password } = req.body
  if (!firstName || !lastName) {
    throw new Error("Name is not valid!!")
  } else if (firstName.length < 4 || firstName.length > 30) {
    throw new Error(
      "First Name must be greater than 4 and less than 30 characters long..."
    )
  } else if (!validator.isEmail(emailId)) {
    throw new Error("Invalid Email!!")
  } else if (!validator.isStrongPassword(password))
    throw new Error("Password must be strong!!")
}
const validateEditData = (req) => {
  const ALLOWED_EDIT_FIELDS = [
    "firstName",
    "lastName",
    // "emailId",
    "age",
    "gender",
    "photoUrl",
    "about",
    "skills",
  ]
  const isEditDataValid = Object.keys(req.body).every((field) =>
    ALLOWED_EDIT_FIELDS.includes(field)
  )
  
  return isEditDataValid
}

const validateForgetPasswordData = async (req) => {
  const hashedPasswordFromDatabase = req.user.password
  const { oldPassword, newPassword } = req.body

  // Check if old password is correct or not
  const isForgetPasswordDataValid = await bcrypt.compare(
    oldPassword,
    hashedPasswordFromDatabase
  )
  if (!isForgetPasswordDataValid) throw new Error("Old password is wrong..")

  // Check if new password is strong enough
  if (!validator.isStrongPassword(newPassword))
    throw new Error("New password must be strong...")
}

module.exports = {
  validateSignUpData,
  validateEditData,
  validateForgetPasswordData,
}