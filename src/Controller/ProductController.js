const { ProductService } = require('../Service');

exports.addProduct = async (req, res) => {
	try {
		const payload = req.body
		if (req.files.length > 0) {
			img = req.files.map((file) => {
				return {
					filename: file.filename,
					filesize: file.size,
					filetype: file.mimetype,
					url: "http://ec2-15-206-210-177.ap-south-1.compute.amazonaws.com:1112/" + "public/product/" + file.filename
				}
			})
			payload.productImg = img
		}

		const result = await ProductService.addProduct(payload)
		if (result.status) {
			res.status(result.status).json({
				message: result.message,
				success: result.success,
				status: result.status,
				data: result.data
			})
		}

	} catch (error) {
		console.log(error)
		res.status(500).json({
			message: error.message
		})
	}
}
exports.getProduct = async (req, res) => {
	try {
		const result = await ProductService.getProduct({})
		if (result.success) {
			res.status(result.status).json({
				message: result.message,
				status: result.status,
				success: result.success,
				data: result.data,
			})
		} else {
			res.status(res.status).json({
				message: result.message,
				status: result.status,
				success: result.success
			})
		}

	} catch (error) {
		console.log(error)
		res.status(500).json({
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
					url: process.env.BASE_URL + "public/product/" + file.filename
				}
			})

			payload.productImg = img

		}
		let productId = req.params.productid
		let result = await ProductService.updateProduct(productId, payload)
		if (result.success) {
			res.status(result.code).json({
				success: result.success,
				message: result.message,
				data: result.data
			})
		} else {
			res.status(result.code).json({
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
			res.status(result.status).json({
				success: result.success,
				status: result.status,
				message: result.message,
				data: result.data
			})
		} else {
			res.status(result.status).json({
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
			res.status(result.status).json({
				message: result.message,
				status: result.status,
				success: result.success,
				data: result.data
			})
		} else {
			res.status(result.status).json({
				message: result.message,
				status: result.status,
				success: result.success
			})
		}

	} catch (error) {
		console.log(error)
		res.status(500).json({
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
			res.status(result.status).json({
				message: result.message,
				status: result.status,
				success: result.success,
				data: result.data
			})
		} else {
			res.status(result.status).json({
				message: result.message,
				status: result.status,
				success: result.success
			})
		}

	} catch (error) {
		console.log(error)
		res.status(500).json({
			message: error.message
		})
	}
}

exports.statusChange = async(req,res) => {
	try{
	const productId = req.params.id;
	const result = await ProductService.changeStatus(productId);
	console.log(result)
	res.status(200).json({
		message: result
	})
	}catch(err){
		console.log(err);
		res.status(400).json({
			message: err.message
		})
	}
}


exports.getProductSellerId = async(req,res) => {
	try{
		const sellerId = req.params.sellerId
		const result = await ProductService.getProductSellerId(sellerId)
		console.log(result)
		if (result.status) {
			res.status(result.status).json({
				message: result.message,
				status: result.status,
				success: result.success,
				data: result.data
			})
		} else {
			res.status(result.status).json({
				message: result.message,
				status: result.status,
				success: result.success
			})
		}

	}catch(err){
		console.log(err);
		res.status(400).json({
			message: err.message
		})
	}
}