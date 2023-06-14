const { BrandService } = require('../Service');

exports.addBrand = async (req, res) => {
	try {
		const payload = req.body
		console.log(payload)
		if (req.file) {
			let brandImg = {
				filename: req.file.filename,
				filetype: req.file.mimetype,
				filesize: req.file.size,
				url: process.env.BASE_URL + "public/brand/" + req.file.filename
			}

			payload.brandImg = brandImg
		}
		const result = await BrandService.addBrand(payload)
		if (result.status) {
			res.status(result.status).json({
				message: result.message,
				success: result.success,
				status: result.status,
				data: result.data,

			})
		} else {
			res.status(result.status).json({
				message: result.message,
				status: result.status,
				success: success
			})
		}


	} catch (error) {
		console.log(error)
		res.status(500).json({
			message: error.message
		})
	}
}

exports.getBrand = async (req, res,) => {
	try {
		let result = await BrandService.getBrand({})
		if (result.success) {

			res.status(result.status).json({
				message: result.message,
				success: result.success,
				status: result.status,
				data: result.data,

			})
		} else {
			res.status(result.status).json({
				message: result.message,
				success: result.success,
				status: result.status,
			})
		}

	} catch (error) {
		console.log(error);
		res.status(500).json({
			message: error.message
		})
	}
}


exports.updateBrand = async (req, res) => {
	try {
		let payload = req.body;
		console.log(req.body)
		if (req.file) {
			let brandImg = {
				filename: req.file.filename,
				filetype: req.file.mimetype,
				filesize: req.file.size,
				url: process.env.BASE_URL + "public/brand/" + req.file.filename
			}

			payload.brandImg = brandImg
		}
		let brandId = req.params.brandid
		let result = await BrandService.updateBrand(brandId, payload)
		if (result.success) {
			res.status(result.code).json({
				success: result.success,
				status: result.code,
				message: result.message,
				data: result.data
			})
		} else {
			res.status(result.code).json({
				success: result.success,
				status: result.code,
				message: result.error
			})
		}
	} catch (error) {
		throw error
	}
}

exports.deleteBrand = async (req, res, next) => {
	try {
		let brandId = req.params.brandid
		let result = await BrandService.deleteBrand(brandId)
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