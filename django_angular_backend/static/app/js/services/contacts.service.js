(function(){
    'use strict';

    angular.module('app')
        .factory('contacts', contacts);

    contacts.$inject = ['$http'];

    function contacts($http) {
        return {
            all: all,
            get: get,
            update: update
        };

        function all() {
            return $http.get('/api/v1/contact')
                .then(allComplete)
                .catch(allFailed);

            function allComplete(respons) {
                return respons.data.objects;
            }

            function allFailed(error) {
                console.log('XHR Failed for contacts ' + error.data);
            }
        }

        function get(id) {
            return $http.get('/api/v1/contact/' + id)
                .then(getComplete)
                .catch(getFailed);

            function getComplete(respons) {
                return respons.data;
            }

            function getFailed(error) {
                console.log('XHR Failed for contacts ' + error.data);
            }
        }

        function update(contact) {
            return $http.put('/api/v1/contact/' + contact.id, contact)
                .then(updateComplete)
                .catch(updateFailed);

            function updateComplete(respons) {
                return respons.status;
            }

            function updateFailed(error) {
                console.log('XHR Failed for contact ' + error.data);
            }
        }
    };
})();