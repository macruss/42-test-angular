describe('Contacts Service', function () {

  beforeEach(function () {
    module('app');
  });

  it("should have a contacts.service", inject(function(contacts) {
    expect(contacts).toBeDefined();
  }));

});