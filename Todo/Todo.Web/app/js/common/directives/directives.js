(function () {
    'use strict';

    // Define the directive on the module.
    // Inject the dependencies. 
    // Point to the directive definition function.
    var module = angular.module('todo.common');

    module.directive('todoColoredFlag', [coloredFlag]);

    function coloredFlag() {
        return {
            scope: {
                value: '=todoColoredFlag'
            },
            template: '<span class="label" data-ng-class="{\'label-success\': value, \'label-danger\': !value}">&nbsp;</span>'
        };
    }

    module.directive('equals', function () {
        return {
            restrict: 'A', // only activate on element attribute
            require: '?ngModel', // get a hold of NgModelController
            link: function (scope, elem, attrs, ngModel) {
                if (!ngModel) return; // do nothing if no ng-model

                // watch own value and re-validate on change
                scope.$watch(attrs.ngModel, function () {
                    validate();
                });

                // observe the other value and re-validate on change
                attrs.$observe('equals', function (val) {
                    validate();
                });

                var validate = function () {
                    // values
                    var val1 = ngModel.$viewValue;
                    var val2 = attrs.equals;

                    // set validity
                    ngModel.$setValidity('equals', val1 === val2);
                };
            }
        };
    });

    module.directive('todoDatePicker', [datePicker]);

    function datePicker() {
        return {
            replace: true,
            scope: {
                minDate: '=minDate',
                maxDate: '=maxDate',
                date: '=todoDatePicker'
            },
            template: '<div class="input-group datepicker-control">' +
                '<input type="text" class="form-control" readonly="readonly" datepicker-popup="{{dateRange.format}}" data-ng-model="currentDate" data-is-open="dateRange.opened"' +
                    'min="minDate"' +
                    'max="maxDate"' +
                    'data-datepicker-options="dateRange.dateOptions"' +
                    'data-show-weeks="false" show-button-bar="false" data-close-text="Close" />' +
                '<span class="input-group-btn">' +
                    '<a class="btn btn-default" data-ng-click="dateRange.open($event)"><i class="glyphicon glyphicon-calendar"></i></a>' +
                '</span>' +
            '</div>',
            controller: ['$scope', 'moment', controller]
        };

        function controller($scope, moment) {
            $scope.currentDate = toLocal($scope.date);
            $scope.dateRange = {
                format: 'yyyy/MM/dd',
                dateOptions: {
                    'year-format': "'yy'",
                    'starting-day': 1                    
                },
                opened: false,
                open: function ($event) {
                    $event.preventDefault();
                    $event.stopPropagation();

                    var $that = this;
                    $that.opened = true;
                }
            };

            $scope.$watch('currentDate', function () {
                if ($scope.currentDate) {
                    var newDate = startToUtc($scope.currentDate);
                    if (!moment($scope.date).isSame(newDate)) {
                        $scope.date = newDate;
                    }
                } else if ($scope.date) {
                    $scope.date = $scope.currentDate;
                }
            });


            function toLocal(date) {
                if (date) {
                    var start = moment(date);
                    return start.add('m', start.zone()).toDate();
                }
                return date;
            }

            function startToUtc(date) {
                if (date) {
                    var start = moment(date);
                    return start.local().startOf('day').add('m', -start.zone()).toDate();
                }
                return date;
            }
        }
    }
})();