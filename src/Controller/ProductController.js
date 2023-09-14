const { ProductService } = require('../Service');
const product = require('../Models/Product');
const Wishlist = require('../Models/WishlistModel');
exports.addProduct = async (req, res) => {
	try {
		const payload = req.body
		if (req.files.length > 0) {
			img = req.files.map((file) => {
				return {
					filename: file.filename,
					filesize: file.size,
					filetype: file.mimetype,
					url: file.path
				}
			})
			payload.productImg = img
		}

		const result = await ProductService.addProduct(payload)
		if (result.status) {
			return res.status(result.status).json({
				message: result.message,
				success: result.success,
				status: result.status,
				data: result.data
			})
		}

	} catch (error) {
		console.log(error)
		return res.status(500).json({
			message: error.message
		})
	}
}
exports.getProduct = async (req, res) => {
	try {
		const result = await ProductService.getProduct({})
		if (result.success) {
			return res.status(result.status).json({
				message: result.message,
				status: result.status,
				success: result.success,
				data: result.data,
			})
		} else {
			return res.status(res.status).json({
				message: result.message,
				status: result.status,
				success: result.success
			})
		}

	} catch (error) {
		console.log(error)
		return res.status(500).json({
			message: error.message
		})
	}
}
exports.updateProduct = async (req, res) => {
	try {
		let payload = req.body;
		console.log(req.body)
		if (req.files.length > 0) {
			img = req.files.map((file) => {
				return {
					filename: file.filename,
					filesize: file.size,
					filetype: file.mimetype,
					url: req.file.path
				}
			})

			payload.productImg = img

		}
		let productId = req.params.productid
		let result = await ProductService.updateProduct(productId, payload)
		if (result.success) {
			return res.status(result.code).json({
				success: result.success,
				message: result.message,
				data: result.data
			})
		} else {
			return res.status(result.code).json({
				success: result.success,
				message: result.error
			})
		}
	} catch (error) {
		throw error
	}
}
exports.deleteProduct = async (req, res, next) => {
	try {
		let productId = req.params.productid
		let result = await ProductService.deleteProduct(productId)
		if (result.success) {
			return res.status(result.status).json({
				success: result.success,
				status: result.status,
				message: result.message,
				data: result.data
			})
		} else {
			return res.status(result.status).json({
				success: result.success,
				status: result.status,
				message: result.error
			})
		}

	} catch (error) {
		next(error)
	}
}
exports.getProductByCategoryId = async (req, res) => {
	try {
		const categoryId = req.params.id
		console.log(categoryId)
		const result = await ProductService.getProductByCategoryId(categoryId)
		console.log(result)
		if (result.status) {
			return res.status(result.status).json({
				message: result.message,
				status: result.status,
				success: result.success,
				data: result.data
			})
		} else {
			return res.status(result.status).json({
				message: result.message,
				status: result.status,
				success: result.success
			})
		}

	} catch (error) {
		console.log(error)
		return res.status(500).json({
			message: error.message
		})
	}
}
exports.getProductByBrandId = async (req, res) => {
	try {
		const brandId = req.params.id
		console.log(brandId)
		const result = await ProductService.getProductByBrandId(brandId)
		console.log(result)
		if (result.status) {
			return res.status(result.status).json({
				message: result.message,
				status: result.status,
				success: result.success,
				data: result.data
			})
		} else {
			return res.status(result.status).json({
				message: result.message,
				status: result.status,
				success: result.success
			})
		}

	} catch (error) {
		console.log(error)
		return res.status(500).json({
			message: error.message
		})
	}
}
exports.statusChange = async (req, res) => {
	try {
		const productId = req.params.id;
		const result = await ProductService.changeStatus(productId);
		console.log(result)
		return res.status(200).json({
			message: result
		})
	} catch (err) {
		console.log(err);
		return res.status(400).json({
			message: err.message
		})
	}
}
exports.getProductSellerId = async (req, res) => {
	try {
		const sellerId = req.params.sellerId
		const result = await ProductService.getProductSellerId(sellerId)
		console.log(result)
		if (result.status) {
			return res.status(result.status).json({
				message: result.message,
				status: result.status,
				success: result.success,
				data: result.data
			})
		} else {
			return res.status(result.status).json({
				message: result.message,
				status: result.status,
				success: result.success
			})
		}

	} catch (err) {
		console.log(err);
		return res.status(400).json({
			message: err.message
		})
	}
}
exports.createWishlist = async (req, res, next) => {
	try {
		const productId = req.params.id;
		const viewProduct = await product.findById(productId);
		let wishList = await Wishlist.findOne({ user: req.user._id });
		if (!wishList) {
			wishList = new Wishlist({ user: req.user._id, });
		}
		wishList.products.addToSet(productId);
		viewProduct.Wishlistuser.addToSet(req.user._id);
		await wishList.save();
		await viewProduct.save();
		return res.status(200).json({ status: 200, message: "product add to wishlist Successfully", });
	} catch (error) {
		console.log(error);
		return res.status(501).send({ status: 501, message: "server error.", data: {}, });
	}
};
exports.removeFromWishlist = async (req, res, next) => {
	try {
		const wishlist = await Wishlist.findOne({ user: req.user._id });
		if (!wishlist) {
			return res.status(404).json({ message: "Wishlist not found", status: 404 });
		}
		const productId = req.params.id;
		const viewProduct = await product.findById(productId);
		wishlist.products.pull(productId);
		viewProduct.Wishlistuser.pull(req.user._id);
		await wishlist.save();
		await viewProduct.save();
		return res.status(200).json({ status: 200, message: "Removed From Wishlist", });
	} catch (error) {
		console.log(error);
		return res.status(501).send({ status: 501, message: "server error.", data: {}, });
	}
};
exports.myWishlist = async (req, res, next) => {
	try {
		let myList = await Wishlist.findOne({ user: req.user._id }).populate('products');
		if (!myList) {
			myList = await Wishlist.create({ user: req.user._id });
		}
		let array = []
		for (let i = 0; i < myList.products.length; i++) {
			const data = await product.findById(myList.products[i]._id).populate('category_id subCategory brand')
			array.push(data)
		}
		let obj = {
			_id: myList._id,
			user: myList.user,
			products: array,
			__v: myList.__v
		}

		return res.status(200).json({ status: 200, wishlist: obj, });
	} catch (error) {
		console.log(error);
		return res.status(501).send({ status: 501, message: "server error.", data: {}, });
	}
};