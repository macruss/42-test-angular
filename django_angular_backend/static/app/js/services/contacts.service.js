(function(){
    'use strict';

    angular.module('app')
        .factory('contacts', contacts);

    contacts.$inject = ['$http'];

    function contacts($http) {
        return {
            all: all
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
    };
})();