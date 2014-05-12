(function () {
    'use strict';

    angular.module('todo.common').provider('routeResolver', ['commonConfig', routeResolver]);

    function routeResolver(config) {
        function getView(path) {
            return config.views.basePath + path + '?v=' + config.version;
        };

        function getApiUrl(relativePath) {
            return config.apiBaseUrl + relativePath;
        }

        this.getView = getView;
        this.getApiUrl = getApiUrl;

        this.$get =  function () {
            return this;
        };
    }
})();