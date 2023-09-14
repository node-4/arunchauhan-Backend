const review = require('../Models/review')

exports.AddReview = async (req, res) => {
  try {
    const data = {
      userId: req.body.userId,
      productId: req.body.productId,
      rating: parseInt(req.body.rating),
      message: req.body.message
    }
    const result = await review.create(data)
    const Review = await review.findById(result._id).populate('userId productId');

    return res.status(200).json({ status: 200, message: "Review is Added ", data: Review })
  } catch (err) {
    console.log(err.message);
    return res.status(500).send({ msg: "internal server error ", error: err.message });
  }
}
exports.getAll = async (req, res) => {
  try {
    const data = await review.find().populate('userId productId')
    return res.status(200).json({
      message: "ok",
      data: data
    })
  } catch (err) {
    console.log(err.message);
    return res.status(500).send({ msg: "internal server error ", error: err.message });
  }
}
exports.getAllbyToken = async (req, res) => {
  try {
    const data = await review.find({ userId: req.user._id }).populate('productId').populate({ path: "userId", select: "profile name" })
    return res.status(200).json({
      message: "ok",
      data: data
    })
  } catch (err) {
    console.log(err.message);
    return res.status(500).send({ msg: "internal server error ", error: err.message });
  }
}
exports.getReviewById = async (req, res) => {
  try {
    const Review = await review.findById(req.params.id);
    return res.status(200).send(Review);
  } catch (error) {
    console.error('Error getting review by ID:', error);
  }
};
exports.updateReview = async (req, res) => {
  try {

    const update = {
      userId: req.body.userId,
      productId: req.body.productId,
      rating: parseInt(req.body.rating)
    }
    const Review = await review.findByIdAndUpdate(req.params.id, update, {
      new: true,
    });
    return res.status(200).send(Review);
  } catch (error) {
    console.error('Error updating review:', error);
  }
};
exports.deleteReview = async (req, res) => {
  try {
    const Review = await review.findByIdAndDelete(req.params.id);
    return res.status(200).send(Review);
  } catch (error) {
    console.error('Error deleting review:', error);
  }
};

exports.changeStatus = async (req, res) => {
  try {
    const Review = await review.findById(req.params.id);
    if (Review) {
      if (Review.status == false) {
        const Review1 = await review.findByIdAndUpdate(req.params.id, { $set: { status: true } }, { new: true, });
        return res.status(200).send(Review1);
      } else {
        const Review1 = await review.findByIdAndUpdate(req.params.id, { $set: { status: false } }, { new: true, });
        return res.status(200).send(Review1);
      }
    } else {
      return res.status(200).send(Review);
    }

  } catch (error) {
    console.error('Error updating review:', error);
  }
};