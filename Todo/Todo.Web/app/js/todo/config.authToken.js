(function () {
    'use strict';

    angular.module('todo').config(['$httpProvider', function($httpProvider) {
        $httpProvider.interceptors.push(['$q', 'session', function ($q, session) {
            return {
                'request': function (config) {
                    if (session.isAuthenticated()) {
                        config.headers.Authorization = 'Bearer ' + session.token;
                    }
                    return config || $q.when(config);
                }
            };
        }]);
    }]);
})();