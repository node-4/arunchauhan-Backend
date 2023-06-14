const express = require('express');
const review = require('../Controller/review');

const router= express();


router.post('/', review.AddReview);
router.get('/', review.getAll);
router.get('/:id', review.getReviewById)
router.put('/:id', review.updateReview)
router.delete('/:id', review.deleteReview)



module.exports = router;

