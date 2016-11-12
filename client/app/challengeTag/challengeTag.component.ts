'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './challengeTag.routes';

export class ChallengeTagComponent {
  L;
  mapboxKey;
  map;
  /*@ngInject*/
  constructor(appConfig) {
    this.L = require('mapbox.js');
    this.mapboxKey = 'pk.eyJ1IjoicnZpbGxhbnVldmEiLCJhIjoiY2l2ZmcyaHR0MDFobDJ5cDM5Z2l4ZGoyNSJ9.bP1AZd2tuj4YO-XwQz-xhA';
    this.initMap();
    var myIcon = L.icon({
    	iconUrl: './assets/images/my-icon.png',
    });

  }

  initMap(){
    this.L.mapbox.accessToken = this.mapboxKey;
    var map = L.mapbox.map('map', 'mapbox.satellite')
      .setView([40, -74.50], 9);
      map.on('click', function(e) {
        L.marker(e.latlng).addTo(map);
    });
  }
}

export default angular.module('geosourcerApp.challengeTag', [uiRouter])
  .config(routes)
  .component('challengeTag', {
    template: require('./challengeTag.html'),
    controller: ChallengeTagComponent,
    controllerAs: 'challengeTagCtrl'
  })
  .name;
