const express = require('express');
const router = express.Router();
const {UserController} = require('../Controller');
const {upload_profile} = require('../MiddleWare/FileUpload');
const {requireSignin} = require ('../MiddleWare/Auth');

router.post('/register',UserController.userRegister);
router.post('/profile',requireSignin,UserController.getUser);
router.post('/signin',UserController.userSignin);
router.post('/verify',UserController.registrationOtpVerification);
router.get('/',UserController.getAllUser);
router.put('/',requireSignin,upload_profile.single('myField'),UserController.updateUser);
router.post('/otpsend', UserController.sendOtp);
router.post('/change-password', UserController.changePassword);
router.delete('/delete/:userId', UserController.DeleteUser)



module.exports = router
