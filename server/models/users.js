var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

var UserSchema = mongoose.Schema({
	firstname: {
		type: String,
		required: true,
		minlength: 3
	},
  lastname: {
		type: String,
		required: true,
		minlength: 3
	},
	email: {
		type: String,
		required: true,
		unique: true
	},
  birthday: {
		type: Date,
		required: true,
	},
	password: {
		type: String,
		required: true
	},
	buckets: [{
      type: mongoose.Schema.Types.ObjectId,
      ref:'Bucket'
    }],
}, {timestamps: true});


// UserSchema.pre('save', function(done){
// 	this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(10));
// 	done();
// })


var User = mongoose.model('User', UserSchema);
