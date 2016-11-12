'use strict';

var mapboxKey = process.env.MAPBOX_PUBLIC_TOKEN;
console.log(mapboxKey);

exports = module.exports = {
  // List of user roles
  userRoles: ['guest', 'user', 'admin'],
  mapboxKey: mapboxKey
};
