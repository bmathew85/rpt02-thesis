var mongoose = require('mongoose')
var Schema = mongoose.Schema

const goalsSchema = new Schema({
  goals_id: Number,
  goals_name: String,
  category_id: Array,
  status: String,
  description: String,
  target: String,
  checkpoint_id: Number,
  ongoing_goal: Boolean
})

export const GoalsModel = mongoose.model('GoalsModel', goalsSchema);
