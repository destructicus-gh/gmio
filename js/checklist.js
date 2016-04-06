/**
 * Created by a689638 on 2/3/2016.
 */

(function () {
    'use strict';
    angular.module('routerApp').directive('checkList', [function () {
        return {
            scope: {
                list: '=checkList',
                value: '=',
                level: '=',
                identityFunction: '&'
            },
            link: function (scope, elem, attrs) {
                var handler = function (setup) {
                    var checked = elem.prop('checked');

                    var index = _.findIndex(scope.list, function (element) {
                        scope.level = element.level;
                        return scope.identityFunction()(element, scope.value);
                    });

                    if (checked && index == -1) {
                        if (setup) {
                            elem.prop('checked', false);
                        }
                        else scope.list.push(scope.value);
                    } else if (!checked && index != -1) {
                        if (setup) {

                            scope.list.splice(index, 1);
                            scope.list.push(scope.value);
                            console.log(scope, index);
                            elem.prop('checked', true);
                        }
                        else scope.list.splice(index, 1);
                    }
                };

                var setupHandler = handler.bind(null, true);
                var changeHandler = handler.bind(null, false);

                elem.on('change', function () {
                    scope.$apply(changeHandler);
                });
                scope.$watch('list', setupHandler, true);
            }
        };
    }]);

})();