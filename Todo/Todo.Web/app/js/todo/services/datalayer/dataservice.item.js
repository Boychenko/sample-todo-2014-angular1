(function () {
    'use strict';

    var serviceId = 'dataservice.item';

    angular.module('todo.common').factory(serviceId, ['$resource', 'common', 'routeResolver', serviceFactory]);

    function serviceFactory($resource, common, routeResolver) {
        var resource = $resource(routeResolver.getApiUrl('items/:id'), {id:'@id'}, {
            update: { method: 'PUT'}
        });

        var errorCallback = common.errorCallback;

        var service = {
            getList: getList,
            create: create,
            get: get,
            update: update,
            remove: remove,
        };

        return service;

        function getList(params) {
            return resource.get(params).$promise.catch(errorCallback);
        }

        function create(item){
            return resource.save(item).$promise.catch(errorCallback);
        }
        function update(item){
            return resource.update(item).$promise.catch(errorCallback);
        }

        function get(id){
            return resource.get({ id: id }).$promise.catch(errorCallback);
        }

        function remove(id){
            return resource.remove({ id: id }).$promise.catch(errorCallback);
        }
    }
})();