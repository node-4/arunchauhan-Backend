const { model, Schema } = require("mongoose");

const SkillSchema = new Schema({
        skill: {
                type: Schema.Types.ObjectId,
                required: true,
                ref: "skill"
        },
        name: {
                type: String
        },
        image: {
                type: String
        }
}, {
        timestamps: true
})

module.exports = model("subSkill", SkillSchema)