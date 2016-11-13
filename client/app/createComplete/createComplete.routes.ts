'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('createComplete', {
      url: '/create/complete?challengeId',
      template: '<create-complete></create-complete>'
    });
}
