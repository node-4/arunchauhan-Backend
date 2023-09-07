const { AccessoriesService } = require('../Service')

exports.addAccessories = async (req, res) => {
	if (req.file) {
		req.body.url = req.file ? req.file.path : "";
	}
	const payload = req.body
	const result = await AccessoriesService.addAccessories(payload)
	if (result.success) {
		return res.status(result.status).json({ message: result.message, status: result.status, success: result.success, data: result.data, })
	} else {
		return res.status(result.status).json({ message: result.message, success: result.success, status: result.status })
	}

}
exports.getAccessories = async (req, res) => {
	const result = await AccessoriesService.getAccessories()
	if (result.success) {
		return res.status(result.status).json({ message: result.message, status: result.status, success: result.success, data: result.data, })
	} else {
		return res.status(result.status).json({ message: result.message, success: result.success, status: result.status })
	}

}
exports.getAccessoriesById = async (req, res) => {
	const result = await AccessoriesService.getAccessoriesById(req.params.id)
	if (result.success) {
		return res.status(result.status).json({ message: result.message, status: result.status, success: result.success, data: result.data, })
	} else {
		return res.status(result.status).json({ message: result.message, success: result.success, status: result.status })
	}

}