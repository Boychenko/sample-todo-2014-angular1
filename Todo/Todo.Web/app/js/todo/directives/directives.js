(function () {
    'use strict';

    angular.module('todo').directive('todoUserLogout', [userLogout]);

    function userLogout() {
        var directive = {
            replace: true,
            scope: true,
            controller: ['$scope', '$location', 'auth', 'session', controller],
            template: '<ul class="nav navbar-nav navbar-right" data-ng-if="isAuthenticated()">' +
                            '<li>' +
                                '<span class="navbar-text nofloat">Hello, {{username()}}!</span>' +
                            '</li>' +
                            '<li><a href data-ng-click="logOff()">Log off</a></li>' +
                        '</ul>',
            restrict: 'A'
        };
        return directive;

        function controller($scope, $location, auth, session) {
            $scope.isAuthenticated = session.isAuthenticated;
            $scope.username = function() {
                return session.userInfo && session.userInfo.username;
            };
            $scope.logOff = function() {
                auth.logout();
                $location.path('/login');
            };
        }
    }
})();