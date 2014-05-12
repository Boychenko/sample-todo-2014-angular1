(function () {
    'use strict';

    var module = angular.module('todo.common');
    module.filter('formatDate', ['commonConfig',function(config) {
        return function(input, options) {
            options = options || {};
            options.format = options.format || config.dates.fullDate;
            return format(input, options);
        };
    }]);
    module.filter('shortDate', ['commonConfig',function (config) {
        return function(input, options) {
            options = options || {};
            options.format = options.format || config.dates.shortDate;
            return format(input, options);
        };
    }]);
    module.filter('shortFullDate', ['commonConfig',function (config) {
        return function(input, options) {
            options = options || {};
            options.format = options.format || config.dates.shortFullDate;
            return format(input, options);
        };
    }]);
    module.filter('formatByte', function () {
        return function (bytes) {
            if (!bytes && bytes !== 0) {
                return '';
            } else if (bytes < 1024) {
                return bytes + ' bytes';
            } else if (bytes < 1048576) {
                return (bytes / 1024).toFixed(2) + ' KB';
            } else if (bytes < 1073741824) {
                return (bytes / 1048576).toFixed(2) + ' MB';
            } else {
                return (bytes / 1073741824).toFixed(2) + ' GB';
            }
        };
    });

    module.filter('shortDateWithoutConversion', ['commonConfig', function (config) {
        return function (input, format) {
            if (!moment || !input || !moment(input).isValid()) {
                return '';
            } else {
                format = format || config.shortDate;
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
            format = format || config.dates.shortFullDate;
            var result = moment.utc(input);
            if(utc){
                result.utc();
            }else{
                result.local();
            }
            return result.format(format);
        }
    }
})();