const { ServiceTypeService } = require('../Service');

exports.addServiceType = async (req, res) => {
	try {
		const payload = req.body
		const result = await ServiceTypeService.addServiceType(payload)
		if (result) {
			return res.status(result.status).json({
				message: result.message,
				success: result.success,
				status: result.status,
				data: result.data
			})
		} else {
			ree.status(result.status).json({
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

exports.getServiceType = async (req, res) => {
	try {
		const result = await ServiceTypeService.getServiceType({})
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

exports.updateServiceType = async (req, res) => {
	try {
		let payload = req.body;

		let ServiceTypeId = req.params.id
		let result = await ServiceTypeService.updateServiceType(ServiceTypeId, payload)
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
		console.log(error)
	}
}

exports.deleteServiceType = async (req, res, next) => {
	try {
		let ServiceTypeId = req.params.ServiceTypeid
		let result = await ServiceTypeService.deleteServiceType(ServiceTypeId)
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