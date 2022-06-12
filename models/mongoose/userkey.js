const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userkeySchema = new Schema({
   _id: mongoose.SchemaTypes.ObjectId,
    userKey: String, 
},  { timestamps: true }
);

module.exports = mongoose.model('userkey', userkeySchema);
