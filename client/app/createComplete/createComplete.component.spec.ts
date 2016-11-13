'use strict';

describe('Component: CreateCompleteComponent', function() {
  // load the controller's module
  beforeEach(module('geosourcerApp.createComplete'));

  var CreateCompleteComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController) {
    CreateCompleteComponent = $componentController('createComplete', {});
  }));

  it('should ...', function() {
    expect(1).to.equal(1);
  });
});
