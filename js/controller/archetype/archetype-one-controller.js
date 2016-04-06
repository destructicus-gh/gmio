/**
 * Created by a689638 on 2/3/2016.
 */

(function () {
    'use strict';
    angular.module('routerApp').controller('ArchetypeOneController', ['DriveFileService', 'FileStructureService', function (DriveFileService, FileStructureService) {
        var vm = this;
        vm.arch = {
            name: "aname",
            about: "Holds the data for the stuff",
            tags: ["fnd"],
            displayName: "Name",
            data: [{
                name: "Name",
                type: "string"
            }, {
                name: "Characteristics",
                type: "array-val",
                data: [{
                    name: "int",
                    type: "int"
                }, {
                    name: "char",
                    type: "int"
                }, {
                    name: "float",
                    type: "int"
                }, {
                    name: "string",
                    type: "int"
                }, ]
            }, {
                name: "Skills",
                type: "array-val",
                data: [{
                    name: "skill1",
                    type: "int"
                }, {
                    name: "skill2",
                    type: "int"
                }, {
                    name: "skill3",
                    type: "int"
                }]
            }, {
                name: "Items",
                type: "array-arch"
            }],
            mainView: [{
                data: "Name",
                view: "single-string"
            }, {
                data: "Characteristics",
                view: "int-row"
            }, {
                data: "Skills",
                view: "int-list"
            }, {
                data: "Items",
                view: "link-list"
            }]
        };
        vm.d = [
            "name goes here"
            , [6, 7, 8, 9]
            , [1, 2, 3], [{
                link: "354jnkwj5nkjsdfn43",
                name: "Item1"
            }, {
                link: "12j43k3sdfnjn5d54n",
                name: "Item2"
            }]];


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