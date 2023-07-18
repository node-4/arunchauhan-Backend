const { accessories } = require('../Models');

exports.addAccessories = async (payload) => {
	try {
		const result = await new accessories(payload)
		result.save()
		if (result) {
			return { success: true, status: 200, data: result, message: "Add accessories successfully" }
		} else {
			return { success: false, status: 400, message: "Something Went Wrong" }
		}
	} catch (error) {
		console.log(error)
		throw error
	}
}
exports.getAccessories = async () => {
	try {
		const result = await accessories.find();
		if (result.length > 0) {
			return { success: true, status: 200, data: result, message: "Accessories data found successfully" }
		} else {
			return { success: false, status: 404, message: "Accessories data not found." }
		}
	} catch (error) {
		console.log(error)
		throw error
	}
}
exports.getAccessoriesById = async (payload) => {
	try {
		const result = await accessories.findById(payload);
		if (result) {
			return { success: true, status: 200, data: result, message: "Accessories data found successfully" }
		} else {
			return { success: false, status: 404, message: "Accessories data not found." }
		}
	} catch (error) {
		console.log(error)
		throw error
	}
}