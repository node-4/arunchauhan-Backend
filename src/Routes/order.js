const express = require('express');
const order = require('../Controller/order');
const {requireSignin} = require('../MiddleWare/Auth')

const router = express();

router.post('/',requireSignin, order.createOrder);
router.get('/', order.getAllOrders);
router.get('/:id', order.getOrderById);
router.put('/:id', order.updateOrder);
router.delete('/:id', order.deleteOrder);
router.get('/getAllPaidOrder/:id', order.getAllPaidOrder)

module.exports = router;