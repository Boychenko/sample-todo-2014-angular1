(function () {
    'use strict';

    var commonModule = angular.module('todo.common');

    // Configure the routes and route resolvers
    commonModule.provider('routeConfigurator', ['$routeProvider', 'routeResolverProvider', function ($routeProvider, routeResolverProvider) {
        var checkAccess = function($q, $location, session) {
            if (!session.isAuthenticated()) {
                $location.path('/login');
                return $q.reject('not authenticated');
            }
            return $q.when();
        };
        checkAccess.inject = ['$q', '$location', 'session'];
        this.registerRoutes = function (routes) {
            routes.forEach(function (r) {
                r.config.templateUrl = routeResolverProvider.getView(r.config.templateUrl);
                if (r.config.authRequired) {
                    r.config.resolve = { test: checkAccess };
                }
                $routeProvider.when(r.url, r.config);
            });
            $routeProvider.otherwise({ redirectTo: '/' });
        };
        this.$get = function () {
            return this;
        };
    }]);
})();