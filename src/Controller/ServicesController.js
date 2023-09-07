const { ServicesService } = require('../Service');

exports.addService = async (req, res) => {
	try {
		const payload = req.body
		console.log(payload)
		// if (req.file) {
		// 	let serviceImg = {
		// 		filename: req.file.filename,
		// 		filetype: req.file.mimetype,
		// 		filesize: req.file.size,
		// 		url: process.env.BASE_URL + "public/service/" + req.file.filename
		// 	}
		// 	payload.serviceImg = serviceImg
		// }
		const result = await ServicesService.addService(payload)
		if (result) {
			return res.status(result.status).json({
				message: result.message,
				success: result.success,
				status: result.status,
				data: result.data
			})
		} else {
			return res.status(result.status).json({
				message: result.message,
				success: result.success,
				status: result.status
			})
		}

	} catch (error) {
		console.log(error)
		return res.status(500).json({
			message: error.message
		})
	}
}

exports.getService = async (req, res) => {
	try {
		const result = await ServicesService.getService({})
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

exports.getServiceByServiceTypeId = async (req, res) => {
	try {
		const serviceTypeId = req.params.ServiceTypeid
		const result = await ServicesService.getServiceByServiceTypeId(serviceTypeId)
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

exports.updateService = async (req, res) => {
	try {
		let payload = req.body;
		if (req.file) {
			let serviceImg = {
				filename: req.file.filename,
				filetype: req.file.mimetype,
				filesize: req.file.size,
				url: req.file.path
			}

			payload.serviceImg = serviceImg
		}
		let ServiceId = req.params.serviceid
		let result = await ServicesService.updateServices(ServiceId, payload)
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
				message: result.error
			})
		}
	} catch (error) {
		throw error
	}
}


exports.deleteService = async (req, res, next) => {
	try {
		let ServiceId = req.params.serviceid
		let result = await ServicesService.deleteService(ServiceId)
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

exports.getSellelerSellerId = async (req, res) => {
	try {
		const sellerId = req.params.sellerId
		const result = await ServicesService.getServicesSellerId(sellerId)
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
