/**
 * Created by a689638 on 2/3/2016.
 */

(function () {
    'use strict';
    angular.module('routerApp').controller('ArchetypeNewController', ['DriveFileService', 'FileStructureService', function (DriveFileService, FileStructureService) {
        var vm = this;

        vm.archName = "";

        vm.fieldTypeOptions = [{
            display: "Single Value Field",
            value: "single",
            field1: ["Name"]
                }, {
            display: "Value Group",
            value: "group",
            field1: ["Group Name"]
                }, {
            display: "Value List",
            value: "list",
            field1: ["List Name"]
                }, {
            display: "List of Links",
            value: "links",
            field1: ["List Name", "List of Archetype..."]
                }, ];

        vm.currentField = {
            type: ""
        }

        vm.getFormTitle = function (value) {
            return _.find(vm.fieldTypeOptions, function (it) {
                return it.value == value;
            })
        }

        vm.getIndexByName = function (name) {
            return _.findIndex(vm.arch.data, function (it) {
                return it.name == name;
            });
        };

        vm.selectSearchType = function (op) {
            vm.searchType = op;
        };
         }]);

})();