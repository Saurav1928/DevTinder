const adminAuth=((req, res, next)=>{
    const token="xyz";
    const isAuthorised=token==="xyz";
    if(!isAuthorised) res.status(401).send("Unauthorised Admin");
    console.log("Admin Middlware called!!")
    next();
  })
  const userAuth=((req, res, next)=>{
    const token="xyz";
    const isAuthorised=token==="xyz";
    if(!isAuthorised) res.status(401).send("Unauthorised User");
    console.log("User Middlware called!!")
    next();
  })

  module.exports={adminAuth, userAuth}