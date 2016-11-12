'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('challengeTag', {
      url: '/challenges/:challengeId/tag',
      template: '<challenge-tag></challenge-tag>'
    });
}
