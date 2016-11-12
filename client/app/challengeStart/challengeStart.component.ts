'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './challengeStart.routes';

export class ChallengeStartComponent {
  /*@ngInject*/
  constructor() {
    this.message = 'Hello';
  }
}

export default angular.module('geosourcerApp.challengeStart', [uiRouter])
  .config(routes)
  .component('challengeStart', {
    template: require('./challengeStart.html'),
    controller: ChallengeStartComponent,
    controllerAs: 'challengeStartCtrl'
  })
  .name;
