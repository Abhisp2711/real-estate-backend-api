const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
   title: {type: String, require: true},
   description: {type: String, require: true},
   price: {type: Number, require: true},
   location: {type: String, require: true},
   type: {type: String,enum: ['buy','rent'], require: true},
   images: [{type: String}],
   user:{type: mongoose.Schema.Types.ObjectId,ref: 'User'},
},{timestamps:true});

module.exports = mongoose.model('Property',propertySchema);