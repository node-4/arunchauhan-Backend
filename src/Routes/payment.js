const express = require('express');
//const  payment = require('../controllers/admin/payment')
const Payment = require('../Controller/payment')
const paymentRouter = express();

//ADMIN

paymentRouter.post('/user/createpayment/:id', Payment.CreatePayment)
paymentRouter.get('/GetpaymentById/:id', Payment.GetpaymentById)
paymentRouter.get('/GetAllPayments', Payment.GetAllPayments)
paymentRouter.get('/GetPaymentByUserId/:user', Payment.GetPaymentByUserId)
paymentRouter.put('/updatePayment/:id', Payment.updatePayment)
paymentRouter.delete('/deletepayment/:id', Payment.deletepayment)

module.exports = paymentRouter;