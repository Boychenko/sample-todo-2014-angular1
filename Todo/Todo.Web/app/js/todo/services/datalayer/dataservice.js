(function () {
    'use strict';

    var serviceId = 'dataservice';

    angular.module('todo.common').factory(serviceId,
    [
        'dataservice.item',
        'dataservice.references',
        dataservice
    ]);

    function dataservice(item, references) {
        // Define the functions and properties to reveal.
        var service = {
            item: item,
            references: references
        };

        return service;
    }
})();