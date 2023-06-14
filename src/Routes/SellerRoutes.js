const express = require('express');
const router = express.Router();
const {SellerController} = require('../Controller');
const {upload_profile} = require('../MiddleWare/FileUpload');
const {adminMiddleware,sellerSignin} = require ('../MiddleWare/Auth');

router.post('/',adminMiddleware,SellerController.addSeller);
router.get('/',adminMiddleware,SellerController.getAllSeller);
router.post('/signin',SellerController.sellerSignin);
router.put('/',sellerSignin,upload_profile.single('myField'),SellerController.updateSeller);
router.post('/otpsend',SellerController.sendMail);
router.delete('/:sellerId',SellerController.deleteSeller )
// router.post('/change-password', UserController.changePassword);



module.exports = router
