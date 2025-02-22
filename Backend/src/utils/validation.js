const validator= require("validator")
const validateSignUpData= (req)=>{
  const { firstName, lastName, emailId, password } = req.body
  // console.log("Validating:", firstName, lastName, emailId, password);
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
};
module.exports={validateSignUpData}