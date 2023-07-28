const express = require('express');
const router = express.Router();
const { UserController } = require('../Controller');
const { requireSignin } = require('../MiddleWare/Auth');
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;
cloudinary.config({ cloud_name: "dbrvq9uxa", api_key: "567113285751718", api_secret: "rjTsz9ksqzlDtsrlOPcTs_-QtW4", });
const storage = new CloudinaryStorage({ cloudinary: cloudinary, params: { folder: "images/image", allowed_formats: ["jpg", "jpeg", "png", "PNG", "xlsx", "xls", "pdf", "PDF"], }, });
const upload = multer({ storage: storage });
router.post('/register', UserController.userRegister);
router.post('/profile', requireSignin, UserController.getUser);
router.post('/signin', UserController.userSignin);
router.post("/forget", UserController.ForgetPassword);
router.post("/reset", UserController.resetPasswordOTP);
router.post('/verify', UserController.registrationOtpVerification);
router.get('/', UserController.getAllUser);
router.put('/', requireSignin, upload.single('myField'), UserController.updateUser);
router.post('/otpsend', UserController.sendOtp);
router.post('/change-password', UserController.changePassword);
router.delete('/delete/:userId', UserController.DeleteUser)
router.post('/createPaymentCard', requireSignin, UserController.createPaymentCard);
router.get('/getPaymentCard', requireSignin, UserController.getPaymentCard);
router.put('/updatePaymentCard/:id', requireSignin, UserController.updatePaymentCard);
router.delete('/DeletePaymentCard/:id', requireSignin, UserController.DeletePaymentCard);

module.exports = router
