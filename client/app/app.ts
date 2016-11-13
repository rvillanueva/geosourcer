'use strict';
const angular = require('angular');
// import ngAnimate from 'angular-animate';
const ngCookies = require('angular-cookies');
const ngResource = require('angular-resource');
const ngSanitize = require('angular-sanitize');


const uiRouter = require('angular-ui-router');
const uiBootstrap = require('angular-ui-bootstrap');
// const ngMessages = require('angular-messages');
// import ngValidationMatch from 'angular-validation-match';


import {routeConfig} from './app.config';

import _Auth from '../components/auth/auth.module';
import account from './account';
import admin from './admin';
import navbar from '../components/navbar/navbar.component';
import footer from '../components/footer/footer.component';
import main from './main/main.component';
import browse from './browse/browse.component';
import manage from './manage/manage.component';
import create from './create/create.component';
import createComplete from './createComplete/createComplete.component';
import challengeStart from './challengeStart/challengeStart.component';
import challengeTag from './challengeTag/challengeTag.component';
import constants from './app.constants';
import util from '../components/util/util.module';



import './app.scss';

angular.module('geosourcerApp', [
  ngCookies,
  ngResource,
  ngSanitize,


  uiRouter,
  uiBootstrap,

  _Auth,
  account,
  admin,  navbar,
  footer,
  main,
  manage,
  createComplete,
  create,
  browse,
  challengeTag,
  challengeStart,
  constants,

  util
])
  .config(routeConfig)
  .run(function($rootScope, $location, Auth) {
    'ngInject';
    // Redirect to login if route requires auth and you're not logged in
    $rootScope.$on('$stateChangeStart', function(event, next) {
      Auth.isLoggedIn(function(loggedIn) {
        if(next.authenticate && !loggedIn) {
          $location.path('/login');
        }
      });
    });
  });

angular
  .element(document)
  .ready(() => {
    angular.bootstrap(document, ['geosourcerApp'], {
      strictDi: true
    });
  });
