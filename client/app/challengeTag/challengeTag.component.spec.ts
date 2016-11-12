'use strict';

describe('Component: ChallengeTagComponent', function() {
  // load the controller's module
  beforeEach(module('geosourcerApp.challengeTag'));

  var ChallengeTagComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController) {
    ChallengeTagComponent = $componentController('challengeTag', {});
  }));

  it('should ...', function() {
    expect(1).to.equal(1);
  });
});
