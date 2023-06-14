const { accessories } = require('../Models');

exports.addAccessories = async (payload) => {
	try {
		const result = await new accessories(payload)
		result.save()
		if (result) {
			return {
				success:true,
				status:200,
				data:result,
				message:"Add accessories successfully"
			}
		}else{
			return{
				success:false,
				status:400,
				message:"Something Went Wrong"
			}
		}
	} catch (error) {
		console.log(error)
		throw error
	}
}