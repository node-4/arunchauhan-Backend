const express = require('express');
const router = express.Router();
const { CartController } = require('../Controller');
const { requireSignin } = require('../MiddleWare/Auth')

router.post('/:id', requireSignin, CartController.addToCart)
router.get('/', requireSignin, CartController.getCart);
router.post("/createCart", requireSignin, CartController.createCart);
// router.get("/response", requireSignin, CartController.getCartResponse);
router.post('/service/:id', requireSignin, CartController.addServiceToCart)
router.delete('/delete', requireSignin, CartController.deleteCart)


module.exports = router