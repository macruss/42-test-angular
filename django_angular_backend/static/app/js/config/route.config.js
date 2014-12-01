(function() {
    'use strict';

    angular.module('app')
        .config(config);

        function config($routeProvider) {
            $routeProvider
                .when('/main', {
                    templateUrl: 'static/app/partials/main.html',
                    controller: 'InfoCtrl',
                    controllerAs: 'vm'
                })
                .when('/contacts', {
                    templateUrl: 'static/app/partials/contacts.html',
                    controller: 'ContactsCtrl',
                    controllerAs: 'vm'
                })
                .when('/contacts/:contactId', {
                    templateUrl: 'static/app/partials/edit-contact.html',
                    controller: 'EditContactCtrl',
                    controllerAs: 'vm'
                })
                .otherwise({
                    redirectTo: '/main'
                });

        }
    
})();