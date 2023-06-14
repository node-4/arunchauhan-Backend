const express = require('express');
const router = express.Router();
const {BannerController} = require('../Controller')
const {upload_banner} = require('../MiddleWare/FileUpload');
const {adminMiddleware} = require('../MiddleWare/Auth')

router.post('/',adminMiddleware,BannerController.addBanner);
router.get('/',BannerController.getBanner);
router.put('/:bannerid',upload_banner.single('myField'),BannerController.updateBanner);
router.delete('/:bannerid',BannerController.deleteBanner);




module.exports = router
