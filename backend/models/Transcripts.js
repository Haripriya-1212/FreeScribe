const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const TranscriptsSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  transcript: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const TranscriptsModel = model('Transcripts', TranscriptsSchema);

module.exports = TranscriptsModel;
