var mongoose = require('mongoose');

var BucketSchema = new mongoose.Schema({
  _user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  _tag: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  title: {
    type: String,
    minlength: 5,
    required: true
  },
  description: {
    type: String,
    minlength: 10,
    required: true
  },
  status: {
    type: String,
    default: "false"
  }
},{timestamps: true});

mongoose.model('Bucket', BucketSchema);
