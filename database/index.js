var mongoose = require('mongoose')
var Schema = mongoose.Schema
var db = mongoose.connection

mongoose.connect(
  'mongodb://competely:Youcandoit@ds133796.mlab.com:33796/competely',
  { server: { reconnectTries: Number.MAX_VALUE } }
)

//competely:Youcandoit@ds133796.mlab.com:33796/competely

mongodb: db.on("error", console.error.bind(console, "connection error:"))
db.once('open', function () {
  console.log('you da man and connected in more ways than you know')
})

// const userSchema = new Schema({
//   user_id: Number,
//   first_name: String,
//   last_name: String,
//   username: String,
//   email: String,
//   // comments: [{ body: String, date: Date }],
//   date_of_birth: { type: Date },
//   about_me: String,
//   password: String,
//   friends_id: Array,
//   goals_id: Array,
//   competitions_id: Array,
//   public_profile: Boolean,
//   country: String,
//   state: String,
//   city: String,
//   postal: Number,
//   trophies: Number
// })

const goalsSchema = new Schema({
  goals_id: Number,
  goals_user: String,
  goals_name: String,
  weightTarget: Number,
  repTarget: Number,
  minTarget: Number,
  secsTarget: Number,
  daysTarget: Number,
  category: String,
  category_id: Array,
  start_date: String,
  end_date: String,
  notes: String,
  complete: Boolean,
  description: String,
  checkIns: [{ type: Schema.Types.ObjectId, ref: 'CheckInModel' }]
})

export const GoalsModel = mongoose.model('GoalsModel', goalsSchema)

const checkInSchema = new Schema({
	checkin_id: Number,
	checkin_user: Number,
	goal: { type: Schema.Types.ObjectId, ref: "GoalsModel" },
	date: String,
	weight: Number,
	reps: Number,
	sets: Number,
	min: Number,
	secs: Number,
	target: Number,
	check_in: Boolean
});

export const CheckInModel = mongoose.model('CheckInModel', checkInSchema)

const competitionsSchema = new Schema({
  competitions_id: Number,
  competitions_user: String,
  competitions_pictures: String,
  competitions_name: String,
  competitions_category: String,
  competitions_start_date: Date,
  competitions_end_date: Date,
  competitions_won: Array,
  category_id: Number,
  members: Array,
  winner: Number,
  ranking_list: Array,
  checkIn_id: Number,
  checkIn_name: String,
  status: String,
  trophies: Array,
  trophy_id: Number,
  trophy_name: String
})

export const CompetitionsModel = mongoose.model('CompetitionsModel', competitionsSchema)

const categoriesSchema = new Schema({
  category_id: Number,
  competitions_pictures: Array
});

export const CategoriesModel = mongoose.model('CategoriesModel', categoriesSchema
)