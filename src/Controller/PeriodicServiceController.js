const { PeriodicServiceService } = require('../Service');
const { periodicService } = require('../Models');
const catchAsyncErrors = require("../MiddleWare/CatchAsyncErrors");
// const ErrorHander = require("../MiddleWare/ErrorHandle");

exports.addPeriodicService = async (req, res) => {
  try {
    const payload = req.body
    if (req.file) {
      let periodicServiceImg = {
        filename: req.file.filename,
        filetype: req.file.mimetype,
        filesize: req.file.size,
        url: process.env.BASE_URL + "public/periodicservice/" + req.file.filename
      }

      payload.periodicServiceImg = periodicServiceImg
    }
    const result = await PeriodicServiceService.addperiodicService(payload)
    if (result) {
      res.status(result.status).json({
        message: result.message,
        success: result.success,
        status: result.status,
        data: result.data
      })
    } else {
      res.status(result.status).json({
        message: result.message,
        success: result.success,
        status: result.status
      })
    }

  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: error.message
    })
  }
}

exports.getPeriodicService = async (req, res) => {
  try {
    const result = await PeriodicServiceService.getPeriodicService({})
    if (result.success) {
      res.status(result.status).json({
        message: result.message,
        status: result.status,
        success: result.success,
        data: result.data,
      })
    } else {
      res.status(res.status).json({
        message: result.message,
        status: result.status,
        success: result.success
      })
    }

  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: error.message
    })
  }
}




exports.updatePeriodicService = async (req, res) => {
  try {
    let payload = req.body;
    if (req.file) {
      let periodicServiceImg = {
        filename: req.file.filename,
        filetype: req.file.mimetype,
        filesize: req.file.size,
        url: process.env.BASE_URL + "public/periodicservice/" + req.file.filename
      }

      payload.periodicServiceImg = periodicServiceImg
    }
    let periodicServiceId = req.params.periodicServiceid
    let result = await PeriodicServiceService.updatePeriodicService(periodicServiceId, payload)
    if (result.success) {
      res.status(result.code).json({
        success: result.success,
        message: result.message,
        data: result.data
      })
    } else {
      res.status(result.code).json({
        success: result.success,
        message: result.error
      })
    }
  } catch (error) {
    throw error
  }
}

exports.deletePeriodicService = async (req, res, next) => {
  try {
    let periodicServiceId = req.params.periodicServiceid
    let result = await PeriodicServiceService.deletePeriodicService(periodicServiceId)
    if (result.success) {
      res.status(result.status).json({
        success: result.success,
        status: result.status,
        message: result.message,
        data: result.data
      })
    } else {
      res.status(result.status).json({
        success: result.success,
        status: result.status,
        message: result.error
      })
    }

  } catch (error) {
    next(error)
  }
}

exports.createPeriodicServiceReview = catchAsyncErrors(async (req, res, next) => {
  const { rating, comment, periodicServiceId } = req.body;

  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };

  const PeriodicService = await periodicService.findById(periodicServiceId);
  // console.log("PeriodicService",PeriodicService)

  const isReviewed = PeriodicService.reviews.find(
    (rev) => rev.user.toString() === req.user._id.toString(),
  );


  if (isReviewed) {
    PeriodicService.reviews.forEach((rev) => {
      if (rev.user.toString() === req.user._id.toString())
        (rev.rating = rating), (rev.comment = comment);
    });
  } else {
    PeriodicService.reviews.push(review);
    PeriodicService.numOfReviews = PeriodicService.reviews.length;
  }

  let avg = 0;

  PeriodicService.reviews.forEach((rev) => {
    avg += rev.rating;
  });

  PeriodicService.ratings = avg / PeriodicService.reviews.length;

  await PeriodicService.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
    message: "Reted Successfully"
  });
});

exports.getPeriodicServiceReviews = catchAsyncErrors(async (req, res, next) => {
  const PeriodicService = await periodicService.findById(req.query.id);

  if (!PeriodicService) {
    return next(new ErrorHander("service not found", 404));
  }

  res.status(200).json({
    success: true,
    reviews: PeriodicService.reviews,
  });
});

// Delete Review
exports.deleteReview = catchAsyncErrors(async (req, res, next) => {
  const PeriodicService = await periodicService.findById(req.query.periodicServiceId);

  if (!PeriodicService) {
    return next(new ErrorHander("Service not found", 404));
  }
  const reviews = PeriodicService.reviews.filter(
    (rev) => rev._id.toString() !== req.query.id.toString()
  );

  let avg = 0;

  reviews.forEach((rev) => {
    avg += rev.rating;
  });

  let ratings = 0;

  if (reviews.length === 0) {
    ratings = 0;
  } else {
    ratings = avg / reviews.length;
  }

  const numOfReviews = reviews.length;

  await periodicService.findByIdAndUpdate(
    req.query.periodicServiceId,
    {
      reviews,
      ratings,
      numOfReviews,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({
    success: true,
  });
});