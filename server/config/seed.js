/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
import Challenge from '../api/challenge/challenge.model';
import Label from '../api/label/label.model';
import User from '../api/user/user.model';

Label.find({}).remove();

Challenge.find({}).remove()
  .then(() => {
    Challenge.create({
      title: 'Refugee Camp Monitoring',
      description: 'The Humanitarian Foundation is monitoring the status of Syrian refugee camps. Help us identify which camps are temporary versus which are permanent.',
      search: {
        targets: [
          {
            geo: {
              lat: 37.363333,
              lng: 40.271111
            }
          },
          {
            geo: {
              lat: 36.984384,
              lng: 36.61815
            }
          },
          {
            geo: {
              lat: 37.413702,
              lng: 41.393397
            }
          }
        ],
        radiusKm: 0.2
      },
      classes: [
        {
          name: 'Tents'
        },
        {
          name: 'Permanent Structure'
        },
        {
          name: 'Other'
        }
      ]
    });
  });

User.find({}).remove()
  .then(() => {
    User.create({
      provider: 'local',
      name: 'Test User',
      email: 'test@example.com',
      password: 'test'
    }, {
      provider: 'local',
      role: 'admin',
      name: 'Admin',
      email: 'admin@example.com',
      password: 'admin'
    })
    .then(() => {
      console.log('finished populating users');
    });
  });
