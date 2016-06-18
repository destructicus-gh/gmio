(function () {
    'use strict';
    angular.module('routerApp').service('FileSystem', ['DriveFileService', 'FileStructureService', '$q', function (DriveFileService, FileStructureService, $q) {

        this.init = init;
        var sys = {};
        sys.currentSystem = {};
        sys.defaultSystem = {
            name: "gmio",
            type: "folder",
            contents: [
                {
                    name: "config",
                    type: "folder"
                    },
                {
                    name: "archetype",
                    type: "folder"
                    },
                {
                    name: "data",
                    type: "folder"
                    }
                ]
        };

        this.getSystem = function () {
            return angular.copy(sys.currentSystem);
        }

        function Folder(id, name, contents) {
            return {
                id: id,
                name: name,
                contents: contents
            };
        }

        function init() {
            console.log("fsinit");
            FileStructureService.findOrNewFolder("gmio")
                .then(function (result) {
                    return DriveFileService.getMetadata(result.result.id);
                })
                .then(function (result) {
                    //                    console.log("fs fonf result", result.result);
                    return readFile(sys.currentSystem, result.result);
                })
                .then(function (retval) {
                    sys.currentSystem = sys.currentSystem.contents[0];

                    return alignWithExpectations(sys.currentSystem, sys.defaultSystem);

                })
                .then(function (r) {
                    console.log("finished");
                });
        }

        function readFile(localParent, resultItem) {
            if (!localParent.contents) {
                localParent.contents = [];
            }
            //
            if (resultItem.mimeType == 'application/vnd.google-apps.folder') {
                //                console.log(resultItem.title, "folder", resultItem, localParent);
                var folder = {
                    id: resultItem.id,
                    type: "folder",
                    name: resultItem.title
                };
                //                console.log("dfs fif", resultItem.id);
                return readFiles(folder, resultItem.id).then(function (returns) {
                    localParent.contents.push(folder);
                });


            } else {
                //                console.log("file", resultItem);
                var file = {
                    id: resultItem.id,
                    type: "file",
                    name: resultItem.title
                };
                localParent.contents.push(file);
                //                console.log("localp", localParent);
                return $q.when(resultItem);

            }
        }


        function readFiles(localParent, folderId) {
            //            console.log("readfiles", localParent, localParent.id);

            return DriveFileService.filesInFolder(localParent.id)
                .then(function (result) {
                    var items = result.result.items;
                    //                    console.log("rf dfs fif items", items);
                    var promises = _.map(items, function (e) {
                        return DriveFileService.getMetadata(e.id)
                            .then(function (resulter) {
                                //                                console.log(resulter.result.title, "readfiles each meta", resulter.result);
                                return readFile(localParent, resulter.result);
                            });
                    });
                    return $q.all(promises);
                });
        }

        function alignWithExpectations(current, expected) {
            if ((expected.type == current.type) && (expected.name == current.name)) {
                //good to go
                $q.all(_.map(expected.contents, function (ex) {
                    var equivalent = _.findWhere(current.contents, {
                        name: ex.name
                    });
                    if (equivalent) {
                        return alignWithExpectations(equivalent, ex);
                    } else {
                        return newFileOrFolder(ex, current.id);
                    }

                }));
            }
        }

        function newFileOrFolder(ex, parentId) {
            if (ex.type == 'file') {
                return DriveFileService.newFile(ex.name, parentId, true);
            } else {
                return DriveFileService.newFolder(ex.name, parentId, true);

            }
        }
}])
})();