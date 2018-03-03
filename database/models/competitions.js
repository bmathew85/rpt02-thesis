var mongoose = require('mongoose')
var Schema = mongoose.Schema

const competitionsSchema = new Schema({
	competitions_id: Number,
	competitions_name: String,
	start_date: Date,
	end_date: Date,
	category_name: String,
	category_id: Number,
	members: Array,
	winner: Number,
	ranking_list: Array,
	trophies: Array,
	checkpoint_id: Number,
	checkpoint_name: String,
	status: String,
	trophy_id: Number,
	trophy_name: String
});

export const CompetitionsModel = mongoose.model("CompetitionsModel", competitionsSchema);
