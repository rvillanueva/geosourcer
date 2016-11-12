'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('challengeTag', {
      url: '/challenge/:challengeId/tag',
      template: '<challenge-tag></challenge-tag>'
    });
}
