const express = require('express');
const router = express.Router();
const {PeriodicServiceController} = require('../Controller');
const {requireSignin} = require('../MiddleWare/Auth')
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;
cloudinary.config({ cloud_name: "dbrvq9uxa", api_key: "567113285751718", api_secret: "rjTsz9ksqzlDtsrlOPcTs_-QtW4", });
const storage = new CloudinaryStorage({ cloudinary: cloudinary, params: { folder: "images/image", allowed_formats: ["jpg", "jpeg", "png", "PNG", "xlsx", "xls", "pdf", "PDF"], }, });
const upload = multer({ storage: storage });

router.post('/',upload.single("myField"),PeriodicServiceController.addPeriodicService);
router.get('/',PeriodicServiceController.getPeriodicService);
router.put('/:periodicServiceid',upload.single("myField"),PeriodicServiceController.updatePeriodicService);
router.delete('/:periodicServiceid',PeriodicServiceController.deletePeriodicService);
router.post('/review',requireSignin,PeriodicServiceController.createPeriodicServiceReview);
router.get('/review',requireSignin,PeriodicServiceController.getPeriodicServiceReviews);
router.delete('/review',requireSignin,PeriodicServiceController.deleteReview);
router.get('/service/:periodicServiceid',PeriodicServiceController.getPeriodicServiceById);
module.exports = router