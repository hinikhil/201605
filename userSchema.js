var mongoose = require('mongoose'),
	Schema = mongoose.Schema

//WORKING
// 	var feedSchema = new Schema({
// 	username:{type:String,required:true,ref:'user'},// otp -- firstName
// 	feed:{type:String},
// 	likes:[{username:String}],
// 	comment:[{ username : {type :String}
// 	,commentby : {type:String}}],
// 	sharedwith:[{ username : {type:String},status : {type :String ,default:'ACTIVE'}}],
// 	status:{type : String ,default :"ACTIVE"},
// 	Date:{type:Date,default:Date.now}

// })

var UserSchema = new Schema({
	Images:[{Image:{type:String}}],
	Salutation:{type:String},
	FirstName:{type:String,},
	LastName:{type:String},
	Email:{type:String},
	UserRole:{type:String},
	Password:{type:String},
	DOB:{type:Date},
	Gender:{type:String},
	ProfileStartDate:{type:Date},
	Address:[{type:String}],
	Country:{type:String},
	State:{type:String},
	City:{type:String},
	Zipcode:{type:Number},
	Location1:{type:String},
	Location2:{type:String},
	Otp:{type:String},
	OtpStatus:{type:String, default: ""}

})


var userSchema = mongoose.model('userSchema', UserSchema);


module.exports = userSchema;



