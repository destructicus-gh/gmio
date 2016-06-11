/**
 * Created by a689638 on 2/3/2016.
 */

(function () {
    'use strict';
    angular.module('routerApp').controller('ArchetypeNewController', ['DriveFileService', 'FileStructureService', 'CurrentEntity', function (DriveFileService, FileStructureService, CurrentEntity) {
        var vm = this;

        vm.text1 = "";
        vm.text2 = "";
        vm.newInit = true;

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
        vm.currentEntityUpdate = function () {
            console.log("new updates")
        }
        vm.init = function () {
            vm.arch = CurrentEntity.entity.arch;
        }

        CurrentEntity.entity.arch = {
            name: "",
            data: [],
            mainView: []
        }
        CurrentEntity.entity.data = [];
        CurrentEntity.entity.editing = true;
        CurrentEntity.listeners.push(vm);
        CurrentEntity.updateAll();
        vm.init();


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
            console.log("addField", vm.text1, vm.currentField.type);
            if (vm.currentField.type == "single") {
                CurrentEntity.entity.arch.data.push({
                    name: vm.text1
                });
                CurrentEntity.entity.arch.mainView.push({
                    data: vm.text1,
                    view: "single"
                });
                CurrentEntity.entity.data.push("<Preview Data>")
            }
            if (vm.currentField.type == "group") {
                CurrentEntity.entity.arch.data.push({
                    name: vm.text1,
                    type: "array-val",
                    data: []
                });
                CurrentEntity.entity.arch.mainView.push({
                    data: vm.text1,
                    view: "int-row"
                });
                CurrentEntity.entity.data.push([])
            }
            if (vm.currentField.type == "list") {
                CurrentEntity.entity.arch.data.push({
                    name: vm.text1,
                    type: "array-val",
                    data: []
                });
                CurrentEntity.entity.arch.mainView.push({
                    data: vm.text1,
                    view: "int-list"
                });
                CurrentEntity.entity.data.push([])
            }
            if (vm.currentField.type == "links") {
                CurrentEntity.entity.arch.data.push({
                    name: vm.text1,
                    type: "array-arch",
                });
                CurrentEntity.entity.arch.mainView.push({
                    data: vm.text1,
                    view: "link-list"
                });
                CurrentEntity.entity.data.push([])
            }
        }

        vm.initNew = function () {
            if (vm.newInit) {
                vm.newInit = false;
            } else {
                DriveFileService.saveFile({
                    title: CurrentEntity.entity.arch.name,
                    parents: [{
                        id: FileStructureService.folders.archetype
                    }],
                    mimeType: 'text/plain'

                }, JSON.stringify(CurrentEntity.entity.arch)).then(function (ret) {
                    console.log("save ", ret);
                })
            }
        }
    }]);

})();