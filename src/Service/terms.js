const terms = require('../Models');


exports.AddTerms = async(payload) => {
    try{
    const result = await new terms(payload)
    result.save();
    if(result){
        return {
            success: true, 
            status: 200,
            data: result, 
            message: "Add Terms Successfully"
        }
    }else{
        return {
            success: false, 
            status: 400,
            message: "SomeThing Went Wrong"
        }
    }
    }catch(err){
        console.log(err);
        throw err;
    }
}



exports.getTerms = async() => {
    try{
    const result = await terms.find();
    if(result){
        return {
            success: true,
            status: 200,
            data: result,
            message: "Successfully get"
        }
    }else{
        return {
            success: false,
				status: 400,
				message: "Something Went Wrong"
        }
    }
    }catch(error){
        console.log(error)
		throw error
    }
}


exports.updateTerms = async(termsId, payload) => {
    try{
    const result = await terms.findByIdAndUpdate({_id: termsId}, payload);
    if(result){
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
}catch(error){
    console.log(error);
    throw error
}
}



exports.deleteService = async (ServiceId) => {
	let result = await terms.findOneAndDelete({ _id: ServiceId })
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