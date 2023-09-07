const subCategory = require('../Models/subCatgory');


exports.AddSubVategory = async (req, res) => {
  try {
    const data = {
      image: req.body.image,
      title: req.body.title,
      catgory: req.body.catgoryId,
      sellerId: req.body.sellerId
    }
    const result = await subCategory.create(data);
    return res.status(200).json({
      message: result
    })
  } catch (err) {
    console.error(error);
    return res.status(400).json({
      message: err.message
    })
  }
}

exports.getAll = async (req, res) => {
  try {
    const result = await subCategory.find().populate(['catgory', "sellerId"]);
    return res.status(200).json({
      message: "ok",
      result: result
    })
  } catch (err) {
    console.error(error);
    return res.status(400).json({
      message: err.message
    })
  }
}


exports.DeleteSubCategory = async (req, res) => {
  try {
    await subCategory.findByIdAndDelete({ _id: req.params.id });
    return res.status(200).json({
      message: "Deleted "
    })
  } catch (err) {
    console.error(error);
    return res.status(400).json({
      message: err.message
    })
  }
}


exports.getBySellerById = async (req, res) => {
  try {
    const result = await subCategory.find({ sellerId: req.params.sellerId }).populate(['sellerId', 'catgory'])
    if (result.length === 0) {
      return res.status(200).json({
        message: "No SubCagegory found this SellerId "
      })
    }
    res.status(200).json({
      message: "ok",
      result: result
    })
  } catch (err) {
    console.error(error);
    return res.status(400).json({
      message: err.message
    })
  }
}