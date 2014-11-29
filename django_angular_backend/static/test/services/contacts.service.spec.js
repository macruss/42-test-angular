describe('Contacts Service', function () {
  var $httpBackend,
      $rootScope,
      contacts,
      response = {
        objects: [{
          birth_date: "1933-03-02",
          cellphone_number: "",
          date_created: "2014-05-24T09:27:44.306000",
          email: "robertabbot@gmail.com",
          first_name: "Robert",
          id: 1,
          jabber_id: "",
          last_name: "Abbott",
          phone_number: "",
          resource_uri: "/api/v1/contact/1"
        }, {
          birth_date: "1963-09-23",
          cellphone_number: "",
          date_created: "2014-05-24T09:28:20.149000",
          email: "",
          first_name: "Bruce",
          id: 2,
          jabber_id: "",
          last_name: "Ableson",
          phone_number: "",
          resource_uri: "/api/v1/contact/2"
        }]
      };

  beforeEach(function () {
    module('app');

    inject(function($injector) {
      contacts = $injector.get('contacts');

      $httpBackend = $injector.get('$httpBackend');
      $httpBackend.whenGET('/api/v1/contact').respond(response);
      
      $rootScope = $injector.get('$rootScope');
    });
});

  afterEach(function () {
    $httpBackend.flush();
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it("should have a contacts.service", function () {
    expect(app.contacts).toBeDefined();
  });

  it("check get all contacts", function () {
    expect(contacts.all()).toEqual(response.objects);
  });
});