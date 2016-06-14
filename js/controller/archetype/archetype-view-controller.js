/**
 * Created by a689638 on 6/13/2016.
 */

(function () {
    'use strict';
    angular.module('routerApp').controller('ArchetypeViewController', [function () {
        var vm = this;




        vm.archetype = characterArchetype;
        vm.data = characters;
        vm.selectedId = 1;


        vm.getInstance = function () {
            return vm.data[vm.selectedId];
        };

        vm.getDataDefinition = function (viewElement) {
            return _.find(vm.archetype.data, function (e) {
                return e.name == viewElement.data;
            });
        };


        vm.mockServiceCall = function(archType, id){
            return vm.data[0];
        }
    }]);

})();