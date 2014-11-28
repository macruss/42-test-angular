(function() {
    'use strict';

    angular.module('app')
        .controller('InfoCtrl', InfoCtrl);

    function InfoCtrl() {
        var vm = this;

        vm.myInfo = [
            {field_name:'First Name',    value: 'Ruslan'},
            {field_name:'Last Name',     value: 'Makarenko'},
            {field_name:'Date of birth', value: '01.12.1986'},
            {field_name:'Email',         value: 'ruslan.makarenko@gmail.com'},
            {field_name:'Jabber',        value: 'macruss@jabber.kiev.ua'}
        ];
    };
    
})();