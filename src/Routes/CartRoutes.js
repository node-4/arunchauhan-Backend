const express = require('express');
const router = express.Router();
const {CartController} = require('../Controller');
const {requireSignin} = require('../MiddleWare/Auth')

router.post('/:id',requireSignin,CartController.addToCart)
router.get('/',requireSignin,CartController.getCart)

module.exports = router