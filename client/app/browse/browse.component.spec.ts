'use strict';

describe('Component: BrowseComponent', function() {
  // load the controller's module
  beforeEach(module('geosourcerApp.browse'));

  var BrowseComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController) {
    BrowseComponent = $componentController('browse', {});
  }));

  it('should ...', function() {
    expect(1).to.equal(1);
  });
});
