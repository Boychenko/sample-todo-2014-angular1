(function () {
    'use strict';

    // Define the common module 
    // Contains services:
    //  - common
    //  - logger
    //  - spinner

    angular.module('todo.common', [
        // Angular modules 
        'ngRoute',           // routing
        'ngResource',           // routing
        'ui.bootstrap', //ui bootstrap
        'modal-tpls'
    ]);
})();