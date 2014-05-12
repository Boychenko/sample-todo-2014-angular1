(function () {
    'use strict';

    var serviceId = 'dataservice.references';

    angular.module('todo.common').factory(serviceId, ['$resource', 'common', 'routeResolver', serviceFactory]);

    function serviceFactory($resource, common, routeResolver) {
        var resource = $resource(routeResolver.getApiUrl('references'));

        var errorCallback = common.errorCallback;
        var sucessCallback = common.sucessCallback;

        var service = {
            getList: getList
        };

        return service;

        function getList() {
            return resource.get().$promise.catch(errorCallback);
        }
    }
})();