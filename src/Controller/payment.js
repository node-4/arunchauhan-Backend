const razerpay = require("razorpay");
const crypto = require("crypto");
const uuid = require("uuid");
const id = uuid.v4();
const payment = require("../Models/payment");
//const Wallet = require("../../models/wallet");
const userSchema = require("../Models/User");
const orderSchema = require("../Models/order");
const Cart = require("../Models/Cart");

// const Razorpay = new razerpay({
//   key_id: "rzp_live_oe2m9rifPN1OM5",
//   key_secret: "lVgPoYfEbRchEnFISM6yJAdr",
// });

exports.CreatePayment = async (req, res) => {
  try {
    const paymentData = await orderSchema.findById({ _id: req.params.id });
    console.log(paymentData);

    if (!paymentData || paymentData.length == 0) {
      return res.status(500).json({
        message: "No Booking  is their",
      });
    }

    console.log(paymentData._id);
    console.log(paymentData.user);
    console.log(paymentData.grandTotal);
    // console.log(paymentData.amount);
    console.log(paymentData.user);
    // console.log(paymentData.restaurantId);

    // const userdata = await userSchema.findById({ _id: bookingData.userId });

    // if (!userdata || userdata.length == 0) {
    //   return res.status(500).json({
    //     message: "No userdata  is their",
    //   });
    // }

    // console.log(userdata);

    // const restaurantData = await restaurantSchema.findById({
    //   _id: bookingData.restaurantId,
    // });

    // if (!restaurantData || restaurantData.length == 0) {
    //   return res.status(500).json({
    //     message: "No restaurantData  is their",
    //   });
    // }

    // console.log(restaurantData);

    const data1 = {
      amount: paymentData.grandTotal,
      user: paymentData.user,
      order: paymentData._id,
      currency: "INR",
      receipt: id,
      partial_payment: false,
    };
    // //   console.log(data1.receipt);
    // //  const result1 = await Razorpay.orders.create(data1);
    // // console.log(result1);

    // const DBData = {
    //   // orderId: result1.id,
    //   name: req.body.name,
    //  // invoice: "123" + req.body.name,
    //   // amount: bookingData.userobject.wallet,
    //   amount: /* result1.amount,*/ bookingData.amount,
    //   currency: "INR",
    //   receipt: data1.receipt,
    //   partial_payment: false,
    //   user: bookingData.userId,
    //   //userObject: userdata,
    //   bookingId:bookingData._id,
    //   restaurantId: bookingData.restaurantId,
    // //  restaurantObject: restaurantData,

    //   //  payment_Id: result1.id,
    //   //  amount: result1.amount,
    //   //  amount_paid: result1.amount_paid,
    //   //  receipt: result1.receipt,
    //   //  product: req.body.product,
    //   //status: req.body.status,
    // };
    // console.log(DBData);
    // const AmountData = await payment.create(DBData);
    // console.log(AmountData);
    const AmountData = await payment.create(data1);
    paymentData.Status = "success";
    await paymentData.save();

    const cart = await Cart.findOne({
      /* _id: cartId,*/ user: paymentData.user,
    })
      .populate("products.product")
      //.populate("services.service")
      .exec();
    // console.log(cart);

    await Cart.updateOne({ _id: cart._id }, { products: [] }, { new: true });

    paymentData.grandTotal = 0;
    await paymentData.save();

    return res.status(200).json(AmountData);
  } catch (err) {
    console.log(err);
    return res.status(400).send({ message: err.message });
  }
};

exports.GetpaymentById = async (req, res) => {
  try {
    console.log(req.params.id);
    const Data = await payment.find({ _id: req.params.id });
    return res.status(200).json({ details: Data });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

exports.GetAllPayments = async (req, res) => {
  try {
    const Data = await payment.find();
    if (!Data || Data.length == 0)
      return res.status(404).send({ msg: " no data " });
    return res.status(200).json({ details: Data });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

exports.GetPaymentByUserId = async (req, res) => {
  try {
    console.log(req.params.user);
    const Data = await payment.find({ user: req.params.user });
    return res.status(200).json({ details: Data });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

exports.updatePayment = async (req, res) => {
  try {
    const Data = {
      payment_Id: req.body.payment_Id,
      amount: req.body.amount,
      invoice: req.body.invoice,
      status: req.body.status,
      receipt: req.body.receipt,
      amount_paid: req.body.amount_paid,
      name: req.body.name,
      type: req.body.type,
      date: req.body.date,
      paymentMethod: req.body.paymentMethod,
      product: req.body.product,
      orderStatus: req.body.orderStatus,
      user: req.body.user,
      restaurantId: req.body.restaurantId,
      orderId: req.body.orderId,
      order: req.body.order,
    };
    const updateData = await payment.findByIdAndUpdate(
      { _id: req.params.id },
      Data,
      { new: true }
    );

    if (!updateData || updateData.length == 0) {
      return res.status(500).json({
        message: "updateData is their",
      });
    }
    return res.status(200).send(updateData);
  } catch (err) {
    console.log(err);
    return res.status(400).send({ message: err.message });
  }
};

exports.deletepayment = async (req, res, next) => {
  try {
    console.log("hit Payment by id");

    const { id } = req.params;

    const deletedData = await payment.findOneAndDelete({
      // restaurantId: req.user,
      _id: id,
    });

    if (!deletedData) return next(CreateError(400, "cannot delete the policy"));

    return res.status(200).json({ message: "deleted successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      errorName: error.name,
      message: error.message,
    });
  }
};
