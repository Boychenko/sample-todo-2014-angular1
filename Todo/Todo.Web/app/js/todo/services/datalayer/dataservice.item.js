(function () {
    'use strict';

    var serviceId = 'dataservice.item';

    angular.module('todo.common').factory(serviceId, ['$resource', 'common', 'routeResolver', serviceFactory]);

    function serviceFactory($resource, common, routeResolver) {
        var resource = $resource(routeResolver.getApiUrl('items/:id'), {id:'@id'}, {
            update: { method: 'PUT'}
        });

        var errorCallback = common.errorCallback;
        var sucessCallback = common.sucessCallback;

        var service = {
            getList: getList,
            create: create,
            get: get,
            update: update,
            remove: remove,
        };

        return service;

        function getList() {
            return resource.query().$promise.catch(errorCallback);
        }

        function create(category){
            return resource.save(category).$promise.catch(errorCallback);
        }
        function update(category){
            return resource.update(category).$promise.catch(errorCallback);
        }

        function get(id){
            return resource.get({ id: id }).$promise.catch(errorCallback);
        }

        function remove(id){
            return resource.remove({ id: id }).$promise.then(sucessCallback).catch(errorCallback);
        }
    }
})();