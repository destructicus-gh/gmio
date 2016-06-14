/**
 * Created by a689638 on 6/8/2016.
 */

(function () {
    'use strict';
    angular.module('routerApp').directive('modalTrigger', ["$compile", function ($compile) {
        return {
            scope: {
                title: '@',
                url: '=',
                id: '@'
            },
            transclude: true,
            templateUrl: 'views/modal/modal-shell.html',
            link: function (scope, element, attrs) {
                var open = function (id) {
                    $('#modal' + scope.id).openModal();
                };
                scope.openModal = open;
            }
        }
    }]);

})();