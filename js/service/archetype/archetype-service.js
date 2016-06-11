(function () {
    'use strict';
    angular.module('routerApp').service('ArchetypeService', ['$q', 'DriveFileService', 'FileStructureService', function ($q, DriveFileService, FileStructureService) {
        var ref = this;
        this.rootId = null;
        this.archFolderId = null;
        this.archFiles = [];
        var andNotTrashed = " and trashed = false";

        this.readAll = function () {
            console.log("readAll");
            if (!this.rootId) {
                return FileStructureService.findRoot().then(function (fileId) {
                    ref.rootId = fileId;
                    return ref.readAll();
                })
            }
            if (!this.archFolderId) {
                return DriveFileService.searchInFolder("title contains 'archetype'" + andNotTrashed, ref.rootId).then(function (ret) {
                    var file = DriveFileService.justOne(ret);
                    ref.archFolderId = file.id;
                    return ref.readAll();

                });
            }

            return DriveFileService.searchInFolder("trashed = false", this.archFolderId)
                .then(function (fileResults) {
                    return fileResults.result.items;
                });

        }

                }]);

})();