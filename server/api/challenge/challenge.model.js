'use strict';

import mongoose from 'mongoose';

var ChallengeSchema = new mongoose.Schema({
  title: String,
  description: String,
  ownerId: String,
  search: {
    targets: [
      {
        geo: {
          lat: Number,
          lng: Number
        }
      }
    ],
    radiusKm: Number
  },
  classes: [
    {
      name: String
    }
  ]
});

export default mongoose.model('Challenge', ChallengeSchema);
