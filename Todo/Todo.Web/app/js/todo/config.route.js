(function () {
    'use strict';

    var module = angular.module('todo');

    // Define the routes 
    function getRoutes() {
        return [
            {
                url: '/',
                config: {                    
                    templateUrl: 'items/list.html',
                    authRequired: true
                }
            },
            {
                url: '/register',
                config: {
                    templateUrl: 'register.html',
                    authRequired: false
                }
            },
            {
                url: '/login',
                config: {
                    templateUrl: 'login.html',
                    authRequired: false
                }
            }
        ];
    }

    module.constant('routes', getRoutes());

    module.config(['routeConfiguratorProvider', function (routeConfiguratorProvider) {
        routeConfiguratorProvider.registerRoutes(getRoutes());
    }]);
})();