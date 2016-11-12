'use strict';
const angular = require('angular');
import LoginController from './login.controller';

export default angular.module('geosourcerApp.login', [])
  .controller('LoginController', LoginController)
  .name;
