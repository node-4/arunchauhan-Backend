const mongoose = require("mongoose");
const wishlistSchema = new mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: "user"
  },
  products: {
    type: [mongoose.Types.ObjectId],
    ref: "product"
  }
});
module.exports = mongoose.model("Wishlist", wishlistSchema);