'use strict';

import mongoose from 'mongoose';

var LabelSchema = new mongoose.Schema({
  geo: {
    lat: Number,
    lng: Number
  },
  classId: String,
  userId: String,
  challengeId: String,
  targetId: String,
  created: Date
});

export default mongoose.model('Label', LabelSchema);
