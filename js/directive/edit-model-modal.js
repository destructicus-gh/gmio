(function () {
    'use strict';
    angular.module('routerApp').directive('modelEdit', ["$compile", function ($compile) {
        return {
            scope: {
                title: '@',
                model: '=',
                id: '@',
                arrayHints: '='
            },
            transclude: true,
            templateUrl: 'views/modal/edit-model.html',
            link: function (scope, element, attrs) {
                scope.isObject = _.isObject(scope.model) && !_.isArray(scope.model);
                scope.isArray = _.isArray(scope.model)
                scope.temp = angular.copy(scope.model);
                scope.openModal = function (id) {
                    $('#modal' + scope.id).openModal();
                };
                scope.save = function () {
                    Object.assign(scope.model, scope.temp);
                }
                scope.cancel = function () {
                    scope.temp = angular.copy(scope.model);
                }
            }
        }
    }]);

})();