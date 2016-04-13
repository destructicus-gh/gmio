/**
 * Created by a689638 on 2/3/2016.
 */

(function () {
    'use strict';
    angular.module('routerApp').controller('ArchetypeNewController', ['DriveFileService', 'FileStructureService', 'CurrentEntity', function (DriveFileService, FileStructureService, CurrentEntity) {
        var vm = this;


        CurrentEntity.entity.editing = true;
        vm.arch = CurrentEntity.entity;
        vm.text1 = "";
        vm.text2 = "";

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
        }];

        vm.currentField = {
            type: ""
        };

        vm.getFormTitle = function (value) {
            return _.find(vm.fieldTypeOptions, function (it) {
                return it.value == value;
            })
        };

        vm.getIndexByName = function (name) {
            return _.findIndex(vm.arch.data, function (it) {
                return it.name == name;
            });
        };

        vm.selectSearchType = function (op) {
            vm.searchType = op;
        };
        vm.addField = function () {
            if (vm.currentField.type = "single") {
                CurrentEntity.entity.arch.data.push({name: vm.text1});
                CurrentEntity.entity.arch.mainView.push({
                    data: vm.text1,
                    view: "single-string"
                });
                CurrentEntity.entity.data.push("<Preview Data>")
            }
        }
    }]);

})();