'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './manage.routes';

export class ManageComponent {
  $http;
  challenges;
  /*@ngInject*/
  constructor($http) {
    this.$http = $http;
    this.challenges;
    this.getChallenges();
  }
  getChallenges(){
    this.$http.get('/api/challenges/manage').success(challenges => {
      this.challenges = challenges;
      console.log(this.challenges)
    })
    .error(err => {
      console.log(err)
    })
  }
}

export default angular.module('geosourcerApp.manage', [uiRouter])
  .config(routes)
  .component('manage', {
    template: require('./manage.html'),
    controller: ManageComponent,
    controllerAs: 'manageCtrl'
  })
  .name;
