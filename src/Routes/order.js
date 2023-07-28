const express = require('express');
const order = require('../Controller/order');
const { requireSignin } = require('../MiddleWare/Auth')

const router = express();

router.post('/create', requireSignin, order.createOrder);
router.get('/', order.getAllOrders);
router.get('/:id', order.getOrderById);
router.put('/:id', order.updateOrder);
router.delete('/:id', order.deleteOrder);
router.get('/getAllPaidOrder/:id', order.getAllPaidOrder)
router.get('/getAllOrders/ByToken', requireSignin, order.getAllOrdersByToken);

module.exports = router;