const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create Schema
const ProfileSchema = new Schema({
  user_id: {
    type: String,
    require: true
  },
  type: {
    type: String,
    require: true
  },
  costType: {
    type: String,
    require: true
  },
  describe: {
    type: String,
    require: true
  },
  cost: {
    type: Number,
    require: true
  },
  remark: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
})

module.exports = Profile = mongoose.model('profiles', ProfileSchema)
