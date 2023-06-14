const express = require('express');
const router = express.Router();
const {ServicesController} = require('../Controller');
const {upload_service} = require('../MiddleWare/FileUpload');

router.post('/',ServicesController.addService);
router.get('/',ServicesController.getService);
router.get('/:ServiceTypeid',ServicesController.getServiceByServiceTypeId);
router.put('/:serviceid',upload_service.single('myField'),ServicesController.updateService);
router.delete('/:serviceid',ServicesController.deleteService);
router.get('/seller/:sellerId', ServicesController.getSellelerSellerId)

module.exports = router
