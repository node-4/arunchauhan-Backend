const express = require('express');
const router = express.Router();
const {BrandController} = require('../Controller')
const {upload_brand} = require('../MiddleWare/FileUpload')

router.post('/',upload_brand.single('myField'),BrandController.addBrand);
router.get('/',BrandController.getBrand);
router.put('/:brandid',upload_brand.single('myField'),BrandController.updateBrand);
router.delete('/:brandid',BrandController.deleteBrand);




module.exports = router
