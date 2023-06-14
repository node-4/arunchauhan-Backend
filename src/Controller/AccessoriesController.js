const {AccessoriesService} = require('../Service')

exports.addAccessories = async(req,res) => {

	const payload = req.body
	if(req.file) {
		const accessoriesImg ={
			
		}
	}
	const result = await AccessoriesService.addAccessories(payload)
	if(result.success){
		res.status(result.status).json({
			message:result.message,
			status:result.status,
			success:result.success,
			data:result.data,

		})
	}else{
		res.status(result.status).json({
			message:result.message,
			success:result.success,
			status:result.status
		})
	}

}