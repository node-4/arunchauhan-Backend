const express = require('express');
const router = express.Router();
const {ProductController} = require('../Controller');
const {upload_product} = require('../MiddleWare/FileUpload')

router.post('/',upload_product.array("myField"),ProductController.addProduct);
router.get('/',ProductController.getProduct);
router.get('/:id',ProductController.getProductByCategoryId);
router.get('/brand/:id',ProductController.getProductByBrandId);
router.put('/:productid',upload_product.array("myField"), ProductController.updateProduct);
router.delete('/:productid', ProductController.deleteProduct);
router.post('/status/:id', ProductController.statusChange)
router.get('/seller/:sellerId', ProductController.getProductSellerId)


module.exports = router
