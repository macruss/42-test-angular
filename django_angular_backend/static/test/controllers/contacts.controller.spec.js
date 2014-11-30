describe('Contacts Controller', function() {
  var $httpBackend,
      $rootScope,
      createController,
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

  beforeEach(function() {
    module('app');

    inject(function($injector) {
      $httpBackend = $injector.get('$httpBackend');
      $httpBackend.whenGET('/api/v1/contact').respond(response);

      var $controller = $injector.get('$controller');

      createController = function() {
        return $controller('ContactsCtrl', {
          '$scope': $rootScope
        });
      };
    })
  });




  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it("calls /api/v1/contact", function() {
    $httpBackend.expectGET('/api/v1/contact');
    var ctrl = createController();
    $httpBackend.flush();
  });

  it("check get all contacts", function() {
    var ctrl = createController();
    $httpBackend.flush();
    expect(ctrl.contacts.length).toBe(2);
  });

  it("check contact #1 Robert Abbott", function() {
    var ctrl = createController();
    $httpBackend.flush();
    expect(ctrl.contacts[0].first_name).toEqual('Robert');
    expect(ctrl.contacts[0].last_name).toEqual('Abbott');
  });

});