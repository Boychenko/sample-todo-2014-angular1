(function () {
    'use strict';

    var serviceId = 'auth';

    angular.module('todo').factory(serviceId, ['$http', 'common', 'session', authenticate]);

    function authenticate($http, common, session) {
        var routeResolver = common.routeResolver;
        var $ = common.$;

        // Define the functions and properties to reveal.
        var service = {
            login: login,
            register: register,
            logout: logout
        };

        return service;

        function login(credentials, persistent) {
            credentials.grant_type = 'password';
            return $http.post(routeResolver.getApiUrl('token'), $.param(credentials), {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                }
            }).then(function (result) {
                var token = result.data.access_token;
                session.set(token, { username: credentials.username }, persistent);
            });
        }

        function register(registrationInfo) {
            return $http.post(routeResolver.getApiUrl('account/register'), registrationInfo)
                .then(function (result) {
                    console.log(result);
                });
        }

        function logout() {
            session.clear();
        }

        //#region Internal Methods        

        //#endregion
    }
})();