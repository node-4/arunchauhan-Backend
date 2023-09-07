const { CategoryService } = require('../Service');

exports.addCategory = async (req, res) => {
	try {
		const payload = req.body
		if (req.file) {
			let categoryImg = {
				filename: req.file.filename,
				filetype: req.file.mimetype,
				filesize: req.file.size,
				url: req.file.path
			}
			console.log(categoryImg);
			payload.categoryImg = categoryImg
		}
		const result = await CategoryService.addCategory(payload)
		if (result.status) {
			return res.status(result.status).json({
				message: result.message,
				success: result.success,
				status: result.status,
				data: result.data,

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

exports.getCategory = async (req, res,) => {
	try {
		let result = await CategoryService.getCategory({})
		if (result.success) {

			return res.status(result.status).json({
				message: result.message,
				success: result.success,
				status: result.status,
				data: result.data,

			})
		} else {
			return res.status(result.status).json({
				success: result.success,
				status: result.status,
				message: result.message
			})
		}

	} catch (error) {
		console.log(error);
		return res.status(500).json({
			message: error.message
		})
	}
}


exports.updateCategory = async (req, res) => {
	try {
		let payload = req.body;
		console.log(req.body)
		if (req.file) {
			let categoryImg = {
				filename: req.file.filename,
				filetype: req.file.mimetype,
				filesize: req.file.size,
				url: req.file.path
			}

			payload.categoryImg = categoryImg
		}
		let categoryId = req.params.categoryid
		let result = await CategoryService.updateCategory(categoryId, payload)
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

exports.deleteCategory = async (req, res, next) => {
	try {
		let categoryId = req.params.categoryid
		let result = await CategoryService.deleteCategory(categoryId)
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


exports.getCategoryBySellerId = async (req, res, next) => {
	try {
		let sellerId = req.params.sellerId
		let result = await CategoryService.getCategorySellerId(sellerId)
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
	} catch (err) {
		next(err)
	}
}


