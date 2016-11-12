'use strict';

describe('Component: ChallengeStartComponent', function() {
  // load the controller's module
  beforeEach(module('geosourcerApp.challengeStart'));

  var ChallengeStartComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController) {
    ChallengeStartComponent = $componentController('challengeStart', {});
  }));

  it('should ...', function() {
    expect(1).to.equal(1);
  });
});
