 const AboutUs = require('../Models/aboutUs');

exports.createAboutUs = async (req, res) => {
    try {
      const newAboutUs = {
        title: req.body.title, desc: req.body.desc
      }
      console.log(newAboutUs)
      const result = await AboutUs.create(newAboutUs)
      res.status(200).json({
        message: result
      })
    } catch (error) {
      console.error(error);
      res.status(400).json({
        message: err.message
      })
    }
  };
  
  // READ operation
exports.getAboutUs = async (req, res) => {
    try {
      const result = await AboutUs.find();
      res.status(200).json({
        message:result
      })

    } catch (error) {
      console.error(error);
      res.status(400).json({
        message: err.message
      })
    }
  };
  
  // UPDATE operation
  exports.updateAboutUs = async (req, res) => {
    try {
      const result = await AboutUs.findByIdAndUpdate({_id: req.params.id}, { title: req.body.title, desc: req.body.desc });
      res.status(200).json({
        message: "ok"
      })
    } catch (error) {
      console.error(error);
      res.status(400).json({
        message: err.message
      })
    }
  };
  
  // DELETE operation
  exports.deleteAboutUs = async (req, res) => {
    try {
      const result = await AboutUs.findByIdAndDelete({_id: req.params.id});
      res.status(200).json({
        message: "ok"
      })
    } catch (error) {
      console.error(error);
      res.status(400).json({
        message: err.message
      })
    }
  };