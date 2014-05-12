(function () {
    angular.module("modal-tpls", []).run(["$templateCache", function ($templateCache) {
        $templateCache.put("template/modal/modaldialog.html",
            '<div class="modal-header">'+
                '<button type="button" class="close" data-ng-click="modalOptions.close()">&times;</button>' +
                '<h4 class="modal-title">{{modalOptions.headerText}}</h4>'+
            '</div>'+
            '<div class="modal-body">'+
                '<p>{{modalOptions.bodyText}}</p>'+
            '</div>'+
            '<div class="modal-footer">' +
                '<button class="btn btn-primary" data-ng-click="modalOptions.ok();">{{modalOptions.actionButtonText}}</button>' +
                '<button type="button" class="btn" data-ng-click="modalOptions.close()">{{modalOptions.closeButtonText}}</button>' +
            '</div>');
    }]);
})()