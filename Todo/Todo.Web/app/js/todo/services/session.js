(function () {
    'use strict';

    var serviceId = 'session';

    angular.module('todo').factory(serviceId, [session]);

    function session() {
        var tokenKey = 'accessToken';
        var userInfoKey = 'userInfo';
        // Define the functions and properties to reveal.
        var service = {
            set: set,
            token: null,
            userInfo: null,
            clear: clear,
            isAuthenticated: isAuthenticated
        };

        var token = sessionStorage[tokenKey] || localStorage[tokenKey];
        service.token = token;
        service.userInfo = sessionStorage[userInfoKey] || localStorage[userInfoKey];
        service.userInfo = service.userInfo && JSON.parse(service.userInfo);

        return service;

        function set(newToken, userInfo, persistent) {
            token = newToken;
            service.token = token;
            service.userInfo = userInfo;
            if (persistent) {
                localStorage[tokenKey] = token;
                localStorage[userInfoKey] = JSON.stringify(userInfo);
            } else {
                sessionStorage[tokenKey] = token;
                sessionStorage[userInfoKey] = JSON.stringify(userInfo);
            }
        }

        function isAuthenticated() {
            return !!token;
        }

        function clear() {
            token = null;
            sessionStorage.removeItem(tokenKey);
            localStorage.removeItem(tokenKey);
            sessionStorage.removeItem(userInfoKey);
            localStorage.removeItem(userInfoKey);
        }

        //#region Internal Methods        

        //#endregion
    }
})();