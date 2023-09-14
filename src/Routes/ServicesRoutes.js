const express = require('express');
const router = express.Router();
const { ServicesController } = require('../Controller');
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;
cloudinary.config({ cloud_name: "dbrvq9uxa", api_key: "567113285751718", api_secret: "rjTsz9ksqzlDtsrlOPcTs_-QtW4", });
const storage = new CloudinaryStorage({ cloudinary: cloudinary, params: { folder: "images/image", allowed_formats: ["jpg", "jpeg", "png", "PNG", "xlsx", "xls", "pdf", "PDF"], }, });
const upload = multer({ storage: storage });
router.post('/', upload.single('myField'), ServicesController.addService);
router.get('/', ServicesController.getService);
router.get('/:ServiceTypeid', ServicesController.getServiceByServiceTypeId);
router.put('/:serviceid', upload.single('myField'), ServicesController.updateService);
router.delete('/:serviceid', ServicesController.deleteService);
router.get('/seller/:sellerId', ServicesController.getSellelerSellerId)

module.exports = router
