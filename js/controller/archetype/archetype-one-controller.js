/**
 * Created by a689638 on 2/3/2016.
 */

(function () {
    'use strict';
    angular.module('routerApp').controller('ArchetypeOneController', ['DriveFileService', 'FileStructureService', 'CurrentEntity',
        function (DriveFileService, FileStructureService, CurrentEntity) {
            var vm = this;
            CurrentEntity.entity.arch = {
                name: "aname",
                about: "Holds the data for the stuff",
                tags: ["fnd"],
                displayName: "Name",
                data: [{
                    name: "Name"
                }, {
                    name: "Characteristics",
                    type: "array-val",
                    data: [{
                        name: "int"
                    }, {
                        name: "char"
                    }, {
                        name: "float"
                    }, {
                        name: "string"
                    }]
                }, {
                    name: "Skills",
                    type: "array-val",
                    data: [{
                        name: "skill1"
                    }, {
                        name: "skill2"
                    }, {
                        name: "skill3"
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
            CurrentEntity.entity.data = [
                "name goes here"
                , [6, 7, 8, 9]
                , [1, 2, 3], [{
                    link: "354jnkwj5nkjsdfn43",
                    name: "Item1"
                }, {
                    link: "12j43k3sdfnjn5d54n",
                    name: "Item2"
                }]];


            vm.editing = CurrentEntity.entity.editing;
            vm.d = CurrentEntity.entity.data;
            vm.arch = CurrentEntity.entity.arch;

            vm.editOptions = getEditOptions();
            vm.editSubOptions = getEditSubOptions();

            vm.getIndexBySubName = function (name, subName) {
                var dd = _.findIndex(CurrentEntity.entity.arch.data, function (it) {
                    return it.name == name;
                });
                var arr = CurrentEntity.entity.arch.data[dd].data;
                return _.findIndex(arr, function (it) {
                    return it.name == subName;
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

            function getEditOptions() {
                var deflt = function (index) {
                    return true;
                };
                var swap = function (arr, index, indexTo) {
                    var temp = arr[index];
                    arr[index] = arr[indexTo];
                    arr[indexTo] = temp;
                };
                return [
                    {
                        icon: "keyboard_arrow_down",
                        callback: function (index) {
                            swap(CurrentEntity.entity.arch.data, index, index + 1);
                            swap(CurrentEntity.entity.arch.mainView, index, index + 1);
                            swap(CurrentEntity.entity.data, index, index + 1);
                            console.log("index move down", index);
                        },
                        show: function (index) {
                            return index < vm.arch.data.length - 1;
                        }
                    }, {
                        icon: "keyboard_arrow_up",
                        callback: function (index) {
                            swap(CurrentEntity.entity.arch.data, index, index - 1);
                            swap(CurrentEntity.entity.arch.mainView, index, index - 1);
                            swap(CurrentEntity.entity.data, index, index - 1);
                            console.log("index move up", index);
                        },
                        show: function (index) {
                            return index > 0;
                        }
                    },
                    {
                        icon: "mode_edit",
                        callback: function (index) {
                            console.log("edit", index);
                        },
                        show: function () {
                            return false
                        }
                    },
                    {
                        icon: "delete",
                        callback: function (index) {
                            CurrentEntity.entity.arch.data.splice(index, 1);
                            CurrentEntity.entity.arch.mainView.splice(index, 1);
                            CurrentEntity.entity.data.splice(index, 1);
                            console.log("delete", index);
                        },
                        show: deflt
                    }
                ]
            }

            function getEditSubOptions() {
                var deflt = function (index) {
                    return true;
                };
                var swap = function (arr, index, indexTo) {
                    var temp = arr[index];
                    arr[index] = arr[indexTo];
                    arr[indexTo] = temp;
                };
                return [
                    {
                        icon: "keyboard_arrow_down",
                        callback: function (mainIndex, index) {
                            swap(CurrentEntity.entity.arch.data[mainIndex].data, index, index + 1);
                            console.log("index move down", index);
                        },
                        show: function (index) {
                            return index < vm.arch.data.length - 1;
                        }
                    }, {
                        icon: "keyboard_arrow_up",
                        callback: function (mainIndex, index) {
                            swap(CurrentEntity.entity.arch.data[mainIndex].data, index, index - 1);

                            console.log("index move up", index);
                        },
                        show: function (index) {
                            return index > 0;
                        }
                    },
                    {
                        icon: "mode_edit",
                        callback: function (mainIndex, index) {
                            console.log("edit", index);
                        },
                        show: function (index) {
                            return false
                        }
                    },
                    {
                        icon: "delete",
                        callback: function (mainIndex, index) {
                            CurrentEntity.entity.arch.data[mainIndex].data.splice(index, 1);
                            console.log("delete", index);
                        },
                        show: deflt
                    }
                ]
            }


        }]);

})();