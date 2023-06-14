const express = require('express');
const router = express.Router();
const {CategoryController} = require('../Controller')
const {upload_category} = require('../MiddleWare/FileUpload')

router.post('/',upload_category.single('myField'),CategoryController.addCategory);
router.get('/',CategoryController.getCategory);
router.put('/:categoryid',upload_category.single('myField'),CategoryController.updateCategory);
router.delete('/:categoryid',CategoryController.deleteCategory);
router.get('/seller/:sellerId', CategoryController.getCategoryBySellerId);




module.exports = router
 