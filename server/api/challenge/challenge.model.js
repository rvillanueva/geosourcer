'use strict';

import mongoose from 'mongoose';

var ChallengeSchema = new mongoose.Schema({
  name: String,
  info: String,
  active: Boolean
});

export default mongoose.model('Challenge', ChallengeSchema);
