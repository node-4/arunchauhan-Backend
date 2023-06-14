const { periodicService } = require('../Models')

exports.addperiodicService = async (payload) => {
	try {
		const result = await new periodicService(payload)
		result.save()
		if (result) {
			return {
				success: true,
				status: 200,
				data: result,
				message: "Add periodic service Seccessfully"
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

exports.getPeriodicService = async () => {
	try {
		const result = await periodicService.find({})
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


exports.updatePeriodicService = async (periodicServiceId, payload) => {
	try {
		let result = await periodicService.findOneAndUpdate({ _id: periodicServiceId }, payload)
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
		console.log(error)
		throw error
	}
}

exports.deletePeriodicService = async (periodicServiceId) => {
	let result = await periodicService.findOneAndDelete({ _id: periodicServiceId })
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