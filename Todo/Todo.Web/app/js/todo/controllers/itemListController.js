(function () {
    'use strict';

    var controllerId = 'itemListController';

    angular.module('todo').controller(controllerId,
        ['$scope', 'common', 'dataservice', listController]);

    function listController($scope, common, dataservice) {
        var $q = common.$q;
        var vm = this;
        var logSuccess = common.logger.getLogFn(controllerId, 'success');
        var logError = common.logger.getLogFn(controllerId, 'error');

        var modalService = common.modalService;

        vm.sortingField = '';
        vm.sortingAsc = false;

        vm.loaded = false;
        var paging = {
            page: 1,
            pageSize: 5,
            total: 0,
            pageChange: pageChange
        };
        vm.paging = paging;
        vm.itemsPerPage = [];
        vm.priorities = null;
        vm.items = [];

        vm.sortBy = function (field) {
            if (!field || field == '') {
                return;
            }
            if (vm.sortingField == field) {
                vm.sortingAsc = !vm.sortingAsc;
            } else {
                vm.sortingField = field;
                vm.sortingAsc = true;
            }
            getData();
        };

        vm.markCompleted = function (item) {
            var postItem = angular.copy(item);
            postItem.completed = true;
            modalService.ask('Item', 'Complete?').then(function() {
                return dataservice.item.update(postItem).then(function(result) {
                    _.extend(item, _.pick(result, _.keys(item)));
                    logSuccess('Marked as completed');
                }).catch(function(error) {
                    if (error._parsedErrors) {
                        logError('Operation error', error);
                    }
                });
            });
        };
        vm.remove = function (item) {
            modalService.ask('Item', 'Remove?').then(function() {
                return dataservice.item.remove(item.id).then(function (result) {
                    if (vm.items.length === 1) {
                        paging.page -= 1;
                    }
                    getData();
                    logSuccess('Removed');
                });
            });
        };

        activate();

        function activate() {
            var loadings = [];
            loadings.push(getData());
            loadings.push(dataservice.references.get()
                .then(function (references) {
                    vm.priorities = references.priorities;
                }));

            $q.all(loadings).then(function () {
                vm.loaded = true;
            });
        }

        function getData() {
            return dataservice.item.getList(getParams()).then(function (result) {
                vm.items = result.list;
                paging.page = result.page;
                paging.pageSize = result.pageSize;
                paging.total = result.total;
                vm.loaded = true;
            });
        }

        function getParams() {
            return {
                page: paging.page,
                pageSize: paging.pageSize,
                asc: vm.sortingAsc,
                orderBy: vm.sortingField

            };
        }

        function pageChange() {
            getData();
        }
    }
})();
