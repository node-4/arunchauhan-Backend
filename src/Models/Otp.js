const { model, Schema } = require("mongoose");

const otpSchema = new Schema(
  {
    phone_number: String,
    code: String,
    expireIn: Number,
  },
  { timestamps: true }
);
module.exports = model("otp", otpSchema);
