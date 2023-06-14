const { UserService } = require('../Service');
exports.userRegister = async (req, res, next) => {
	try {

		const payload = req.body
		await UserService.userRegister(req.body.phoneNumber, req.body.name, req.body.password, req.body.location, req.body.vechicle);

		res.status(201).json({
			msg: `otp sent to ${req.body.phoneNumber}`
		})
	} catch (error) {
		next(error);
	}
}

exports.registrationOtpVerification = async (req, res, next) => {
	try {
		const result = await UserService.registrationOtpVerification(req.body.phoneNumber, req.body.otp);

		return res.status(200).json({
			msg: 'registration otp successfuly verified',
			data: result
		})
	} catch (error) {
		next(error);
	}
}

exports.userSignin = async (req, res, next) => {
	try {
		const payload = req.body;
		let result = await UserService.userSignin(payload)
		if (result.success) {
			res.status(result.status).json({
				success: result.success,
				message: result.message,
				token: result.access_token
			})
		}else {
			res.status(result.status).json({
				success: false,
				message: result.message
			})
		}
	 } catch (error) {
		throw error
	 }
  }
		   


exports.getAllUser = async (req, res) => {
	try {
		const result = await UserService.getAllUser()
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
exports.getUser = async (req, res) => {
	try {

		let userId = req.user
		const result = await UserService.getUser(userId)
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


exports.updateUser = async (req, res) => {
	try {
		let payload = req.body;
		console.log(req.body)
		if (req.file) {
			let userProfile = {
				filename: req.file.filename,
				filetype: req.file.mimetype,
				filesize: req.file.size,
				url: process.env.BASE_URL + "public/profile/" + req.file.filename
			}

			payload.profile = userProfile
		}
		let userId = req.user
		let result = await UserService.updateUser(userId, payload)
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

exports.sendOtp = async (req, res) => {
	try {
		let payload = req.body
		let result = await UserService.sendOtp(payload)
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


exports.DeleteUser = async(req,res) => {
	let userId = req.params.userId
		let result = await UserService.DeleteUser(userId)
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
}

exports.changePassword = async (req, res) => {
	try {
		const payload = req.body
		let result = await UserService.changePassword(payload)
		if (result.success) {
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