const Order = require("../Models/order");
const Cart = require("../Models/Cart");

exports.createOrder = async (req, res) => {
  try {
    const userId = req.user._id;
    const cartId = req.body.cartId;

    const cart = await Cart.findOne({ _id: cartId, user: userId }).populate("products.product").populate("services.service").exec();
    if (!cart)
      return res.status(404).send({ status: false, message: `No such cart exist for ${userId}` });
    let totalPrice = 0;
    for (const product of cart.products) {
      const productPrice = product.product.price * product.quantity;
      totalPrice += productPrice;
    }
    const order = {
      user: userId,
      product: cart.products,
      totalPrice: totalPrice,
      quantity: cart.products.length,
    };
    const shippingAddress = {
      address: req.body.address,
      city: req.body.city,
      postalCode: req.body.postalCode,
      country: req.body.country,
    };
    order.shippingAddress = shippingAddress;
    order.grandTotal = totalPrice + req.body.shippingPrice + req.body.taxPrice;
    const result = await Order.create(order);
    return res.status(201).send({ status: true, message: "Success", data: result });
  } catch (err) {
    console.log(err.message);
    return res.status(500).send({ msg: "internal server error ", error: err.message });
  }
};

// // ---------------------------------- Update Order ------------------------------------------------------

// const Order = require("../Models/order");
// const Cart = require("../Models/Cart");
// const Product = require("../Models/Product");

// Get all orders API
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().exec();
    return res.status(200).send({ status: true, message: "Success", data: orders });
  } catch (err) {
    console.log(err.message);
    return res.status(500).send({ msg: "internal server error ", error: err.message });
  }
};
exports.getAllOrdersByToken = async (req, res) => {
  try {
    console.log(req.user);
    const orders = await Order.find({ user: req.user._id }).exec();
    return res.status(200).send({ status: true, message: "Success", data: orders });
  } catch (err) {
    console.log(err.message);
    return res.status(500).send({ msg: "internal server error ", error: err.message });
  }
};

// Get order by ID API
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).exec();
    if (!order) {
      return res.status(404).send({
        status: false,
        message: `No order found with ID ${req.params.id}`,
      });
    }
    return res.status(200).send({ status: true, message: "Success", data: order });
  } catch (err) {
    console.log(err.message);
    return res.status(500).send({ msg: "internal server error ", error: err.message });
  }
};

// Update order API
exports.updateOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).exec();
    if (!order) {
      return res.status(404).send({
        status: false,
        message: `No order found with ID ${req.params.id}`,
      });
    }

    order.shippingAddress = {
      address: req.body.address,
      city: req.body.city,
      postalCode: req.body.postalCode,
      country: req.body.country,
    };
    order.grandTotal =
      parseInt(req.body.totalPrice) +
      parseInt(req.body.shippingPrice) +
      parseInt(req.body.taxPrice);

    const updatedOrder = await order.save();

    return res.status(200).send({ status: true, message: "Success", data: updatedOrder });
  } catch (err) {
    console.log(err.message);
    return res.status(500).send({ msg: "internal server error ", error: err.message });
  }
};

// Delete order API
exports.deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id).exec();
    if (!order) {
      return res.status(404).send({
        status: false,
        message: `No order found with ID ${req.params.id}`,
      });
    }
    return res.status(200).send({ status: true, message: "Success", data: order });
  } catch (err) {
    console.log(err.message);
    return res.status(500).send({ msg: "internal server error ", error: err.message });
  }
};

exports.getAllPaidOrder = async (req, res) => {
  try {
    const orders = await Order.find()
    // for(let i=0;i<order.length;i++)
    // {
    //   //const orders = order.data
    // }
    //console.log(orders)
    console.log(orders.data)
    const order = orders.product
    //const orders = order.data
    const productIds = [];
    for (let i = 0; i < order.length; i++) {
      const products = order[i].products; // array of products in the i-th order
      for (let j = 0; j < products.length; j++) {
        const productId = products[j].product;
        productIds.push(productId);
      }
    }
    console.log(productIds); // array of product _ids

    // await cart.populate([
    //   { path: "products.product", select: { reviews: 0 } },
    //   { path: "coupon", select: "couponCode discount expirationDate" },
    // ])

    // const cart = await Cart.findOne({ /* _id: cartId,*/ user: userId })
    //   .populate("products.product")
    //   //.populate("services.service")
    //   .exec();
    // console.log(cart);
    //  const productt = req.params.id;
    // // console.log(productt)

    //  const product = await Product.findById({_id:productt});
    // console.log(product.sellerId)

    //   const orders = await Order.find().lean();
    //  // console.log(orders)
    //   const productIndex = orders.products.findIndex((cartProduct) => {
    //     return cartProduct.product.toString() == product._id;
    //   });

    //   console.log(productIndex)
    // const orders = await Order.find().lean();

    // // Map over each order and fetch the product data using the IDs
    // const ordersWithProducts = await Promise.all(
    //   orders.map(async (order) => {
    //     const products = await Product.find({ _id: { $in: order.products } }).lean();
    //     return { ...order, products };
    //   })
    // );

    // const data = req.query
    // const order = await Order.findById().exec();
    // if (!order) {
    //   return res
    //     .status(404)
    //     .send({ status: false, message: `No order found with ID ${req.params.id}` });
    // }
    // res.status(200).send({ status: true, message: "Success", data: order });
  } catch (err) {
    console.log(err.message);
    return res.status(500).send({ msg: "internal server error ", error: err.message });
  }
};

// const updateOrder = async (req, res) => {
//   try {
//       let userId = req.params.userId;

//       if (validation.isValidd(userId)) {
//           return res.status(400).send({ status: false, message: "User ID is missing" });
//       }

//       if (!validation.isValidObjectIdd(userId)) {
//           return res.status(400).send({ status: false, message: "Please provide valid user Id" });
//       }

//       let tokenUserId = req.tokenId
//       if(tokenUserId !== userId){
//           return res.status(403).send({status:false, message:'you are not authorized'})
//       }
//       //<--

//       let findCart = await cartModel.findOne({ userId: userId });

//       if (!findCart)
//           return res.status(404).send({ status: false, message: `No such cart exist for ${userId}` });

//       let data = req.body;

//       if (validation.isValidBodyy(data))
//           return res.status(400).send({ status: false, message: "Body cannot be empty" });

//       let { orderId, status } = data;

//       if (!orderId)
//           return res.status(400).send({ status: false, message: "order ID is required" });

//       if (validation.isValidd(orderId)) {
//           return res.status(400).send({ status: false, message: "order ID is missing" });
//       }

//       if (!validation.isValidObjectIdd(orderId)) {
//           return res.status(400).send({ status: false, message: "Please provide valid order Id" });
//       }

//       if (status) {
//           //checking if the status is valid
//           if (!validation.isValidStatus(status))
//               return res.status(400).send({ status: false, message: "Status should be one of 'pending', 'completed', 'cancelled'" });
//       }

//       let findOrder = await orderModel.findById({ _id: orderId })
//       if (!findOrder)
//           return res.status(404).send({ status: false, message: "No order found" })

//       if (findOrder.isDeleted == true)
//           return res.status(404).send({ status: false, message: "order is aready deleted" })

//       if (findOrder.status === "completed") {
//           return res.status(400).send({ status: false, message: "Cannot cancel completed order" })
//       }
//       if (findOrder.status === "cancelled") {
//           return res.status(400).send({ status: false, message: "Order is already cancelled" })
//       }

//       let newStatus = {}
//       if (status == "cancelled" || status == "completed") {  //pendin ko hi cancel kar sakta hai

//           if (findOrder.cancellable == false && status == 'cancelled') {
//               return res.status(400).send({ status: false, message: "this order is not cancellable" })
//           } else  {
//               newStatus.status = status
//           }
//       }

//       let updateOrder = await orderModel.findByIdAndUpdate({ _id: findOrder._id }, newStatus, { new: true })

//       return res.status(200).send({ status: true, message: "Success", data: updateOrder })
//   } catch (error) {
//       return res.status(500).send({ status: false, error: error.message })
//   }
// }

// module.exports={createOrder,updateOrder}
