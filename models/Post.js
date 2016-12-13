var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var schema = new Schema({
  title: {type: String, required: true, index: true, trim: true},
  address: {type: String, required: true, index: true, trim: true},
  password: {type: String},
  createdAt: { type: Date, default: Date.now },
  content: { type: String, required: true, trim: true },
  read: {type: Number, default: 0}
}, {
  toJSON: { virtuals: true},
  toObject: {virtuals: true}
});

var Post = mongoose.model('Post', schema);

module.exports = Post;
