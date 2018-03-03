var mongoose = require('mongoose')
var Schema = mongoose.Schema

const userSchema = new Schema({
  user_id: Number,
  first_name: String,
  last_name: String,
  username: String,
  email: String,
  // comments: [{ body: String, date: Date }],
  date_of_birth: { type: Date },
  about_me: String,
  password: String,
  friends_id: Array,
  goals_id: Array,
  competitions_id: Array,
  public_profile: Boolean,
  country: String,
  state: String,
  city: String,
  postal: Number,
  trophies: Number
})
