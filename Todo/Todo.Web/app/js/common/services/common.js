(function () {
    'use strict';

    angular.module('todo.common').factory('common', ['$', '_', '$q', '$rootScope', '$timeout', 'logger', 'commonConfig', 'routeResolver', 'regExps', 'modalService', common]);

    function common($, _, $q, $rootScope, $timeout, logger, config, routeResolver, regExps, modalService) {

        var logError = logger.getLogFn('app', 'error');

        var service = {
            // common angular dependencies
            $broadcast: $broadcast,
            $q: $q,
            $: $,
            _: _,
            $timeout: $timeout,
            createDebouncedThrottle: createDebouncedThrottle,
            // generic
            isNumber: isNumber,
            logger: logger, // for accessibility
            textContains: textContains,
            config: config,
            errorCallback: errorCallback,
            sucessCallback: sucessCallback,
            routeResolver: routeResolver,
            regExps: regExps,
            modalService: modalService,
            processWithConfirm: processWithConfirm,
            setDirty: setDirty,
            parseErrors: parseErrors,
            guid: function(){
                return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                    var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
                    return v.toString(16);
                });
            }
        };

        return service;

        function parseErrors(response) {
            var errors = [];
            if (!response.ModelState) {
                return null;
            }
            for (var key in response.ModelState) {
                for (var i = 0; i < response.ModelState[key].length; i++) {
                    errors.push(response.ModelState[key][i]);
                }
            }
            return errors;
        }

        function setDirty(field){
            if(field.$setDirty){
                for(var i in field){
                    if(!field.hasOwnProperty(i)){
                        continue;
                    }
                    setDirty(field[i]);
                }
                return;
            }
            if(field.$dirty === false)
            {
                field.$dirty = true;
                field.$pristine = false;
            }
        }
        
        function $broadcast() {
            return $rootScope.$broadcast.apply($rootScope, arguments);
        }

        function isNumber(val) {
            // negative or positive
            return /^[-]?\d+$/.test(val);
        }

        function textContains(text, searchText) {
            return text && -1 !== text.toLowerCase().indexOf(searchText.toLowerCase());
        }
        
        function createDebouncedThrottle(searchFunc, delay) {
            delay = delay || config.defaultThrottle;
            var timeout;
            var searchFn = function (searchParams, forceSearch) {
                if (timeout) {
                    $timeout.cancel(timeout);
                    timeout = null;
                }
                if (forceSearch) {
                    searchFunc(searchParams);
                } else {
                    timeout = $timeout(function() {
                        searchFunc(searchParams);
                    }, delay);
                }
            };
            return searchFn;
        }

        function errorCallback(error) {
            var msg = config.appErrorPrefix + 'Operation error';
            logError(msg, error);
            return $q.reject(error);
        }

        function sucessCallback(data) {
            if (data.ackCode == 200) {
                return data;
            }

            logError(data.ack, data, true);
            return null;
        }

        //assuming that last parameter always bool and initially usually false
        function processWithConfirm(options) {
            var deferred = $q.defer();
            
            var texts = options.texts;
            var processingFunc = options.processingFunc;
            var confirmed = false;
            var callback = function(data) {
                if (data == null) {
                    deferred.reject(null);
                    return; //general error
                }
                if (!confirmed
                        && data.ValidationError
                        && data.ConfirmRequired) {
                    modalService.validationConfirm({}, {
                        headerText: texts.modalHeader,
                        bodyText: texts.confirm,
                        error: data.Error
                    }).then(function () {
                        confirmed = true;
                        processingFunc({
                            confirmed: true
                        }).then(callback);
                    }).catch(function () {
                        deferred.reject(null);
                    });
                } else if (data.ValidationError) {
                    logError(data.Error.Message, data, true);
                    deferred.reject(data); //in case we want to show additional things
                } else {
                    deferred.resolve(data);
                }
            };

            modalService.showModal({}, {
                headerText: texts.modalHeader,
                bodyText: texts.question
            }).then(function () {
                processingFunc().then(callback);
            }).catch(function () {
                deferred.reject(null);
            });

            return deferred.promise;
        }
    }
})();