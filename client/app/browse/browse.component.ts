'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './browse.routes';

export class BrowseComponent {
  $http;
  challenges;
  /*@ngInject*/
  constructor($http, appConfig) {
    this.$http = $http;
    this.challenges;
    this.getChallenges();
    this.mapboxKey = appConfig.mapboxKey;
  }
  getChallenges(){
    this.$http.get('/api/challenges').success(challenges => {
      this.challenges = challenges;
      this.challenges.forEach((challenge, c) => {
        challenge.backgroundImageSrc = 'https://api.mapbox.com/styles/v1/mapbox/satellite-v9/static/' + challenge.search.targets[0].geo.lat+ ',' + challenge.search.targets[0].geo.lng + ',14.25,0,0/400x400?access_token=' + this.mapboxKey;
      })
      console.log(this.challenges)
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
