const { model, Schema } = require("mongoose");

const SkillSchema = new Schema({
        sellerId: {
                type: Schema.Types.ObjectId,
                ref: "insteller"
        },
        skills: {
                type: Array
        }
}, {
        timestamps: true
})

module.exports = model("instellerSkill", SkillSchema)