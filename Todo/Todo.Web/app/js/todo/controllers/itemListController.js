(function () {
    'use strict';

    var controllerId = 'itemListController';

    angular.module('todo').controller(controllerId,
        ['$scope', 'dataservice', listController]);

    function listController($scope, dataservice) {
        var vm = this;
    }
})();
