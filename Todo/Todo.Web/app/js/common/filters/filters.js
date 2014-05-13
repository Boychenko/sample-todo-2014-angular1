(function () {
    'use strict';

    var module = angular.module('todo.common');

    module.filter('shortDate', ['commonConfig', function (config) {
        return function (input, format) {
            if (!moment || !input || !moment(input).isValid()) {
                return '';
            } else {
                format = format || config.dates.shortDate;
                return moment(input).format(format);
            }
        };
    }]);

    function format(input, options){
        var format = options.format;
        var utc = options.utc;
        if (!moment || !input || !moment(input).isValid()) {
            return '';
        } else {
            format = format || config.dates.shortDate;
            var result = moment.utc(input);
            if(utc){
                result.utc();
            } else {
                result.local();
            }
            return result.format(format);
        }
    }
})();