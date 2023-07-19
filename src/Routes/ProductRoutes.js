const express = require('express');
const router = express.Router();
const {ProductController} = require('../Controller');
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;
cloudinary.config({ cloud_name: "dbrvq9uxa", api_key: "567113285751718", api_secret: "rjTsz9ksqzlDtsrlOPcTs_-QtW4", });
const storage = new CloudinaryStorage({ cloudinary: cloudinary, params: { folder: "images/image", allowed_formats: ["jpg", "jpeg", "png", "PNG", "xlsx", "xls", "pdf", "PDF"], }, });
const upload = multer({ storage: storage });

router.post('/',upload.array("myField"),ProductController.addProduct);
router.get('/',ProductController.getProduct);
router.get('/:id',ProductController.getProductByCategoryId);
router.get('/brand/:id',ProductController.getProductByBrandId);
router.put('/:productid',upload.array("myField"), ProductController.updateProduct);
router.delete('/:productid', ProductController.deleteProduct);
router.post('/status/:id', ProductController.statusChange)
router.get('/seller/:sellerId', ProductController.getProductSellerId)


module.exports = router
