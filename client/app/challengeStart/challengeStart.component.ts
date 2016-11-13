'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './challengeStart.routes';

export class ChallengeStartComponent {
  $http;
  challengeId;
  challenge;
  /*@ngInject*/
  constructor($http, $stateParams, appConfig) {
    this.$http = $http;
    this.challengeId = $stateParams.challengeId;
    this.mapboxKey = appConfig.mapboxKey;

    this.getChallenge();
  }
  getChallenge(){
    this.$http.get('/api/challenges/' + this.challengeId).success(challenge => {
      this.challenge = challenge;
      this.backgroundImageSrc = 'https://api.mapbox.com/styles/v1/mapbox/satellite-v9/static/' + challenge.search.targets[0].geo.lat+ ',' + challenge.search.targets[0].geo.lng + ',14.25,0,0/800x200?access_token=' + this.mapboxKey;
    }).error(err => {
      console.log(err);
    })
  }
}

export default angular.module('geosourcerApp.challengeStart', [uiRouter])
  .config(routes)
  .component('challengeStart', {
    template: require('./challengeStart.html'),
    controller: ChallengeStartComponent,
    controllerAs: 'startCtrl'
  })
  .name;
