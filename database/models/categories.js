var mongoose = require('mongoose')
var Schema = mongoose.Schema

const categorySchema = new Schema({
  category_id: Number,
  category_name: String
})
