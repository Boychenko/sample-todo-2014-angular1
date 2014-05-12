(function () {
    'use strict';

    var app = angular.module('todo', [
        // Custom modules 
        'todo.common'
        // 3rd Party Modules

    ]);

    // Execute bootstrapping code and any dependencies.
    app.run(['$q', '$rootScope',
        function ($q, $rootScope) {
        }]);
})();