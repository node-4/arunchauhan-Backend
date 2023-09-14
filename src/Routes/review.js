const express = require('express');
const review = require('../Controller/review');
const { requireSignin } = require('../MiddleWare/Auth');

const router = express();


router.post('/', review.AddReview);
router.get('/', review.getAll);
router.get('/bytoken', requireSignin, review.getAllbyToken);
router.get('/:id', review.getReviewById)
router.put('/:id', review.updateReview)
router.delete('/:id', review.deleteReview)
router.post('/:id', review.changeStatus)



module.exports = router;

