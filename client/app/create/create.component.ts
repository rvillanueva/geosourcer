'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './create.routes';

export class CreateComponent {
  /*@ngInject*/
  constructor($http, $state) {
    this.challenge = {};
    this.$http = $http;
    this.$state = $state;
    this.searchPointText = '';
  }
  processPoints(){
    var array = this.searchPointText.split('\n');
    console.log(array)
    var pairs = [];
    var returned = [];
    array.forEach((text, t){
      var pair = text.split(',');
      pairs.push(pair)
    })
    console.log(pairs)
    pairs.forEach((pair, p) => {
      if(pair[0] && pair[1] && typeof Number(pair[0]) == 'number' && typeof Number(pair[1]) == 'number'){
        var pushed = {
          geo: {
            lat: pair[0],
            lng: pair[1]
          }
        }
        returned.push(pushed);
      }
    })
    console.log(returned);
    return returned;
  }
  addClass(text){
    console.log('Creating ' + text + ' class')
    this.challenge.classes = this.challenge.classes || [];
    this.challenge.classes.push({
      name: text
    })
    this.addClassText = '';
  }
  create(){
    this.challenge.search = this.challenge.search || {};
    this.challenge.search.targets = this.processPoints();
    this.$http.post('/api/challenges', this.challenge)
    .success(challenge => {
      this.$state.go('createComplete', {
        challengeId: challenge._id
      })
    })
    .error(err => {
      alert(err)
    })
  }
}

export default angular.module('geosourcerApp.create', [uiRouter])
  .config(routes)
  .component('create', {
    template: require('./create.html'),
    controller: CreateComponent,
    controllerAs: 'createCtrl'
  })
  .name;
