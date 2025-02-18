const mongoose= require("mongoose")
const connectDB=async ()=>{
    await mongoose.connect("mongodb+srv://saurav:1234@namastenode.jqvjp.mongodb.net/devTinder");
}
module.exports={connectDB}