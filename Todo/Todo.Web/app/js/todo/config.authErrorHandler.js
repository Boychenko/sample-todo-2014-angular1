(function () {
    'use strict';

    angular.module('todo').config(['$httpProvider', function($httpProvider) {
        $httpProvider.interceptors.push(['$q', '$location', function ($q, $location) {
            return {
                'responseError': function (rejection) {
                    if (rejection.status === 401 || rejection.status === 403 || rejection.status === 419 || rejection.status === 440) {
                        $location.path('/login');
                    }
                    return $q.reject(rejection);
                }
            };
        }]);
    }]);
})();