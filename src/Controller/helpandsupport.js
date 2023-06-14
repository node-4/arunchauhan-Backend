const help = require('../Models/helpAndSupport');



exports.Add = async(req,res) => {
    try{
    const data = {
        name: req.body.name, 
        email: req.body.email,
        desc : req.body .desc,
    }
    const result = await help.create(data);
    res.status(200).json({
        message: result
    })
    }catch(err){
        console.log(err);
        res.status(200).json({
            message: err.message
        })
    }
}

exports.getAll = async(req,res) => {
    try{
    const result = await help.find();
    res.status(200).json({
        message: "ok",
        result: result
    })
    }catch(err){
            console.log(err);
            res.status(200).json({
                message: err.message
            })
    }
}

exports.Delete = async(req,res) => {
    try{
    await help.findByIdAndDelete({_id: req.params.id});
    res.status(200).json({
        message: "Deleted "
    })
    }catch(err){
          console.log(err);
            res.status(200).json({
                message: err.message
            })
    }
}