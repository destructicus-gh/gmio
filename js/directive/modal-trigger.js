/**
 * Created by a689638 on 6/8/2016.
 */

(function () {
    'use strict';
    angular.module('routerApp').directive('modalTrigger', ["$compile", function ($compile) {
        return {
            scope: {url: '@'},
            link: function (scope, element, attrs) {
                var text = '<div id="modal1" class="modal open">'+
                    ' <div class="modal-content" ng-click="openModal(1)"> <h1>TITLE</h1><div class="modal-footer">'+
                    '<a href="#!" class=" modal-action modal-close waves-effect waves-green btn-flat">Agree</a> </div> </div>';
                scope.openModal = function(id){
                    console.log("open modal", id);
                    $('#modal1').openModal();
                };
                //element.append($compile("<div ng-include=\"'"+scope.url+"'\"></div>")(scope));
                element.append($compile(text)(scope));
            }
        }
    }]);

})();