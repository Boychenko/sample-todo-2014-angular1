(function () {
    'use strict';

    var controllerId = 'registerController';

    // TODO: replace app with your module name
    angular.module('todo').controller(controllerId,
        ['$location', 'common', 'auth', registerController]);

    function registerController($location, common, auth) {
        var logError = common.logger.getLogFn(controllerId, 'error');
        var config = common.config;

        var vm = this;

        vm.regExps = common.regExps;

        vm.processing = false;

        vm.registrationInfo = {
            email: null,
            password: null,
            confirmPassword: null
        };

        vm.register = function () {
            if (vm.processing) {
                return;
            }
            if (form.$invalid) {
                common.setDirty(form);
                return;
            }
            vm.error = null;
            vm.processing = true;
            auth.register(vm.registrationInfo)
                .then(function () {
                    $location.path('/login');
                }).catch(function (error) {
                    vm.error = error._parsedErrors;
                }).finally(function () {
                    vm.processing = false;
                });
        };
    }
})();
