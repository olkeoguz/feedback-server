const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const feedbackSchema = new Schema({
   _id: mongoose.SchemaTypes.ObjectId,
    content: String,
 
   userKey: { type: Schema.Types.ObjectId, ref: 'userkey' }
},  { timestamps: true }
);

module.exports = mongoose.model('feedback', feedbackSchema);
