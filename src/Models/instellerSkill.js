const { model, Schema } = require("mongoose");

const SkillSchema = new Schema({
        installerId: {
                type: Schema.Types.ObjectId,
                ref: "insteller"
        },
        skillId: {
                type: Schema.Types.ObjectId,
                ref: "skill"
        },
        subSkill: [{
                type: Schema.Types.ObjectId,
                ref: "subSkill"
        }]
}, {
        timestamps: true
})

module.exports = model("instellerSkill", SkillSchema)