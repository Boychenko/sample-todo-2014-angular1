(function () {
    'use strict';

    // Factory name is handy for logging
    var serviceId = 'modalService';

    // Define the factory on the module.
    // Inject the dependencies. 
    // Point to the factory definition function.
    angular.module('todo.common').factory(serviceId, ['$modal', dialogService]);
    
    function dialogService($modal) {
        // Define the functions and properties to reveal.
        var modalDefaults = {
            backdrop: true,
            keyboard: true,
            modalFade: true,
            templateUrl: 'template/modal/modaldialog.html'
        };

        var modalOptions = {
            closeButtonText: 'Cancel',
            actionButtonText: 'OK',
            headerText: 'Proceed?',
            bodyText: 'Perform this action?'
        };

        var service = {
            showModal: showModal,
            show: show,
            validationConfirm: validationConfirm,
            showFullscreen: showFullscreen,
            ask: ask
        };

        return service;

        function ask(header, text){
            var options = {
                headerText: header,
                bodyText: text
            };
            return showModal({}, options);
        }

        function showModal(customModalDefaults, customModalOptions) {
            if (!customModalDefaults) customModalDefaults = {};
            customModalDefaults.backdrop = 'static';
            return show(customModalDefaults, customModalOptions);
        }

        function show(customModalDefaults, customModalOptions) {
            //Create temp objects to work with since we're in a singleton service
            var tempModalDefaults = {};
            var tempModalOptions = {};

            //Map angular-ui modal custom defaults to modal defaults defined in this service
            angular.extend(tempModalDefaults, modalDefaults, customModalDefaults);

            //Map modal.html $scope custom properties to defaults defined in this service
            angular.extend(tempModalOptions, modalOptions, customModalOptions);

            if (!tempModalDefaults.controller) {
                tempModalDefaults.controller = function ($scope, $modalInstance) {
                    $scope.modalOptions = tempModalOptions;
                    $scope.modalOptions.ok = function (result) {
                        $modalInstance.close(result);
                    };
                    $scope.modalOptions.close = function (result) {
                        $modalInstance.dismiss('cancel');
                    };
                };
                tempModalDefaults.controller.$inject = ['$scope', '$modalInstance'];

            }

            return $modal.open(tempModalDefaults).result;
        }

        function validationConfirm(customModalDefaults, customModalOptions) {
            var confirmModalDefaults = {
                templateUrl: 'template/modal/validationConfirm.html',
                backdrop: 'static'
            };

            var confirmModalOptions = {
                closeButtonText: 'No',
                actionButtonText: 'Yes'
            };

            var tempModalDefaults = {};
            var tempModalOptions = {};

            angular.extend(tempModalDefaults, confirmModalDefaults, customModalDefaults);
            angular.extend(tempModalOptions, confirmModalOptions, customModalOptions);

            return show(tempModalDefaults, tempModalOptions);
        }

        function showFullscreen(customOptions){
            var fullscreenDefaults = {
                backdrop: 'static',
                keyboard: false,
                windowClass: 'full-screen'
            };
            var resultOptions = {};
            angular.extend(resultOptions, fullscreenDefaults, customOptions);
            return $modal.open(resultOptions).result;
        }
    }
})();