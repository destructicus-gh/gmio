/**
 * Created by a689638 on 2/3/2016.
 */

(function () {
    'use strict';
    angular.module('routerApp').service('FileStructureService', ['$q', 'DriveFileService', function ($q, DriveFileService) {
        var rootName = "gmio";
        var andNotTrashed = "and trashed = false";
        return {
            init: init
        };

        function init(hardReset) {
            if (hardReset) purge();
            return DriveFileService.searchFile("title contains '" + rootName + "'" + andNotTrashed)
                .then(function (raw) {
                    var folder = DriveFileService.justOne(raw);
                    console.log("folder found", folder);
                    if (!folder) {
                        console.log("creating new")
                        return DriveFileService.newFolder(rootName, "root");
                    }
                    return $q.when(folder);
                }).then(function (raw) {
                    console.log("dataroot", raw.result.id);
                    var config = initConfig(raw.result.id);
                    var archetypeFolder = DriveFileService.newFolder("archetype", raw.result.id);
                    return $q.all([config, archetypeFolder]);
                });
        }

        function initConfig(parentId) {
            return DriveFileService.newFolder("config", parentId)
                .then(function (raw) {
                    var folder = raw.result;
                    return DriveFileService.saveFile({
                        'title': 'config.json'
                        , 'parents': [{
                            id: folder.id
                    }]
                        , mimeType: 'text/plain'

                    }, JSON.stringify({
                        name: 'this is the name'
                        , place: 'this is the place'
                    })).then(function (ret) {
                        console.log("system file", ret);

                    });
                });
        }




        function purge() {
            return DriveFileService.searchInFolder("title contains '" + rootName + "'" + andNotTrashed)
                .then(function (ret) {
                    var file = DriveFileService.justOne(raw);
                    console.log("folder found", folder);
                    if (file) {
                        console.log("creating new")
                        return DriveFileService.trashFile(rootName);
                    }
                    return $q.when(null);
                });
        }





}])
})();