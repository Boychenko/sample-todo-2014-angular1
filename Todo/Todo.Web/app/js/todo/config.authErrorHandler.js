(function () {
    'use strict';

    angular.module('todo').config(['$httpProvider', function($httpProvider) {
        $httpProvider.interceptors.push(['$q', '$location', function ($q, $location) {
            return {
                'responseError': function (rejection) {
                    return $q.reject(rejection);
                }
            };
        }]);
    }]);
})();