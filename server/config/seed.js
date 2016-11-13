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
      title: 'Oil spill mapping',
      description: 'Help the EPA track the spread of oil from the recent Gulf of Mexico spill.',
      search: {
        targets: [
          {
            geo: {
              lat: 29.338414,
              lng: -94.729614
            }
          },
          {
            geo: {
              lat: 29.694540,
              lng: -93.636475
            }
          },
          {
            geo: {
              lat: 29.470015,
              lng: -92.796021
            }
          },
          {
            geo: {
              lat: 29.342594,
              lng: -94.703178
            }
          },
        ],
        radiusKm: 10
      },
      classes: [
        {
          name: 'Heavy Oil Cover'
        },
        {
          name: 'Light Oil Cover'
        },
        {
          name: 'No Oil Cover'
        },
        {
          name: 'Not Water'
        }
      ]
    },{
      title: 'Illegal logging trail prediction',
      description: 'The government of Papua New Guinea is looking to build a model that can identify early signs of logging trails. If they can do that, they will be able to stop logging operations before they move to a new region.',
      search: {
        targets: [
          {
            geo: {
              lat: -6.433450,
              lng: 143.772926
            }
          },
          {
            geo: {
              lat: -6.347934,
              lng: 143.812580
            }
          },
          {
            geo: {
              lat: -6.690278,
              lng: 143.719711
            }
          },
          {
            geo: {
              lat: -6.129823,
              lng: 142.921829
            }
          },
          {
            geo: {
              lat: -5.963214,
              lng: 142.840805
            }
          }
        ],
        radiusKm: 4
      },
      classes: [
        {
          name: 'Main Road'
        },
        {
          name: 'Logging Road'
        },
        {
          name: 'Forest'
        },
        {
          name: 'Other'
        }
      ]
    },
    {
      title: 'Refugee camp resource monitoring',
      description: 'The Humanitarian Foundation is monitoring the status of Syrian refugee camps. Help us identify which camps are temporary versus which are permanent.',
      search: {
        targets: [
          {
            geo: {
              lat: 35.375216,
              lng: 45.610139
            }
          },
          {
            geo: {
              lat: 36.763926,
              lng: 42.895752
            }
          },
          {
            geo: {
              lat: 37.363333,
              lng: 40.271111
            }
          },
          {
            geo: {
              lat: 37.413702,
              lng: 41.393397
            }
          },
          {
            geo: {
              lat: 37.043057,
              lng: 37.903607
            }
          }
        ],
        radiusKm: 1
      },
      classes: [
        {
          name: 'Tents'
        },
        {
          name: 'Permanent Structures'
        },
        {
          name: 'Other'
        }
      ]
    },
    {
      title: 'Map deforestation in the Amazon rainforest',
      description: 'The Amazon rainforest is declining at an alarming rate. The Nature Conservancy is mapping deforestation and needs your help differentiating between forest cover and recently deforested regions.',
      search: {
        targets: [
          {
            geo: {
              lat: -3.627965,
              lng: -63.028221
            }
          },
          {
            geo: {
              lat: -4.004439,
              lng: -63.113022
            }
          },
          {
            geo: {
              lat: -3.948270,
              lng: -63.206062
            }
          }
        ],
        radiusKm: 2
      },
      classes: [
        {
          name: 'Forested Area'
        },
        {
          name: 'Deforested Area'
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
