'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('challengeStart', {
      url: '/challenge/:challengeId/start',
      template: '<challenge-start></challenge-start>'
    });
}
