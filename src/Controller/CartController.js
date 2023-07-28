const { Cart } = require("../Models");
const { Coupon } = require("../Models");
// const ErrorHander = require("../utils/errorhander");
const moment = require("moment")

exports.addToCart = async (req, res, next) => {
  try {
    const product = req.params.id;
    let cart = await Cart.findOne({
      user: req.user._id,
    });

   // console.log("cart", cart)

    if (!cart) { 
      cart = await createCart(req.user._id);
    }

    const productIndex = cart.products.findIndex((cartProduct) => {
      return cartProduct.product.toString() == product;
    });

    console.log('productIndex', cart.products)
    if (productIndex < 0) {
      cart.products.push({ product });
    } else {
      cart.products[productIndex].quantity++;
    }

    await cart.save();
    return res.status(200).json({
      msg: "product added to cart",
    });
  } catch (error) {
    next(error);
  }
};

exports.getCart = async (req, res, next) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id });
    console.log(cart)
    const cartResponse = await getCartResponse(cart);
    return res.status(200).json({
      success: true,
      msg: "cart",
      cart: cartResponse
    })
  } catch (error) {
    console.log(error)
    next(error);
  }
}


exports.createCart = async (userId) => {
  try {
    const cart = await Cart.create({ user: userId });

    return cart;
  } catch (error) {
    throw error;
  }
};

exports.getCartResponse = async (cart) => {
  try {
    await cart.populate([
      { path: "products.product", select: { reviews: 0 } },
      { path: "coupon", select: "couponCode discount expirationDate" },
    ]);

    if (cart.coupon && moment().isAfter(cart.coupon.expirationDate, "day")) {
      cart.coupon = undefined;
      cart.save();
    }
    const cartResponse = cart.toObject();

    let discount = 0;
    let total = 0;
    cartResponse.products.forEach((cartProduct) => {
      cartProduct.total = cartProduct.product.price * cartProduct.quantity;
      total += cartProduct.total;
    });

    if (cartResponse.coupon) {
      discount = 0.01 * cart.coupon.discount * total;
    }

    cartResponse.subTotal = total;
    cartResponse.discount = discount;
    cartResponse.total = total - discount;
    cartResponse.shipping = 10;

    return cartResponse;
  } catch (error) {
    throw error;
  }
};
