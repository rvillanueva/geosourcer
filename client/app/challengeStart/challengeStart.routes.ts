'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('challengeStart', {
      url: '/challenges/:challengeId/start',
      template: '<challenge-start></challenge-start>'
    });
}
