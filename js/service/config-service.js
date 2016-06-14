(function () {
    'use strict';
    angular.module('routerApp').service('ConfigurationService', ['$q', 'DriveFileService', 'FileStructureService', function ($q, DriveFileService, FileStructureService) {
        var ref = this;
        this.rootId = null;
        this.configFolderId = null;
        this.configFileId = null;
        this.settings = {};
        this.readSettings = function () {

            var defer = $q.defer();
            if (!this.rootId) {
                return FileStructureService.findRoot().then(function (fileId) {
                    ref.rootId = fileId;
                    defer.resolve(ref.readSettings());
                })
            }
            if (!this.configFolderId) {
                return DriveFileService.searchInFolder("title contains 'config'").then(function (ret) {
                    var file = DriveFileService.justOne(ret);
                    ref.configFolderId = file.id;
                    defer.resolve(ref.readSettings());
                })
            }
            if (!this.configFileId) {
                DriveFileService.searchInFolder("title contains 'config.json'", this.configFolderId).then(function (raw) {

                    if (raw.result.items.length > 0) {

                        return $q.when(raw.result.items[0]);
                    }

                }).then(function (file) {
                    ref.configFileId = file.id;
                    console.log("aad", file);
                    return DriveFileService.loadFile(file.id);

                }).then(function (file) {

                    ref.settings = JSON.parse(file.content);
                    console.log("ref settings", ref.settings);
                    defer.resolve(file.content);
                });
            }
            return defer.promise;
        };

        this.saveSettings = function () {

            if (!this.configFileId) {
                return $q.when("Nope, there's no config file set up.");
            } else {
                return DriveFileService.saveFile({
                    id: this.configFileId
                }, JSON.stringify(this.settings));
            }


>>>>>>> refs/remotes/origin/master
        };
    }]);
})();