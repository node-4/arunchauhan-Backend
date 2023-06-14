const { User, wallet, otp } = require('../Models');
const { generateToken } = require('../Helpers/Token');
const passwordHelper = require('../Helpers/Password');
const { generateOTP, verifyOTP } = require('../Helpers/Otp.js');
const { sendSms } = require('../Helpers/Sms.js');
const { ValidationError } = require('../Errors');
const emailHelper = require('../Helpers/Email');


exports.userRegister = async (phoneNumber, name, password, location, vechicle) => {

	try {
		password = await passwordHelper.hashPassword(password, 10)
		const userExist = await User.findOne({ phone_number: phoneNumber });

		if (userExist) {
			throw new ValidationError('user with phone number already exists');
		}

		const user = new User({
			phone_number: phoneNumber,
			name: name,
			password: password, 
			location: location, 
			vechicle: vechicle
		});

		const otp = await generateOTP(6);

		user.otp = {
			magnitude: otp,
			type: 'registration'
		}
		console.log("otp", otp)

		await user.save();

		await wallet.create({
			user: user._id,
			user_type: "user"
		})
		await sendSms({
			body: `otp is: ${otp}`,
			phoneNumber: `${user.country_code}${user.phone_number}`
		})
	} catch (error) {
		throw error;
	}
}

exports.registrationOtpVerification = async (phoneNumber, otp) => {

	// console.log("phoneNumber",phoneNumber,"otp",otp)
	try {
		const user = await User.findOne({
			phone_number: phoneNumber,
			"otp.magnitude": otp
		}).select("+otp");

		console.log("user", user.otp)

		if (!user) {
			throw new ValidationError('invalid otp');
		}

		const isValidOtp = await verifyOTP({
			created: user.otp.created,
			magnitude: user.otp.magnitude,
			type: user.otp.type,
			reqOTPType: 'registration',
			userOTP: otp
		})
		// console.log("isValidOtp",isValidOtp)

		if (!isValidOtp) {
			throw new ValidationError('invalid otp');
		}

		const token = await generateToken(user, 'login');

		return {
			loginToken: token,
			signupProcessCompleted: user.signup_process_complete,
			deliveryprefrencesCompleted: user.delivery_prefrences_completed
		};
	} catch (error) {
		throw error;
	}
}

exports.userSignin = async (payload) => {
	try {
		const result = await User.findOne({ phone_number: payload.phone_number });
		if (result) {
			const isValid = await passwordHelper.isValidPassword(payload.password, result.password);
			if (isValid) {
				const newToken = await generateToken(result, 'login');
				console.log("result", result);
				return {
					success: true,
					status: 200,
					message: "Login successfully",
					data: result,
					access_token: newToken
				}
			} else {
				return {
					success: false,
					status: 400,
					message: "Email or password is incorrect"
				};
			}
		} else {
			return {
				success: false,
				status: 404,
				message: 'User Not Found'
			}
		}


	} catch (error) {
		console.log(error)
		throw error
	}
}

exports.getAllUser = async () => {
	try {
		const result = await User.find({})
		if (result) {
			return {
				success: true,
				status: 200,
				data: result,
				message: "Successfully get"
			}
		} else {
			return {
				success: false,
				status: 400,
				message: "Something Went Wrong"
			}
		}

	} catch (error) {
		console.log(error)
		throw error
	}

}

exports.getUser = async (userId) => {
	try {
		console.log("userid",userId)
		const result = await User.findOne({_id:userId})
		if (result) {
			return {
				success: true,
				status: 200,
				data: result,
				message: "Successfully get"
			}
		} else {
			return {
				success: false,
				status: 400,
				message: "Something Went Wrong"
			}
		}

	} catch (error) {
		console.log(error)
		throw error
	}

}

exports.updateUser = async (userId, payload) => {
	try {
		let result = await User.findOneAndUpdate({ _id: userId }, payload)
		if (result) {
			return {
				success: true,
				data: result,
				code: 200,
				message: 'Successfully updated'
			}
		} else {
			return {
				success: false,
				code: 404,
				error: 'Record Not Found!!!'
			}
		}

	} catch (error) {
		throw error
	}
}

exports.sendOtp = async (payload) => {
	try {
		console.log("hwllo")
		const result = await User.findOne({ phone_number: payload.phoneNumber })
		if (result) {
			const code = Math.floor(100000 + Math.random() * 900000);
			let otpData = await otp.findOne({ phone_number: payload.phoneNumber });
			if (!otpData) {
				otpData = new otp();
			}
			console.log("otpData", otpData)
			otpData.phone_number = payload.phoneNumber;
			otpData.code = code;
			otpData.expiresIn = new Date().getTime() + 300 * 1000;
			await otpData.save();
			await sendSms(result.phone_number, `Otp is: ${code}`, payload.phoneNumber)
			return {
				success: true,
				status: 200,
				message: 'Otp send SuccesFully Your Phone number',
				data: result,
				otp: code
			}

		} else {
			return {
				success: false,
				status: 400,
				message: 'Phone number not found'
			}
		}
	} catch (error) {
		console.log(error)
		throw error
	}
}

exports.changePassword = async (payload) => {
	try {
		console.log(payload)
		const result = await otp.findOne({ code: payload.code, phone_number: payload.phoneNumber });
		console.log("ent", result)
		if (result) {
			let currentTime = new Date().getTime();
			let diff = result.expireIn - currentTime
			if (diff < 0) {
				return {
					success: false,
					status: 400,
					message: "otp expires"
				}

			} else {
				let _user = await User.findOne({ phone_number: payload.phoneNumber });
				console.log("_user", _user)
				if (_user) {

					payload.password = await passwordHelper.hashPassword(payload.password, 10);
					_user.password = payload.password
					await otp.deleteOne({
						phone_number: result.phoneNumber
					})
					_user.save()
					return {
						success: true,
						status: 200,
						message: "Password Change succefully"

					}

				}
			}
		} else {
			return {
				success: false,
				status: 400,
				message: 'Something went wrong'
			}
		}
	} catch (error) {
		throw error
		console.log(error)
	}
}


exports.DeleteUser = async(userId) => {
	let result = await User.findOneAndDelete({ _id: userId })
	if (result) {
		return {
			success: true,
			data: result,
			status: 200,
			message: 'Successfully Deleted'

		}
	} else {
		return {
			success: false,
			status: 404,
			error: 'Record Not Found!!!'
		}
	}
}