const { AdminService } = require('../Service')

exports.adminSignup = async (req, res) => {
	try {
		const payload = req.body
		console.log(req.body)
		let result = await AdminService.adminSignup(payload)
		if (result.success) {
			res.status(result.status).json({
				message: result.message,
				success: result.success,
				status: result.status,
				data: result.data,
				token: result.access_token
			})
		} else {
			res.status(result.status).json({
				message: result.message,
				success: result.success,
				status: result.status
			})
		}

	} catch (error) {
		res.status(500).json({
			message: error.message
		})
	}
}

exports.adminSignin = async (req, res, next) => {
	try {
		const payload = req.body;
		// console.log(req.body)
		let result = await AdminService.adminSignin(payload)
		// console.log(result)
		if (result.success) {

			res.status(result.status).json({
				success: result.success,
				message: result.message,
				token: result.access_token
			})
		}
		else {
			res.status(result.status).json({
				success: false,
				message: result.message
			})
		}
	} catch (error) {
		throw error
	}
}

exports.sendMail = async (req, res) => {
	try {
		let payload = req.body
		let result = await AdminService.sendMail(payload)
		console.log(result)
		if (result.success) {
			res.status(result.status).json({
				success: result.success,
				message: result.message,
				// data:result.data,
				otp: result.otp
			})
		}
		else {
			res.status(result.status).json({
				success: false,
				message: result.message
			})
		}

	} catch (error) {
		console.log(error)
		res.status(500).json({
			message: error.message
		})
	}
}

exports.changePassword = async (req, res) => {
	try {
		const payload = req.body
		let result = await AdminService.changePassword(payload)
		if (result.status) {
			res.status(result.status).json({
				success: result.success,
				message: result.message,
				data: result.data
			})
		}
		else {
			res.status(result.status).json({
				success: false,
				message: result.message
			})
		}

	} catch (error) {
		console.log(error)
		res.status(500).json({
			message: error.message
		})
	}
}
