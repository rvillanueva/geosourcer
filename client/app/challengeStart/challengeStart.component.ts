'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './challengeStart.routes';

export class ChallengeStartComponent {
  $http;
  challengeId;
  challenge;
  /*@ngInject*/
  constructor($http, $stateParams) {
    this.$http = $http;
    this.challengeId = $stateParams.challengeId;
    this.getChallenge();
  }
  getChallenge(){
    this.$http.get('/api/challenges/' + this.challengeId).success(challenge => {
      this.challenge = challenge;
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
