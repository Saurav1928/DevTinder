const mongoose = require("mongoose")
const connectionRequestSchema = new mongoose.Schema(
  {
    fromUserId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    toUserId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    status: {
      type: String,
      enum: {
        values: ["ignored", "accepted", "rejected", "interested"],
        message: `{VALUE} is not supported status..`,
      },
      required: true,
    },
  },
  { timestamps: true }
)
connectionRequestSchema.index({ fromUserId: 1, toUserId: 1 })

connectionRequestSchema.pre("save", function(next){
    const connectionRequest= this;
    if(connectionRequest.fromUserId.equals(connectionRequest.toUserId))
        throw new Error("You cannot send a Connection request to Yourelf..")
    next();
})

const ConnectionRequest=mongoose.model("ConnectionRequest", connectionRequestSchema)
module.exports= ConnectionRequest