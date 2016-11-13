'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './createComplete.routes';

export class CreateCompleteComponent {
  challengeId;
  /*@ngInject*/
  constructor($stateParams) {
    this.challengeId = $stateParams.challengeId;
  }
}

export default angular.module('geosourcerApp.createComplete', [uiRouter])
  .config(routes)
  .component('createComplete', {
    template: require('./createComplete.html'),
    controller: CreateCompleteComponent,
    controllerAs: 'completeCtrl'
  })
  .name;
