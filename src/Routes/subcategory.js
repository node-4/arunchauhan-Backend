const express = require('express')
const subCategory = require('../Controller/subCegory');

const router = express();


router.post('/', subCategory.AddSubVategory);
router.get('/', subCategory.getAll);
router.delete('/:id', subCategory.DeleteSubCategory)
router.get('/seller/:sellerId', subCategory.getBySellerById);





module.exports = router ; 