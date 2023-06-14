const { model, Schema } = require('mongoose');

const blogSchema = new Schema({

  title: {
    type: String,
    required: true
  },

  content: {
    type: String,
    required: true
  },

  blogImg: {
    type: String

  }


},
  {
    timestamps: true
  })

module.exports = model('blog', blogSchema)
