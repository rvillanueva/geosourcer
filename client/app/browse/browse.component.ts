'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './browse.routes';

export class BrowseComponent {
  $http;
  challenges;
  /*@ngInject*/
  constructor($http) {
    this.$http = $http;
    this.challenges;
    this.getChallenges();
  }
  getChallenges(){
    this.$http.get('/api/challenges').success(challenges => {
      this.challenges = challenges;
    })
    .error(err => {
      console.log(err)
    })
  }
}

export default angular.module('geosourcerApp.browse', [uiRouter])
  .config(routes)
  .component('browse', {
    template: require('./browse.html'),
    controller: BrowseComponent,
    controllerAs: 'browseCtrl'
  })
  .name;
