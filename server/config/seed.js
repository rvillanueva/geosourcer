/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
import Challenge from '../api/challenge/challenge.model';
import User from '../api/user/user.model';

Challenge.find({}).remove()
  .then(() => {
    Challenge.create({
      title: 'Find illegal logging roads',
      description: 'The World Forestry Foundation is working to stop deforestation in Brazil...',
      search: {
        targets: [
          {
            geo: {
              lat: 55,
              lng: 55
            }
          }
        ],
        radiusKm: 2
      },
      classes: [
        {
          name: 'Forest'
        },
        {
          name: 'Water'
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
