const { serviceType } = require('../Models');

exports.addServiceType = async (payload) => {
	try {

		let service = await serviceType.findOne({
			serviceTypeName: payload.serviceTypeName
		})
		if (service) {
			return {
				status: 400,
				message: "Service Type already added"
			}
		}
		if (!service) {
			const result = await new serviceType(payload)
			result.save()
			if (result) {
				return {
					success: true,
					status: 200,
					data: result,
					message: 'Add service type Successfully'
				}
			} else {
				return {
					success: false,
					status: 400,
					message: "Something went wrong"

				}
			}
		}

	} catch (error) {
		console.log(error)
		throw error
	}
}

exports.getServiceType = async () => {
	try {
		const result = await serviceType.find({})
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


exports.updateServiceType = async (ServiceTypeId, payload) => {
	try {
		let result = await serviceType.findOneAndUpdate({ _id: ServiceTypeId }, payload)
		if (result) {
			return {
				success: true,
				data: result,
				status: 200,
				message: 'Successfully updated'
			}
		} else {
			return {
				success: false,
				status: 404,
				error: 'Record Not Found!!!'
			}
		}

	} catch (error) {
		console.log(error)
		throw error
	}
}

exports.deleteServiceType = async (ServiceTypeId) => {
	let result = await serviceType.findOneAndDelete({ _id: ServiceTypeId })
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
