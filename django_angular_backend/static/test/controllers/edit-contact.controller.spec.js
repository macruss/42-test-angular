describe('Edit Contact Controller', function() {
    var $httpBackend,
        $rootScope,
        $routeParams,
        createController,
        response = {
            objects: [
                {
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
                },
                {
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
                }
            ]
        };

    beforeEach(module('app'));

    beforeEach(inject(function($injector) {
        $routeParams = $injector.get('$routeParams');
        $httpBackend = $injector.get('$httpBackend');
        $httpBackend.whenGET('/api/v1/contact/1').respond(response.objects[0]);
        $httpBackend.whenGET('/api/v1/contact/2').respond(response.objects[1]);
        $httpBackend.whenPUT('/api/v1/contact/1').respond(response.objects[0]);
        $httpBackend.whenPUT('/api/v1/contact/2').respond(response.objects[1]);


        var $controller = $injector.get('$controller');

        createController = function() {
            return $controller('EditContactCtrl', {'$routeParams': $routeParams});
        };
    }));


    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('send GET request', function() {
        $httpBackend.expectGET('/api/v1/contact/1');
        $routeParams = {contactId: 1};
        var contactCtrl = createController();
        $httpBackend.flush();
    });

    it('send PUT request', function() {
        $httpBackend.expectPUT('/api/v1/contact/2');
        $routeParams = {contactId: 2};
        var contactCtrl = createController();
        contactCtrl.update(response.objects[1]);
        $httpBackend.flush();
    });

    it("should get contact with id=1", function() {
        $routeParams = {contactId: 1};
        var contactCtrl = createController();
        $httpBackend.flush();
        expect(contactCtrl.contact.id).toBe(1);
        expect(contactCtrl.contact.first_name).toEqual("Robert");
    });

});
