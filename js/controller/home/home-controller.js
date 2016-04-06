/**
 * Created by a689638 on 2/3/2016.
 */

(function () {
    'use strict';
    angular.module('routerApp').controller('HomeController', ['DriveFileService', 'FileStructureService', function (DriveFileService, FileStructureService) {
        var vm = this;

        var fileId = "0B1ZHB-SPe0e-Wk5ITWhnSG1hT1U";
        vm.items = [];
        vm.file = null;

        //        DriveFileService.listFiles(function (ret) {
        //                console.log("lfret", ret)
        //            })
        //            .then(function (ret) {
        //                vm.items = ret.result.items;
        //            }, function (ret) {
        //                vm.items = [];
        //            });
        vm.listSystemFiles = function () {
            drive.files.list({
                spaces: 'appDataFolder'
                , fields: 'nextPageToken, files(id, name)'
                , pageSize: 100
            }, function (err, res) {
                if (err) {
                    // Handle error
                    console.log(err);
                } else {
                    res.files.forEach(function (file) {
                        console.log('Found file: ', file.name, file.id);
                    });
                }
            });
        }



        vm.appFiles = function (callback) {
            var retrievePageOfFiles = function (request, result) {
                request.execute(function (resp) {
                    console.log("resp", resp);
                    result = result.concat(resp.items);
                    var nextPageToken = resp.nextPageToken;
                    if (nextPageToken) {
                        request = gapi.client.drive.files.list({
                            'pageToken': nextPageToken
                        });
                        retrievePageOfFiles(request, result);
                    } else {
                        callback(result);
                    }
                });
            }
            var initialRequest = gapi.client.drive.files.list({
                'q': '\'appfolder\' in parents'
            });
            retrievePageOfFiles(initialRequest, []);
        }

        vm.af = function () {
            vm.appFiles(function (ret) {
                console.log("af ", ret)
            });
        }




        vm.saveSystem = function () {
            DriveFileService.saveFile({

                'title': 'config.json'
                , 'parents': [{
                    id: 'appfolder'
                    }]
                , mimeType: 'text/plain'

            }, "{}").then(function (ret) {
                console.log("system file", ret);

            });
        }

        vm.filesInFolder = function (folderId, callback) {
            var retrievePageOfChildren = function (request, result) {
                request.execute(function (resp) {
                    result = result.concat(resp.items);
                    var nextPageToken = resp.nextPageToken;
                    if (nextPageToken) {
                        request = gapi.client.drive.children.list({
                            'folderId': folderId
                            , 'pageToken': nextPageToken
                        });
                        retrievePageOfChildren(request, result);
                    } else {
                        callback(result);
                    }
                });
            }
            var initialRequest = gapi.client.drive.children.list({
                'folderId': folderId
            });
            retrievePageOfChildren(initialRequest, []);
        }


        vm.ff = function () {
            //            vm.filesInFolder("1047QkdltiZkGHG3WpGZYC9wQZlca", function (ret) {
            vm.filesInFolder("0B1ZHB-SPe0e-a3BfS2RKQ1JlMXc", function (ret) {
                console.log("ff", ret)
            })
        }
        vm.saveTest = function () {
            FileStructureService.init().then(function () {
                console.log("done");
            });


        }






        //            DriveFileService.saveFile({
        //
        //                'name': 'config.json'
        //                , 'parents': ['appDataFolder']
        //                , mimeType: 'text/plain'
        //
        //            }, "{}").then(function (ret) {
        //                    console.log("system file", ret);
        //                    
        //                }
        //            DriveFileService.loadFile(fileId).then(function (file) {
        //                vm.file = file
        //                console.log("load", file);
        //                vm.file.content = "sdfddfddfdf!!!";
        //                DriveFileService.saveFile(vm.file.metadata, vm.file.content).then(function (file) {
        //                    console.log("save", file);
        //                    vm.file = file;
        //
        //                    DriveFileService.loadFile(fileId).then(function (ret) {
        //                        console.log("load", ret);
        //
        //                    });
        //                });
        //            });




}]);

})();