const notify = require('../Models/notification');


exports.AddNotification = async (req, res) => {
    try {
        const data = {
            message: req.body.message,
            image: req.body.image,
            title: req.body.title
        }
        const Data = await notify.create(data)
        return res.status(200).json({
            message: Data
        })
    } catch (err) {
        return res.status(400).json({
            message: err.message
        })
    }
}


exports.GetAllNotification = async (req, res) => {
    try {
        const data = await notify.find();
        return res.status(200).json({
            message: data
        })
    } catch (err) {
        return res.status(400).json({
            message: err.message
        })
    }
}

exports.GetBYNotifyID = async (req, res) => {
    try {
        const data = await notify.findById({ _id: req.params.id })
        return res.status(200).json({
            message: data
        })
    } catch (err) {
        return res.status(400).json({
            message: err.message
        })
    }
}

exports.deleteNotification = async (req, res) => {
    try {
        await notify.findByIdAndDelete({ _id: req.params.id });
        return res.status(200).json({
            message: "Notification Deleted "
        })
    } catch (err) {
        return res.status(400).json({
            message: err.message
        })
    }
}

