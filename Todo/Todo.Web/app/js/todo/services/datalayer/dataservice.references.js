(function () {
    'use strict';

    var serviceId = 'dataservice.references';

    angular.module('todo.common').factory(serviceId, ['$resource', 'common', 'routeResolver', serviceFactory]);

    function serviceFactory($resource, common, routeResolver) {
        var resource = $resource(routeResolver.getApiUrl('references'));

        var _ = common._;
        var $q = common.$q;

        var references = {
            priorities: null
        };
        var loaded = false;

        var errorCallback = common.errorCallback;

        var service = {
            get: get
        };

        return service;

        function get() {
            if (loaded) {
                return $.when(references);
            }
            return resource.get().$promise.then(function(result) {
                _.extend(references, _.pick(result, _.keys(references)));
                loaded = true;
                return references;
            }).catch(errorCallback);
        }
    }
})();