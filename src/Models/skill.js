const { model, Schema } = require("mongoose");

const SkillSchema = new Schema({
        skill: {
                type: String
        },
        image: {
                type: String
        }
}, {
        timestamps: true
})

module.exports = model("skill", SkillSchema)