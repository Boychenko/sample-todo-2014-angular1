(function () {
    'use strict';

    var controllerId = 'itemEditController';

    angular.module('todo').controller(controllerId,
        ['$routeParams', '$window', 'common', 'dataservice', itemEditController]);

    function itemEditController($routeParams, $window, common, dataservice) {
        var logError = common.logger.getLogFn(controllerId, 'error');
        var logSuccess = common.logger.getLogFn(controllerId, 'success');
        var _ = common._;
        var moment = common.moment;
        var $q = common.$q;

        var vm = this;
        var id = $routeParams.id;
        vm.priorities = null;

        vm.loaded = false;
        vm.processing = false;
        vm.title = function () {
            return id ? 'Edit item' : 'Create item';
        };
        var now = moment();
        now.add('m', -now.zone());
        vm.item = {
            id: null,
            title: null,
            description: null,
            dueDate: now.toDate(),
            priority: 0,
            completed: false
        };

        activate();

        vm.save = function (form) {
            if (vm.processing) {
                return;
            }
            if (form.$invalid) {
                common.setDirty(form);
                return;
            }

            vm.error = null;
            vm.processing = true;
            var saveCommand;
            if (id) {
                saveCommand = dataservice.item.update;
            } else {
                saveCommand = dataservice.item.create;
            }
            saveCommand(vm.item)
                .then(function (result) {
                    processResponse(result);
                    logSuccess('Saved');
                }).catch(function (error) {
                    vm.error = error._parsedErrors;
                }).finally(function () {
                    vm.processing = false;
                });
        };
        vm.cancel = function () {
            $window.history.back();
        };

        function activate() {
            var loadings = [];
            var referencesLoading = dataservice.references.get()
                .then(function (references) {
                    vm.priorities = _.map(references.priorities, function (value, key) {
                        return {
                            value: value,
                            key: parseInt(key)
                        };
                    });
                });
            loadings.push(referencesLoading);
            if (id) {
                loadings.push(dataservice.item.get(id)
                    .then(function (result) {
                        processResponse(result);
                    }));
            }

            $q.all(loadings).then(function () {
                vm.loaded = true;
            });
        }

        function processResponse(result) {
            _.extend(vm.item, _.pick(result, _.keys(vm.item)));
            id = vm.item.id;
        }
    }
})();
