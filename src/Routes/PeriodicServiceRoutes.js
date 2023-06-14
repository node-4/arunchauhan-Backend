const express = require('express');
const router = express.Router();
const {PeriodicServiceController} = require('../Controller');
const {upload_periodicservice} = require('../MiddleWare/FileUpload')
const {requireSignin} = require('../MiddleWare/Auth')

router.post('/',upload_periodicservice.single("myField"),PeriodicServiceController.addPeriodicService);
router.get('/',PeriodicServiceController.getPeriodicService);
router.put('/:periodicServiceid',upload_periodicservice.single("myField"),PeriodicServiceController.updatePeriodicService);
router.delete('/:periodicServiceid',PeriodicServiceController.deletePeriodicService);
router.post('/review',requireSignin,PeriodicServiceController.createPeriodicServiceReview);
router.get('/review',requireSignin,PeriodicServiceController.getPeriodicServiceReviews);
router.delete('/review',requireSignin,PeriodicServiceController.deleteReview);



module.exports = router