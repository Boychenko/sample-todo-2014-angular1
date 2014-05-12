(function () {
    'use strict';

    var controllerId = 'loginController';

    angular.module('todo').controller(controllerId, ['$location', '$routeParams', 'common', 'auth', loginController]);

    function loginController($location, $routeParams, common, auth) {
        var redirectTo = $routeParams.returnUrl || '/';
        var logError = common.logger.getLogFn(controllerId, 'error');
        var config = common.config;

        var vm = this;

        vm.regExps = common.regExps;

        vm.credentials = {
            username: null,
            password: null
        };
        vm.processing = false;
        vm.persistent = false;
        vm.error = null;

        vm.login = function (form) {
            if (vm.processing) {
                return;
            }
            if (form.$invalid) {
                common.setDirty(form);
                return;
            }
            vm.error = null;
            vm.processing = true;
            auth.login(vm.credentials, vm.persistent)
                .then(function() { 
                    $location.path(redirectTo);
            }).catch(function(error) {
                if (error.status === 400) {
                    vm.error = error.data.error_description;
                } else {
                    var msg = config.appErrorPrefix + 'Operation error';
                    logError(msg, error);
                }
            }).finally(function() {
                vm.processing = false;
            });

        };
    }
})();
