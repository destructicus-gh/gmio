/**
 * Created by a689638 on 6/13/2016.
 */

(function () {
    'use strict';
    angular.module('routerApp').directive('archetypeRowView', [function () {
        return {
            restrict:'A',
            scope:{
                definitions:'=',
                data:'=',
                archetype:'='
            },
            templateUrl:'views/archetypes/archetype-row.html'
        }
    }]);

})();