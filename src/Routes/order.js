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
router.get('/getInvitation/:instellerId', order.getInvitation);
router.get('/getBooking/:instellerId', order.getUpcommingBooking);
router.get('/getOrder/:instellerId', order.getBooking);
router.put('/acceptInvitation/:instellerId', order.acceptInvitation);
router.put('/rejectInvitation/:instellerId', order.rejectInvitation);
router.post('/rating/:orderId', order.giveRating);
router.get('/rating/:instellerId', order.ratingList);

module.exports = router;