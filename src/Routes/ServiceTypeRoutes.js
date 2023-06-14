const express = require('express');
const router = express.Router();
const {ServiceTypeController} = require('../Controller');


router.post('/',ServiceTypeController.addServiceType);
router.get('/',ServiceTypeController.getServiceType);
router.put('/:id',ServiceTypeController.updateServiceType);
router.delete('/:ServiceTypeid',ServiceTypeController.deleteServiceType);


module.exports = router
